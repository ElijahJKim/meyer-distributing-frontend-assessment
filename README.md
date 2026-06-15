# Meyer Distributing Frontend Assessment

This repository is the frontend application for the Meyer Distributing Frontend Assessment

Built with the [svelte5-starter-kit](https://github.com/ElijahJKim/svelte5-starter-kit) boilerplate — Svelte 5, TypeScript, SCSS, and lint tooling preconfigured.

## Tech Stack

- **Framework:** [Svelte 5](https://svelte.dev/)
- **Language:** TypeScript
- **Styling:** SCSS
- **Package Manager:** pnpm

## Design

For the UI design, I analyzed Meyer Distributing's current B2B portal. To align with the brand identity while improving the user experience, I adopted Meyer's core Navy Blue and Orange color scheme (https://www.youtube.com/watch?v=m7lErVMeBZI)

Dark mode is supported via CSS custom properties and a `data-theme` attribute on the document root, toggled from the header.

## Getting Started

Ensure you have the following installed:

- **Node.js** (v18.x or higher recommended)
- **pnpm**

```bash
# Clone the repository
git clone https://github.com/ElijahJKim/meyer-distributing-frontend-assessment.git

# Navigate to the directory
cd meyer-distributing-frontend-assessment

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Start the development server
pnpm run dev
```

The app expects a `PRODUCTS_URL` environment variable (see `.env.example`). By default it points to the Maybelline product API used for the assessment.

## Features

### Level 1 — Product listing

- Responsive product grid with `ProductCard` (image, name, price, rating, color swatches)
- `ProductModal` with full product details, color options, and external product link
- Accessible dialog behavior (focus trap, keyboard support)

### Level 2 — Filtering & sorting

- Filter drawer with four categories: price range, product type, rating, color
- Active filter chips with per-chip removal and clear-all
- Sort dropdown (default + 5 sort options)
- Client-side pipeline: **filter → sort → paginate**

### Level 3 — Pagination

- Page navigation with current page indicator
- Page size selector (8 / 12 / 16 / 24)
- Filter or sort changes reset to page 1

### Additional

- **Dark mode** — cookie-based theme with SSR via `hooks.server.ts` (no flash on load)
- **URL state sync** — filters, sort, page, and page size reflected in query params (shareable URLs)
- **Skeleton loading** — streamed product fetch with `ProductCardSkeleton` placeholders
- **Recently viewed** — last 5 viewed products persisted in `localStorage` via `svelte5-rune-storage`

## Architecture

```
src/
├── app.html                 # HTML shell (charset, viewport)
├── hooks.server.ts          # Injects theme cookie into <html data-theme>
├── routes/
│   ├── +layout.server.ts    # Reads theme cookie for SSR
│   ├── +layout.svelte       # Site shell, global styles, svelte:head
│   ├── +page.server.ts      # Streams products promise from API
│   └── +page.svelte         # Hero + {#await} catalog / skeleton / error
└── lib/
    ├── actions/
    │   └── attachment.ts    # Portal, click-outside, anchor positioning
    ├── components/
    │   ├── Listing/         # ProductCatalog, filters, sort, toolbar
    │   └── Product/         # Cards, modal, list, skeleton, recently viewed
    ├── server/
    │   └── products.ts      # Server-side fetch (PRODUCTS_URL env)
    ├── state/
    │   ├── theme.svelte.ts          # Theme store + cookie write
    │   └── recently-viewed.svelte.ts  # Persisted recently viewed items
    ├── styles/              # SCSS tokens, theme vars, reset, mixins
    ├── types/               # Product, filters, sort, pagination interfaces
    └── utils/               # Filter/sort logic, URL params, formatting, a11y
```

**Data flow**

```
+page.server.ts  →  getProducts() (promise, no await)
+page.svelte     →  {#await} skeleton | ProductCatalog | error
ProductCatalog   →  filter → sort → paginate → ProductList
                  ↔  URL query params (bidirectional sync)
```

## Libraries

### Runtime dependencies

| Package                                                                      | Purpose                                              |
| ---------------------------------------------------------------------------- | ---------------------------------------------------- |
| [`@lucide/svelte`](https://lucide.dev/)                                      | Icons (filter, sort, pagination, etc.)               |
| [`svelte5-rune-storage`](https://github.com/ElijahJKim/svelte5-rune-storage) | Client-side persistence for recently viewed products |

No UI component library or CSS framework is used.
