# All4Vets PHP Form Handler

## Overview
This PHP system handles ALL form submissions from the all4vets.us website:
- Saves all submissions to a JSONL database file
- Sends email notifications to joe@all4vets.us
- Provides an admin dashboard to view/manage submissions
- Handles file uploads securely

## Directory Structure
```
/api/
├── ingest.php              # Main form processing endpoint
├── admin/
│   ├── submissions.php     # Admin dashboard (PROTECTED)
│   └── .htaccess           # Security rules
├── data/
│   ├── submissions.jsonl   # Submissions database (auto-created)
│   └── .htaccess           # Deny all access
└── uploads/
    └── .htaccess           # Deny direct access
```

## Installation on GoDaddy cPanel

### Step 1: Create the Directory Structure
1. Log into your GoDaddy account → **Web Hosting** → **cPanel**
2. Open **File Manager**
3. Navigate to `public_html/`
4. Create these folders:
   - `public_html/api/`
   - `public_html/api/admin/`
   - `public_html/api/data/`
   - `public_html/api/uploads/`

### Step 2: Upload Files
Upload files to their respective locations:

| Local File | Upload To |
|------------|-----------|
| `ingest.php` | `public_html/api/ingest.php` |
| `admin/submissions.php` | `public_html/api/admin/submissions.php` |
| `admin/.htaccess` | `public_html/api/admin/.htaccess` |
| `data/.htaccess` | `public_html/api/data/.htaccess` |
| `uploads/.htaccess` | `public_html/api/uploads/.htaccess` |

### Step 3: Set Directory Permissions
Set folder permissions to `755`:
- `/api/data/` - needs write permission for submissions
- `/api/uploads/` - needs write permission for file uploads

### Step 4: Enable Directory Privacy (CRITICAL!)

**Protect `/api/admin/` directory:**
1. In cPanel, go to **Files** → **Directory Privacy**
2. Navigate to `public_html/api/admin`
3. Click the folder name
4. Check **"Password protect this directory"**
5. Enter name: `All4Vets Admin`
6. Create username and password
7. Click **Save**

**Protect `/api/uploads/` directory:**
1. Navigate to `public_html/api/uploads`
2. Repeat steps 3-7 above
3. Name it: `Protected Uploads`

### Step 5: Verify Setup

1. **Test the endpoint:**
   - Submit a form on the website
   - Check that joe@all4vets.us receives an email

2. **Test admin dashboard:**
   - Visit `https://all4vets.us/api/admin/submissions.php`
   - Should prompt for username/password
   - After login, should show the submissions dashboard

3. **Test data protection:**
   - Visit `https://all4vets.us/api/data/submissions.jsonl`
   - Should return 403 Forbidden

4. **Test uploads protection:**
   - Visit `https://all4vets.us/api/uploads/`
   - Should prompt for login credentials

---

## Form IDs Reference

| Form ID | Form Name | File Uploads |
|---------|-----------|--------------|
| `vmeaf` | V-MEAF Application | ✅ Yes |
| `scholarship` | Scholarship & Education Grant | No |
| `emergency` | Emergency Aid Application | No |
| `contact` | Contact Form | No |
| `get_involved` | Get Involved / Volunteer | No |

---

## Admin Dashboard Features

Access at: `https://all4vets.us/api/admin/submissions.php`

### Features:
- **View all submissions** with expandable details
- **Filter by form type** (V-MEAF, Contact, etc.)
- **Filter by status** (New, Reviewed, Completed, Rejected)
- **Search** by email, name, or submission ID
- **Update status** for each submission
- **Export to CSV** for reporting
- **View uploaded files** (stored in protected directory)

### Status Workflow:
1. **New** - Just submitted, needs review
2. **Reviewed** - Being processed
3. **Completed** - Fully processed/approved
4. **Rejected** - Denied or spam

---

## Data Storage

### Submissions File: `/api/data/submissions.jsonl`
- JSON Lines format (one JSON object per line)
- Each submission contains:
  - `id` - Unique submission ID
  - `form_id` - Type of form
  - `timestamp` - ISO 8601 timestamp
  - `ip` - Visitor IP address
  - `fields` - All form field data
  - `files` - Array of uploaded files
  - `email_sent` - Whether notification was sent
  - `status` - Current status

### Example Entry:
```json
{"id":"sub_668012345.12345678","form_id":"contact","timestamp":"2025-03-23T12:00:00-04:00","ip":"192.168.1.1","fields":{"name":"John Doe","email":"john@example.com","subject":"general","message":"Hello!"},"files":[],"email_sent":true,"status":"new"}
```

---

## Security Features

1. **Input Sanitization** - All user input is sanitized
2. **File Type Validation** - Only PDF, JPG, PNG, GIF, DOC, DOCX allowed
3. **File Size Limit** - Maximum 10MB per file
4. **MIME Type Verification** - Files verified by content
5. **Directory Privacy** - Admin & uploads protected by password
6. **.htaccess Rules** - Deny direct access to data files
7. **Safe Filenames** - Uploaded files renamed with timestamps

---

## Troubleshooting

### Forms not submitting
- Check browser console for errors
- Verify endpoint URL: `/api/ingest.php`
- Check CORS headers are being sent

### Files not uploading
- Check `upload_max_filesize` in cPanel PHP settings
- Verify `/api/uploads/` has write permissions (755)
- Check file size (must be under 10MB)

### Emails not arriving
- Check spam/junk folder
- Verify SPF/DKIM records for all4vets.us
- Contact GoDaddy support

### Dashboard not loading
- Verify Directory Privacy is enabled
- Check correct credentials
- Ensure `submissions.jsonl` exists (created on first submission)

### Cannot access files in uploads
- Log in with Directory Privacy credentials
- Or access via cPanel File Manager

---

## Email Configuration

- **From:** `noreply@all4vets.us`
- **To:** `joe@all4vets.us`
- **Reply-To:** Submitter's email (if provided)

Uses PHP `mail()` function which works with GoDaddy shared hosting.

---

## Backup Recommendations

1. **Regular backups** of `/api/data/submissions.jsonl`
2. **Regular backups** of `/api/uploads/` directory
3. GoDaddy provides automatic backups in cPanel

---

## Support

For technical issues:
- Check GoDaddy cPanel error logs
- Review PHP error logs
- Contact GoDaddy support for server-side issues
