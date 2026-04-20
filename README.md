# cb-ghl-website

GHL (GoHighLevel) website page templates — copy-paste HTML for website pages hosted on contentbug.io.

## Pages

| Template | Path | Route |
|----------|------|-------|
| home.html | `/home` | Landing page |
| pricing.html | `/pricing` | 3-tier pricing + checkout modal |
| portfolio.html | `/portfolio` | Creator portfolio + rotating brand carousel |
| contact-details.html | `/free-trial` | Free trial Step 1/4 + GHL form embed |
| privacy-policy.html | `/privacy` | Legal — 14 sections |
| terms.html | `/terms` | Legal — 17 sections + warning boxes |

## Design system

Every template references the single-source portal design system:

```html
<link rel="stylesheet" href="https://api.contentbug.io/assets/design-system.css">
```

No local CSS. No overrides. All tokens (`--s*`, `--text-*`, `--r-*`, `--blue*`, `--txt*`) come from `cb-portal-shell/public/assets/design-system.css`.

## Deploy

Paste into GHL builder. The CSS URL is absolute, so GHL's domain doesn't matter. The inline scripts handle:
- `ws-page` + `bg-dark` + `cb-grid` body classes
- Canonical-URL → Railway-path rewrite (only active off-GHL)
- Sticky-nav IntersectionObserver

## Updating

Edit here, then re-paste into GHL. Do **not** edit in GHL first — the source lives in git.

## Parent

- Portal: [cb-portal-shell](https://github.com/contentbugvideoediting/cb-portal-shell)
- Design tokens: `public/assets/design-system.css` in portal
