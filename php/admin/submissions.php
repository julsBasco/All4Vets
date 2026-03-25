<?php
/**
 * All4Vets Submissions Dashboard
 * 
 * Protected admin dashboard to view all form submissions
 * Upload to: public_html/api/admin/submissions.php
 * 
 * IMPORTANT: Protect this directory with cPanel Directory Privacy!
 */

// Configuration
$DATA_FILE = dirname(__DIR__) . '/data/submissions.jsonl';
$UPLOADS_DIR = '/api/uploads/';
$PAGE_SIZE = 25;

// Get query parameters
$page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$filter_form = isset($_GET['form']) ? $_GET['form'] : '';
$filter_status = isset($_GET['status']) ? $_GET['status'] : '';
$search = isset($_GET['search']) ? trim($_GET['search']) : '';

// Action handlers
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $action = $_POST['action'];
    $submissionId = $_POST['submission_id'] ?? '';
    
    if ($action === 'update_status' && $submissionId) {
        $newStatus = $_POST['new_status'] ?? 'new';
        updateSubmissionStatus($DATA_FILE, $submissionId, $newStatus);
        header('Location: ' . $_SERVER['REQUEST_URI']);
        exit();
    }
    
    if ($action === 'export_csv') {
        exportToCsv($DATA_FILE, $filter_form, $filter_status);
        exit();
    }
}

// Load submissions
$allSubmissions = loadSubmissions($DATA_FILE);

// Apply filters
$filteredSubmissions = array_filter($allSubmissions, function($sub) use ($filter_form, $filter_status, $search) {
    if ($filter_form && $sub['form_id'] !== $filter_form) return false;
    if ($filter_status && ($sub['status'] ?? 'new') !== $filter_status) return false;
    if ($search) {
        $searchLower = strtolower($search);
        $found = false;
        // Search in common fields
        foreach (['email', 'name', 'first_name', 'last_name', 'id'] as $field) {
            if (isset($sub['fields'][$field]) && stripos($sub['fields'][$field], $search) !== false) {
                $found = true;
                break;
            }
            if ($field === 'id' && stripos($sub['id'], $search) !== false) {
                $found = true;
                break;
            }
        }
        if (!$found) return false;
    }
    return true;
});

// Sort by timestamp descending (newest first)
usort($filteredSubmissions, function($a, $b) {
    return strtotime($b['timestamp']) - strtotime($a['timestamp']);
});

// Pagination
$totalSubmissions = count($filteredSubmissions);
$totalPages = ceil($totalSubmissions / $PAGE_SIZE);
$offset = ($page - 1) * $PAGE_SIZE;
$submissions = array_slice($filteredSubmissions, $offset, $PAGE_SIZE);

// Get unique form types for filter dropdown
$formTypes = array_unique(array_column($allSubmissions, 'form_id'));
sort($formTypes);

// Stats
$stats = [
    'total' => count($allSubmissions),
    'new' => count(array_filter($allSubmissions, fn($s) => ($s['status'] ?? 'new') === 'new')),
    'reviewed' => count(array_filter($allSubmissions, fn($s) => ($s['status'] ?? '') === 'reviewed')),
    'completed' => count(array_filter($allSubmissions, fn($s) => ($s['status'] ?? '') === 'completed')),
];

// Helper functions
function loadSubmissions($file) {
    if (!file_exists($file)) return [];
    
    $submissions = [];
    $handle = fopen($file, 'r');
    if ($handle) {
        while (($line = fgets($handle)) !== false) {
            $line = trim($line);
            if ($line) {
                $data = json_decode($line, true);
                if ($data) {
                    $submissions[] = $data;
                }
            }
        }
        fclose($handle);
    }
    return $submissions;
}

