<?php get_header(); ?>
<main class="cs-page">
  <div class="cs-container">
    <header class="cs-page-header"><h1><?php single_post_title(); ?></h1></header>
    <div class="cs-grid">
      <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <article class="cs-card">
          <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
          <p><?php echo esc_html(get_the_excerpt()); ?></p>
        </article>
      <?php endwhile; else : ?>
        <p>No CostSmart content found.</p>
      <?php endif; ?>
    </div>
  </div>
</main>
<?php get_footer(); ?>
