from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional  # <--- Added Optional here
from app.database import get_db
from app.models import Product, Category
from app.schemas import ProductSchema

router = APIRouter()

@router.get("/", response_model=List[ProductSchema])
def get_products(
    category_id: Optional[int] = None, 
    search: Optional[str] = None, 
    db: Session = Depends(get_db)
):
    query = db.query(Product)
    if category_id:
        query = query.filter(Product.category_id == category_id)
    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))
    return query.all()


@router.post("/", response_model=ProductSchema)
def create_product(payload: dict, db: Session = Depends(get_db)):
    new = Product(
        name=payload.get('name'),
        description=payload.get('description'),
        price=payload.get('price'),
        stock_quantity=payload.get('stock_quantity', 0),
        category_id=payload.get('category_id')
    )
    db.add(new)
    db.commit()
    db.refresh(new)
    return new


@router.get("/{product_id}", response_model=ProductSchema)
def get_product(product_id: int, db: Session = Depends(get_db)):
    prod = db.query(Product).filter(Product.id == product_id).first()
    if not prod:
        raise HTTPException(status_code=404, detail="Product not found")
    return prod


@router.put("/{product_id}", response_model=ProductSchema)
def update_product(product_id: int, payload: dict, db: Session = Depends(get_db)):
    prod = db.query(Product).filter(Product.id == product_id).first()
    if not prod:
        raise HTTPException(status_code=404, detail="Product not found")
    for k, v in payload.items():
        if hasattr(prod, k) and v is not None:
            setattr(prod, k, v)
    db.commit()
    db.refresh(prod)
    return prod


@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    prod = db.query(Product).filter(Product.id == product_id).first()
    if not prod:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(prod)
    db.commit()
    return {"message": "Product deleted"}