from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import os

def generate_invoice_pdf(invoice_number: str, amount: float, email: str):
    # Ensure the 'invoices' folder exists at root level
    os.makedirs("invoices", exist_ok=True)
    
    file_name = f"invoice_{invoice_number}.pdf"
    file_path = os.path.join("invoices", file_name)
    
    # Initialize PDF Canvas
    c = canvas.Canvas(file_path, pagesize=letter)
    width, height = letter
    
    # Header
    c.setFont("Helvetica-Bold", 22)
    c.drawCentredString(width/2, height - 50, "BEAUTY SHOP LTD")
    
    # Invoice Metadata
    c.setFont("Helvetica", 12)
    c.drawString(50, height - 100, f"Invoice Number: {invoice_number}")
    c.drawString(50, height - 120, f"Customer: {email}")
    c.drawString(50, height - 140, f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    
    c.line(50, height - 150, width - 50, height - 150)
    
    # Summary
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, height - 180, "Order Summary")
    c.setFont("Helvetica", 12)
    c.drawString(50, height - 200, f"Total Amount Payable: KES {amount}")
    c.drawString(50, height - 220, "Payment Method: M-Pesa")
    c.drawString(50, height - 240, "Status: PENDING")
    
    # Footer
    c.setFont("Helvetica-Oblique", 10)
    c.drawString(50, 50, "Thank you for your business. Please complete the STK prompt on your phone.")
    
    c.save()
    return file_path