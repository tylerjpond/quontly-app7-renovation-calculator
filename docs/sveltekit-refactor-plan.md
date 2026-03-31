# SvelteKit Refactor Plan

## Understanding Summary

- Build a SvelteKit version of the current renovation calculator, replacing the existing React and React Router app.
- Preserve the current calculator behavior, content model, legal pages, and estimate logic as closely as practical during migration.
- Update the visual system to match the reference project in `../quontly-app2-calorie-calculator`, including DaisyUI usage, the `quontly` dark theme direction, shared shell patterns, and typography.
- Copy the `BrandLogo` component from the reference project and implement it the same way in the new app shell.
- Do not reimplement the charting feature in this phase.
- Do not add placeholder text, placeholder components, or “coming soon” UI for charting.
- Keep the codebase simple: migrate what exists, align the theme and structure, and avoid expanding product scope.

## Assumptions

- The preferred migration target is near feature parity with the current React app, not a product redesign.
- The final app should use SvelteKit 2, Svelte 5, Tailwind CSS v4, and DaisyUI 5, matching the reference project stack.
- The reference project’s dark `quontly` theme should replace the current light `renovation` theme entirely rather than coexist with it.
- Existing content in `src/content/site.ts` and estimate logic in `src/lib/renovation.ts` should be retained and adapted rather than rewritten from scratch.
- The current legal pages remain as separate routes.
- Any React-only dependencies, including `react`, `react-dom`, `react-router-dom`, and `recharts`, will be removed.
- Clipboard copy of the estimate summary remains in scope because it is current behavior and does not depend on charting.
- Ads remain disabled unless the existing content flag is later changed.

## Explicit Non-Goals

- No charting implementation.
- No placeholder section for charts.
- No changes to estimate formulas beyond what is required to port them safely.
- No new pages, calculators, or user accounts.
- No CMS, persistence layer, or server-side API additions.
- No mobile app or PWA work.

## Non-Functional Requirements

### Performance

- First render should be lighter than the React version because the charting library is removed.
- The calculator should compute entirely client-side with negligible latency for normal form changes.
- Route payloads should remain small by keeping calculation logic and content as local modules.

### Scale

- This is a static-style content and calculator site with low runtime complexity.
- Expected scale is brochure-site traffic with frequent anonymous use and no user-specific data.
- The architecture should remain simple enough for static hosting or edge deployment.

### Security and Privacy

- No new personal data collection should be introduced.
- Clipboard access should remain user-initiated only.
- External affiliate links should continue using safe outbound link attributes where applicable.

### Reliability and Availability

- The calculator must continue to function fully client-side even without any backend services.
- Legal pages and the calculator route should remain available as plain SvelteKit routes.
- Failure mode should be limited to validation errors and absent estimates, not runtime crashes.

### Maintenance and Ownership

- The migration should reduce maintenance overhead by removing framework mismatch and preserving plain TypeScript domain logic.
- Shared layout, content, and calculator modules should be easy to extend without introducing unnecessary abstractions.

## Recommended Approach

### Option A: Direct SvelteKit Port With Shared Theme Conventions

This is the recommended approach.

Port the current React app into a standard SvelteKit route structure while preserving the domain logic and content modules. Replace the current light renovation theme with the reference project’s DaisyUI theme conventions and app shell. Build the calculator as a single Svelte page plus shared Svelte components for the shell and repeated UI blocks. Omit the chart section completely instead of substituting a stub.

#### Why this option

- Lowest migration risk.
- Preserves business logic and copy already in the repo.
- Keeps the implementation aligned with the reference project’s proven SvelteKit and DaisyUI setup.
- Avoids unnecessary redesign work.

#### Trade-offs

- Some React component decomposition may not map 1:1 and will need moderate reshaping into Svelte markup.
- The current page is large, so the initial Svelte page may still be fairly substantial unless selectively decomposed.

## Alternative Approaches

### Option B: Full UI Recomposition Around Smaller Svelte Components

Rebuild the page from the same logic and content, but aggressively split the calculator into many small components from the start.

#### Trade-offs

- Better long-term modularity.
- Higher migration effort and more room for regression during the first pass.
- Not necessary yet unless the first Svelte page becomes difficult to maintain.

### Option C: Fresh SvelteKit Scaffold Then Manual Content Rebuild

Start from the reference project structure and manually re-enter all renovation content and calculator behavior.

#### Trade-offs

- Can produce a very clean result.
- Highest risk of content drift and missed functionality.
- Unnecessary because the current project already has reusable TypeScript data and calculation modules.

## Accepted Direction

Proceed with Option A.

## Design

### 1. Architecture

