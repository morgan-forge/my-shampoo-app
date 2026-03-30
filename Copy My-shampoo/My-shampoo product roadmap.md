# My-Shampoo — Product Roadmap

*Personal shampoo inventory tracker · iPhone PWA · Firebase backend*

-----

## Vision

Lather makes it effortless to know exactly what’s in your bathroom, how much is left, and when to reorder — without ever being caught with an empty bottle.

-----

## Phase 1 — Foundation (MVP)

*Core tracking. Single bottle per product. Get the basics right.*

### 1.1 Product list view

Cards showing each shampoo with a visual fill-level indicator (bottle fill bar + percentage). Low stock flagged visually below 20% remaining.

### 1.2 Add product — manual entry

Form to add a new shampoo: name, brand, total ml, starting amount, optional notes.

### 1.3 Update level

Tap a product to log the current remaining amount. Quick-entry optimised for one-handed iPhone use — not a full edit form.

### 1.4 Delete product

Swipe or long-press to delete, with confirmation prompt.

### 1.5 Bottle status states

Active / Backup (sealed) / Finished — track your full bathroom stock, not just open bottles.

### 1.6 Firestore real-time sync

`onSnapshot` listener so the UI updates live across devices.

### 1.7 PWA home screen install

Manifest, service worker, apple-touch-icon — installable from iPhone Safari with offline shell caching.

-----

## Phase 2 — Smarter Tracking

*Make the app understand your usage patterns.*

### 2.1 Multiple bottle instances

Track two open bottles of the same product simultaneously — e.g. one in the shower, one at the gym.

### 2.2 Wash log

One-tap “I washed today” button that auto-deducts your average usage per wash.

### 2.3 Usage rate estimation

Calculates ml per wash from update history. Predicts days of remaining supply based on your actual usage cadence.

### 2.4 Average bottle lifespan

Surfaces insight: “You typically finish a 250ml bottle in 6 weeks.”

### 2.5 Custom reorder threshold

Set a per-product “warn me at X%” rather than a fixed global 20%.

### 2.6 Product timeline

Visual history of a bottle’s fill level over time as a simple line graph per product.

-----

## Phase 3 — Rebuying & Stock Management

*Close the loop from empty to reordered.*

### 3.1 Shopping list view

Dedicated screen showing all products below their reorder threshold. Designed to screenshot before hitting the shops or opening Amazon.

### 3.2 Repurchase history

Log when you bought a new bottle and how much you paid. Builds a price history over time per product.

### 3.3 Reorder links

Store a reorder URL per product (Amazon, Boots, Lookfantastic, etc.) — one tap to jump straight to the product page.

### 3.4 Subscription reminder

Flag products you buy on a regular cycle. Surface a reminder when you’re due.

### 3.5 Finished products archive

A log of every bottle you’ve completed with start date, finish date, and duration.

### 3.6 Waste tracker

Log when you discard a bottle with product still in it. Tracks cumulative waste over time.

-----

## Phase 4 — Product Discovery & Data Entry

*Reduce friction when adding new products.*

### 4.1 Barcode scanning

Use the iPhone camera via browser API (ZXing-js or QuaggaJS) to scan EAN barcodes. Looks up the product automatically via Open Beauty Facts API — auto-fills name, brand, and bottle size.

### 4.2 Open Beauty Facts integration

On successful barcode scan, pull product image, name, brand, and volume from the Open Beauty Facts database. Falls back to manual entry if the product isn’t found.

### 4.3 User-supplied product photo

Capture a photo of the bottle with the iPhone camera on add, or browse from Camera Roll. Stored in Firebase Storage. Shown on the product card.

### 4.4 Manual image URL

Simple fallback — paste any image URL to use as the product photo.

### 4.5 Duplicate & edit

Clone an existing product entry when opening a new bottle of the same product. Pre-fills all fields, user just confirms.

-----

## Phase 5 — Organisation & Personalisation

*Make the app feel like yours.*

### 5.1 Hair type / use-case tagging

Tag products: Daily, Clarifying, Scalp Treatment, Colour Care, etc. Filter the product list by tag.

### 5.2 Bathroom location tagging

Shower / Bath / Gym bag / Travel kit — filter by location.

### 5.3 Star rating

Personal rating per product (1–5 stars). Shown on the card. Useful when deciding whether to repurchase.

### 5.4 Wishlist

Products you want to try but haven’t bought yet. Separate view from active inventory.

### 5.5 Dark mode

Automatic, respects iPhone system preference via `prefers-color-scheme`.

-----

## Phase 6 — Notifications & Intelligence

*Lather tells you when action is needed.*

### 6.1 Low stock push notifications

PWA push notification when a product hits its reorder threshold. Requires service worker upgrade with Push API and a lightweight backend notification trigger (Firebase Cloud Functions).

### 6.2 Predictive reorder alert

Combines usage rate (Phase 2.3) with reorder threshold — notifies you X days before you’re predicted to run out, not just when you’re already low.

-----

## Phase 7 — Data Portability

*Your data, your way.*

### 7.1 Export to CSV

Download your full inventory and update history as a CSV file.

### 7.2 Repurchase analytics

Summary view: total spend by brand, average cost per ml, most-used products over the past 12 months.

-----

## Technical Debt & Continuous Improvements

- Firestore security rules — tighten from open test mode to user-scoped rules once any auth is added
- Service worker cache versioning — ensure updates push cleanly to installed PWA
- Offline write queue — queue Firestore writes when offline, flush on reconnect
- Accessibility audit — ensure all touch targets, contrast ratios, and screen reader labels meet WCAG 2.1 AA

-----

## Ideas Parking Lot

*Not scheduled — revisit if appetite exists*

- Social sharing: share a product recommendation card as an image
- Multi-user / household mode: shared inventory between two people
- Integration with a skincare / haircare routine tracker

-----

*Last updated: March 2026*