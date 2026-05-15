<?php
/**
 * Router for PHP's built-in server and Wasmer's PHP runtime.
 *
 * Static Next.js source files should not be exposed; only real public assets and
 * the WordPress preview front controller are served.
 */

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$file = __DIR__ . $path;

if ($path !== '/' && is_file($file) && preg_match('/\.(?:css|js|png|jpg|jpeg|gif|svg|ico|webp|txt|xml|json)$/i', $file)) {
    return false;
}

require __DIR__ . '/index.php';
