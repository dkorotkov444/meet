## CI and CD — what they are and why they matter

Continuous Integration (CI) is a development practice where developers frequently merge their code changes into a shared repository, where automated builds and tests run. This catches integration problems early, enforces consistent quality checks, and keeps the main branch releasable. The key benefit is fast feedback: developers learn quickly if a change breaks the build or tests, which reduces the cost and complexity of fixes.

Continuous Delivery/Deployment (CD) picks up where CI leaves off. Continuous Delivery ensures that code is always in a deployable state and automates the release pipeline so you can deploy to production on demand. Continuous Deployment automates the final step and deploys every passing change to production. Together, CD reduces manual release steps, speeds up delivering features and fixes to users, and lowers human error in releases.

## Advantages of using CI and CD tools during development

CI/CD tools automate repetitive tasks - builds, tests, linting, artifact creation, and deployments - so teams get faster, more reliable feedback and fewer manual mistakes. They improve code quality by running test suites and static analysis on every change, provide an audit trail of what was built and deployed, and let teams release smaller changes more frequently which reduces risk. Automation also scales: as a codebase and team grow, CI/CD ensures consistent processes without adding overhead.

CI/CD also improves collaboration and transparency. Pull requests can show build status and test results, reviewers can focus on the logic rather than whether the branch builds, and rollbacks or staged rollouts are easier when there’s a reproducible pipeline and artifact history.

## How to apply CI and CD practices to the Meet app

For my Meet app (React front-end with an auth/server folder and Vercel deployment), I can start by adding a CI pipeline that runs on each pull request and push to `main`: install dependencies, run the unit and feature tests (Jest), run linting, and build the app. Use GitHub Actions or GitLab CI to run these steps and upload coverage artifacts. This ensures merges to `main` are always tested and the repo remains healthy.

For CD, configure the pipeline to automatically deploy successful builds of `main` to Vercel (or rather trigger Vercel via its Git integration). For serverless pieces (`auth-server` block), include unit tests, and if possible, integration tests that run in staging. Tag builds with commit SHA and environment names (staging/production) and use environment-specific configuration (API keys, analytics, Atatus DSN) via environment variables. We can add a manual approval step if we would prefer Continuous Delivery (manual production deploys) rather than full Continuous Deployment.

Small practical steps: 
1) Add a workflow that runs `npm ci`, `npm test`, `npm run build` on PRs; 
2) let passing `main` runs trigger Vercel deployments; 
3) use feature branches + preview deployments for QA; 
4) configure secrets and environment tags so monitoring (Atatus) and logs distinguish local, staging, and production traffic.


## Errors detected

### 1. Conflicting Service Workers

An unhandled promise rejection was observed from the auto-injected `/registerSW.js`, caused by a conflict between `vite-plugin-pwa` (which injected `registerSW.js`) and an existing CRA-style `serviceWorkerRegistration` in the app; the recommended fix is to set `injectRegister: false` in `vite.config.js` and register the Vite-generated service worker manually via `virtual:pwa-register` (or remove the CRA registration), then rebuild and redeploy.


