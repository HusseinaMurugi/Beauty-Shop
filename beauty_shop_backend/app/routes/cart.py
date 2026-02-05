from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import CartItem, Product
from app.schemas import CartItemCreate

router = APIRouter()

@router.post("/add")
def add_to_cart(item: CartItemCreate, user_id: int, db: Session = Depends(get_db)):
    # Check if product exists
    product = db.query(Product).filter(Product.id == item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    cart_item = CartItem(user_id=user_id, product_id=item.product_id, quantity=item.quantity)
    db.add(cart_item)
    db.commit()
    return {"message": "Added to cart"}

@router.get("/{user_id}")
def view_cart(user_id: int, db: Session = Depends(get_db)):
    return db.query(CartItem).filter(CartItem.user_id == user_id).all()