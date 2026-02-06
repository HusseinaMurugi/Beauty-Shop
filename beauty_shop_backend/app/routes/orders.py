from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Order, CartItem
from app.routes.auth import get_current_user
from app.utils.mpesa import initiate_stk_push
from app.utils.invoice import generate_invoice_pdf
from app.utils.email import send_invoice_email  # Make sure this import exists
import uuid

router = APIRouter()

@router.post("/checkout")
def checkout(
    background_tasks: BackgroundTasks, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    # 1. Validate Cart
    cart_items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    # 2. Get Phone Number (with Fallback)
    db_phone = getattr(current_user, 'phone_number', None) or getattr(current_user, 'phone', None)
    user_phone = db_phone if db_phone else "254707996007" 

    # 3. Financials & Invoice Prep
    total = sum(item.product.price * item.quantity for item in cart_items)
    invoice_no = f"INV-{uuid.uuid4().hex[:6].upper()}"
    
    # 4. Save Order & Clear Cart
    new_order = Order(
        user_id=current_user.id,
        total_amount=total,
        invoice_number=invoice_no,
        status="pending"
    )
    db.add(new_order)
    
    # Clear cart so user doesn't double-buy while payment processes
    db.query(CartItem).filter(CartItem.user_id == current_user.id).delete()
    db.commit()
    db.refresh(new_order)

    # 5. Generate PDF Invoice
    pdf_path = generate_invoice_pdf(invoice_no, total, current_user.email)

    # 6. M-Pesa Trigger
    try:
        mpesa_response = initiate_stk_push(
            phone=user_phone,
            amount=int(total),
            invoice_no=invoice_no
        )
    except Exception as e:
        mpesa_response = {"error": "M-Pesa Service Unavailable", "details": str(e)}

    # 7. Send Email in the Background
    # This happens instantly in the background so the user gets their STK prompt ASAP
    background_tasks.add_task(
        send_invoice_email, 
        recipient_email=current_user.email, 
        invoice_no=invoice_no, 
        pdf_path=pdf_path
    )

    return {
        "message": "Checkout initiated. Check your phone for M-Pesa and your email for the invoice.",
        "order_details": {
            "id": new_order.id, 
            "invoice": invoice_no, 
            "total": total,
            "phone_used": user_phone
        },
        "pdf_location": pdf_path,
        "mpesa_status": mpesa_response
    }