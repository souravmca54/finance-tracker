from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from db import models
from schemas import expense as expense_schemas
from services import expense_service
from utils.dependencies import get_db, get_current_user

router = APIRouter(prefix="/expense", tags=["Expense"])

@router.get("/", response_model=List[expense_schemas.TransactionResponse])
def get_transactions(
    current_user: models.User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    return expense_service.get_transactions(db, current_user.id)

@router.post("/", response_model=expense_schemas.TransactionResponse)
def add_expense(
    transaction: expense_schemas.TransactionCreate, 
    current_user: models.User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    return expense_service.create_expense(db, current_user.id, transaction)

@router.put("/{transaction_id}", response_model=expense_schemas.TransactionResponse)
def update_expense(
    transaction_id: int,
    transaction: expense_schemas.TransactionUpdate, 
    current_user: models.User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    return expense_service.update_transaction(db, transaction_id, current_user.id, transaction)

@router.delete("/{transaction_id}")
def delete_expense(
    transaction_id: int,
    current_user: models.User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    return expense_service.delete_transaction(db, transaction_id, current_user.id)

@router.get("/dashboard", response_model=expense_schemas.DashboardResponse)
def get_dashboard(
    current_user: models.User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    return expense_service.get_dashboard_data(db, current_user.id)

@router.get("/insights", response_model=expense_schemas.InsightsResponse)
def get_insights(
    current_user: models.User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    return expense_service.get_insights_data(db, current_user.id)
