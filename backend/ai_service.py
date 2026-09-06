import os
import io
import json
import re
from emergentintegrations.llm.chat import LlmChat, UserMessage
from emergentintegrations.llm.openai import OpenAISpeechToText, OpenAITextToSpeech

EMERGENT_LLM_KEY = os.environ["EMERGENT_LLM_KEY"]
MODEL_PROVIDER = "openai"
MODEL_NAME = "gpt-5.4"

_stt = OpenAISpeechToText(api_key=EMERGENT_LLM_KEY)
_tts = OpenAITextToSpeech(api_key=EMERGENT_LLM_KEY)


def _new_chat(session_id: str, system_message: str) -> LlmChat:
    return LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=session_id,
        system_message=system_message,
    ).with_model(MODEL_PROVIDER, MODEL_NAME)


async def chat_reply(session_id: str, system_message: str, user_text: str) -> str:
    chat = _new_chat(session_id, system_message)
    return await chat.send_message(UserMessage(text=user_text))


def _extract_json(text: str):
    text = text.strip()
    # strip code fences
    text = re.sub(r"^```(json)?", "", text).strip()
    text = re.sub(r"```$", "", text).strip()
    try:
        return json.loads(text)
    except Exception:
        pass
    # find first { ... } or [ ... ]
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
    resp = await _stt.transcribe(file=buf, model="whisper-1", response_format="json", language=language)
    return resp.text.strip()


async def text_to_speech_b64(text: str, voice: str = "nova") -> str:
    return await _tts.generate_speech_base64(text=text, model="tts-1", voice=voice, response_format="mp3")


def voice_for(gender: str) -> str:
    g = (gender or "").lower()
    if g in ("male", "ذكر", "m"):
        return "onyx"
    if g in ("female", "أنثى", "انثى", "f"):
        return "nova"
    return "alloy"
