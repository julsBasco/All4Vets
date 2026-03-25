<?php
/**
 * All4Vets Universal Form Endpoint
 * 
 * This endpoint handles ALL form submissions from all4vets.us
 * Upload to: public_html/api/ingest.php
 * 
 * Supported form_ids:
 * - vmeaf: V-MEAF Application (with file uploads)
 * - scholarship: Scholarship & Education Grant Application
 * - emergency: Emergency Aid Application
 * - contact: Contact form
 * - get_involved: Get Involved/Volunteer form
 */

// Enable error reporting for debugging (disable in production)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Use POST.',
        'form_id' => null,
        'filesSaved' => []
    ]);
    exit();
}

// Configuration
$RECIPIENT_EMAIL = 'joe@all4vets.us';
$FROM_EMAIL = 'noreply@all4vets.us';
$SITE_NAME = 'All4Vets';
$UPLOAD_DIR = __DIR__ . '/uploads/';
$DATA_DIR = __DIR__ . '/data/';
$SUBMISSIONS_FILE = $DATA_DIR . 'submissions.jsonl';

// Ensure directories exist
if (!is_dir($UPLOAD_DIR)) {
    mkdir($UPLOAD_DIR, 0755, true);
}
if (!is_dir($DATA_DIR)) {
    mkdir($DATA_DIR, 0755, true);
}

// Generate unique submission ID
$submission_id = uniqid('sub_', true);

// Get form_id
$form_id = isset($_POST['form_id']) ? sanitize($_POST['form_id']) : 'unknown';

// Get visitor information
$visitor_ip = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
$user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
$timestamp = date('Y-m-d H:i:s T');
$timestamp_iso = date('c'); // ISO 8601 format for JSON

// Collect all POST fields (sanitized)
$fields = [];
$excluded_fields = ['form_id']; // Fields to exclude from email body

foreach ($_POST as $key => $value) {
    if (!in_array($key, $excluded_fields)) {
        if (is_array($value)) {
            $fields[$key] = array_map('sanitize', $value);
        } else {
            $fields[$key] = sanitize($value);
        }
    }
}

// Handle file uploads
$savedFiles = [];
$fileErrors = [];

if (!empty($_FILES)) {
    foreach ($_FILES as $fieldName => $fileData) {
        // Handle both single and multiple file uploads
        if (is_array($fileData['name'])) {
            // Multiple files
            for ($i = 0; $i < count($fileData['name']); $i++) {
                if ($fileData['error'][$i] === UPLOAD_ERR_OK) {
                    $result = handleFileUpload([
                        'name' => $fileData['name'][$i],
                        'type' => $fileData['type'][$i],
                        'tmp_name' => $fileData['tmp_name'][$i],
                        'error' => $fileData['error'][$i],
                        'size' => $fileData['size'][$i]
                    ], $fieldName, $UPLOAD_DIR, $submission_id);
                    
                    if ($result['success']) {
                        $savedFiles[] = [
                            'field' => $fieldName,
                            'original_name' => $fileData['name'][$i],
                            'saved_name' => $result['filename'],
                            'size' => $fileData['size'][$i]
                        ];
                    } else {
                        $fileErrors[] = $result['error'];
                    }
                }
            }
        } else {
            // Single file
            if ($fileData['error'] === UPLOAD_ERR_OK) {
                $result = handleFileUpload($fileData, $fieldName, $UPLOAD_DIR, $submission_id);
                
                if ($result['success']) {
                    $savedFiles[] = [
                        'field' => $fieldName,
                        'original_name' => $fileData['name'],
                        'saved_name' => $result['filename'],
                        'size' => $fileData['size']
                    ];
                } else {
                    $fileErrors[] = $result['error'];
                }
            }
        }
    }
}

// Build email content
$emailSubject = getEmailSubject($form_id);
$emailBody = buildEmailBody($form_id, $fields, $savedFiles, $visitor_ip, $user_agent, $timestamp, $submission_id);