function updateSubmissionStatus($file, $submissionId, $newStatus) {
    if (!file_exists($file)) return false;
    
    $submissions = [];
    $handle = fopen($file, 'r');
    if ($handle) {
        while (($line = fgets($handle)) !== false) {
            $line = trim($line);
            if ($line) {
                $data = json_decode($line, true);
                if ($data) {
                    if ($data['id'] === $submissionId) {
                        $data['status'] = $newStatus;
                        $data['status_updated'] = date('c');
                    }
                    $submissions[] = $data;
                }
            }
        }
        fclose($handle);
    }
    
    // Rewrite file
    $content = '';
    foreach ($submissions as $sub) {
        $content .= json_encode($sub, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n";
    }
    return file_put_contents($file, $content, LOCK_EX) !== false;
}

function exportToCsv($file, $filterForm, $filterStatus) {
    $submissions = loadSubmissions($file);
    
    // Apply filters
    if ($filterForm) {
        $submissions = array_filter($submissions, fn($s) => $s['form_id'] === $filterForm);
    }
    if ($filterStatus) {
        $submissions = array_filter($submissions, fn($s) => ($s['status'] ?? 'new') === $filterStatus);
    }
    
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="all4vets_submissions_' . date('Y-m-d') . '.csv"');
    
    $output = fopen('php://output', 'w');
    
    // Header row
    fputcsv($output, ['ID', 'Form Type', 'Status', 'Timestamp', 'Email', 'Name', 'Files', 'Email Sent']);
    
    foreach ($submissions as $sub) {
        $email = $sub['fields']['email'] ?? '';
        $name = trim(($sub['fields']['first_name'] ?? '') . ' ' . ($sub['fields']['last_name'] ?? $sub['fields']['name'] ?? ''));
        $files = count($sub['files'] ?? []);
        
        fputcsv($output, [
            $sub['id'],
            $sub['form_id'],
            $sub['status'] ?? 'new',
            $sub['timestamp'],
            $email,
            $name,
            $files,
            $sub['email_sent'] ? 'Yes' : 'No'
        ]);
    }
    
    fclose($output);
}

function getStatusBadgeClass($status) {
    switch ($status) {
        case 'new': return 'bg-blue-100 text-blue-800';
        case 'reviewed': return 'bg-yellow-100 text-yellow-800';
        case 'completed': return 'bg-green-100 text-green-800';
        case 'rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

function getFormBadgeClass($formId) {
    switch ($formId) {
        case 'vmeaf': return 'bg-purple-100 text-purple-800';
        case 'scholarship': return 'bg-indigo-100 text-indigo-800';
        case 'emergency': return 'bg-red-100 text-red-800';
        case 'contact': return 'bg-teal-100 text-teal-800';
        case 'get_involved': return 'bg-orange-100 text-orange-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

function formatFormName($formId) {
    $names = [
        'vmeaf' => 'V-MEAF Application',
        'scholarship' => 'Scholarship',
        'emergency' => 'Emergency Aid',
        'contact' => 'Contact',
        'get_involved' => 'Get Involved'
    ];
    return $names[$formId] ?? ucfirst($formId);
}

function e($str) {
    return htmlspecialchars($str ?? '', ENT_QUOTES, 'UTF-8');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All4Vets - Submissions Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .submission-details { display: none; }
        .submission-details.active { display: table-row; }
    </style>
</head>
<body class="bg-gray-100 min-h-screen">
    <!-- Header -->
    <header class="bg-[#0B1D39] text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4 py-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold">All4Vets Submissions Dashboard</h1>
                    <p class="text-gray-300 text-sm mt-1">Manage and review form submissions</p>
                </div>
                <div class="text-right">
                    <p class="text-sm text-gray-300">Logged in as Admin</p>
                    <p class="text-xs text-gray-400"><?php echo date('F j, Y g:i A'); ?></p>
                </div>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-xl shadow p-6">
                <div class="text-3xl font-bold text-[#0B1D39]"><?php echo $stats['total']; ?></div>
                <div class="text-gray-500 text-sm">Total Submissions</div>
            </div>
            <div class="bg-white rounded-xl shadow p-6">
                <div class="text-3xl font-bold text-blue-600"><?php echo $stats['new']; ?></div>
                <div class="text-gray-500 text-sm">New / Pending</div>
            </div>
            <div class="bg-white rounded-xl shadow p-6">
                <div class="text-3xl font-bold text-yellow-600"><?php echo $stats['reviewed']; ?></div>
                <div class="text-gray-500 text-sm">Under Review</div>
            </div>
            <div class="bg-white rounded-xl shadow p-6">
                <div class="text-3xl font-bold text-green-600"><?php echo $stats['completed']; ?></div>
                <div class="text-gray-500 text-sm">Completed</div>
            </div>
        </div>

        <!-- Filters -->
        <div class="bg-white rounded-xl shadow p-6 mb-8">
            <form method="GET" class="flex flex-wrap gap-4 items-end">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Form Type</label>
                    <select name="form" class="border border-gray-300 rounded-lg px-3 py-2 min-w-[150px]">
                        <option value="">All Forms</option>
                        <?php foreach ($formTypes as $type): ?>
                        <option value="<?php echo e($type); ?>" <?php echo $filter_form === $type ? 'selected' : ''; ?>>
                            <?php echo e(formatFormName($type)); ?>
                        </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select name="status" class="border border-gray-300 rounded-lg px-3 py-2 min-w-[150px]">
                        <option value="">All Status</option>
                        <option value="new" <?php echo $filter_status === 'new' ? 'selected' : ''; ?>>New</option>
                        <option value="reviewed" <?php echo $filter_status === 'reviewed' ? 'selected' : ''; ?>>Reviewed</option>
                        <option value="completed" <?php echo $filter_status === 'completed' ? 'selected' : ''; ?>>Completed</option>
                        <option value="rejected" <?php echo $filter_status === 'rejected' ? 'selected' : ''; ?>>Rejected</option>
                    </select>
                </div>
                <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
                    <input type="text" name="search" value="<?php echo e($search); ?>" 
                           placeholder="Search by email, name, or ID..."
                           class="border border-gray-300 rounded-lg px-3 py-2 w-full max-w-md">
                </div>
                <div class="flex gap-2">
                    <button type="submit" class="bg-[#0B1D39] text-white px-4 py-2 rounded-lg hover:bg-[#1E4F91] transition">
                        Filter
                    </button>
                    <a href="?" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                        Reset
                    </a>
                </div>
            </form>
            
            <!-- Export -->
            <div class="mt-4 pt-4 border-t border-gray-200">
                <form method="POST" class="inline">
                    <input type="hidden" name="action" value="export_csv">
                    <button type="submit" class="text-sm text-[#0B1D39] hover:underline">
                        📥 Export to CSV
                    </button>
                </form>
            </div>
        </div>

        <!-- Submissions Table -->
        <div class="bg-white rounded-xl shadow overflow-hidden">
            <?php if (empty($submissions)): ?>
            <div class="p-12 text-center text-gray-500">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p class="mt-4 text-lg">No submissions found</p>
                <p class="text-sm">Submissions will appear here when forms are submitted on the website.</p>
            </div>
            <?php else: ?>
            <table class="w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Form</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Files</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <?php foreach ($submissions as $sub): ?>
                    <?php 
                        $status = $sub['status'] ?? 'new';
                        $email = $sub['fields']['email'] ?? '';
                        $name = trim(($sub['fields']['first_name'] ?? '') . ' ' . ($sub['fields']['last_name'] ?? $sub['fields']['name'] ?? ''));
                        $fileCount = count($sub['files'] ?? []);
                        $subId = $sub['id'];
                    ?>
                    <tr class="hover:bg-gray-50 cursor-pointer" onclick="toggleDetails('<?php echo e($subId); ?>')">
                        <td class="px-6 py-4">
                            <div class="text-sm font-medium text-gray-900"><?php echo e(substr($subId, 0, 20)); ?>...</div>
                            <div class="text-xs text-gray-500"><?php echo date('M j, Y g:i A', strtotime($sub['timestamp'])); ?></div>
                        </td>
                        <td class="px-6 py-4">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium <?php echo getFormBadgeClass($sub['form_id']); ?>">
                                <?php echo e(formatFormName($sub['form_id'])); ?>
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <div class="text-sm text-gray-900"><?php echo e($name ?: 'N/A'); ?></div>
                            <div class="text-xs text-gray-500"><?php echo e($email); ?></div>
                        </td>
                        <td class="px-6 py-4">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium <?php echo getStatusBadgeClass($status); ?>">
                                <?php echo ucfirst(e($status)); ?>
                            </span>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-500">
                            <?php if ($fileCount > 0): ?>
                            <span class="text-blue-600">📎 <?php echo $fileCount; ?> file(s)</span>
                            <?php else: ?>
                            <span class="text-gray-400">No files</span>
                            <?php endif; ?>
                        </td>
                        <td class="px-6 py-4 text-sm">
                            <button onclick="event.stopPropagation(); toggleDetails('<?php echo e($subId); ?>')" 
                                    class="text-[#0B1D39] hover:underline">View</button>
                        </td>
                    </tr>
                    <!-- Expandable Details Row -->
                    <tr class="submission-details bg-gray-50" id="details-<?php echo e($subId); ?>">
                        <td colspan="6" class="px-6 py-4">
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <!-- Submission Info -->
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-3">Submission Details</h4>
                                    <dl class="space-y-2 text-sm">
                                        <div class="flex">
                                            <dt class="w-32 font-medium text-gray-500">ID:</dt>
                                            <dd class="text-gray-900 font-mono text-xs"><?php echo e($subId); ?></dd>
                                        </div>
                                        <div class="flex">
                                            <dt class="w-32 font-medium text-gray-500">IP Address:</dt>
                                            <dd class="text-gray-900"><?php echo e($sub['ip']); ?></dd>
                                        </div>
                                        <div class="flex">
                                            <dt class="w-32 font-medium text-gray-500">Email Sent:</dt>
                                            <dd class="text-gray-900"><?php echo $sub['email_sent'] ? '✅ Yes' : '❌ No'; ?></dd>
                                        </div>
                                    </dl>
                                    
                                    <!-- Status Update -->
                                    <div class="mt-4 p-3 bg-white rounded-lg border">
                                        <form method="POST" class="flex items-center gap-3">
                                            <input type="hidden" name="action" value="update_status">
                                            <input type="hidden" name="submission_id" value="<?php echo e($subId); ?>">
                                            <label class="text-sm font-medium text-gray-700">Update Status:</label>
                                            <select name="new_status" class="border border-gray-300 rounded px-2 py-1 text-sm">
                                                <option value="new" <?php echo $status === 'new' ? 'selected' : ''; ?>>New</option>
                                                <option value="reviewed" <?php echo $status === 'reviewed' ? 'selected' : ''; ?>>Reviewed</option>
                                                <option value="completed" <?php echo $status === 'completed' ? 'selected' : ''; ?>>Completed</option>
                                                <option value="rejected" <?php echo $status === 'rejected' ? 'selected' : ''; ?>>Rejected</option>
                                            </select>
                                            <button type="submit" class="bg-[#0B1D39] text-white px-3 py-1 rounded text-sm hover:bg-[#1E4F91]">
                                                Save
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                
                                <!-- Form Fields -->
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-3">Form Data</h4>
                                    <div class="bg-white rounded-lg border p-4 max-h-64 overflow-y-auto">
                                        <dl class="space-y-2 text-sm">
                                            <?php foreach ($sub['fields'] as $key => $value): ?>
                                            <div>
                                                <dt class="font-medium text-gray-500"><?php echo e(ucwords(str_replace('_', ' ', $key))); ?></dt>
                                                <dd class="text-gray-900 mt-0.5">
                                                    <?php 
                                                    if (is_array($value)) {
                                                        echo e(implode(', ', $value));
                                                    } else {
                                                        echo nl2br(e($value));
                                                    }
                                                    ?>
                                                </dd>
                                            </div>
                                            <?php endforeach; ?>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Files Section -->
                            <?php if (!empty($sub['files'])): ?>
                            <div class="mt-4">
                                <h4 class="font-semibold text-gray-900 mb-3">Uploaded Files</h4>
                                <div class="bg-white rounded-lg border p-4">
                                    <ul class="space-y-2">
                                        <?php foreach ($sub['files'] as $file): ?>
                                        <li class="flex items-center justify-between text-sm">
                                            <div>
                                                <span class="font-medium"><?php echo e($file['original_name']); ?></span>
                                                <span class="text-gray-500 ml-2">(<?php echo round($file['size'] / 1024, 1); ?> KB)</span>
                                            </div>
                                            <span class="text-xs text-gray-400 font-mono"><?php echo e($file['saved_name']); ?></span>
                                        </li>
                                        <?php endforeach; ?>
                                    </ul>
                                    <p class="text-xs text-gray-500 mt-3">
                                        Files are stored in <code class="bg-gray-100 px-1 rounded">/api/uploads/</code> (protected directory)
                                    </p>
                                </div>
                            </div>
                            <?php endif; ?>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            
            <!-- Pagination -->
            <?php if ($totalPages > 1): ?>
            <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div class="text-sm text-gray-500">
                    Showing <?php echo $offset + 1; ?> to <?php echo min($offset + $PAGE_SIZE, $totalSubmissions); ?> of <?php echo $totalSubmissions; ?> submissions
                </div>
                <div class="flex gap-2">
                    <?php if ($page > 1): ?>
                    <a href="?page=<?php echo $page - 1; ?>&form=<?php echo e($filter_form); ?>&status=<?php echo e($filter_status); ?>&search=<?php echo e($search); ?>" 
                       class="px-3 py-1 border rounded text-sm hover:bg-gray-100">Previous</a>
                    <?php endif; ?>
                    
                    <?php for ($i = max(1, $page - 2); $i <= min($totalPages, $page + 2); $i++): ?>
                    <a href="?page=<?php echo $i; ?>&form=<?php echo e($filter_form); ?>&status=<?php echo e($filter_status); ?>&search=<?php echo e($search); ?>" 
                       class="px-3 py-1 border rounded text-sm <?php echo $i === $page ? 'bg-[#0B1D39] text-white' : 'hover:bg-gray-100'; ?>">
                        <?php echo $i; ?>
                    </a>
                    <?php endfor; ?>
                    
                    <?php if ($page < $totalPages): ?>
                    <a href="?page=<?php echo $page + 1; ?>&form=<?php echo e($filter_form); ?>&status=<?php echo e($filter_status); ?>&search=<?php echo e($search); ?>" 
                       class="px-3 py-1 border rounded text-sm hover:bg-gray-100">Next</a>
                    <?php endif; ?>
                </div>
            </div>
            <?php endif; ?>
            <?php endif; ?>
        </div>
    </main>

    <footer class="max-w-7xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
        All4Vets Submissions Dashboard &copy; <?php echo date('Y'); ?>
    </footer>

    <script>
    function toggleDetails(id) {
        const row = document.getElementById('details-' + id);
        if (row) {
            row.classList.toggle('active');
        }
    }
    </script>
</body>
</html>
