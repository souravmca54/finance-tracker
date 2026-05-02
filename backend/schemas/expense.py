from pydantic import BaseModel
from typing import Optional, Dict, List

class TransactionCreate(BaseModel):
    amount: float
    category: str
    type: str # "income" or "expense"

class TransactionUpdate(BaseModel):
    amount: Optional[float] = None
    category: Optional[str] = None
    type: Optional[str] = None

class TransactionResponse(BaseModel):
    id: int
    amount: float
    category: str
    type: str
    owner_id: int

    class Config:
        from_attributes = True

class CategorySummary(BaseModel):
    category: str
    amount: float

class DashboardResponse(BaseModel):
    total_income: float
    total_expense: float
    balance: float
    expenses_by_category: List[CategorySummary]

class InsightsResponse(BaseModel):
    summary: str
    tips: str
    warning: Optional[str] = None
