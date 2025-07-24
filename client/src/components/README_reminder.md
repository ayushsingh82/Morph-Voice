# Invoice Reminder System

This Python script automatically sends email notifications for pending invoices with details about the amount, recipient, and creation date.

## Features

- 📧 **Email Notifications**: Sends beautiful HTML emails with invoice details
- 📊 **Daily Summaries**: Sends daily reports to admin
- 🔄 **Automated Reminders**: Can be scheduled to run automatically
- 📋 **Detailed Logging**: Tracks all email sending activities

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Email Settings

Create a `.env` file in the same directory with your email configuration:

```env
# Email Configuration
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SENDER_EMAIL=your-email@gmail.com
SENDER_PASSWORD=your-app-password

# Database Configuration
DB_PATH=invoices.db

# Admin Email for Daily Summaries
ADMIN_EMAIL=admin@yourcompany.com
```

### 3. Gmail Setup (Recommended)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use the generated password in your `.env` file

### 4. Run the Script

```bash
python reminder.py
```

## Usage

### Adding Invoices

```python
from reminder import InvoiceReminder

reminder = InvoiceReminder()

# Add a new invoice
invoice_data = {
    'invoice_id': 'INV-001',
    'recipient_address': '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    'recipient_email': 'client@example.com',
    'recipient_name': 'John Doe',
    'amount': 1500.00,
    'description': 'Web development services',
    'blockchain_tx_hash': '0x1234567890abcdef...'
}

reminder.add_invoice(invoice_data)
```

### Sending Reminders

```python
# Send reminders for all pending invoices
reminder.send_reminders()

# Send daily summary
reminder.send_daily_summary()
```

## Email Templates

The script sends beautifully formatted HTML emails with:

- ✅ Invoice ID and amount
- ✅ Recipient wallet address
- ✅ Creation date
- ✅ Payment instructions
- ✅ Professional styling

## Database Schema

### Invoices Table
- `id`: Primary key
- `invoice_id`: Unique invoice identifier
- `recipient_address`: Wallet address
- `recipient_email`: Client email
- `recipient_name`: Client name
- `amount`: Invoice amount
- `status`: Payment status (pending/paid)
- `created_date`: Invoice creation date
- `due_date`: Payment due date
- `description`: Invoice description
- `blockchain_tx_hash`: Transaction hash

### Email Logs Table
- `id`: Primary key
- `invoice_id`: Related invoice
- `email_sent_to`: Recipient email
- `sent_date`: Email sent date
- `email_type`: Type of email (reminder/summary)
- `status`: Email status (sent/failed)

## Scheduling

### Using Cron (Linux/Mac)

Add to crontab to run daily at 9 AM:

```bash
0 9 * * * cd /path/to/script && python reminder.py
```

### Using Task Scheduler (Windows)

1. Open Task Scheduler
2. Create Basic Task
3. Set trigger to daily at 9 AM
4. Set action to start program: `python reminder.py`

## Integration with Frontend

To integrate with your React frontend, you can:

1. **API Endpoint**: Create an API endpoint that calls the reminder script
2. **Webhook**: Trigger reminders when invoices are created
3. **Database Sync**: Sync invoice data between frontend and reminder system

### Example API Integration

```python
from flask import Flask, request
from reminder import InvoiceReminder

app = Flask(__name__)
reminder = InvoiceReminder()

@app.route('/api/invoices', methods=['POST'])
def create_invoice():
    invoice_data = request.json
    success = reminder.add_invoice(invoice_data)
    
    if success:
        # Send immediate notification
        reminder.send_reminders()
        return {'status': 'success'}
    else:
        return {'status': 'error', 'message': 'Invoice already exists'}

@app.route('/api/reminders/send', methods=['POST'])
def send_reminders():
    reminder.send_reminders()
    return {'status': 'success', 'message': 'Reminders sent'}
```

## Troubleshooting

### Common Issues

1. **Email not sending**: Check SMTP settings and app password
2. **Database errors**: Ensure write permissions in directory
3. **Import errors**: Install required packages with pip

### Debug Mode

Add debug logging:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## Security Notes

- ✅ Use App Passwords for Gmail
- ✅ Keep `.env` file secure and never commit to version control
- ✅ Regularly update dependencies
- ✅ Monitor email sending logs

## Support

For issues or questions, check the logs or contact the development team. 