The migrated app should become a conventional SvelteKit application with a top-level layout, a calculator home route, and route folders for legal pages. The domain logic remains framework-agnostic TypeScript under `src/lib`, and content stays as structured data under `src/content`. The app shell should follow the reference project pattern: import shared global CSS in the layout, set `data-theme="quontly"` at the shell root, use the copied `BrandLogo`, and provide a header and footer that wrap all routes.

The calculator itself should remain a client-rendered page because all state is transient form input and there is no backend persistence requirement. Validation should still use `zod`, but instead of React `useMemo` and `useState`, the page should use Svelte local state and reactive derivation. This keeps the logic simple and preserves current behavior without introducing stores unless later reuse requires them.

Does this look right so far?

### 2. Route and File Structure

Recommended target structure:

- `src/app.html`
- `src/index.css`
- `src/content/site.ts`
- `src/lib/renovation.ts`
- `src/lib/components/BrandLogo.svelte`
- `src/lib/components/AppHeader.svelte`
- `src/lib/components/AppFooter.svelte`
- `src/lib/components/SectionHeading.svelte`
- `src/lib/components/ResultCard.svelte`
- `src/lib/components/ControlPanel.svelte`
- `src/lib/components/ChoiceField.svelte`
- `src/routes/+layout.svelte`
- `src/routes/+page.svelte`
- `src/routes/about/+page.svelte`
- `src/routes/privacy/+page.svelte`
- `src/routes/terms/+page.svelte`
- `src/routes/disclosure/+page.svelte`

The current `LegalPage` React helper should not be ported as a dynamic component wrapper unless it simplifies the implementation. A practical SvelteKit version is to keep a shared legal page component or helper and compose it into the individual route files. This preserves distinct URLs while avoiding duplicated markup.

Does this look right so far?

### 3. Styling and Theme System

The current app’s `renovation` light theme should be replaced by the reference project’s `quontly` DaisyUI theme. The implementation should copy the reference project’s theme block from `src/index.css` and then add only the minimum extra utilities needed for renovation-specific layout details. Keep the global background classes such as `bg-hub` and `bg-hub-soft`, preserve the Sora font stack, and use the same color tokens.

This means the visual migration is not just “use DaisyUI”; it is “adopt the reference app’s DaisyUI contract.” Buttons, cards, collapses, inputs, and layout surfaces should therefore be restyled using the same token family and spacing rhythm as the reference project. The existing light gradients and the `HR` logo lockup should be removed. The header should use the copied `BrandLogo` exactly as in the reference project, with the renovation calculator title sitting alongside it in the navbar.

Does this look right so far?

### 4. Calculator Page Composition

The home page should keep the same broad content sequence, minus the charting block:

1. Hero section.
2. Snapshot summary card.
3. Estimator controls.
4. Result cards.
5. Budget interpretation text.
6. Action row with quote CTA and clipboard summary action.
7. Affiliate recommendations section.
8. Explainer section.
9. FAQ section.

The “Cost breakdown” chart section should be removed entirely. The underlying numeric breakdown data may still be calculated if it is useful for future work, but it should not be surfaced in the UI during this phase. If keeping it in the return shape complicates the page, it is acceptable to retain it in `calculateRenovationEstimate` for compatibility now and defer cleanup until the chart feature is reconsidered.

The current React helper components map cleanly to Svelte components where reuse is meaningful. `SectionHeading`, `ResultCard`, `ControlPanel`, and `ChoiceField` should become Svelte components. Very small one-off items like `TrustPoint` and `SnapshotCard` can either become components or stay inline in `+page.svelte`; the better choice is to inline them unless repetition in the Svelte page becomes noisy.

Does this look right so far?

### 5. Data Flow and Validation

State should live in `src/routes/+page.svelte` as local component variables. Validation should stay schema-based with `zod`, mirroring the current input schema. The page should derive:

- `validation`
- `fieldErrors`
- `estimate`
- `roomOptions`
- `projectOptions`

using Svelte reactive declarations or equivalent Svelte 5 patterns. When the selected room changes, the selected project should reset to the room’s default project exactly as it does now. Numeric input parsing should continue to coerce text input safely and preserve current guardrails around `squareFeet`.

The clipboard feature should remain a user-triggered button action. It should generate the same high-value planning summary already present in the React app. No stores, server load functions, or form actions are required for this phase because the calculator has no persistence or server dependency.

Does this look right so far?

### 6. Legal Pages and Navigation

The current legal content object in `src/content/site.ts` should remain the source of truth. In SvelteKit, each legal route should read from that module and render a common layout pattern. Navigation links should match the reference shell structure: calculator, about, privacy, terms, and disclosure. The layout header and footer should wrap every route.

