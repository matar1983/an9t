# PRD — لِسان (AI English Learning Platform)

## Original Problem Statement
منصة/موقع مجاني لتعليم الإنجليزية عبر بثوث مباشرة بالذكاء الاصطناعي (عربي RTL): تعبئة بيانات الطالب ولوحة تحكم، اختيار اللغة الأم واللغة الهدف واللهجة، جلسة تقييم مستوى لحظي بالمحادثة الصوتية، تقرير CEFR (A1–C2) وخطة تعلّم مخصصة، جلسات تعلّم (محادثة/استماع، قراءة تفاعلية، كتابة وقواعد)، مراجعة ذكية وتكرار متباعد وبنك مفردات، ترقية بين المستويات، وشهادة إتقان.

## Architecture
- Frontend: React 19 + Tailwind + shadcn/ui, RTL, framer-motion, recharts. AuthContext (JWT Bearer in localStorage). Pages: Landing, Auth, Dashboard, LiveSession, Reading, Writing, Vocabulary, Certificate.
- Backend: FastAPI (`/api` prefix). Auth in `auth.py` (JWT, bcrypt). AI in `ai_service.py` via emergentintegrations (OpenAI gpt-5.4 chat, tts-1 TTS, whisper-1 STT) using EMERGENT_LLM_KEY. Main routes in `server.py`.
- DB: MongoDB collections: users, sessions, vocabulary.

## User Persona
طالب عربي يريد تعلّم الإنجليزية من الصفر حتى الاحتراف عبر المحادثة الصوتية مع معلّم ذكي.

## Core Requirements (static)
Onboarding, dashboard, adaptive voice assessment→CEFR, roadmap+homework, live voice sessions with gentle correction, interactive reading (pronunciation highlight), real-time writing/grammar, vocabulary bank + spaced repetition, mastery challenge/level progression, certification.

## Implemented (2026-06)
- JWT auth (register/login/me/logout) — email+password.
- Student onboarding (name, age, gender, native/target language, dialect, goal).
- Dashboard: stats, CEFR progress bar, roadmap, homework, quick actions.
- Live voice sessions (assessment/practice/challenge): mic record → Whisper STT → gpt-5.4 reply + corrections + vocab → TTS audio playback; transcript UI.
- Assessment report: CEFR level, radar chart of 5 skills, strengths/weaknesses, summary; saves level+roadmap+homework.
- Practice/challenge summary with XP, new words saved to vocab; challenge can level up.
- Reading: AI passage + read-aloud analysis with mispronounced word highlighting.
- Writing: AI prompt + grammar/spelling check with corrected text and issues.
- Vocabulary bank + Leitner spaced repetition + AI review quiz.
- Certificate (C1/C2 gated) with printable card.
- Tested: backend 15/15 pytest pass; frontend critical flows pass.

## Backlog / Remaining
- P1: Session history view page; streak tracking logic; homework completion tracking.
- P1: Streaming (token-by-token) AI replies for lower latency.
- P2: Video/avatar tutor; email verification & password reset UI; social share of certificate; multi-language UI beyond Arabic.
- P2: Refactor server.py into per-feature routers.

## Test Credentials
student@test.com / test1234 (see /app/memory/test_credentials.md)