// Get reply-to email if provided
$replyTo = null;
if (isset($fields['email']) && filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) {
    $replyTo = $fields['email'];
} elseif (isset($fields['applicant_email']) && filter_var($fields['applicant_email'], FILTER_VALIDATE_EMAIL)) {
    $replyTo = $fields['applicant_email'];
}

// Send email
$emailSent = sendEmail($RECIPIENT_EMAIL, $emailSubject, $emailBody, $FROM_EMAIL, $replyTo);

// Save submission to JSONL file
$submissionRecord = [
    'id' => $submission_id,
    'form_id' => $form_id,
    'timestamp' => $timestamp_iso,
    'ip' => $visitor_ip,
    'user_agent' => $user_agent,
    'fields' => $fields,
    'files' => $savedFiles,
    'email_sent' => $emailSent,
    'status' => 'new'
];

$saved = saveSubmission($SUBMISSIONS_FILE, $submissionRecord);

// Return response
$response = [
    'success' => true,
    'submission_id' => $submission_id,
    'form_id' => $form_id,
    'filesSaved' => array_map(function($f) { return $f['saved_name']; }, $savedFiles),
    'message' => $emailSent 
        ? 'Form submitted successfully. Thank you!' 
        : 'Form received but email notification may have failed. We will still process your submission.',
    'timestamp' => $timestamp
];

if (!empty($fileErrors)) {
    $response['fileErrors'] = $fileErrors;
}

echo json_encode($response);
exit();

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Sanitize input to prevent XSS
 */
function sanitize($input) {
    if (is_array($input)) {
        return array_map('sanitize', $input);
    }
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

/**
 * Save submission to JSONL file
 */
function saveSubmission($file, $data) {
    $jsonLine = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n";
    return file_put_contents($file, $jsonLine, FILE_APPEND | LOCK_EX) !== false;
}

/**
 * Handle individual file upload
 */
function handleFileUpload($file, $fieldName, $uploadDir, $submissionId) {
    // Allowed file types
    $allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg', 
        'image/png',
        'image/gif',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    $allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'doc', 'docx'];
    
    // Max file size: 10MB
    $maxSize = 10 * 1024 * 1024;
    
    // Check file size
    if ($file['size'] > $maxSize) {
        return [
            'success' => false,
            'error' => "File {$file['name']} exceeds maximum size of 10MB"
        ];
    }
    
    // Get and validate extension
    $originalName = basename($file['name']);
    $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
    
    if (!in_array($extension, $allowedExtensions)) {
        return [
            'success' => false,
            'error' => "File type .{$extension} is not allowed for {$file['name']}"
        ];
    }
    
    // Verify MIME type (additional security)
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);
    
    if (!in_array($mimeType, $allowedTypes)) {
        return [
            'success' => false,
            'error' => "Invalid file type detected for {$file['name']}"
        ];
    }
    
    // Generate safe filename with submission ID for traceability
    $timestamp = date('Ymd_His');
    $randomSuffix = bin2hex(random_bytes(4));
    $safeOriginalName = preg_replace('/[^a-zA-Z0-9_\-\.]/', '_', $originalName);
    $safeOriginalName = substr($safeOriginalName, 0, 50); // Limit length
    
    $newFilename = "{$submissionId}_{$fieldName}_{$timestamp}_{$randomSuffix}_{$safeOriginalName}";
    $destination = $uploadDir . $newFilename;
    
    // Move uploaded file
    if (move_uploaded_file($file['tmp_name'], $destination)) {
        return [
            'success' => true,
            'filename' => $newFilename,
            'path' => $destination
        ];
    }
    
    return [
        'success' => false,
        'error' => "Failed to save file {$file['name']}"
    ];
}

/**
 * Get email subject based on form_id
 */
function getEmailSubject($form_id) {
    $subjects = [
        'vmeaf' => '[All4Vets] New V-MEAF Application Received',
        'scholarship' => '[All4Vets] New Scholarship/Education Grant Application',
        'emergency' => '[All4Vets] New Emergency Aid Application',
        'contact' => '[All4Vets] New Contact Form Submission',
        'get_involved' => '[All4Vets] New Volunteer/Get Involved Inquiry',
        'unknown' => '[All4Vets] New Form Submission'
    ];
    
    return $subjects[$form_id] ?? $subjects['unknown'];
}

