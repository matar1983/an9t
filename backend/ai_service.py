import os
import io
import json
import re
from openai import AsyncOpenAI

EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY") or os.environ.get("OPENAI_API_KEY", "")
MODEL_NAME = "gpt-4o"

client = AsyncOpenAI(api_key=EMERGENT_LLM_KEY)

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
        model="whisper-1",
        file=buf,
        language=language
    )
    return transcript.text.strip()


async def text_to_speech_b64(text: str, voice: str = "nova") -> str:
    import base64
    response = await client.audio.speech.create(
        model="tts-1",
        voice=voice,
        input=text
    )
    audio_content = response.content
    return base64.b64encode(audio_content).decode("utf-8")


def voice_for(gender: str) -> str:
    g = (gender or "").lower()
    if g in ("male", "ذكر", "m"):
        return "onyx"
    if g in ("female", "أنثى", "انثى", "f"):
        return "nova"
    return "alloy"
