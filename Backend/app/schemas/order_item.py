from pydantic import BaseModel, ConfigDict
from app.schemas.product import ProductOut


class OrderItemBase(BaseModel):
    product_id : int
    quantity : int
    from pydantic import BaseModel, ConfigDict, Field
from decimal import Decimal
from app.schemas.product import ProductOut


class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int 


class OrderItemOut(BaseModel):
    id: int
    order_id: int
    product_id: int
    quantity: int
    price_at_purchase: Decimal
    
    
    product: ProductOut 

    model_config = ConfigDict(from_attributes=True)