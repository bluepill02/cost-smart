# CostSmart WordPress Conversion

This directory contains a WordPress theme that converts the Next.js CostSmart site into a WordPress site while preserving the original page inventory, URLs, titles, descriptions, blog guide copy, and calculator landing-page content.

## What is included

- `costsmart-theme/` — installable WordPress theme.
- `costsmart-theme/inc/content-manifest.php` — generated manifest containing all 133 App Router pages from `app/**/page.tsx`.
- WordPress templates for the home page, regular pages, blog posts, archives, header, and footer.
- `[costsmart_calculator]` shortcode and `assets/js/calculators.js` for WordPress-native calculator placeholders on migrated calculator pages.
- `../scripts/generate-wordpress-manifest.py` — regeneration script for keeping WordPress content in sync with Next.js page copy.

## Install

1. Copy `wordpress/costsmart-theme` to `wp-content/themes/costsmart`.
2. In WordPress Admin, activate **CostSmart**.
3. On activation, the theme seeds WordPress pages/posts from `inc/content-manifest.php` and stores the original route in `_costsmart_route` post meta.
4. Go to **Settings → Permalinks** and click **Save Changes** to flush rewrite rules.


## Wasmer Edge deployment

This repository now includes a Wasmer-ready PHP entry point at `app/index.php`, a router at `app/router.php`, `wasmer.toml`, and `app.yaml`. From the repository root you can run:

```bash
php -S localhost:8080 -t app app/router.php
wasmer run . --net
wasmer deploy
```

The local/admin preview URL is `http://127.0.0.1:8080/wp-admin/`. The Wasmer entry point renders the generated WordPress content manifest without requiring a local database; use the theme in this directory for a full database-backed WordPress dashboard.

## Run with Docker

Yes — Docker is the fastest way to run the converted WordPress site locally or on a Docker-capable VM. The Compose stack starts MySQL, WordPress, mounts this theme, runs WP-CLI, installs WordPress, activates the CostSmart theme, seeds the migrated content through the theme activation hook, and enables pretty permalinks.

```bash
cd wordpress
cp .env.example .env
docker compose up -d
```

Default local URLs:

- Site: <http://localhost:8080/>
- Admin: <http://localhost:8080/wp-admin/>
- Username: `admin`
- Password: `change-me-now`

Change `WORDPRESS_ADMIN_PASSWORD` in `.env` before sharing or deploying the container anywhere public. To reset the Docker install, run:

```bash
cd wordpress
docker compose down -v
```

> Note: Docker is suitable for local development and for deploying to a VPS/container host. Vercel does not run a persistent MySQL-backed WordPress admin container as a normal deployment target; for Vercel, use WordPress as a separate backend and deploy a headless frontend.

## Regenerate content after editing the Next.js source

Run from the repository root:

```bash
python3 scripts/generate-wordpress-manifest.py
```

Then redeploy the theme and activate it again or run `costsmart_seed_pages()` with WP-CLI to update seeded content.

## Notes

The original app uses many React client calculators. This conversion preserves every page and all available static content in WordPress, and provides WordPress-native calculator widgets for the migrated calculator entry points. Advanced visualizations from the React app can be ported individually into the shortcode JavaScript as needed.
