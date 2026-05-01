# cb-website

All ContentBug public-facing marketing website pages — one repo, one source of truth.

## Contents
- `public/website/` — Railway-hosted funnel pages: qualification, booking, checkout, confirmation (+ their CSS, fonts, assets, styles JS)
- `public/ghl/pages/` — Copy-paste HTML destined for GHL: home, pricing, portfolio, privacy-policy, terms, contact-details
- `public/ghl/website-library.html` — Library index page

## Live preview
All files are served live by `cb-studio` at **https://api.contentbug.io**:
- `/website/qualification.html` · `/website/booking.html` · `/website/checkout.html` · `/website/confirmation.html`
- `/home.html` · `/pricing.html` · `/portfolio.html` · `/privacy-policy.html` · `/terms.html` · `/contact-details.html`
- `/website-library.html`

Design system (CSS + fonts) is loaded from `api.contentbug.io/assets/design-system.css` — shared with the portal.

## How it's wired
`cb-studio`'s Dockerfile clones this repo at build time into `public/` so all pages ship with the shell container. Edit here → push → shell redeploys → pages update live.
