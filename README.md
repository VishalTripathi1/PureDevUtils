# PureDevUtils

A privacy-first collection of browser-based developer utilities.

Set `NEXT_PUBLIC_SITE_URL` for a deployed environment.

## Architecture

Each tool is a self-contained module under `tools/<tool-name>/`:

```
tools/registry.ts → tools/<tool>/index.ts → reusable ToolPage → tool Interface + logic
```

`index.ts` owns tool metadata, explanatory copy, FAQs, and the interface binding. `logic.ts` contains pure browser-safe transformations and tests. Registering a module in `tools/registry.ts` makes its crawlable route available at `/tools/<slug>`.

## Current scope

Only JSON Formatter is implemented. JSON Validator, JSON Minifier, and JSON Diff are intentionally deferred.

## Commands

```bash
npm run dev
npm run lint
npm test
npm run build
```
