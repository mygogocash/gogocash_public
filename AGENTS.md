# AGENTS.md — GoGoCash Web (gogocash-web)

Concise guidance for AI coding agents and contributors. **Deep architecture and feature notes live in [README.md](./README.md).**

## Project

- **Stack:** Next.js 16 (App Router), TypeScript (strict), React, Tailwind CSS v4.
- **Data:** TanStack React Query + Axios (`src/lib/axios/client.ts`).
- **Auth:** NextAuth JWT; primary identity is **Firebase** (`src/lib/authFirebase.ts`). **Crossmint** remains mounted for wallet/subscription-related flows—do not rip out Crossmint plumbing without product sign-off and browser verification.
- **Payments:** **Stripe** for membership/checkout and billing portal (`src/lib/stripe/*`, `src/features/subscription/*`). Enable checkout UI with `NEXT_PUBLIC_STRIPE_BILLING=1` plus server keys and Price IDs (see `.env.example` and `src/env.ts`).
- **i18n:** `next-intl`, locales `en` / `th` (see `src/i18n/`). User-facing copy belongs in `src/messages/en.json` and `src/messages/th.json` together (parity checked by `npm run i18n:check`).
- **Imports:** Path alias `@/*` → `src/*` (`tsconfig.json`).

## Where to start (by task)

| Area                                  | Good entry points                                                                                                                                                                                                                   |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| App shell & providers                 | `src/app/layout.tsx`, `src/providers/ProviderDefault.tsx`                                                                                                                                                                           |
| HTTP + tokens                         | `src/lib/axios/client.ts`                                                                                                                                                                                                           |
| Firebase auth / NextAuth              | `src/lib/authFirebase.ts`, `src/app/api/auth/[...nextauth]/route.ts`                                                                                                                                                                |
| Login UI                              | `src/features/auth/component/LoginComponent.tsx`, `src/hooks/useFirebaseLogin.ts`                                                                                                                                                   |
| Crossmint wrapper                     | `src/lib/crossmint/SettingCrossmint.tsx`, `src/hooks/useSafeCrossmint.ts`, `src/hooks/useCrossmintLogin.ts`                                                                                                                         |
| Feature UI                            | `src/features/*`, shared pieces under `src/components/*`                                                                                                                                                                            |
| Profile nav (sidebar / SubPage rail)  | `src/components/layouts/SubProfile.tsx`, `src/features/profile/layout/SubPage.tsx`, `src/features/profile/component/ProfileMenu.tsx` (mobile prefetch list)                                                                         |
| Profile personal info                 | `src/features/profile/component/ProfileDesktopPersonalPanel.tsx`, `ProfileInfo.tsx`                                                                                                                                                 |
| PDPA consent UI (Consent preferences) | `src/components/pdpa/PrivacyCenterContent.tsx` — route `/privacy-center`; sidebar label key `navPrivacyPolicy`                                                                                                                      |
| Age verification                      | `src/components/pdpa/AgeVerificationFlow.tsx`, `src/app/[locale]/(profile)/age-verification/`; API `POST /api/pdpa/guardian/verify`                                                                                                 |
| PDPA data export / account deletion   | `src/components/pdpa/PdpaDataRightsSection.tsx` (rendered in `AccountSettingsView.tsx`, below notifications + community; cards use a single-column stack on all breakpoints)                                                        |
| Product Discovery (`/discover`)       | `src/app/[locale]/discover/page.tsx`, `src/features/discover/component/DiscoverContentArea.tsx`, `DiscoverProductCard.tsx`, `DiscoverProductTermsDialog.tsx`, `src/features/discover/types.ts`, `src/lib/offer/offerCardVisuals.ts` |
| Wallet transaction history + filters  | `src/features/transaction/component/WalletTransaction.tsx`, `WalletTransactionDateRangeFilter.tsx` (MUI date presets + range)                                                                                                       |
| Integrated profile shell routes       | `src/lib/navigation/profileIntegratedShell.ts` (+ tests) — keep in sync when adding profile-hub pages (e.g. `/age-verification`)                                                                                                    |
| SubPage title keys                    | `src/features/profile/layout/subPageMessageKeys.ts`                                                                                                                                                                                 |
| Membership landing                    | `docs/membership.md`, `docs/membership-hero-content.md`, `src/features/membership/*`, `useMembershipLanding.ts`                                                                                                                     |
| Stripe checkout / portal              | `src/app/api/stripe/checkout/route.ts`, `src/app/api/stripe/portal/route.ts`, `src/lib/stripe/handleStripeWebhook.ts`                                                                                                               |
| Stripe webhooks                       | **Canonical:** `POST /api/webhooks/stripe` (`src/app/api/webhooks/stripe/route.ts`). `POST /api/stripe/webhook` is deprecated but still relays the same handler.                                                                    |
| Pricing / billing UI                  | `src/features/subscription/*`; profile routes under `(profile)/pricing`, `(profile)/billing`, `(profile)/membership`                                                                                                                |
| Feature flags                         | `src/constants/featureFlags.ts`                                                                                                                                                                                                     |
| Env schema                            | `src/env.ts`, `.env.example`                                                                                                                                                                                                        |
| Firebase App Hosting                  | `firebase.json`, `apphosting.yaml`, `npm run deploy:firebase`                                                                                                                                                                       |

