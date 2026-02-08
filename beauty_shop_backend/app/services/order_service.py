import time
import json
from app.models import Order


def create_order_record(db, payload):
    """Create and persist an Order from frontend-shaped payload.
    Returns the Order ORM object.
    """
    public_id = f"ORD-{int(time.time() * 1000)}"

    new_order = Order(
        public_id=public_id,
        total_amount=payload.total,
        status='Processing',
        invoice_number=f"INV-{public_id[-8:]}"
    )
    # store json
    new_order.set_customer(payload.customer.dict())

    # ensure items include totalPrice
    items = []
    for it in payload.items:
        item = it.dict()
        if 'totalPrice' not in item or item['totalPrice'] is None:
            item['totalPrice'] = item.get('price', 0) * item.get('quantity', 1)
        items.append(item)
    new_order.set_items(items)

    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order


def fetch_order_by_public_id(db, public_id: str):
    return db.query(Order).filter(Order.public_id == public_id).first()
