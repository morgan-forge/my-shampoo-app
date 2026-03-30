You are building a single-file HTML5 PWA called "Lather" — a personal shampoo inventory tracker optimised for iPhone Safari home screen use.

## Project structure
Create exactly two files:
1. `index.html` — the entire app (HTML + CSS + JS in one file)
2. `manifest.json` — PWA web app manifest

## Firebase setup
Use Firebase v10+ via CDN (compat mode is fine). The user will paste their own Firebase config object — leave a clearly marked placeholder comment for it:
// PASTE YOUR FIREBASE CONFIG HERE

Enable Firestore only. No authentication — this is a personal single-user app. Set Firestore reads/writes to open (the user will manage rules separately).

## Data model
Firestore collection: `shampoos`
Each document:
- `name` (string) — product name e.g. "Olaplex No.4"
- `brand` (string) — brand name
- `totalMl` (number) — full bottle size in ml
- `remainingMl` (number) — current estimated amount remaining
- `lastUpdated` (timestamp)
- `notes` (string, optional) — e.g. hair type, scent notes

## Core features
1. **Product list view** — cards showing each shampoo with a visual fill-level indicator (like a bottle fill bar, percentage, or similar creative treatment)
2. **Add product** — form to add a new shampoo with name, brand, total ml, starting amount
3. **Update level** — tap a product to log current remaining amount (quick-entry, not a full edit form — optimise for one-handed iPhone use)
4. **Delete product** — swipe or long-press to delete, with confirmation
5. **Low stock indicator** — visually flag any product below 20% remaining
6. **Firestore real-time listener** — use `onSnapshot` so the UI updates live

## PWA requirements
- `manifest.json` with `display: standalone`, `theme_color`, `background_color`, `start_url: "."`, and icon placeholders (192×192 and 512×512 paths — user will supply actual icon files)
- Register a minimal service worker inline (in a `<script>` tag using a Blob URL pattern) that caches the app shell for offline use
- `<meta name="apple-mobile-web-app-capable" content="yes">`
- `<meta name="apple-mobile-web-app-status-bar-style" content="default">`
- `<link rel="apple-touch-icon" href="icon-192.png">`
- Viewport meta tag optimised for iPhone

## UI & design requirements
- Mobile-first, single column layout
- Minimum touch target size 44×44px throughout
- No frameworks (no React, no Vue) — vanilla JS only
- No npm, no build step — must run by opening index.html directly or via GitHub Pages
- Clean, tactile aesthetic — think bathroom shelf, not spreadsheet. Use a calm colour palette (soft whites, warm neutrals, one accent colour)
- Smooth CSS transitions on the fill-level bars
- Fixed bottom action bar with an "Add Shampoo" button always visible

## Code quality
- All JS in a single `<script>` tag at the bottom of the body
- All CSS in a single `<style>` tag in the `<head>`
- Use `async/await` for all Firestore operations
- Add clear section comments throughout
- No external CSS frameworks (no Tailwind, no Bootstrap)
- Handle Firestore errors gracefully with a visible error state in the UI

## Deliverables
Produce `index.html` and `manifest.json` in full, ready to deploy to GitHub Pages. Do not truncate or summarise any part of either file.
