# Lingyin Handpan Website

This repository contains the stable source for the Lingyin Handpan website.

- Deployment platform: Cloudflare Pages
- Production domain: https://handpanmanufacturer.com
- Main product: D Kurd / D minor 10 Note Handpan
- Custom production: OEM / ODM handpan orders, finish options, branding, packaging, and custom layouts up to 21 notes

## Project Notes

The site is a static Cloudflare Pages website with a Pages Function in `_worker.js` for product catalog routes, custom inquiry pages, SEO metadata, redirects, and generated product detail pages.

Key files:

- `_worker.js`: Cloudflare Pages Function routes and generated product pages
- `products.json`: product data source
- `styles.css`: site styles
- `sw.js`: PWA service worker
- `sitemap.xml`: production sitemap
- `images/`: product and custom finish images
- `assets/`: homepage, craft, and app icon assets

## Production Checks

Important production URLs:

- https://handpanmanufacturer.com/
- https://handpanmanufacturer.com/products
- https://handpanmanufacturer.com/products/d-kurd-10-note-nitrided-handpan
- https://handpanmanufacturer.com/craft
- https://handpanmanufacturer.com/scales
- https://handpanmanufacturer.com/specs
- https://handpanmanufacturer.com/custom
- https://handpanmanufacturer.com/inquiry

Keep `handpanmanufacturer.com` as the canonical domain for SEO, sitemap, Open Graph, and inquiry success redirects.
