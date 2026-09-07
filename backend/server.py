import os
import uuid
import logging
from pathlib import Path
from datetime import datetime, timezone, timedelta
from typing import Optional, List

from dotenv import load_dotenv
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter, HTTPException, Depends, UploadFile, File, Form
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel

import ai_service
from auth import build_auth_router, get_current_user_dep

class AdminLogin(BaseModel):
    email: str
    password: str
    
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

current_user = get_current_user_dep(db)


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def public_user(user: dict) -> dict:
    u = dict(user)
    u.pop("password_hash", None)
    u.pop("_id", None)
    return u


def profile_context(user: dict) -> str:
    return (
        f"Student profile: name={user.get('name')}, age={user.get('age')}, gender={user.get('gender')}, "
        f"native language={user.get('native_language')}, learning={user.get('target_language')} "
        f"({user.get('dialect')} dialect), goal={user.get('goal')}, "
        f"current CEFR level={user.get('cefr_level') or 'unknown'}."
    )


# ---------- Models ----------
class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    native_language: Optional[str] = None
    target_language: Optional[str] = None
    dialect: Optional[str] = None
    goal: Optional[str] = None


class SessionStart(BaseModel):
    mode: str = "practice"  # assessment | practice | challenge
    scenario: Optional[str] = None


class SessionEnd(BaseModel):
    session_id: str


class WritingCheck(BaseModel):
    prompt: str
    text: str


class AddWord(BaseModel):
    word: str
    meaning: Optional[str] = None
    example: Optional[str] = None


class ReviewWord(BaseModel):
    word_id: str
    correct: bool


# ---------- Profile ----------
@api_router.put("/profile")
async def update_profile(input: ProfileUpdate, user: dict = Depends(current_user)):
    updates = {k: v for k, v in input.model_dump().items() if v is not None}
    if updates:
        await db.users.update_one({"id": user["id"]}, {"$set": updates})
    fresh = await db.users.find_one({"id": user["id"]})
    return public_user(fresh)


@api_router.get("/profile/stats")
async def profile_stats(user: dict = Depends(current_user)):
    sessions = await db.sessions.find({"user_id": user["id"], "ended_at": {"$ne": None}}).to_list(1000)
    vocab_count = await db.vocabulary.count_documents({"user_id": user["id"]})
    due = await db.vocabulary.count_documents({"user_id": user["id"], "next_review": {"$lte": now_iso()}})
    return {
        "user": public_user(user),
        "sessions_completed": len(sessions),
        "vocab_count": vocab_count,
        "due_review": due,
        "xp": user.get("xp", 0),
        "streak": user.get("streak", 0),
        "cefr_level": user.get("cefr_level"),
        "assessment_done": user.get("assessment_done", False),
        "roadmap": user.get("roadmap", []),
        "homework": user.get("homework", []),
    }


# ---------- Live Voice Sessions ----------
def session_system_prompt(user: dict, mode: str, scenario: Optional[str]) -> str:
    base = (
        "You are a warm, encouraging AI English tutor running a LIVE spoken conversation. "
        + profile_context(user) + " "
        "Speak naturally in English at a level appropriate to the student. Keep replies short (1-3 sentences) "
        "so the conversation flows like real speech. Adapt tone to the student's age and gender. "
        "When the student's native language is Arabic and they seem confused, you may add ONE short Arabic hint in parentheses. "
    )
    if mode == "assessment":
        base += (
            "This is an ADAPTIVE PLACEMENT interview to detect the student's CEFR level (A1-C2). "
            "Ask friendly questions that gradually increase in difficulty to probe fluency, vocabulary, listening and grammar. "
            "If the student is a total beginner, immediately simplify and reassure them without embarrassment. "
        )
    elif mode == "challenge":
        base += (
            "This is a MASTERY CHALLENGE to test if the student can advance to the next CEFR level. "
            "Ask progressively harder real-life questions and note their performance. "
        )
    else:
        base += (
            f"This is a practice conversation about the scenario: '{scenario or 'general conversation'}'. "
            "Gently correct pronunciation and grammar mistakes in an encouraging way without interrupting the flow. "
        )
    base += (
        "\nReturn JSON with keys: "
        "'reply' (your spoken response in English), "
        "'corrections' (array of {error, correction, tip} for the student's last message, empty if none), "
        "'new_vocab' (array of useful English words you introduced, each {word, meaning, example})."
    )
    return base


