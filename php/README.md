# All4Vets PHP Form Handler

## Overview
This PHP endpoint handles ALL form submissions from the all4vets.us website and sends email notifications to joe@all4vets.us.

## Files
- `ingest.php` - The main form processing endpoint
- `uploads/` - Directory for uploaded files (DD214, medical records, etc.)
- `uploads/.htaccess` - Security file to prevent direct access to uploads

## Installation on GoDaddy cPanel

### Step 1: Create the API Directory
1. Log into your GoDaddy account
2. Go to **Web Hosting** → **cPanel**
3. Open **File Manager**
4. Navigate to `public_html/`
5. Create a new folder called `api`

### Step 2: Upload ingest.php
1. Open the `public_html/api/` folder
2. Click **Upload** and upload the `ingest.php` file
3. Verify the file is at: `public_html/api/ingest.php`

### Step 3: Create the Uploads Directory
1. Inside `public_html/api/`, create a new folder called `uploads`
2. Upload the `.htaccess` file to `public_html/api/uploads/`
3. Set folder permissions to `755`

### Step 4: Enable Directory Privacy (IMPORTANT!)
1. In cPanel, go to **Files** → **Directory Privacy**
2. Navigate to `public_html/api/uploads`
3. Click on the folder name
4. Check **Password protect this directory**
5. Enter a name (e.g., "Protected Uploads")
6. Create a username and password for access
7. Click **Save**

### Step 5: Verify Setup
1. Visit `https://all4vets.us/api/uploads/` - should prompt for login
2. Test the endpoint by submitting a form on the website
3. Check that joe@all4vets.us receives the email notification

## Form IDs Reference

| Form ID | Form Name | File Uploads |
|---------|-----------|---------------|
| `vmeaf` | V-MEAF Application | Yes (DD214, medical records) |
| `scholarship` | Scholarship & Education Grant | No |
| `emergency` | Emergency Aid Application | No |
| `contact` | Contact Form | No |
| `get_involved` | Get Involved / Volunteer | No |

## Email Configuration

The endpoint uses PHP's built-in `mail()` function which works with GoDaddy's shared hosting.

**From Address:** `noreply@all4vets.us`
**To Address:** `joe@all4vets.us`

If emails are not being delivered:
1. Check the spam folder
2. Verify SPF records are set up for the domain
3. Consider using SMTP relay (GoDaddy's localhost:25)

## Security Features

1. **Input Sanitization**: All user input is sanitized to prevent XSS
2. **File Type Validation**: Only PDF, JPG, JPEG, PNG, GIF, DOC, DOCX allowed
3. **File Size Limit**: Maximum 10MB per file
4. **MIME Type Checking**: Files are verified by content, not just extension
5. **Safe Filename Generation**: Uploaded files are renamed with timestamps
6. **Directory Protection**: .htaccess and Directory Privacy prevent direct access

## Troubleshooting

### Forms not submitting
- Check browser console for errors
- Verify the endpoint URL is correct: `/api/ingest.php`
- Check if CORS headers are being sent

### Files not uploading
- Check PHP's `upload_max_filesize` setting in cPanel
- Verify the uploads directory has write permissions (755)
- Check file size (must be under 10MB)

### Emails not arriving
- Check spam/junk folder
- Verify SPF/DKIM records for all4vets.us
- Contact GoDaddy support about email deliverability

## Testing

To test each form, submit with the following test data:

### Contact Form
- Name: Test User
- Email: test@example.com
- Subject: General Inquiry
- Message: This is a test submission

### V-MEAF Form
- Fill all required fields
- Upload a small PDF file for DD214
- Complete all certifications

After submission, verify:
1. ✅ Email received at joe@all4vets.us
2. ✅ All fields included in email
3. ✅ File saved in uploads directory (for V-MEAF)
4. ✅ Success message shown on website
