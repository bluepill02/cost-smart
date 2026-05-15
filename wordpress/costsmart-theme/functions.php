<?php
/**
 * CostSmart WordPress theme bootstrap.
 */

if (!defined('ABSPATH')) {
    exit;
}

define('COSTSMART_THEME_VERSION', '1.0.0');

function costsmart_setup(): void
{
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
    register_nav_menus([
        'primary' => __('Primary Navigation', 'costsmart'),
    ]);
}
add_action('after_setup_theme', 'costsmart_setup');

function costsmart_assets(): void
{
    wp_enqueue_style('costsmart-style', get_stylesheet_uri(), [], COSTSMART_THEME_VERSION);
    wp_enqueue_script('costsmart-calculators', get_template_directory_uri() . '/assets/js/calculators.js', [], COSTSMART_THEME_VERSION, true);
}
add_action('wp_enqueue_scripts', 'costsmart_assets');

function costsmart_manifest(): array
{
    $manifest = get_template_directory() . '/inc/content-manifest.php';
    if (!file_exists($manifest)) {
        return [];
    }
    $pages = require $manifest;
    return is_array($pages) ? $pages : [];
}

function costsmart_find_manifest_entry(?int $post_id = null): ?array
{
    $post_id = $post_id ?: get_queried_object_id();
    $route = get_post_meta($post_id, '_costsmart_route', true);
    if (!$route) {
        return null;
    }
    foreach (costsmart_manifest() as $entry) {
        if (($entry['route'] ?? '') === $route) {
            return $entry;
        }
    }
    return null;
}

function costsmart_calculator_shortcode(array $atts): string
{
    $atts = shortcode_atts([
        'type' => 'emi-calculator',
    ], $atts, 'costsmart_calculator');

    $type = sanitize_title((string) $atts['type']);
    $title = ucwords(str_replace('-', ' ', $type));

    ob_start();
    ?>
    <section class="cs-calculator" data-costsmart-calculator="<?php echo esc_attr($type); ?>">
      <h2><?php echo esc_html($title); ?></h2>
      <p>This WordPress-native widget keeps the CostSmart calculator entry point on the migrated page. Adjust values to estimate the result instantly.</p>
      <div class="cs-calculator-grid">
        <label>Amount
          <input type="number" data-cs-field="amount" value="500000" min="0" step="1000">
        </label>
        <label>Rate %
          <input type="number" data-cs-field="rate" value="8.5" min="0" step="0.1">
        </label>
        <label>Years
          <input type="number" data-cs-field="years" value="10" min="1" step="1">
        </label>
      </div>
      <div class="cs-result" data-cs-result aria-live="polite">Enter values to calculate.</div>
    </section>
    <?php
    return (string) ob_get_clean();
}
add_shortcode('costsmart_calculator', 'costsmart_calculator_shortcode');

function costsmart_seed_pages(): void
{
    foreach (costsmart_manifest() as $entry) {
        $route = $entry['route'] ?? '';
        if (!$route) {
            continue;
        }

        $existing = get_posts([
            'post_type' => ['page', 'post'],
            'post_status' => 'any',
            'meta_key' => '_costsmart_route',
            'meta_value' => $route,
            'fields' => 'ids',
            'numberposts' => 1,
        ]);

        $postarr = [
            'post_title' => wp_strip_all_tags((string) ($entry['title'] ?? 'CostSmart')),
            'post_name' => sanitize_title((string) ($entry['slug'] ?? 'costsmart-page')),
            'post_excerpt' => wp_strip_all_tags((string) ($entry['description'] ?? '')),
            'post_content' => (string) ($entry['content'] ?? ''),
            'post_status' => 'publish',
            'post_type' => (($entry['type'] ?? 'page') === 'post') ? 'post' : 'page',
        ];

        if ($existing) {
            $postarr['ID'] = (int) $existing[0];
            $post_id = wp_update_post(wp_slash($postarr), true);
        } else {
            $post_id = wp_insert_post(wp_slash($postarr), true);
        }

        if (!is_wp_error($post_id)) {
            update_post_meta((int) $post_id, '_costsmart_route', $route);
            update_post_meta((int) $post_id, '_costsmart_category', (string) ($entry['category'] ?? ''));
            if (($entry['type'] ?? 'page') === 'post' && !empty($entry['category'])) {
                wp_set_post_categories((int) $post_id, [wp_create_category((string) $entry['category'])]);
            }
        }
    }
}
add_action('after_switch_theme', 'costsmart_seed_pages');

function costsmart_rewrite_routes(): void
{
    foreach (costsmart_manifest() as $entry) {
        $route = trim((string) ($entry['route'] ?? ''), '/');
        if ($route !== '' && !str_contains($route, '[')) {
            $query_var = (($entry['type'] ?? 'page') === 'post') ? 'name' : 'pagename';
            add_rewrite_rule('^' . preg_quote($route, '#') . '/?$', 'index.php?' . $query_var . '=' . sanitize_title((string) ($entry['slug'] ?? $route)), 'top');
        }
    }
}
add_action('init', 'costsmart_rewrite_routes');
