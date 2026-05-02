import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY", "secretkey")
REFRESH_SECRET_KEY = os.getenv("REFRESH_SECRET_KEY", "refreshsecretkey")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
