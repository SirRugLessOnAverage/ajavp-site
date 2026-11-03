# Security review: AJAVP site

## Scope
Audited the server routes, auth checks, and dependency posture for the public AJAVP site. Focus areas included injection, authentication bypasses, secret handling, and unsafe dependencies.

## Findings

### 1) Critical — auth bypass in the JIF revalidation API
File: `app/api/revalidate-jif/route.ts`

- The endpoint accepted a shared secret from either the `Authorization: Bearer` header or a query string such as `?secret=...`.
- It also defined a fallback secret in code: `ajavp_jif_revalidate_secret_2026` when `REVALIDATE_SECRET_TOKEN` was unset.
- Because the secret was not required to be configured and the query string was accepted, an attacker who discovered the fallback or could guess the default secret could trigger cache revalidation and force stale JIF pages to refresh.
- This is a server-side auth bypass and is the most serious issue in the codebase.

### 2) High — secret leakage via URL query parameters
File: `app/api/revalidate-jif/route.ts`

- The API accepted the secret from the URL, which is commonly captured in browser history, referrer headers, reverse-proxy logs, and analytics systems.
- Even when the secret is not intentionally logged, URLs containing credentials are much easier to leak than header-based auth.

## Dependency audit

- `npm audit --omit=dev` reported no vulnerable production dependencies at the time of review.
- There were no obvious secrets in the repository source tree beyond the expected public Supabase configuration.

## Remediation applied

- Removed the hardcoded fallback secret.
- Require `REVALIDATE_SECRET_TOKEN` to be set in the environment before the route can accept requests.
- Removed support for secret validation via `?secret=`.
- Kept validation in the `Authorization` header only, using `crypto.timingSafeEqual` to avoid timing-based comparison attacks.
