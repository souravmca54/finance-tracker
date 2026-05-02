from fastapi import FastAPI
from db.database import engine, Base
from routers import auth, expense

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables in DB
Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(expense.router)

@app.get("/")
def home():
    return {"message": "Finance Tracker API is running 🚀"}