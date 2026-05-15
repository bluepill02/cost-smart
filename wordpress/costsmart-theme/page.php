<?php get_header(); ?>
<main class="cs-page">
  <div class="cs-container">
    <?php while (have_posts()) : the_post(); ?>
      <header class="cs-page-header">
        <p class="cs-pill"><?php echo esc_html(get_post_meta(get_the_ID(), '_costsmart_category', true) ?: 'CostSmart'); ?></p>
        <h1><?php the_title(); ?></h1>
        <?php if (has_excerpt()) : ?><p class="cs-lead"><?php echo esc_html(get_the_excerpt()); ?></p><?php endif; ?>
      </header>
      <article <?php post_class('cs-content'); ?>>
        <?php the_content(); ?>
      </article>
    <?php endwhile; ?>
  </div>
</main>
<?php get_footer(); ?>
