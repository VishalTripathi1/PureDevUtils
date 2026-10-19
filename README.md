# PureDevUtils

16 browser-based developer utilities built with Next.js 15.5.23, React 19.1.1 and TypeScript. Tool contents stay in browser memory; the application has no analytics events, API handlers or upload endpoints.

## Run and verify

```sh
npm ci
npm run dev                 # Next development server
npm run lint
npm test
npm run build               # static export to out/
npm run check:export        # inspect actual exported HTML and sitemap
npm run preview             # http://localhost:3000, serves out/ with security headers
```

`next start` does not support this project's static-export configuration. `npm start` and `npm run preview` now both serve the production export. The preview binds only to 127.0.0.1. Set `NEXT_PUBLIC_SITE_URL=https://puredevutils.com` at build time (also the default); production canonicals intentionally remain production URLs in local preview.

For local-only browser measurements, use `PDU_QA=1 npm run preview`. Its QA panel records timing, resource and request counts, never input, output, filenames or request bodies. It is not exported or deployed. These local unthrottled observations are not Lighthouse scores or real-user Core Web Vitals.

Vitest runs Java compilation tests when `javac` is available (Java 17+ needed for records). Optional dependency compilation runs when `JAVA_TEST_CLASSPATH` names real Jackson annotations and Lombok jars, separated by the OS classpath separator. Tests otherwise explicitly skip that case. Validated with javac 19.0.1, Jackson annotations 2.17.3 and Lombok 1.18.36:

```sh
JAVA_TEST_CLASSPATH=/path/jackson-annotations.jar:/path/lombok.jar npm test
```

## Architecture

- `tools/registry.ts` registers all 16 existing `/tools/<slug>` URLs.
- Each tool has metadata, a client interface, and browser-safe transformation logic.
- `components/tool-page.tsx` renders static explanatory content around the client interface.
- `content/tool-guides.ts` owns tool-specific instructions, examples and limits.
- `content/tutorials.ts` supplies three statically generated tutorials and reference links.
- `app/sitemap.ts` uses explicit substantive-edit dates, not the current build time.
- `public/_headers` is the static hosting header configuration; no Cloudflare deployment credentials/configuration or CI workflow is checked in.

## Deploy (manual; not performed)

1. Review the local diff and `docs/implementation-review.md`.
2. Run the checks above. Configure the existing static host to run `npm ci && npm run build`, with output directory `out` and a supported Node version (tested with Node 22).
3. Upload/deploy the entire `out/`, including `_headers` and `404.html`, through the existing deployment process. Keep extensionless HTML routing; do not install an SPA catch-all that returns 200 for nonexistent paths.
4. In Cloudflare, disable automatic Web Analytics beacon injection for this site. It is currently injected outside this repository and blocked by CSP. Do not add a broad CSP exception. Google Analytics has been removed from the application; Search Console can still measure search traffic.
5. Preserve the existing path-preserving www → non-www 301 redirect and HTTPS behavior. These are hosting settings, not Next server redirects (this app has no production Next server).
6. Verify deployed 200/301/404 responses, canonical URLs, headers, sitemap, favicon, no injected analytics and tool interactions. The sitemap includes tutorials; resubmission is optional if Google already reads the same sitemap URL.

See `docs/implementation-review.md` for verification results and remaining external checks.
