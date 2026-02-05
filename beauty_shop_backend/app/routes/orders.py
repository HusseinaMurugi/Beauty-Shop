from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Order, CartItem
from app.schemas import OrderResponse
from app.utils.helpers import generate_simulated_invoice
import uuid

router = APIRouter()

@router.post("/checkout", response_model=OrderResponse)
def checkout(user_id: int, db: Session = Depends(get_db)):
    # 1. Get Cart Items
    cart_items = db.query(CartItem).filter(CartItem.user_id == user_id).all()
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    # 2. Calculate Total
    total = sum(item.product.price * item.quantity for item in cart_items)
    
    # 3. Simulate Invoice (Project Requirement)
    invoice_no = f"INV-{uuid.uuid4().hex[:6].upper()}"
    
    # 4. Create Order
    new_order = Order(
        user_id=user_id,
        total_amount=total,
        invoice_number=invoice_no,
        status="paid"
    )
    
    db.add(new_order)
    # Clear cart after purchase
    db.query(CartItem).filter(CartItem.user_id == user_id).delete()
    db.commit()
    db.refresh(new_order)
    
    return new_order