/**
 * Build email body
 */
function buildEmailBody($form_id, $fields, $savedFiles, $ip, $userAgent, $timestamp, $submissionId) {
    $formNames = [
        'vmeaf' => 'Veterans Medical Evidence Assistance Fund (V-MEAF) Application',
        'scholarship' => 'Scholarship & Education Grant Application',
        'emergency' => 'Emergency Financial Relief Application',
        'contact' => 'Contact Form',
        'get_involved' => 'Get Involved / Volunteer Interest',
        'unknown' => 'Unknown Form'
    ];
    
    $formName = $formNames[$form_id] ?? $formNames['unknown'];
    
    $body = "============================================\n";
    $body .= "NEW FORM SUBMISSION - ALL4VETS\n";
    $body .= "============================================\n\n";
    
    $body .= "SUBMISSION ID: {$submissionId}\n";
    $body .= "FORM TYPE: {$formName}\n";
    $body .= "FORM ID: {$form_id}\n";
    $body .= "SUBMITTED: {$timestamp}\n";
    $body .= "VISITOR IP: {$ip}\n";
    $body .= "USER AGENT: {$userAgent}\n\n";
    
    $body .= "VIEW IN DASHBOARD: /api/admin/submissions.php\n\n";
    
    $body .= "--------------------------------------------\n";
    $body .= "SUBMITTED DATA\n";
    $body .= "--------------------------------------------\n\n";
    
    // Format fields nicely
    foreach ($fields as $key => $value) {
        $label = formatFieldLabel($key);
        if (is_array($value)) {
            $value = implode(', ', $value);
        }
        $body .= "{$label}:\n{$value}\n\n";
    }
    
    // Add file information
    if (!empty($savedFiles)) {
        $body .= "--------------------------------------------\n";
        $body .= "UPLOADED FILES\n";
        $body .= "--------------------------------------------\n\n";
        
        foreach ($savedFiles as $file) {
            $sizeKB = round($file['size'] / 1024, 2);
            $body .= "Field: {$file['field']}\n";
            $body .= "Original Name: {$file['original_name']}\n";
            $body .= "Saved As: {$file['saved_name']}\n";
            $body .= "Size: {$sizeKB} KB\n";
            $body .= "Location: /api/uploads/{$file['saved_name']}\n\n";
        }
        
        $body .= "NOTE: Files are stored in the protected /api/uploads/ directory.\n";
        $body .= "Access via cPanel File Manager or with Directory Privacy credentials.\n\n";
    }
    
    $body .= "============================================\n";
    $body .= "END OF SUBMISSION\n";
    $body .= "============================================\n";
    
    return $body;
}

/**
 * Format field label for email readability
 */
function formatFieldLabel($key) {
    // Convert camelCase and snake_case to readable format
    $label = preg_replace('/([a-z])([A-Z])/', '$1 $2', $key);
    $label = str_replace(['_', '-'], ' ', $label);
    $label = ucwords(strtolower($label));
    return $label;
}

/**
 * Send email using PHP mail()
 */
function sendEmail($to, $subject, $body, $from, $replyTo = null) {
    $headers = [];
    $headers[] = "From: All4Vets <{$from}>";
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-Type: text/plain; charset=UTF-8";
    $headers[] = "X-Mailer: All4Vets Form Handler";
    
    if ($replyTo) {
        $headers[] = "Reply-To: {$replyTo}";
    }
    
    $headerString = implode("\r\n", $headers);
    
    // Attempt to send email
    $sent = @mail($to, $subject, $body, $headerString);
    
    // Log for debugging (optional - comment out in production)
    // error_log("Email to {$to}: " . ($sent ? "SUCCESS" : "FAILED"));
    
    return $sent;
}
?>
