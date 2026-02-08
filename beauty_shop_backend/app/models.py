from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import json

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    phone_number = Column(String, nullable=True)  # Added for M-Pesa integration
    is_admin = Column(Boolean, default=False)
    
    orders = relationship("Order", back_populates="owner")
    cart_items = relationship("CartItem", back_populates="user")

class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    
    products = relationship("Product", back_populates="category")

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    price = Column(Float)
    stock_quantity = Column(Integer, default=0)
    category_id = Column(Integer, ForeignKey("categories.id"))
    
    category = relationship("Category", back_populates="products")

class CartItem(Base):
    __tablename__ = "cart_items"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, default=1)

    user = relationship("User", back_populates="cart_items")
    product = relationship("Product")

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    total_amount = Column(Float)
    status = Column(String, default="pending") 
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    invoice_number = Column(String, unique=True)
    billing_address = Column(String, default="123 Beauty Lane, Nairobi")
    # New: store frontend-shaped payloads
    public_id = Column(String, unique=True, index=True, nullable=True)
    customer_json = Column(Text, nullable=True)
    items_json = Column(Text, nullable=True)
    owner = relationship("User", back_populates="orders")

    def set_customer(self, customer_obj):
        self.customer_json = json.dumps(customer_obj)

    def set_items(self, items_list):
        self.items_json = json.dumps(items_list)

    def get_customer(self):
        return json.loads(self.customer_json) if self.customer_json else None

    def get_items(self):
        return json.loads(self.items_json) if self.items_json else []