from fastapi import APIRouter, Depends, Query
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