import smtplib
import os
from email.message import EmailMessage
from dotenv import load_dotenv

# Load .env to get your Gmail credentials
load_dotenv()

def send_invoice_email(recipient_email: str, invoice_no: str, pdf_path: str):
    msg = EmailMessage()
    msg['Subject'] = f"Your Beauty Shop Invoice - {invoice_no}"
    msg['From'] = os.getenv("MAIL_FROM")
    msg['To'] = recipient_email
    
    # Simple HTML Body
    html_content = f"""
    <html>
        <body>
            <h2 style="color: #d63384;">Thank you for your order!</h2>
            <p>Attached is your invoice <strong>{invoice_no}</strong>.</p>
            <p>We are preparing your package and will notify you once it's shipped.</p>
            <br>
            <p>Best Regards,<br><strong>Beauty Shop Team</strong></p>
        </body>
    </html>
    """
    msg.set_content("Please find your invoice attached.")
    msg.add_alternative(html_content, subtype='html')

    # Attach the PDF file
    try:
        with open(pdf_path, 'rb') as f:
            file_data = f.read()
            msg.add_attachment(
                file_data,
                maintype='application',
                subtype='pdf',
                filename=f"Invoice_{invoice_no}.pdf"
            )

        # Login and Send
        with smtplib.SMTP(os.getenv("MAIL_SERVER"), int(os.getenv("MAIL_PORT"))) as smtp:
            smtp.starttls()
            smtp.login(os.getenv("MAIL_USERNAME"), os.getenv("MAIL_PASSWORD"))
            smtp.send_message(msg)
            
        print(f"Successfully sent email to {recipient_email}")
    except Exception as e:
        print(f"Failed to send email: {e}")