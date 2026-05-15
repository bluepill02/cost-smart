<?php
/**
 * Router for PHP's built-in server and Wasmer's PHP runtime.
 *
 * Static Next.js source files should not be exposed; only real public assets and
 * the WordPress preview front controller are served.
 */

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$root = __DIR__;
$candidate = $root . $path;
$file = realpath($candidate);
$rootPrefix = rtrim($root, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR;

if (
    $path !== '/'
    && $file !== false
    && is_file($file)
    && strncmp($file, $rootPrefix, strlen($rootPrefix)) === 0
    && preg_match('/\.(?:css|js|png|jpg|jpeg|gif|svg|ico|webp|txt|xml|json)$/i', $file)
) {
    return false;
}

require __DIR__ . '/index.php';
