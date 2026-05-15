<?php get_header(); ?>
<main>
  <section class="cs-hero">
    <div class="cs-container">
      <div class="cs-pill">✓ Trusted by 50,000+ Smart Users</div>
      <h1>Make Smarter <span class="cs-gradient">Financial Decisions</span></h1>
      <p class="cs-lead">Calculate your true costs instantly with AI-powered precision. Access 30+ verified tools for every financial moment.</p>
      <div class="cs-actions">
        <a class="cs-button cs-button-primary" href="<?php echo esc_url(home_url('/in/emi-calculator/')); ?>">Start Calculating</a>
        <a class="cs-button" href="<?php echo esc_url(home_url('/blog/')); ?>">Read Guides</a>
      </div>
    </div>
  </section>
  <section class="cs-section">
    <div class="cs-container cs-grid">
      <?php
      $groups = [];
      foreach (costsmart_manifest() as $entry) {
          $category = $entry['category'] ?? 'Pages';
          if (in_array($category, ['Blog', 'Home'], true)) {
              continue;
          }
          $groups[$category][] = $entry;
      }
      foreach ($groups as $category => $entries) :
      ?>
        <article class="cs-card">
          <h2><?php echo esc_html($category); ?></h2>
          <ul class="cs-tool-list">
            <?php foreach (array_slice($entries, 0, 12) as $entry) : ?>
              <li><a href="<?php echo esc_url(home_url($entry['route'])); ?>"><?php echo esc_html($entry['title']); ?></a></li>
            <?php endforeach; ?>
          </ul>
        </article>
      <?php endforeach; ?>
    </div>
  </section>
</main>
<?php get_footer(); ?>
