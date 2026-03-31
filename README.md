# Quontly App 7 - Renovation Calculator

This project is now implemented with SvelteKit, Tailwind CSS v4, and DaisyUI.

## Stack

- SvelteKit 2
- Svelte 5
- Tailwind CSS v4
- DaisyUI 5
- Zod

## Scripts

- `npm run dev` - start local dev server
- `npm run check` - run Svelte type and framework checks
- `npm run lint` - run ESLint checks
- `npm run build` - build production bundle
- `npm run preview` - preview production build

## Notes

- Styling now follows the same dark Quontly DaisyUI theme direction as the calorie calculator reference project.
- The shared `BrandLogo` component was ported from the reference project.
- Charting is intentionally deferred and is not included in this migration.

## Cloudflare Pages

This project is configured for Cloudflare Pages via `@sveltejs/adapter-cloudflare`.

- Build command: `npm run build`
- Output directory: `.svelte-kit/cloudflare`
- Node version: use a current supported Node 20+ runtime in Pages

Because routing is handled by SvelteKit's Cloudflare adapter, the old SPA `_redirects` fallback file is not used.
