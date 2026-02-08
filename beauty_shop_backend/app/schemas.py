from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
from pydantic import Field
from typing import Any

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

class CartItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    class Config:
        from_attributes = True

# Order/Invoice
class OrderResponse(BaseModel):
    id: int
    total_amount: float
    invoice_number: str
    status: str
    created_at: datetime
    class Config: from_attributes = True

# Frontend-shaped order models
class OrderItem(BaseModel):
    name: str
    quantity: int
    price: float
    totalPrice: float | None = None

class CustomerInfo(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    address: str
    city: str
    zip: str

class OrderCreate(BaseModel):
    customer: CustomerInfo
    items: List[OrderItem]
    total: float
    paymentMethod: str | None = None
    mpesaPhone: str | None = None

class OrderDetailResponse(BaseModel):
    id: str
    createdAt: datetime
    customer: CustomerInfo
    items: List[OrderItem]
    total: float
    status: str
    class Config:
        arbitrary_types_allowed = True

# Product CRUD
class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    stock_quantity: Optional[int] = 0
    category_id: Optional[int] = None

class ProductUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    price: Optional[float]
    stock_quantity: Optional[int]
    category_id: Optional[int]

class ProductResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    price: float
    stock_quantity: int
    category_id: Optional[int]
    class Config:
        from_attributes = True

# User / Auth
class UserProfile(BaseModel):
    id: int
    email: EmailStr
    phone_number: Optional[str] = None
    is_admin: bool = False
    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    email: Optional[EmailStr]
    phone_number: Optional[str]
    password: Optional[str]