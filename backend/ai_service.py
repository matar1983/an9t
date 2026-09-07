import os
import io
import json
import re
import base64
from openai import AsyncOpenAI

# --- Groq (مجاني - نفس شكل OpenAI API) ---
# قراءة المفتاح من أي من الاسمين لضمان التوافق التام
GROQ_API_KEY = os.environ.get("OPENAI_API_KEY") or os.environ.get("GROQ_API_KEY", "")
GROQ_BASE_URL = "https://api.groq.com/openai/v1"

MODEL_NAME = "llama-3.3-70b-versatile"      # للمحادثة/التوليد النصي
TRANSCRIBE_MODEL = "whisper-large-v3-turbo"  # لتحويل الصوت إلى نص

client = AsyncOpenAI(api_key=GROQ_API_KEY, base_url=GROQ_BASE_URL)

# لتخزين سجل المحادثات البسيط لكل جلسة
_chat_sessions = {}

async def chat_reply(session_id: str, system_message: str, user_text: str) -> str:
    if session_id not in _chat_sessions:
        _chat_sessions[session_id] = [{"role": "system", "content": system_message}]

    _chat_sessions[session_id].append({"role": "user", "content": user_text})

    response = await client.chat.completions.create(
        model=MODEL_NAME,
        messages=_chat_sessions[session_id]
    )

    reply_text = response.choices[0].message.content
    _chat_sessions[session_id].append({"role": "assistant", "content": reply_text})
    return reply_text


def _extract_json(text: str):
    text = text.strip()
    text = re.sub(r"^```(json)?", "", text).strip()
    text = re.sub(r"```$", "", text).strip()
    try:
        return json.loads(text)
    except Exception:
        pass
    for open_c, close_c in (("{", "}"), ("[", "]")):
        start = text.find(open_c)
        end = text.rfind(close_c)
        if start != -1 and end != -1 and end > start:
            try:
                return json.loads(text[start:end + 1])
            except Exception:
                continue
    return None


async def chat_json(session_id: str, system_message: str, user_text: str):
    sys = system_message + "\n\nAlways respond with valid JSON only. No markdown, no code fences, no extra text."
    raw = await chat_reply(session_id, sys, user_text)
    parsed = _extract_json(raw)
    if parsed is None:
        raise ValueError(f"Failed to parse JSON from model: {raw[:400]}")
    return parsed


async def transcribe_audio(audio_bytes: bytes, filename: str = "audio.webm", language: str = "en") -> str:
    buf = io.BytesIO(audio_bytes)
    buf.name = filename
    transcript = await client.audio.transcriptions.create(
        model=TRANSCRIBE_MODEL,
        file=buf,
        language=language
    )
    return transcript.text.strip()


# --- edge-tts (مجاني بالكامل، بدون مفتاح API) ---
# يتطلب: pip install edge-tts
async def text_to_speech_b64(text: str, voice: str = "en-US-JennyNeural") -> str:
    import edge_tts

    communicate = edge_tts.Communicate(text, voice)
    audio_bytes = b""
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio_bytes += chunk["data"]
    return base64.b64encode(audio_bytes).decode("utf-8")


def voice_for(gender: str) -> str:
    g = (gender or "").lower()
    if g in ("male", "ذكر", "m"):
        return "en-US-GuyNeural"
    if g in ("female", "أنثى", "انثى", "f"):
        return "en-US-JennyNeural"
    return "en-US-AriaNeural"

