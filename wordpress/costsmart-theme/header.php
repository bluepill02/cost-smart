<?php
/** Header template for CostSmart. */
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="cs-site-header">
  <div class="cs-container cs-header-inner">
    <a class="cs-logo" href="<?php echo esc_url(home_url('/')); ?>" rel="home">
      <span class="cs-logo-mark">₹</span>
      <span><?php bloginfo('name'); ?></span>
    </a>
    <nav class="cs-nav" aria-label="Primary navigation">
      <?php
      if (has_nav_menu('primary')) {
          wp_nav_menu(['theme_location' => 'primary', 'container' => false, 'items_wrap' => '%3$s', 'depth' => 1]);
      } else {
          echo '<a href="' . esc_url(home_url('/in/emi-calculator/')) . '">EMI</a>';
          echo '<a href="' . esc_url(home_url('/in/income-tax-calculator/')) . '">Tax</a>';
          echo '<a href="' . esc_url(home_url('/solar-roi/')) . '">Solar ROI</a>';
          echo '<a href="' . esc_url(home_url('/blog/')) . '">Blog</a>';
      }
      ?>
    </nav>
  </div>
</header>
