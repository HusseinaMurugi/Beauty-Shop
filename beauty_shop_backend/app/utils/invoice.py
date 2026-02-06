from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from datetime import datetime
import os

def generate_invoice_pdf(invoice_number: str, amount: float, email: str):
    # Ensure the 'invoices' folder exists
    os.makedirs("invoices", exist_ok=True)
    
    file_name = f"invoice_{invoice_number}.pdf"
    file_path = os.path.join("invoices", file_name)
    
    # Initialize PDF Canvas
    c = canvas.Canvas(file_path, pagesize=letter)
    width, height = letter
    brand_color = colors.HexColor("#d63384")  # Professional Beauty Pink

    # 1. Background Header Bar
    c.setFillColor(brand_color)
    c.rect(0, height - 80, width, 80, fill=True, stroke=False)

    # 2. Header Text
    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 24)
    c.drawString(50, height - 50, "BEAUTY SHOP LTD")
    
    c.setFont("Helvetica", 10)
    c.drawRightString(width - 50, height - 40, "Official Invoice")
    c.drawRightString(width - 50, height - 55, f"#{invoice_number}")

    # 3. Body Content (Reset Fill Color)
    c.setFillColor(colors.black)
    
    # Customer Details Section
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, height - 120, "BILL TO:")
    c.setFont("Helvetica", 11)
    c.drawString(50, height - 135, f"{email}")
    
    # Date Details (Right Aligned)
    c.setFont("Helvetica-Bold", 10)
    c.drawRightString(width - 150, height - 120, "DATE:")
    c.drawRightString(width - 150, height - 135, "STATUS:")
    c.setFont("Helvetica", 10)
    c.drawRightString(width - 50, height - 120, datetime.now().strftime('%Y-%m-%d'))
    c.drawRightString(width - 50, height - 135, "PENDING")

    # 4. Summary Table Design
    c.setStrokeColor(brand_color)
    c.setLineWidth(1)
    c.line(50, height - 160, width - 50, height - 160) # Top border
    
    # Table Headers
    c.setFont("Helvetica-Bold", 11)
    c.drawString(60, height - 180, "Description")
    c.drawRightString(width - 60, height - 180, "Total (KES)")
    
    c.line(50, height - 190, width - 50, height - 190) # Header underline

    # Table Content
    c.setFont("Helvetica", 11)
    c.drawString(60, height - 215, "Order Items Checkout")
    c.drawRightString(width - 60, height - 215, f"{amount:,.2f}")

    # 5. Grand Total Box
    c.setFillColor(colors.HexColor("#fdf2f8")) # Light pink background
    c.rect(width - 250, height - 280, 200, 40, fill=True, stroke=False)
    
    c.setFillColor(brand_color)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(width - 240, height - 265, "GRAND TOTAL")
    c.drawRightString(width - 60, height - 265, f"KES {amount:,.2f}")

    # 6. Payment Instructions
    c.setFillColor(colors.black)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(50, height - 320, "Payment Method:")
    c.setFont("Helvetica", 10)
    c.drawString(150, height - 320, "M-Pesa (STK Push)")

    # 7. Footer
    c.setStrokeColor(colors.lightgrey)
    c.line(50, 70, width - 50, 70)
    
    c.setFont("Helvetica-Oblique", 9)
    c.setFillColor(colors.grey)
    c.drawCentredString(width/2.0, 50, "Thank you for shopping with Beauty Shop Ltd!")
    c.drawCentredString(width/2.0, 38, "If you have any questions, please contact support@beautyshop.com")

    c.save()
    return file_path