# CostSmart WordPress Application

This is a WordPress application project for the converted CostSmart site. The repository keeps the original Next.js source, plus a WordPress theme/content manifest and a Wasmer-ready PHP entry point that renders the migrated WordPress content.

## Getting Started

You can run the development server:

```bash
php -S localhost:8080 -t app app/router.php
```

For the simplest root-page check, this also works:

```bash
php -S localhost:8080 -t app
```

Open <http://127.0.0.1:8080> with your browser to see your WordPress app preview.

Local admin URL preview:

```text
http://127.0.0.1:8080/wp-admin/
```

> Note: the Wasmer/PHP entry point renders the migrated WordPress content manifest without needing a local database. For a fully editable WordPress dashboard, deploy the `wordpress/costsmart-theme` theme into a persistent WordPress installation.

## Run with Wasmer

You can also run the WordPress example using Wasmer (check out the install guide):

```bash
wasmer run . --net
```

Open <http://127.0.0.1:8080> with your browser to see your WordPress app.

## Deploy on Wasmer Edge

The easiest way to deploy your WordPress app is to use Wasmer Edge.

Live example: <https://wordpress-wasmer-examples.wasmer.app/>

Deploy to Wasmer Edge:

```bash
wasmer deploy
```

The app configuration lives in `app.yaml`, and the Wasmer PHP package configuration lives in `wasmer.toml`.

## WordPress theme and content

- `wordpress/costsmart-theme` contains the installable CostSmart WordPress theme.
- `wordpress/costsmart-theme/inc/content-manifest.php` contains the generated migrated content for all App Router pages.
- `scripts/generate-wordpress-manifest.py` regenerates the manifest from `app/**/page.tsx`.
- `wordpress/compose.yaml` can still be used for local MySQL-backed WordPress testing with Docker.
