from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi import HTTPException, status
from db import models
from schemas import expense as expense_schemas

def create_expense(db: Session, user_id: int, transaction: expense_schemas.TransactionCreate):
    new_transaction = models.Transaction(
        amount=transaction.amount,
        category=transaction.category,
        type=transaction.type,
        owner_id=user_id
    )
    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
    return new_transaction

def get_transactions(db: Session, user_id: int):
    return db.query(models.Transaction).filter(models.Transaction.owner_id == user_id).all()

def update_transaction(db: Session, transaction_id: int, user_id: int, transaction_update: expense_schemas.TransactionUpdate):
    transaction = db.query(models.Transaction).filter(
        models.Transaction.id == transaction_id, 
        models.Transaction.owner_id == user_id
    ).first()
    
    if not transaction:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found")
        
    update_data = transaction_update.model_dump(exclude_unset=True) if hasattr(transaction_update, "model_dump") else transaction_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(transaction, key, value)
        
    db.commit()
    db.refresh(transaction)
    return transaction

def delete_transaction(db: Session, transaction_id: int, user_id: int):
    transaction = db.query(models.Transaction).filter(
        models.Transaction.id == transaction_id, 
        models.Transaction.owner_id == user_id
    ).first()
    
    if not transaction:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found")
        
    db.delete(transaction)
    db.commit()
    return {"message": "Transaction deleted successfully"}

def get_dashboard_data(db: Session, user_id: int):
    income = db.query(func.sum(models.Transaction.amount)).filter(
        models.Transaction.owner_id == user_id,
        models.Transaction.type == "income"
    ).scalar() or 0.0

    expense = db.query(func.sum(models.Transaction.amount)).filter(
        models.Transaction.owner_id == user_id,
        models.Transaction.type == "expense"
    ).scalar() or 0.0

    balance = income - expense

    category_expenses = db.query(
        models.Transaction.category, 
        func.sum(models.Transaction.amount).label('total')
    ).filter(
        models.Transaction.owner_id == user_id,
        models.Transaction.type == "expense"
    ).group_by(models.Transaction.category).all()

    expenses_by_category = [{"category": row.category, "amount": row.total} for row in category_expenses]

    return {
        "total_income": income,
        "total_expense": expense,
        "balance": balance,
        "expenses_by_category": expenses_by_category
    }

def get_insights_data(db: Session, user_id: int):
    dashboard = get_dashboard_data(db, user_id)
    income = dashboard["total_income"]
    expense = dashboard["total_expense"]
    balance = dashboard["balance"]
    categories = dashboard["expenses_by_category"]
    
    if income == 0 and expense == 0:
        return {
            "summary": "You haven't recorded any transactions yet.",
            "tips": "Add your first income or expense to unlock personalized AI financial insights.",
            "warning": None
        }

    summary = f"You spent ₹{expense:,.2f} so far."
    if income > 0:
        summary += f" Your income is ₹{income:,.2f}, leaving a balance of ₹{balance:,.2f}."

    highest_category = None
    if categories:
        highest_category = max(categories, key=lambda x: x["amount"])
        summary += f" Your highest spending category is {highest_category['category']} (₹{highest_category['amount']:,.2f})."

    tips = "Keep tracking your expenses daily to build strong financial habits!"
    warning = None

    if expense > income and income > 0:
        warning = "Warning: You are spending more than you earn! Try to cut back on non-essential expenses."
    
    if income > 0 and balance >= (0.3 * income):
        tips = "Great job! You are saving over 30% of your income. Keep it up!"

    if highest_category and expense > 0:
        cat_percentage = (highest_category["amount"] / expense) * 100
        if cat_percentage > 50:
            tips = f"Try reducing your {highest_category['category']} expenses, which take up {cat_percentage:.0f}% of your total spending."

    return {
        "summary": summary,
        "tips": tips,
        "warning": warning
    }
