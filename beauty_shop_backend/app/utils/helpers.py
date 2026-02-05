import uuid
from datetime import datetime

def generate_simulated_invoice(user_email: str, total_price: float, items: list):
    """
    Generates a simulated billing address and invoice as per project requirements.
    """
    invoice_id = f"BS-{uuid.uuid4().hex[:8].upper()}"
    return {
        "invoice_number": invoice_id,
        "date": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
        "customer_email": user_email,
        "billing_info": {
            "address": "456 Beauty Ave, Suite 10, Nairobi, KE",
            "payment_method": "Simulated Gateway",
            "status": "COMPLETED"
        },
        "order_items": items,
        "total": total_price,
        "message": "Thank you for shopping at Beauty Shop!"
    }