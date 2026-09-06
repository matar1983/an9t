"""Backend API integration tests for the AI English Learning Platform."""
import os
import io
import time
import uuid
import base64
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # Fallback to frontend/.env
    try:
        with open("/app/frontend/.env") as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
    except Exception:
        pass

API = f"{BASE_URL}/api"

TEST_EMAIL = "student@test.com"
TEST_PASSWORD = "test1234"


# ---------- Fixtures ----------
@pytest.fixture(scope="session")
def session():
    return requests.Session()


@pytest.fixture(scope="session")
def auth_token(session):
    # Try login first
    r = session.post(f"{API}/auth/login", json={"email": TEST_EMAIL, "password": TEST_PASSWORD}, timeout=30)
    if r.status_code == 200:
        return r.json()["token"]
    # Try register
    r = session.post(f"{API}/auth/register", json={
        "name": "Test Student",
        "email": TEST_EMAIL,
        "password": TEST_PASSWORD,
        "age": 20,
        "gender": "female",
        "native_language": "Arabic",
        "target_language": "English",
        "dialect": "American",
        "goal": "general",
    }, timeout=30)
    if r.status_code == 200:
        return r.json()["token"]
    pytest.fail(f"Cannot authenticate: login={r.status_code} body={r.text[:200]}")


@pytest.fixture(scope="session")
def auth_headers(auth_token):
    return {"Authorization": f"Bearer {auth_token}"}


# ---------- Auth Tests ----------
class TestAuth:
    def test_register_duplicate_or_new(self, session):
        # Registering existing user should return 400
        r = session.post(f"{API}/auth/register", json={
            "name": "Dup", "email": TEST_EMAIL, "password": TEST_PASSWORD,
            "age": 20, "gender": "female",
        }, timeout=30)
        assert r.status_code in (200, 400)

    def test_register_new_user_returns_token(self, session):
        email = f"TEST_{uuid.uuid4().hex[:8]}@example.com"
        r = session.post(f"{API}/auth/register", json={
            "name": "New User", "email": email, "password": "pass1234",
            "age": 25, "gender": "male", "native_language": "Arabic",
            "target_language": "English", "dialect": "British", "goal": "travel",
        }, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "token" in data and isinstance(data["token"], str)
        assert data["user"]["email"] == email.lower()
        assert data["user"]["name"] == "New User"
        assert "password_hash" not in data["user"]
        assert "_id" not in data["user"]

    def test_login_success(self, session, auth_token):
        r = session.post(f"{API}/auth/login", json={"email": TEST_EMAIL, "password": TEST_PASSWORD}, timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert data["user"]["email"] == TEST_EMAIL

    def test_login_wrong_password(self, session):
        r = session.post(f"{API}/auth/login", json={"email": TEST_EMAIL, "password": "wrongpass"}, timeout=30)
        assert r.status_code == 401

    def test_me_returns_profile(self, session, auth_headers):
        r = session.get(f"{API}/auth/me", headers=auth_headers, timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert data["email"] == TEST_EMAIL
        assert "id" in data
        assert "password_hash" not in data

    def test_me_requires_auth(self, session):
        r = session.get(f"{API}/auth/me", timeout=30)
        assert r.status_code == 401


# ---------- Profile ----------
class TestProfile:
    def test_profile_stats(self, session, auth_headers):
        r = session.get(f"{API}/profile/stats", headers=auth_headers, timeout=30)
        assert r.status_code == 200
        data = r.json()
        for k in ("sessions_completed", "vocab_count", "due_review", "xp", "cefr_level", "roadmap", "homework"):
            assert k in data


# ---------- Reading / Writing (AI) ----------
class TestWriting:
    def test_writing_prompt(self, session, auth_headers):
        r = session.get(f"{API}/writing/prompt", headers=auth_headers, timeout=90)
        assert r.status_code == 200, r.text
        data = r.json()
        # Should contain a prompt-like field
        assert isinstance(data, dict)
        assert "prompt" in data or "title" in data

    def test_writing_check(self, session, auth_headers):
        r = session.post(f"{API}/writing/check", headers=auth_headers, json={
            "prompt": "Describe your day",
            "text": "I go to school and I studies math.",
        }, timeout=90)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "score" in data
        assert "corrected_text" in data
        assert "issues" in data


class TestReading:
    def test_reading_passage(self, session, auth_headers):
        r = session.get(f"{API}/reading/passage", headers=auth_headers, timeout=90)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "passage" in data


# ---------- Vocabulary ----------
class TestVocabulary:
    def test_add_and_list_word(self, session, auth_headers):
        word = f"testword{uuid.uuid4().hex[:6]}"
        r = session.post(f"{API}/vocabulary", headers=auth_headers, json={
            "word": word, "meaning": "كلمة اختبار", "example": "This is a test.",
        }, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["word"] == word.lower()
        assert data["box"] == 1
        assert "id" in data
        assert "_id" not in data
        word_id = data["id"]

        # list
        r = session.get(f"{API}/vocabulary", headers=auth_headers, timeout=30)
        assert r.status_code == 200
        words = r.json()
        assert any(w["id"] == word_id for w in words)

        # review correct
        r = session.post(f"{API}/vocabulary/review", headers=auth_headers, json={
            "word_id": word_id, "correct": True,
        }, timeout=30)
        assert r.status_code == 200
        assert r.json()["box"] == 2

    def test_add_empty_word(self, session, auth_headers):
        r = session.post(f"{API}/vocabulary", headers=auth_headers, json={"word": "   "}, timeout=30)
        assert r.status_code == 400


# ---------- Certificate ----------
class TestCertificate:
    def test_certificate_not_eligible(self, session, auth_headers):
        r = session.get(f"{API}/certificate", headers=auth_headers, timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert "eligible" in data
        assert data["eligible"] is False or data.get("level") in ("C1", "C2")


# ---------- Session (AI voice) ----------
class TestSession:
    def test_session_start_practice(self, session, auth_headers):
        r = session.post(f"{API}/session/start", headers=auth_headers, json={
            "mode": "practice", "scenario": "ordering coffee",
        }, timeout=120)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "session_id" in data
        assert "reply" in data
        assert "audio" in data and len(data["audio"]) > 100  # base64 mp3

    def test_session_turn_and_end(self, session, auth_headers):
        # Start
        r = session.post(f"{API}/session/start", headers=auth_headers, json={
            "mode": "practice", "scenario": "greeting",
        }, timeout=120)
        assert r.status_code == 200, r.text
        sid = r.json()["session_id"]
        audio_b64 = r.json()["audio"]

        # Turn: reuse the TTS audio as user input (whisper will transcribe something)
        audio_bytes = base64.b64decode(audio_b64)
        files = {"audio": ("audio.mp3", io.BytesIO(audio_bytes), "audio/mpeg")}
        data = {"session_id": sid}
        r = session.post(f"{API}/session/turn", headers=auth_headers, data=data, files=files, timeout=180)
        assert r.status_code == 200, r.text
        body = r.json()
        assert "user_text" in body
        assert "reply" in body
        assert "audio" in body
        assert "corrections" in body

        # End
        r = session.post(f"{API}/session/end", headers=auth_headers, json={"session_id": sid}, timeout=120)
        assert r.status_code == 200, r.text
        end_body = r.json()
        assert end_body["mode"] == "practice"
        assert "report" in end_body
