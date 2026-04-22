<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
echo "Application bootstrapped\n";
try {
    $files = $app->make('files');
    echo "Files found\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
