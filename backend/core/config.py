import os
from dotenv import load_dotenv

load_dotenv()

# Provide a local SQLite fallback if the environment variable is missing
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./finance.db")

# Fix for Railway/Heroku Postgres URLs
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

print("DATABASE_URL =", "SET" if DATABASE_URL else "None")

SECRET_KEY = os.getenv("SECRET_KEY", "secretkey")
REFRESH_SECRET_KEY = os.getenv("REFRESH_SECRET_KEY", "refreshsecretkey")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
