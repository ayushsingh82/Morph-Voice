import smtplib
import sqlite3
import os
from datetime import datetime, timedelta
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import json
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class InvoiceReminder:
    def __init__(self):
        self.smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', '587'))
        self.sender_email = os.getenv('SENDER_EMAIL')
        self.sender_password = os.getenv('SENDER_PASSWORD')
        self.db_path = os.getenv('DB_PATH', 'invoices.db')
        
    def create_database(self):
        """Create SQLite database and tables for storing invoice data"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS invoices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                invoice_id TEXT UNIQUE,
                recipient_address TEXT,
                recipient_email TEXT,
                recipient_name TEXT,
                amount REAL,
                status TEXT DEFAULT 'pending',
                created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                due_date TIMESTAMP,
                description TEXT,
                blockchain_tx_hash TEXT
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS email_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                invoice_id TEXT,
                email_sent_to TEXT,
                sent_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                email_type TEXT,
                status TEXT
            )
        ''')
        
        conn.commit()
        conn.close()
        print("Database created successfully!")
    
    def add_invoice(self, invoice_data):
        """Add a new invoice to the database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        try:
            cursor.execute('''
                INSERT INTO invoices (
                    invoice_id, recipient_address, recipient_email, recipient_name,
                    amount, description, blockchain_tx_hash
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (
                invoice_data['invoice_id'],
                invoice_data['recipient_address'],
                invoice_data['recipient_email'],
                invoice_data['recipient_name'],
                invoice_data['amount'],
                invoice_data.get('description', ''),
                invoice_data.get('blockchain_tx_hash', '')
            ))
            
            conn.commit()
            print(f"Invoice {invoice_data['invoice_id']} added successfully!")
            return True
        except sqlite3.IntegrityError:
            print(f"Invoice {invoice_data['invoice_id']} already exists!")
            return False
        finally:
            conn.close()
    
    def get_pending_invoices(self):
        """Get all pending invoices"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT * FROM invoices 
            WHERE status = 'pending' 
            ORDER BY created_date DESC
        ''')
        
        invoices = cursor.fetchall()
        conn.close()
        
        return invoices
    
    def create_email_content(self, invoice):
        """Create HTML email content for invoice reminder"""
        invoice_id, recipient_address, recipient_email, recipient_name, amount, status, created_date, due_date, description, blockchain_tx_hash = invoice
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invoice Reminder</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }}
                .header {{
                    background: linear-gradient(135deg, #10B981, #059669);
                    color: white;
                    padding: 20px;
                    border-radius: 10px 10px 0 0;
                    text-align: center;
                }}
                .content {{
                    background: #f9f9f9;
                    padding: 20px;
                    border-radius: 0 0 10px 10px;
                }}
                .invoice-details {{
                    background: white;
                    padding: 15px;
                    border-radius: 8px;
                    margin: 15px 0;
                    border-left: 4px solid #10B981;
                }}
                .amount {{
                    font-size: 24px;
                    font-weight: bold;
                    color: #10B981;
                }}
                .button {{
                    display: inline-block;
                    background: #10B981;
                    color: white;
                    padding: 12px 24px;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 10px 0;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 20px;
                    color: #666;
                    font-size: 12px;
                }}
            </style>
        </head>
        <body>
            <div class="header">
                <h1>💰 Invoice Reminder</h1>
                <p>Payment Pending</p>
            </div>
            
            <div class="content">
                <h2>Hello {recipient_name or 'there'}!</h2>
                
                <p>This is a friendly reminder that you have a pending invoice payment.</p>
                
                <div class="invoice-details">
                    <h3>📋 Invoice Details</h3>
                    <p><strong>Invoice ID:</strong> {invoice_id}</p>
                    <p><strong>Amount Due:</strong> <span class="amount">${amount:,.2f}</span></p>
                    <p><strong>Recipient Address:</strong> {recipient_address}</p>
                    <p><strong>Created Date:</strong> {created_date}</p>
                    {f'<p><strong>Due Date:</strong> {due_date}</p>' if due_date else ''}
                    {f'<p><strong>Description:</strong> {description}</p>' if description else ''}
                    {f'<p><strong>Transaction Hash:</strong> {blockchain_tx_hash}</p>' if blockchain_tx_hash else ''}
                </div>
                
                <p><strong>Payment Instructions:</strong></p>
                <ul>
                    <li>Please ensure you have sufficient BNB in your wallet</li>
                    <li>Connect your wallet to the BNB Chain network</li>
                    <li>Complete the payment through the invoice portal</li>
                </ul>
                
                <a href="#" class="button">View Invoice</a>
                
                <p>If you have any questions, please don't hesitate to contact us.</p>
                
                <p>Best regards,<br>BNB Invoice Team</p>
            </div>
            
            <div class="footer">
                <p>This is an automated reminder. Please do not reply to this email.</p>
                <p>© 2024 BNB Invoice. All rights reserved.</p>
            </div>
        </body>
        </html>
        """
        
        return html_content
    
    def send_email(self, to_email, subject, html_content):
        """Send email using SMTP"""
        if not all([self.sender_email, self.sender_password, to_email]):
            print("Missing email configuration!")
            return False
        
        try:
            msg = MIMEMultipart('alternative')
            msg['From'] = self.sender_email
            msg['To'] = to_email
            msg['Subject'] = subject
            
            # Attach HTML content
            html_part = MIMEText(html_content, 'html')
            msg.attach(html_part)
            
            # Create SMTP session
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.sender_email, self.sender_password)
            
            # Send email
            text = msg.as_string()
            server.sendmail(self.sender_email, to_email, text)
            server.quit()
            
            print(f"Email sent successfully to {to_email}")
            return True
            
        except Exception as e:
            print(f"Error sending email: {str(e)}")
            return False
    
    def log_email_sent(self, invoice_id, email, email_type, status):
        """Log email sending activity"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO email_logs (invoice_id, email_sent_to, email_type, status)
            VALUES (?, ?, ?, ?)
        ''', (invoice_id, email, email_type, status))
        
        conn.commit()
        conn.close()
    
    def send_reminders(self):
        """Send reminders for all pending invoices"""
        pending_invoices = self.get_pending_invoices()
        
        if not pending_invoices:
            print("No pending invoices found!")
            return
        
        print(f"Found {len(pending_invoices)} pending invoices. Sending reminders...")
        
        for invoice in pending_invoices:
            invoice_id = invoice[1]
            recipient_email = invoice[3]
            
            if not recipient_email:
                print(f"No email address for invoice {invoice_id}")
                continue
            
            # Create email content
            html_content = self.create_email_content(invoice)
            subject = f"Payment Reminder - Invoice #{invoice_id} - ${invoice[4]:,.2f}"
            
            # Send email
            success = self.send_email(recipient_email, subject, html_content)
            
            # Log the email
            self.log_email_sent(
                invoice_id, 
                recipient_email, 
                'reminder', 
                'sent' if success else 'failed'
            )
    
    def send_daily_summary(self):
        """Send daily summary of pending invoices"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Get today's pending invoices
        today = datetime.now().date()
        cursor.execute('''
            SELECT * FROM invoices 
            WHERE status = 'pending' 
            AND DATE(created_date) = ?
        ''', (today,))
        
        today_invoices = cursor.fetchall()
        
        # Get total pending amount
        cursor.execute('''
            SELECT COUNT(*), SUM(amount) FROM invoices 
            WHERE status = 'pending'
        ''')
        
        total_count, total_amount = cursor.fetchone()
        conn.close()
        
        if not today_invoices:
            print("No invoices created today!")
            return
        
        # Create summary email
        summary_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; }}
                .summary {{ background: #f0f9ff; padding: 20px; border-radius: 10px; }}
                .highlight {{ color: #10B981; font-weight: bold; }}
            </style>
        </head>
        <body>
            <h2>📊 Daily Invoice Summary</h2>
            <div class="summary">
                <p><strong>Date:</strong> {today}</p>
                <p><strong>New Invoices Today:</strong> <span class="highlight">{len(today_invoices)}</span></p>
                <p><strong>Total Pending Invoices:</strong> <span class="highlight">{total_count}</span></p>
                <p><strong>Total Pending Amount:</strong> <span class="highlight">${total_amount:,.2f}</span></p>
            </div>
            
            <h3>Today's Invoices:</h3>
            <ul>
        """
        
        for invoice in today_invoices:
            summary_html += f"""
                <li>Invoice #{invoice[1]} - ${invoice[4]:,.2f} to {invoice[4]}</li>
            """
        
        summary_html += """
            </ul>
        </body>
        </html>
        """
        
        # Send summary to admin (you can configure this)
        admin_email = os.getenv('ADMIN_EMAIL')
        if admin_email:
            self.send_email(admin_email, f"Daily Invoice Summary - {today}", summary_html)

def main():
    """Main function to run the reminder system"""
    reminder = InvoiceReminder()
    
    # Create database if it doesn't exist
    reminder.create_database()
    
    # Example: Add a test invoice
    test_invoice = {
        'invoice_id': 'INV-001',
        'recipient_address': '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        'recipient_email': 'test@example.com',
        'recipient_name': 'John Doe',
        'amount': 1500.00,
        'description': 'Web development services',
        'blockchain_tx_hash': '0x1234567890abcdef...'
    }
    
    # Uncomment to add test invoice
    # reminder.add_invoice(test_invoice)
    
    # Send reminders
    reminder.send_reminders()
    
    # Send daily summary
    reminder.send_daily_summary()

if __name__ == "__main__":
    main()