## Firebase App Hosting (staging / UAT)

- **Deploy:** `npm run deploy:firebase` (upload + rollout). Full pipeline: `npm run deploy:firebase:release` (validate → build → preflight → deploy). Console env template: `firebase-console.staging.env.example`.
- **HTTP 409 on deploy (`unable to queue the operation`):** Usually **another rollout is still in progress** (QUEUED / BUILDING / DEPLOYING)—wait for it to finish or fix it in the [App Hosting console](https://console.firebase.google.com/project/gogocash-app-staging/apphosting). Less often, the API rejects reusing a `buildId`; then try `npm run apphosting:delete-stale-build -- <buildId>` (id from the error URL; needs `gcloud auth login` or ADC).
- **Build:** `npm run build` runs **`next build --webpack`** — required for Google Cloud Build (Turbopack fails on `node_modules` symlink layout there). `npm run analyze` uses the same flag.
- **Runtime bundle:** `output: 'standalone'` in `next.config.ts` so the App Hosting adapter can produce a Cloud Run–compatible server.
- **Locale / i18n routing:** Root **`proxy.ts`** with `next-intl` (Next.js 16 convention; not `middleware.ts`).
- **Env:** `apphosting.yaml` sets non-secret defaults (e.g. mock API for internal UAT). **Console env overrides YAML.** For real sessions, set **`NEXTAUTH_SECRET`** (Secret Manager) and **`NEXT_PUBLIC_FIREBASE_*`** in App Hosting; align `NEXTAUTH_URL` / `NEXT_PUBLIC_FRONTEND_URL` with the URL testers use (hosted app or custom domain).

## Conventions agents should follow

1. **Scope:** Change only what the task requires; match existing patterns (imports at top, naming, component style).
2. **Types:** Run `npx tsc --noEmit` after non-trivial edits. Respect SDK types (e.g. Crossmint `SDKExternalUser`—`twitter` is a string, not `{ id }`).
3. **i18n:** Add or update keys in **both** `en.json` and `th.json` for new user-visible strings.
4. **Analytics / consent:** Meta Pixel, GTM/GA, and **PostHog** paths are consent-gated—see README “Analytics” sections before adding tracking.
5. **Verification:** For auth, analytics, wallet, or **Stripe** changes, **browser verification** (and webhook/CLI testing where relevant) matters; lint/build alone is not always enough.

## Commands (verify before claiming done)

```bash
npm run validate   # lint + format:check + i18n:check + test
npm run build      # production build (Webpack; matches Firebase Cloud Build)
npx tsc --noEmit   # TypeScript only (fast)
npm run test:e2e   # Playwright E2E (when flows or nav change)
```

Use `npm run lint:fix` and `npm run format` when appropriate.

## Console and terminal hygiene

**Terminal / CI**

1. Run `npx tsc --noEmit` and `npm run validate` before merging risky UI changes.
2. Run `npm run build` periodically; it is the gate for Next.js and Webpack issues not covered by ESLint alone.
3. **`npm warn Unknown env config "devdir"`** — comes from **your machine’s npm config or environment**, not this repo. Remove `devdir` from `~/.npmrc`, run `npm config delete devdir` (and `-g` if needed), and unset `NPM_CONFIG_DEVDIR` in shell profiles if set (see “npm CLI” under Repository facts).
4. **`i18n:check` note about `jp.json`** — informational; partial `jp` locale is allowed unless product requires full parity.

**Browser**

1. Manually spot-check critical routes with DevTools → Console: fix **errors** first, then decide on **warnings** (third-party scripts may be noisy).
2. **E2E:** `e2e/smoke.spec.ts` and authenticated `e2e/profile-subpage-scroll.spec.ts` assert **no `pageerror` and no `console.error`** after load. Set **`PLAYWRIGHT_STRICT_CONSOLE=1`** to also treat **`console.warning`** as a failure (stricter; optional in CI).
3. **App logging:** Prefer `src/lib/clientDevLog.ts` on the client so production bundles stay quiet; avoid raw `console.*` in feature code.

**Build warnings accepted in-repo**

- **Crossmint SDK** (`@crossmint/common-sdk-base`): Webpack “Critical dependency” for dynamic `require` is **suppressed** in `next.config.ts` (`ignoreWarnings`); the SDK is known-good at runtime. Revisit only if upgrading Crossmint major versions.

## Repository facts (avoid surprises)

- Many route segments use **`"use client"`** for interactivity and SDK compatibility.
- Profile routes live under `src/app/[locale]/(profile)/` with `AuthGuard`.
- `ClientLayoutWrapper` coordinates rendering with Crossmint readiness—avoid reordering providers without understanding `ProviderDefault.tsx`.
- **Profile popper / nav copy:** `navPrivacyPolicy` powers the Consent preferences item (not the generic `Privacy Policy` key). HMR fallbacks: `src/i18n/profilePopperMerge.ts`; test fallbacks: `src/i18n/intlMessageFallback.ts` (keep `linkMyCashbackPrivacyPolicy` separate from `navPrivacyPolicy`).
- **New profile hub routes:** Update `SubProfile` menu entries, `ProfileMenu.tsx` prefetch list, `profileIntegratedShell.ts`, and `subPageMessageKeys.ts` when adding a `SubPage` + rail page (mirror existing `/referral`, `/age-verification` pattern).
- Backend contract: `NEXT_PUBLIC_API_URL` (see `.env.example`).
- **Stripe local webhooks:** `stripe listen --forward-to localhost:3000/api/webhooks/stripe` — set `STRIPE_WEBHOOK_SECRET` from the CLI signing secret.
- **npm CLI:** If every command prints `Unknown env config "devdir"`, your user-level config or environment references an invalid npm key. Run `npm config delete devdir` (add `-g` if it was set globally), remove any `devdir=…` line from `~/.npmrc`, and unset `NPM_CONFIG_DEVDIR` in your shell profile if present.
- **MUI X `DatePicker` inside a `Popover`:** Keep calendars co-located with the wallet filter — wrap pickers in `LocalizationProvider` + `AdapterDayjs` (see `WalletTransactionDateRangeFilter.tsx`) and set `slotProps.popper.disablePortal: true` on each `DatePicker` so the popper does not mount on `document.body` (avoids z-index, focus, and nested-overlay issues).

When in doubt, search the codebase for an existing pattern before introducing a new abstraction.

## Learned User Preferences

- After bulk edits to `src/messages/en.json` or `th.json`, run `npm run i18n:check` before claiming parity; re-open files if Thai text shows replacement characters.

## Learned Workspace Facts

- Product Discovery tiles and terms flow live under `src/features/discover/`; outbound “Shop now” URL resolution and card imagery reuse `src/lib/offer/offerCardVisuals.ts` (unit tests in `offerCardVisuals.test.ts`).
- Wallet list filtering by date uses inclusive day bounds when both start and end are set; withdraw rows filter on `created_at`, earning/all modes on `conversionDate` (see `WalletTransaction.tsx`).
- `PdpaDataRightsSection` is owned for layout/copy in `src/components/pdpa/`; account settings is the integration surface (`AccountSettingsView.tsx`).

## Cursor Cloud specific instructions

- **Node 22.x** is pre-installed. Dependencies are refreshed on startup via `npm install --legacy-peer-deps`.
- **Mock API mode:** `.env.local` is pre-configured with `NEXT_PUBLIC_MOCK_API=1`, so the dev server works without a real backend. Shops, categories, and mock user data are served from `src/mocks/`.
- **Dev server:** `npm run dev` starts on port 3000. Pages require the locale prefix (e.g. `http://localhost:3000/en`). First request compiles on demand (~30 s); subsequent requests are fast.
- **`next-intl` timeZone:** Server and client use `Asia/Bangkok` in `src/i18n/request.ts` and `NextIntlClientProviderWithFallback` to avoid `ENVIRONMENT_FALLBACK` / hydration mismatches; keep those aligned if you touch i18n wiring.
- **Validation / checks:** `npm run validate` runs lint + format:check + i18n:check + test. Build: `npm run build` (uses `--webpack`; Turbopack is not supported for this project). TypeScript: `npx tsc --noEmit`.
- **No external services required** for local dev in mock mode. Firebase, Stripe, Crossmint, and analytics integrations are all optional and disabled by default.
