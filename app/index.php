<?php
/**
 * CostSmart WordPress-on-Wasmer entry point.
 *
 * This front controller renders the migrated WordPress content manifest with the
 * same visual system as the WordPress theme. It is intentionally dependency-free
 * so `php -S localhost:8080 -t app` and `wasmer run . --net` work without a
 * separate Apache/MySQL container.
 */

declare(strict_types=1);

$manifestPath = dirname(__DIR__) . '/wordpress/costsmart-theme/inc/content-manifest.php';
$themeCssPath = dirname(__DIR__) . '/wordpress/costsmart-theme/style.css';
$calculatorJsPath = dirname(__DIR__) . '/wordpress/costsmart-theme/assets/js/calculators.js';

$pages = is_file($manifestPath) ? require $manifestPath : [];
if (!is_array($pages)) {
    $pages = [];
}

function cs_h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function cs_current_route(): string
{
    $path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
    $path = '/' . trim($path, '/');
    return $path === '/' ? '/' : $path . '/';
}

function cs_find_page(array $pages, string $route): ?array
{
    foreach ($pages as $page) {
        if (($page['route'] ?? '') === $route) {
            return $page;
        }
    }
    return null;
}

function cs_group_pages(array $pages): array
{
    $groups = [];
    foreach ($pages as $page) {
        $category = $page['category'] ?? 'Pages';
        if (in_array($category, ['Blog', 'Home'], true)) {
            continue;
        }
        $groups[$category][] = $page;
    }
    return $groups;
}

function cs_render_calculator_shortcode(string $content): string
{
    return preg_replace_callback('/\[costsmart_calculator\s+type="([^"]+)"\]/', static function (array $matches): string {
        $type = preg_replace('/[^a-z0-9-]/', '', strtolower($matches[1]));
        $title = ucwords(str_replace('-', ' ', $type));
        return '<section class="cs-calculator" data-costsmart-calculator="' . cs_h($type) . '">' .
            '<h2>' . cs_h($title) . '</h2>' .
            '<p>This Wasmer-ready WordPress preview keeps the migrated CostSmart calculator entry point available without a Node runtime.</p>' .
            '<div class="cs-calculator-grid">' .
            '<label>Amount <input type="number" data-cs-field="amount" value="500000" min="0" step="1000"></label>' .
            '<label>Rate % <input type="number" data-cs-field="rate" value="8.5" min="0" step="0.1"></label>' .
            '<label>Years <input type="number" data-cs-field="years" value="10" min="1" step="1"></label>' .
            '</div><div class="cs-result" data-cs-result aria-live="polite">Enter values to calculate.</div></section>';
    }, $content) ?? $content;
}

$route = cs_current_route();
$isAdmin = str_starts_with($route, '/wp-admin/');
$page = $isAdmin ? null : cs_find_page($pages, $route);
$groups = cs_group_pages($pages);
$themeCss = is_file($themeCssPath) ? file_get_contents($themeCssPath) : '';
$calculatorJs = is_file($calculatorJsPath) ? file_get_contents($calculatorJsPath) : '';
$title = $page['title'] ?? ($isAdmin ? 'CostSmart WordPress Admin' : 'CostSmart - Financial Calculators for the Modern Economy');
$description = $page['description'] ?? 'Financial calculators for the modern economy.';
http_response_code(($page || $route === '/' || $isAdmin) ? 200 : 404);
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= cs_h($title) ?></title>
  <meta name="description" content="<?= cs_h($description) ?>">
  <style><?= $themeCss ?></style>
</head>
<body>
<header class="cs-site-header">
  <div class="cs-container cs-header-inner">
    <a class="cs-logo" href="/"><span class="cs-logo-mark">₹</span><span>CostSmart</span></a>
    <nav class="cs-nav" aria-label="Primary navigation">
      <a href="/in/emi-calculator/">EMI</a>
      <a href="/in/income-tax-calculator/">Tax</a>
      <a href="/solar-roi/">Solar ROI</a>
      <a href="/blog/ctc-vs-in-hand/">Blog</a>
      <a href="/wp-admin/">Admin</a>
    </nav>
  </div>
</header>

<?php if ($isAdmin): ?>
  <main class="cs-page">
    <div class="cs-container">
      <article class="cs-content">
        <p class="cs-pill">Wasmer WordPress</p>
        <h1>CostSmart WordPress Admin</h1>
        <p>This Wasmer package is ready to deploy the migrated WordPress content preview. For a full editable WordPress dashboard, attach this theme to a database-backed WordPress install; the admin URL will be this same path on that deployed host.</p>
        <p><strong>Admin URL:</strong> <code><?= cs_h((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http') . '://' . ($_SERVER['HTTP_HOST'] ?? 'localhost:8080') . '/wp-admin/') ?></code></p>
      </article>
    </div>
  </main>
<?php elseif ($route === '/'): ?>
  <main>
    <section class="cs-hero">
      <div class="cs-container">
        <div class="cs-pill">✓ Trusted by 50,000+ Smart Users</div>
        <h1>Make Smarter <span class="cs-gradient">Financial Decisions</span></h1>
        <p class="cs-lead">Calculate your true costs instantly with AI-powered precision. Access 30+ verified tools for every financial moment.</p>
        <div class="cs-actions">
          <a class="cs-button cs-button-primary" href="/in/emi-calculator/">Start Calculating</a>
          <a class="cs-button" href="/blog/ctc-vs-in-hand/">Read Guides</a>
        </div>
      </div>
    </section>
    <section class="cs-section">
      <div class="cs-container cs-grid">
        <?php foreach ($groups as $category => $entries): ?>
          <article class="cs-card">
            <h2><?= cs_h((string) $category) ?></h2>
            <ul class="cs-tool-list">
              <?php foreach (array_slice($entries, 0, 12) as $entry): ?>
                <li><a href="<?= cs_h((string) $entry['route']) ?>"><?= cs_h((string) $entry['title']) ?></a></li>
              <?php endforeach; ?>
            </ul>
          </article>
        <?php endforeach; ?>
      </div>
    </section>
  </main>
<?php elseif ($page): ?>
  <main class="cs-page">
    <div class="cs-container">
      <header class="cs-page-header">
        <p class="cs-pill"><?= cs_h((string) ($page['category'] ?? 'CostSmart')) ?></p>
        <h1><?= cs_h((string) $page['title']) ?></h1>
        <p class="cs-lead"><?= cs_h((string) ($page['description'] ?? '')) ?></p>
      </header>
      <article class="cs-content">
        <?= cs_render_calculator_shortcode((string) ($page['content'] ?? '')) ?>
      </article>
    </div>
  </main>
<?php else: ?>
  <main class="cs-page">
    <div class="cs-container"><article class="cs-content"><h1>Page not found</h1><p>The requested CostSmart route was not found in the WordPress manifest.</p></article></div>
  </main>
<?php endif; ?>

<footer class="cs-site-footer">
  <div class="cs-container cs-footer-grid">
    <div><strong>CostSmart</strong><p>Financial calculators for the modern economy.</p></div>
    <div><strong>Tools</strong><br><a href="/currency/">Currency Converter</a><br><a href="/import-duty/">Import Duty</a></div>
    <div><strong>Deploy</strong><br><a href="/wp-admin/">Admin URL</a><br><a href="https://wasmer.io/templates/wordpress-starter">Wasmer WordPress</a></div>
  </div>
</footer>
<script><?= $calculatorJs ?></script>
</body>
</html>
