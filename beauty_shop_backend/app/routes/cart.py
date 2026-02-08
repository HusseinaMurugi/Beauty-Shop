from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import CartItem, Product, User
from app.schemas import CartItemCreate, CartItemResponse
# We are now pulling the user identity from your auth logic
from app.routes.auth import get_current_user 

router = APIRouter()

@router.post("/add")
def add_to_cart(
    item: CartItemCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Adds a product to the user's cart. 
    The user_id is automatically pulled from the JWT token.
    """
    # 1. Verify the product exists in the shop
    product = db.query(Product).filter(Product.id == item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # 2. Check if the item is already in the cart to update quantity, or create new
    existing_item = db.query(CartItem).filter(
        CartItem.user_id == current_user.id, 
        CartItem.product_id == item.product_id
    ).first()

    if existing_item:
        existing_item.quantity += item.quantity
    else:
        new_cart_item = CartItem(
            user_id=current_user.id, 
            product_id=item.product_id, 
            quantity=item.quantity
        )
        db.add(new_cart_item)
    
    db.commit()
    return {"message": f"Added {item.quantity} x {product.name} to your cart."}

@router.get("/")
def view_cart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Returns only the items belonging to the logged-in user.
    """
    cart_items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    return cart_items


@router.put("/{item_id}", response_model=CartItemResponse)
def update_cart_item(item_id: int, payload: CartItemCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    item = db.query(CartItem).filter(CartItem.id == item_id, CartItem.user_id == current_user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    item.quantity = payload.quantity
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}")
def delete_cart_item(item_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    item = db.query(CartItem).filter(CartItem.id == item_id, CartItem.user_id == current_user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    db.delete(item)
    db.commit()
    return {"message": "Item removed"}


@router.post("/clear")
def clear_cart_endpoint(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db.query(CartItem).filter(CartItem.user_id == current_user.id).delete()
    db.commit()
    return {"message": "Cart cleared"}