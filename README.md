# SLC Premier Cleaning Co. website

A fast, mobile-first single-page site for SLC Premier Cleaning Co. (Salt Lake City, UT).

## Files
- `index.html` - all page content and SEO metadata
- `css/styles.css` - styles (brand navy #282c80 + warm gold accent, Plus Jakarta Sans)
- `js/main.js` - mobile nav, scroll effects, and the quote form handler
- `assets/` - images and favicon
- `robots.txt`, `sitemap.xml` - search engine files

## Clean URLs (no .html)
The site is a single page served from `index.html`. On any standard static host
(Netlify, Vercel, Cloudflare Pages, GitHub Pages, or Apache/Nginx), `index.html`
is served automatically at the root, so visitors only ever see:

    https://slcpremiercleaning.com/

No `.html` ever appears in the address bar. Just deploy the whole folder and point
the domain at it.

## Before you go live
1. Phone number: replace the placeholder `(801) 000-0000` in `index.html`
   (contact section + footer, and the `tel:` links).
2. Email: `hello@slcpremiercleaning.com` is set as the contact address. Create that
   inbox on the domain, or change it in `index.html` and `js/main.js`.
3. Quote form: it currently opens the visitor's email app pre-filled. To collect
   submissions automatically, create a free form at formspree.io and add
   `action="https://formspree.io/f/XXXXXXX" method="POST"` to the `<form id="quoteForm">`.
4. Photos: swap the stock images in `assets/` with real job photos when available.
5. Add the site to Google Business Profile and Google Search Console for local SEO.

## SEO included
- Location-focused title, description, and keywords for Salt Lake City
- Open Graph + Twitter cards
- Geo meta tags and `HouseCleaningService` JSON-LD structured data (services,
  service areas, reviews, hours, geo)
- `robots.txt` and `sitemap.xml`
