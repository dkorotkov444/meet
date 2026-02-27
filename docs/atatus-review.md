# Atatus configuration review — checklist and guidance

Short answer: I can’t confirm your config without seeing it live, but here’s a precise checklist and sample snippets so you can verify and fix it quickly. If you want, paste your Atatus init code or allow me to scan the repo for `atatus` and I’ll verify details.

## Checklist — does your Atatus setup meet these items?
- SDK installed in the appropriate place:
  - Browser: Atatus browser SDK is included in your front-end bundle and initialized before your app mounts.
  - Server/serverless: Atatus server SDK is initialized at function/module startup.
- API key / DSN stored in environment variables (not committed). With Vite use VITE_* prefix (e.g., `VITE_ATATUS_KEY`). In Vercel set matching env vars for Production/Preview/Development.
- Environment tagging: SDK is passed an `environment` value (development / preview / production). Use `import.meta.env.MODE` or `process.env.NODE_ENV`.
- User context set when available: call SDK’s setUser (or equivalent) after authenticating users so Atatus groups events by user.
- Error boundaries and unhandled errors: global error handler or React Error Boundary is in place so exceptions are captured.
- Serverless flush handling: if using serverless (Vercel functions), ensure events are flushed/sent before the function exits when necessary (follow Atatus serverless best practices).
- PII & volume controls: scrubbing, sampling, and filters are configured to avoid sending personal data or too many events.

## Vite + React (browser) example
Place initialization in `src/main.jsx` or another top-level file before the app mounts.

```js
// Example: uses the Atatus browser SDK (npm package like atatus-js or atatus-spa).
import Atatus from 'atatus-js';

if (import.meta.env.VITE_ATATUS_KEY) {
  Atatus.config(import.meta.env.VITE_ATATUS_KEY, {
    environment: import.meta.env.MODE // "development", "production", "test"
  }).install();
}

// optionally set user after login
// Atatus.setUser({ id: userId, name: userName, email: userEmail });
```

Notes:
- Vite exposes env variables only when prefixed with `VITE_`. So set `VITE_ATATUS_KEY` in `.env.local` for local dev and in Vercel env vars for Preview/Production.
- Don’t commit `.env.local` or secrets to the repo.

## Node / serverless example (auth-server)
- Initialize the server SDK at module top-level (not inside handler on every invocation) so it persists across warm starts. Use the official server SDK and follow the vendor docs for exact API:

```js
// pseudo-code - follow the exact Atatus Node SDK docs for method names
const atatus = require('atatus-node');
atatus.start({ apiKey: process.env.ATATUS_API_KEY, environment: process.env.NODE_ENV });

// In serverless handlers, ensure you flush/close if recommended
```

## Vercel env var recommendations
- For front-end (Vite): set `VITE_ATATUS_KEY` in Vercel > Project > Environment Variables for the environments you want (Preview and Production).
- For server functions: set `ATATUS_API_KEY` (or whatever name your server code expects) in Vercel for the appropriate environments.
- Confirm that Preview deployments (pull requests) have the preview key if you want preview errors to show up separately.

## How to verify it’s working
- Trigger a known error in the deployed app (e.g., throw a test error behind a QA-only button). Then check the Atatus dashboard for a corresponding error/event with the correct environment tag.
- In the browser, open DevTools > Network and filter for requests to Atatus ingestion endpoint (or look for requests to their CDN/API). You should see successful POSTs after errors.
- Check the Atatus dashboard for events, breadcrumbs, and user context (if you set user).
- For serverless, check server logs for Atatus SDK startup messages and ensure events show up after invoking functions.

## Common pitfalls
- Using the wrong env prefix with Vite (e.g., using REACT_APP_* or NODE env vars directly) — Vite requires `VITE_`.
- Initializing the SDK too late: if you initialize after the app mounts, you may miss early errors.
- Committing secret keys to the repo.
- Not setting environment tags, causing dev and production events to mix.
- Forgetting to set user context or set it too late (post-login).
- Ignoring serverless flush guidance: events may be dropped on cold shutdown if the SDK isn’t flushed when needed.

## What I can do next (pick one)
- If you paste the Atatus init snippet(s) from your front-end (e.g., `src/main.jsx` or `src/App.jsx`) and any server init (e.g., `auth-server/handler.js`), I’ll review them for correctness and give exact fixes.
- Or I can scan the repo for the string "atatus" to find where you initialize it; tell me to proceed and I’ll run a quick search and report locations.

I generated this content previously as a response to your question about Atatus configuration. Paste or point me to your init code if you want a line-by-line review.
