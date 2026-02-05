from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# Auth
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Product & Category
class CategorySchema(BaseModel):
    id: int
    name: str
    class Config: from_attributes = True

class ProductSchema(BaseModel):
    id: int
    name: str
    description: Optional[str]
    price: float
    category_id: int
    class Config: from_attributes = True

# Cart
class CartItemCreate(BaseModel):
    product_id: int
    quantity: int = 1

# Order/Invoice
class OrderResponse(BaseModel):
    id: int
    total_amount: float
    invoice_number: str
    status: str
    created_at: datetime
    class Config: from_attributes = True