@api_router.post("/session/start")
async def session_start(input: SessionStart, user: dict = Depends(current_user)):
    session_id = str(uuid.uuid4())
    sys = session_system_prompt(user, input.mode, input.scenario)
    opener = "Start the session now: greet the student by name and ask your first question."
    result = await ai_service.chat_json(session_id, sys, opener)
    reply = result.get("reply", "Hello! Let's begin.")
    voice = ai_service.voice_for(user.get("gender"))
    audio = await ai_service.text_to_speech_b64(reply, voice)
    doc = {
        "id": session_id,
        "user_id": user["id"],
        "mode": input.mode,
        "scenario": input.scenario,
        "messages": [{"role": "assistant", "text": reply}],
        "vocab_collected": result.get("new_vocab", []),
        "created_at": now_iso(),
        "ended_at": None,
        "report": None,
    }
    await db.sessions.insert_one(doc)
    return {"session_id": session_id, "reply": reply, "audio": audio, "new_vocab": result.get("new_vocab", [])}


@api_router.post("/session/turn")
async def session_turn(
    session_id: str = Form(...),
    audio: UploadFile = File(...),
    user: dict = Depends(current_user),
):
    session = await db.sessions.find_one({"id": session_id, "user_id": user["id"]})
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    audio_bytes = await audio.read()
    user_text = await ai_service.transcribe_audio(audio_bytes, audio.filename or "audio.webm", "en")
    if not user_text:
        user_text = "(no speech detected)"

    transcript = "\n".join(
        f"{'Tutor' if m['role'] == 'assistant' else 'Student'}: {m['text']}"
        for m in session["messages"]
    )
    sys = session_system_prompt(user, session["mode"], session.get("scenario"))
    prompt = f"Conversation so far:\n{transcript}\n\nStudent just said: \"{user_text}\"\n\nRespond now."
    result = await ai_service.chat_json(session_id, sys, prompt)
    reply = result.get("reply", "Could you say that again?")
    corrections = result.get("corrections", [])
    new_vocab = result.get("new_vocab", [])
    voice = ai_service.voice_for(user.get("gender"))
    audio_b64 = await ai_service.text_to_speech_b64(reply, voice)

    await db.sessions.update_one(
        {"id": session_id},
        {"$push": {"messages": {"$each": [
            {"role": "user", "text": user_text, "corrections": corrections},
            {"role": "assistant", "text": reply},
        ]}}},
    )
    if new_vocab:
        await db.sessions.update_one({"id": session_id}, {"$push": {"vocab_collected": {"$each": new_vocab}}})

    return {
        "user_text": user_text,
        "reply": reply,
        "corrections": corrections,
        "new_vocab": new_vocab,
        "audio": audio_b64,
    }


@api_router.post("/session/end")
async def session_end(input: SessionEnd, user: dict = Depends(current_user)):
    session = await db.sessions.find_one({"id": input.session_id, "user_id": user["id"]})
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    transcript = "\n".join(
        f"{'Tutor' if m['role'] == 'assistant' else 'Student'}: {m['text']}"
        for m in session["messages"]
    )

    if session["mode"] == "assessment":
        sys = (
            "You are an expert English examiner. Based on the conversation transcript, produce a CEFR placement report. "
            + profile_context(user) +
            " Return JSON with keys: 'level' (one of A1,A2,B1,B2,C1,C2), "
            "'scores' (object with numeric 0-100 for fluency, pronunciation, vocabulary, listening, grammar), "
            "'strengths' (array of short strings), 'weaknesses' (array of short strings), "
            "'summary' (2-3 sentence encouraging summary in Arabic), "
            "'roadmap' (array of 6 items {title (Arabic), description (Arabic), target_level}) building a personalized learning path, "
            "'homework' (array of 3 short first tasks in Arabic)."
        )
        report = await ai_service.chat_json(input.session_id, sys, f"Transcript:\n{transcript}")
        await db.users.update_one(
            {"id": user["id"]},
            {"$set": {
                "cefr_level": report.get("level"),
                "assessment_done": True,
                "roadmap": report.get("roadmap", []),
                "homework": report.get("homework", []),
                "assessment_report": report,
            }},
        )
        await db.sessions.update_one({"id": input.session_id}, {"$set": {"ended_at": now_iso(), "report": report}})
        await _save_vocab(user["id"], session.get("vocab_collected", []))
        return {"mode": "assessment", "report": report}

    # practice or challenge
    passed_note = ""
    if session["mode"] == "challenge":
        passed_note = "Also include 'passed' (boolean) whether the student mastered their current level and can advance, and 'next_level' (CEFR)."
    sys = (
        "You are an English tutor summarizing a completed practice conversation. " + profile_context(user) +
        " Return JSON with keys: 'summary' (2-3 sentence encouraging summary in Arabic), "
        "'xp' (integer 10-100 based on effort), "
        "'new_words' (array of {word, meaning (Arabic), example}) worth remembering from this session. " + passed_note
    )
    summary = await ai_service.chat_json(input.session_id, sys, f"Transcript:\n{transcript}")
    words = summary.get("new_words", []) + session.get("vocab_collected", [])
    await _save_vocab(user["id"], words)

    xp = int(summary.get("xp", 20) or 20)
    inc = {"xp": xp, "sessions_completed": 1}
    set_fields = {}
    if session["mode"] == "challenge" and summary.get("passed"):
        if summary.get("next_level"):
            set_fields["cefr_level"] = summary.get("next_level")
    update = {"$inc": inc}
    if set_fields:
        update["$set"] = set_fields
    await db.users.update_one({"id": user["id"]}, update)
    await db.sessions.update_one({"id": input.session_id}, {"$set": {"ended_at": now_iso(), "report": summary}})
    return {"mode": session["mode"], "report": summary}