The footer copy should be updated for the renovation app, but structurally it should follow the reference project’s footer implementation rather than the current React footer. This keeps the app family visually consistent while still allowing renovation-specific messaging in the footer body text.

Does this look right so far?

### 7. Dependency and Tooling Changes

Package changes should be straightforward:

- Add `@sveltejs/kit`, `@sveltejs/vite-plugin-svelte`, `svelte`, and `svelte-check`.
- Keep `daisyui`, `@tailwindcss/vite`, `typescript`, `eslint`, `zod`, and `clsx` only if still needed.
- Remove `react`, `react-dom`, `react-router-dom`, `@vitejs/plugin-react`, React type packages, and `recharts`.

The scripts should align with the reference project:

- `dev`
- `build`
- `check`
- `lint`
- `preview`

ESLint and TypeScript config should be updated to SvelteKit equivalents. The old `main.tsx`, `App.tsx`, and React-specific config should be removed once the SvelteKit app is wired and verified.

Does this look right so far?

### 8. Testing and Verification Strategy

Verification should focus on safe migration rather than broad new coverage.

Required checks:

- `npm run check`
- `npm run lint`
- `npm run build`

Behavioral verification should confirm:

- room changes reset project type correctly
- input validation still gates estimate output correctly
- estimate ranges match the old calculator for representative inputs
- clipboard summary still works from a user action
- all legal routes render correctly
- there is no chart section and no placeholder chart copy anywhere on the page
- `BrandLogo` matches the reference implementation exactly
- layout and theme visually match the reference project direction

If implementation work follows, a small comparison checklist with 3 to 5 representative scenarios should be used to validate parity between the React and SvelteKit calculators.

Does this look right so far?

## File Mapping

### Existing to Target Mapping

- `src/App.tsx` -> split into `src/routes/+layout.svelte`, `src/routes/+page.svelte`, and small reusable Svelte components.
- `src/index.css` -> replaced with reference-style `quontly` theme CSS and shared utility classes.
- `src/App.css` -> remove unless a small subset is still needed; most of it is template residue and should not survive the migration.
- `src/lib/renovation.ts` -> retain, with only TypeScript cleanup if needed for Svelte usage.
- `src/content/site.ts` -> retain, with text-only updates if needed to better fit the dark theme shell.
- `index.html` -> replaced by SvelteKit `src/app.html` and framework defaults.

## Decision Log

### Decision 1

- Decided: use SvelteKit 2 with a direct port approach.
- Alternatives considered: full UI recomposition, fresh rebuild from reference project.
- Why chosen: it preserves behavior and reduces migration risk.

### Decision 2

- Decided: adopt the reference project’s `quontly` DaisyUI theme conventions.
- Alternatives considered: keep the current `renovation` light theme, support both themes.
- Why chosen: the request explicitly asks to match the reference project’s styling and DaisyUI usage.

### Decision 3

- Decided: copy `BrandLogo` exactly from the reference project.
- Alternatives considered: create a renovation-specific logo lockup, adapt the existing `HR` badge.
- Why chosen: the request explicitly asks for the same implementation as the reference project.

### Decision 4

- Decided: remove the chart section entirely in this phase.
- Alternatives considered: port the chart, add a placeholder block, keep chart data visible in another form.
- Why chosen: charting is explicitly deferred and placeholders are explicitly disallowed.

### Decision 5

- Decided: keep calculation logic in plain TypeScript under `src/lib/renovation.ts`.
- Alternatives considered: rewrite calculations inside Svelte components, move logic into stores.
- Why chosen: it preserves tested business logic boundaries and keeps the migration small.

### Decision 6

- Decided: keep legal pages as individual routes.
- Alternatives considered: collapse them into a single route or modal pattern.
- Why chosen: preserves existing information architecture and linkability.

## Implementation Handoff

### Ordered Work Plan

1. Replace the React app scaffold with SvelteKit configuration and dependencies.
2. Copy the reference `BrandLogo` component and reference theme structure.
3. Build `+layout.svelte` with header, footer, nav, and global theme wrapper.
4. Port the calculator page into `src/routes/+page.svelte` using current TypeScript domain logic.
5. Remove the chart section and all `recharts` usage.
6. Port legal pages into separate SvelteKit routes backed by the existing content module.
7. Run `check`, `lint`, and `build`, then manually verify parity scenarios.

### Risks

- The large React page may tempt over-componentization during migration.
- Removing chart UI without cleaning related code paths carefully could leave dead imports or orphaned copy.
- Theme alignment may drift if the reference CSS is only partially copied.

### Risk Mitigation

- Keep component extraction minimal and purposeful.
- Delete the full chart section in one pass.
- Start the visual layer from the reference CSS, then add only the smallest project-specific overrides.
