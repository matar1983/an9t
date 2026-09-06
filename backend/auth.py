import os
import uuid
import bcrypt
import jwt
from datetime import datetime, timezone, timedelta
from fastapi import APIRouter, HTTPException, Request, Depends
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

JWT_ALGORITHM = "HS256"


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "access",
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


class RegisterInput(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(min_length=6)
    age: Optional[int] = None
    gender: Optional[str] = None
    native_language: Optional[str] = "Arabic"
    target_language: Optional[str] = "English"
    dialect: Optional[str] = "American"
    goal: Optional[str] = "general"


class LoginInput(BaseModel):
    email: EmailStr
    password: str


def build_auth_router(db):
    router = APIRouter(prefix="/api/auth", tags=["auth"])

    def public_user(user: dict) -> dict:
        u = dict(user)
        u.pop("password_hash", None)
        u.pop("_id", None)
        return u

    @router.post("/register")
    async def register(input: RegisterInput):
        email = input.email.lower()
        existing = await db.users.find_one({"email": email})
        if existing:
            raise HTTPException(status_code=400, detail="هذا البريد الإلكتروني مسجل بالفعل")
        user_id = str(uuid.uuid4())
        now = datetime.now(timezone.utc).isoformat()
        doc = {
            "id": user_id,
            "email": email,
            "password_hash": hash_password(input.password),
            "name": input.name,
            "age": input.age,
            "gender": input.gender,
            "native_language": input.native_language,
            "target_language": input.target_language,
            "dialect": input.dialect,
            "goal": input.goal,
            "role": "student",
            "cefr_level": None,
            "assessment_done": False,
            "xp": 0,
            "streak": 0,
            "sessions_completed": 0,
            "created_at": now,
        }
        await db.users.insert_one(doc)
        token = create_access_token(user_id, email)
        return {"token": token, "user": public_user(doc)}

    @router.post("/login")
    async def login(input: LoginInput):
        email = input.email.lower()
        user = await db.users.find_one({"email": email})
        if not user or not verify_password(input.password, user["password_hash"]):
            raise HTTPException(status_code=401, detail="البريد الإلكتروني أو كلمة المرور غير صحيحة")
        token = create_access_token(user["id"], email)
        return {"token": token, "user": public_user(user)}

    @router.get("/me")
    async def me(user: dict = Depends(get_current_user_dep(db))):
        return public_user(user)

    @router.post("/logout")
    async def logout():
        return {"message": "logged out"}

    return router


def get_current_user_dep(db):
    async def _dep(request: Request) -> dict:
        token = None
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
        if not token:
            token = request.cookies.get("access_token")
        if not token:
            raise HTTPException(status_code=401, detail="Not authenticated")
        try:
            payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = await db.users.find_one({"id": payload["sub"]})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user

    return _dep
