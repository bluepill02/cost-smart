<?php /** Footer template for CostSmart. */ ?>
<footer class="cs-site-footer">
  <div class="cs-container cs-footer-grid">
    <div>
      <strong><?php bloginfo('name'); ?></strong>
      <p><?php bloginfo('description'); ?></p>
    </div>
    <div>
      <strong>Tools</strong><br>
      <a href="<?php echo esc_url(home_url('/currency/')); ?>">Currency Converter</a><br>
      <a href="<?php echo esc_url(home_url('/import-duty/')); ?>">Import Duty</a><br>
      <a href="<?php echo esc_url(home_url('/retirement-calculator/')); ?>">Retirement</a>
    </div>
    <div>
      <strong>Company</strong><br>
      <a href="<?php echo esc_url(home_url('/about/')); ?>">About</a><br>
      <a href="<?php echo esc_url(home_url('/privacy/')); ?>">Privacy</a><br>
      <a href="<?php echo esc_url(home_url('/terms/')); ?>">Terms</a>
    </div>
  </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
