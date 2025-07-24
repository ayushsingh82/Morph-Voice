# Configuration for Invoice Reminder Script
# Copy this to .env file and update with your actual values

"""
# Email Configuration
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SENDER_EMAIL=your-email@gmail.com
SENDER_PASSWORD=your-app-password

# Database Configuration  
DB_PATH=invoices.db

# Admin Email for Daily Summaries
ADMIN_EMAIL=admin@yourcompany.com
"""

# Example configuration for Gmail
GMAIL_CONFIG = {
    'SMTP_SERVER': 'smtp.gmail.com',
    'SMTP_PORT': 587,
    'SENDER_EMAIL': 'your-email@gmail.com',
    'SENDER_PASSWORD': 'your-app-password'  # Use App Password, not regular password
}

# Example configuration for Outlook
OUTLOOK_CONFIG = {
    'SMTP_SERVER': 'smtp-mail.outlook.com',
    'SMTP_PORT': 587,
    'SENDER_EMAIL': 'your-email@outlook.com',
    'SENDER_PASSWORD': 'your-password'
} 