async def _save_vocab(user_id: str, words: list):
    for w in words:
        word = (w.get("word") or "").strip() if isinstance(w, dict) else str(w).strip()
        if not word:
            continue
        existing = await db.vocabulary.find_one({"user_id": user_id, "word": word.lower()})
        if existing:
            continue
        await db.vocabulary.insert_one({
            "id": str(uuid.uuid4()),
            "user_id": user_id,
            "word": word.lower(),
            "display_word": word,
            "meaning": w.get("meaning") if isinstance(w, dict) else None,
            "example": w.get("example") if isinstance(w, dict) else None,
            "box": 1,
            "next_review": now_iso(),
            "created_at": now_iso(),
        })


@api_router.get("/sessions")
async def list_sessions(user: dict = Depends(current_user)):
    sessions = await db.sessions.find({"user_id": user["id"]}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return sessions


# ---------- Reading ----------
@api_router.get("/reading/passage")
async def reading_passage(user: dict = Depends(current_user)):
    level = user.get("cefr_level") or "A2"
    sys = (
        f"Generate a short English reading passage (3-4 sentences) suitable for CEFR level {level}. "
        + profile_context(user) +
        " Return JSON: {'title': str, 'passage': str, 'glossary': array of {word, meaning (Arabic)}}."
    )
    result = await ai_service.chat_json(str(uuid.uuid4()), sys, "Create the passage now.")
    return result


@api_router.post("/reading/analyze")
async def reading_analyze(
    passage: str = Form(...),
    audio: UploadFile = File(...),
    user: dict = Depends(current_user),
):
    audio_bytes = await audio.read()
    transcript = await ai_service.transcribe_audio(audio_bytes, audio.filename or "audio.webm", "en")
    sys = (
        "You are a pronunciation coach. Compare the target passage with what the student actually said (from speech-to-text). "
        "Return JSON: {'accuracy': int 0-100, 'transcript': str, "
        "'words': array of {word, correct (bool)} for each word in the TARGET passage, "
        "'feedback': short Arabic encouragement}."
    )
    prompt = f"Target passage: \"{passage}\"\nStudent said (STT): \"{transcript}\""
    result = await ai_service.chat_json(str(uuid.uuid4()), sys, prompt)
    result["transcript"] = transcript
    return result


# ---------- Writing ----------
@api_router.get("/writing/prompt")
async def writing_prompt(user: dict = Depends(current_user)):
    level = user.get("cefr_level") or "A2"
    sys = (
        f"Create a short English writing task for CEFR level {level}. " + profile_context(user) +
        " Return JSON: {'title' (Arabic), 'prompt' (English task the student must write about), 'hint' (Arabic tip)}."
    )
    return await ai_service.chat_json(str(uuid.uuid4()), sys, "Create the writing task.")


@api_router.post("/writing/check")
async def writing_check(input: WritingCheck, user: dict = Depends(current_user)):
    sys = (
        "You are an English writing tutor. Analyze the student's writing for grammar and spelling. " + profile_context(user) +
        " Return JSON: {'score': int 0-100, 'corrected_text': str (the fixed version), "
        "'issues': array of {original, correction, explanation (Arabic)}, 'feedback': short Arabic encouragement}."
    )
    prompt = f"Task: {input.prompt}\nStudent wrote: \"{input.text}\""
    return await ai_service.chat_json(str(uuid.uuid4()), sys, prompt)


# ---------- Vocabulary + Spaced Repetition ----------
BOX_INTERVALS = {1: 0, 2: 1, 3: 3, 4: 7, 5: 21}  # days


@api_router.get("/vocabulary")
async def get_vocabulary(user: dict = Depends(current_user)):
    words = await db.vocabulary.find({"user_id": user["id"]}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return words


@api_router.post("/vocabulary")
async def add_vocabulary(input: AddWord, user: dict = Depends(current_user)):
    word = input.word.strip()
    if not word:
        raise HTTPException(status_code=400, detail="الكلمة مطلوبة")
    existing = await db.vocabulary.find_one({"user_id": user["id"], "word": word.lower()})
    if existing:
        raise HTTPException(status_code=400, detail="الكلمة موجودة بالفعل")
    doc = {
        "id": str(uuid.uuid4()),
        "user_id": user["id"],
        "word": word.lower(),
        "display_word": word,
        "meaning": input.meaning,
        "example": input.example,
        "box": 1,
        "next_review": now_iso(),
        "created_at": now_iso(),
    }
    await db.vocabulary.insert_one(doc)
    doc.pop("_id", None)
    return doc


@api_router.post("/vocabulary/review")
async def review_vocabulary(input: ReviewWord, user: dict = Depends(current_user)):
    word = await db.vocabulary.find_one({"id": input.word_id, "user_id": user["id"]})
    if not word:
        raise HTTPException(status_code=404, detail="Word not found")
    box = word.get("box", 1)
    box = min(box + 1, 5) if input.correct else 1
    days = BOX_INTERVALS[box]
    next_review = (datetime.now(timezone.utc) + timedelta(days=days)).isoformat()
    await db.vocabulary.update_one({"id": input.word_id}, {"$set": {"box": box, "next_review": next_review}})
    return {"box": box, "next_review": next_review}


@api_router.get("/vocabulary/quiz")
async def vocabulary_quiz(user: dict = Depends(current_user)):
    due = await db.vocabulary.find(
        {"user_id": user["id"], "next_review": {"$lte": now_iso()}}, {"_id": 0}
    ).limit(10).to_list(10)
    if not due:
        return {"questions": []}
    word_list = ", ".join(w["display_word"] for w in due)
    sys = (
        "Create a fun multiple-choice review quiz for these English words the student is learning. " + profile_context(user) +
        " Return JSON: {'questions': array of {word_id, word, question (Arabic), options (array of 4 English/Arabic strings), answer_index (int)}}."
        f" Words with their ids: " + "; ".join(f"{w['id']}={w['display_word']}" for w in due)
    )
    result = await ai_service.chat_json(str(uuid.uuid4()), sys, f"Words: {word_list}")
    return result


# ---------- Certificate ----------
@api_router.get("/certificate")
async def certificate(user: dict = Depends(current_user)):
    level = user.get("cefr_level")
    eligible = level in ("C1", "C2")
    return {
        "eligible": eligible,
        "name": user.get("name"),
        "level": level,
        "date": now_iso(),
        "sessions_completed": user.get("sessions_completed", 0),
        "xp": user.get("xp", 0),
        "verification_id": user.get("id", "")[:8].upper(),
    }


@api_router.get("/")
async def root():
    return {"message": "AI English Learning Platform API"}


# ---------- App wiring ----------
app.include_router(build_auth_router(db))
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.users.create_index("id", unique=True)
    await db.sessions.create_index("user_id")
    await db.vocabulary.create_index("user_id")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

@app.get("/")
def read_root():
    return {"message": "EDM2N Platform is online!"}

@api_router.post("/admin/login")
async def admin_login(input: AdminLogin):
    email = input.email.lower()
    user = await db.users.find_one({"email": email})
    
    # التحقق من وجود المستخدم وأن كلمة المرور صحيحة وأن لديه صلاحية مدير (role == 'admin')
    if not user or not auth.verify_password(input.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="البريد الإلكتروني أو كلمة المرور غير صحيحة")
    
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="ليس لديك صلاحية الدخول لوحة التحكم")
        
    token = auth.create_access_token(user["id"], email)
    return {"token": token, "user": public_user(user)}
