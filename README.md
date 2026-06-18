# Aim Mobiles

Premium e-commerce storefront for mobile phones and accessories. Built with **Next.js 16** (App Router), **TypeScript**, and **Tailwind CSS v4**.

## Features

- Dark-mode premium UI with glassmorphism, gradients, and micro-interactions
- Full product catalog with filters, search, sorting, and quick view
- Product detail pages with image zoom, variants, specs, and reviews
- Shopping cart with localStorage persistence
- Wishlist with localStorage persistence
- Toast notifications for cart/wishlist actions
- Multi-step checkout with demo payment flow
- Order confirmation and order tracking pages
- Fully responsive (mobile-first)
- SEO-friendly with metadata API
- Accessible focus states and ARIA labels

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
├── components/
│   ├── home/             # Homepage sections
│   ├── layout/           # Header, Footer, Cart sidebar
│   ├── product/          # Product detail components
│   ├── shop/             # Shop grid, filters, search
│   └── ui/               # Reusable UI primitives
├── hooks/                # Custom React hooks
├── lib/                  # Types, utils, product data
└── store/                # Cart, wishlist, toast contexts
```

## Tech Stack

- **Next.js 16** — App Router, SSR, static generation
- **TypeScript** — Type safety
- **Tailwind CSS v4** — Utility-first styling
- **Lucide React** — Icons
- **localStorage** — Cart & wishlist persistence

## Demo Checkout

Use any card details at checkout (e.g. `4242 4242 4242 4242`). No real payment is processed.
