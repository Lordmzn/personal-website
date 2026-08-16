# lordmzn.it — implementation plan

Written by Claude Code locally, after reading `00`–`04`, the three mockups, the current React app, **and the sibling `LMdecktools` repo checked out at `../LMdecktools`** — which turns out to matter more than the handoff docs assumed. decktools isn't just a style reference; it is a working, documented, already-hardened version of exactly the build and deploy this site needs. Most of this plan is "copy what decktools already solved, change the three things that differ."

## What changed versus the handoff's assumptions

Four things I found locally that the Cowork session couldn't see:

1. **`../LMdecktools/docs/deployment.md` documents the whole hosting setup.** Tophost shared Apache; FTP home holds `/.htaccess`, `/cgi-bin/`, `/conf/`, `/htdocs/`; sites live under `/htdocs` and **the main website is `/htdocs` itself**. Only `www.lordmzn.it` resolves — the apex has no A record and the TLS cert has exactly one SAN.
2. **decktools already fixed its half of the FTP problem** (`.github/workflows/deploy.yml`): `FTP-Deploy-Action@v4.3.5`, `protocol: ftps`, explicit scoped `server-dir`, no `dangerous-clean-slate`, plus a guard step that fails the job if the target is ever edited to something shallower. That file is the template for this repo's deploy, with one inversion noted in Phase 0.
3. **`/htdocs/.htaccess` is load-bearing for decktools.** It carries the HTTPS redirect, and decktools' own child `.htaccess` deliberately declares no `RewriteEngine` because a child `RewriteEngine On` *replaces* the parent's rules instead of extending them. `/htdocs` is this site's document root — so once this repo ships a `static/.htaccess`, **it owns that file and can silently break decktools' HTTPS redirect.** This coupling is not mentioned anywhere in `00`–`04`.
4. **`../LMdecktools/.claude/skills/LM Deck Tools Design System/`** is a full design-system skill — `tokens/*.css`, component sources, guideline cards, the original `pirate-landing-v3.html`. `02-design-system.md` was reconstructed from it; the primary source is on disk.

Also confirmed available locally: all three CV PDFs are built at `../cv/{europass-eng,europass-ita,one-page-ita}/main.pdf`, so the mockups' EN/IT download buttons are real, not aspirational.

## Decisions taken

| | |
|---|---|
| **Stack** | SvelteKit 2 + Svelte 5 + Tailwind v4 + adapter-static, pnpm, Node 22 — mirroring decktools exactly |
| **i18n** | Paraglide scaffolded like decktools, **English only shipped**. All copy in `messages/en.json`; the nav's `EN · IT` switcher is omitted until `it-it.json` exists. Adding Italian later is a translation file, not a refactor |
| **Old server files** | Left in place by the deploy; removed by hand, by you, after the new site is verified live (list in Phase 6) |
| **Base path** | `''` — this site is the root, unlike decktools' `/decktools` |
| **`.htaccess`** | **Not shipped from this repo.** No `.htaccess` is tracked today and none will be added; `/htdocs/.htaccess` stays exactly as it is on the server, hand-managed. Consequences in Phase 4 |
| **Git** | Work on `rewrite/sveltekit`, squash-merge to `master` once verified. Every push to `master` deploys, so `master` stays deployable throughout |

---

## Phase 0 — CI safety. Ship first, alone, before any rewrite work

Independent of the redesign and the only item with an active blast radius. Do it as its own PR.

**Replace `.github/workflows/main.yml`** with a `deploy.yml` modeled on `../LMdecktools/.github/workflows/deploy.yml`:

- `SamKirkland/FTP-Deploy-Action@v4.3.5` (from `@2.0.0`, 2020, unmaintained)
- **Drop `ARGS: --delete` entirely.** v4 syncs against a manifest it keeps on the server and only deletes files it previously uploaded — it cannot remove anything it didn't put there. Never set `dangerous-clean-slate`
- `protocol: ftps` (explicit TLS on 21), `local-dir: ./build/`, `server-dir: ${{ env.SERVER_DIR }}`
- `SERVER_DIR: /htdocs/` as a plain `env:` value, not a secret — retargeting the deploy should require a reviewable diff
- **Guard step, inverted from decktools'.** decktools asserts its target is *at least one level below* `/htdocs`. This site's target *is* `/htdocs`, so that guard can't be reused — use an exact-match allowlist instead (`case "$SERVER_DIR" in /htdocs/) ;; *) exit 1 ;; esac`), which is what stops a typo from pointing a sync at `/` or at `/htdocs/decktools/`
- `concurrency: { group: deploy-production, cancel-in-progress: false }`
- `workflow_dispatch` with a `dry-run` boolean input
- No `permissions:` block — read-only is correct for a workflow that needs no token
- **Node stays on 12.x here, deliberately.** The original plan bumped it in this phase; that's wrong. Phase 0 still builds the CRA app, and `react-scripts` 3.3.0 is webpack 4, which hashes with MD4 — removed from OpenSSL 3, so the build dies with `error:0308010C:digital envelope routines::unsupported` on Node 17+. Bumping Node and hardening the deploy in one PR would mean a failing build masking whether the deploy fix works. The Node bump belongs in Phase 1, where the SvelteKit build arrives with it

**Verification gate before the first real run.** The current v2 action sets no remote dir, so it uploads to wherever the FTP login lands. decktools' doc says the login lands *above* `/htdocs` — if that's right, then `/htdocs/` is correct here; if the account is chrooted to `/htdocs`, the correct value is `/`. **Do not guess.** Run the workflow via `workflow_dispatch` with `dry-run: true` and read the log's upload list, or open an FTP client and look. Set `SERVER_DIR` from what you see. Getting this wrong publishes the site to a directory nothing serves.

Landing this on `master` triggers a deploy of the *current CRA build* through v4. That's safe: with no manifest on the server yet, the first v4 run uploads and deletes nothing.

Deliverable: `/decktools` can no longer be wiped by a push to this repo.

---

## Phase 1 — project skeleton

Branch `rewrite/sveltekit`. Scaffold to match decktools rather than running `sv create` and reconciling afterward.

- `package.json` — `"type": "module"`, `packageManager: pnpm@11.0.8`. Copy decktools' devDependencies minus what this site has no use for (`yjs`, `fake-indexeddb`, `@tailwindcss/forms`). Keep `@tailwindcss/typography`, `vitest`, `@testing-library/svelte`, `playwright`, eslint/prettier stack. Runtime deps: `@fontsource-variable/outfit`, `@fontsource/space-mono`, `@inlang/paraglide-sveltekit`
- `.nvmrc` (`22`), `.tool-versions` (`nodejs 22.22.0` / `pnpm 11.0.8`) — pnpm is already on the machine via asdf but has no version pinned for this directory
- `svelte.config.js` — `adapter-static({ fallback: '404.html' })`, `paths.base: ''`, **`paths.relative: false`** (decktools' comment explains why: relative bases break Paraglide's link resolution), `prerender.origin: 'https://www.lordmzn.it'`
- `vite.config.ts` — `sveltekit()`, `tailwindcss()`, `paraglide()`, plus decktools' `resolve.conditions` VITEST workaround for component tests
- `src/lib/site.ts` — `SITE_URL = 'https://www.lordmzn.it'`, `BASE_PATH = ''`, `absoluteUrl()`. Same kept-in-sync-by-test pattern
- `src/app.html` — decktools' verbatim, own favicon paths
- `src/app.css` — **copy decktools' token block verbatim** (`@theme` colors, fonts, radii, shadows), keep the `body::after` film-grain layer (this closes the "never added to any mockup" gap in `00-README.md` §Known gaps), keep `.eyebrow` / `.rope-divider` / `.surface-card` / `.corner-bracket` / `.btn*` / focus / reduced-motion. Then add the page-specific classes the mockups introduce and decktools doesn't have: `.hero*`, `nav`, `.page-header`, `.timeline`/`.tl-*`, `.pub-card`, `.compact-card`, `.waypoint`, `.prose-card`, `.project-links`. Fonts self-hosted via `@import '@fontsource-variable/outfit'` — the mockups' Google Fonts links do not survive
- `src/lib/i18n.ts` + `src/hooks.ts` + `project.inlang` + `messages/en.json`, copying decktools' Paraglide wiring
- Optionally copy `../LMdecktools/.claude/skills/LM Deck Tools Design System/` into `.claude/skills/` so future sessions have the tokens and component sources without reaching across repos

**Legibility rule from `02-design-system.md` §Corrections is a hard requirement, not a preference:** anything sitting directly on the photo background with no card behind it uses `orange-300` for mono/label text (not `slate-400`/`slate-500`) and carries a `text-shadow`. That rule exists because a previous pass shipped unreadable gray-on-photo. Encode it as a `.on-photo` utility so it can't be forgotten per-component.

---

## Phase 2 — delete the old app

One commit, after Phase 1 builds. Nothing here is ported.

**Delete:** `src/App.js`, `src/App.test.js` (the CRA "learn react" boilerplate that has been failing for years), `src/components/` (`Showcase.js`, `MdViewer.js`, `DataStories.js` — the last is an empty stub already hidden behind `{false && …}`), `src/index.js`, `src/index.css`, `src/logo.svg`, `src/serviceWorker.js`, `src/setupTests.js`, `public/` (CRA's `index.html`, `manifest.json`, logos), `yarn.lock`, the old `package.json`, `src/assets/prjcts/` (project thumbnails + `raspEnv.md` — the new design has no per-project images and no markdown viewer), `personal-website.sublime-workspace`.

**Keep and migrate:** `LICENSE`. `README.md` — rewrite for the new stack. `src/assets/background.jpg` and `design/assets/hero-bg.jpg` — pick one, re-crop and re-compress properly to `static/hero-bg.jpg` (the mockups inline a base64 copy at ~750KB per page; that is a mockup artifact, not a target).

**Content that dies with the old app, deliberately:** the I Ching hexagram 履 in the header, the `<embed>` of the CV PDF as the Biography tab, the `bibbase.org` iframe (plain `http` on an https page — browsers block it; the new Library leads with hand-picked publications and falls back to Google Scholar), the IMRR card (dead `xake.elet.polimi.it` domain), the Raspberry Pi / Looker Studio IoT card. The footer's 道可道 非常道 survives — it's in all three mockups.

---

## Phase 3 — routes and content

Three prerendered routes, `trailingSlash = 'always'` in `src/routes/+layout.ts` (decktools' `deployment.md` is explicit that this is what makes Apache's DirectoryIndex resolve `/biography/` with no rewrite rules — without it every URL except `/` 404s).

```
src/routes/
  +layout.svelte     nav + fixed photo background + footer
  +layout.ts         trailingSlash, prerender
  +page.svelte       Portfolio — hero, rope divider, Current + Research grids
  biography/+page.svelte   header, vertical timeline, Practice panel, Outside of Work, CV CTAs
  library/+page.svelte     header, 3 pub cards, award card, Scholar fallback
  +error.svelte      branded 404 (rendered via the fallback shell)
  sitemap.xml/+server.ts
```

Components in `src/lib/components/`: `Nav`, `Footer`, `RopeDivider`, `FeatureCard`, `TimelineItem`, `PubCard`, `CompactCard`, `PageHeader`.

**Content stays as data, not JSX-equivalent markup.** The old `Showcase.js` kept projects in a module-level `cards` array specifically so content edits didn't mean touching markup; that ergonomic is worth preserving. `src/lib/content/{projects,publications,timeline,principles}.ts`, typed, with the display strings pulled from `messages/en.json`. Seven projects (2 Current, 5 Research), 4 timeline steps, 3 publications + 1 award, 4 principles — exactly as in `03-content-draft.md`, which the mockups already match.

**Real URLs for the footer**, which the mockups leave as `href="#"` — from the current `App.js`: GitHub `github.com/Lordmzn`, LinkedIn `linkedin.com/in/emanuele-mason-a182112a/`, ResearchGate `researchgate.net/profile/Emanuele_Mason`, Scholar `scholar.google.it/citations?hl=it&user=MSo2pEEAAAAJ`, plus Spotify and the CV from the content draft.

**Nav:** text-only brand, three links, no language switcher (per the i18n decision), no skull-in-tricorn icon (dropped during review as "ridiculous").

---

## Phase 4 — static assets, SEO, and the `.htaccess` handover

`static/` contents:

- **No `.htaccess`.** Decided: this repo ships none, and `/htdocs/.htaccess` is left untouched on the server, hand-managed. Nothing is tracked today, so this is a "don't add it" rule rather than a deletion. It also removes the cross-repo landmine entirely — the file that carries decktools' HTTPS redirect can no longer be overwritten by a deploy from here, and `FTP-Deploy-Action@v4` won't touch it because it only deletes what it previously uploaded.

  Three things it would otherwise have configured are given up, and none are load-bearing:
  - **`ErrorDocument 404`** — unknown URLs get Tophost's default error page instead of the branded `404.html`. Routing itself is unaffected: `trailingSlash = 'always'` means every real route resolves via DirectoryIndex with no rewrite rules
  - **Cache headers** — `_app/immutable/*` is content-hashed, so correctness is fine either way; it just won't be cached for a year
  - **HTML `must-revalidate`** — the one with an actual failure mode. HTML filenames stay the same across deploys while the assets they reference get new hashes, so if the host applies heuristic caching a returning visitor can pin an old build. Watch for it after the first deploy; if it bites, the fix is a `<meta http-equiv="Cache-Control">` or a one-line addition you make by hand on the server, not a file in this repo
- **`robots.txt`** — this repo *does* own it: crawlers read `/robots.txt` at the domain root only, so this is the one file here that governs the whole domain including `/decktools`. `../LMdecktools/static/robots.txt` is inert where it deploys and says so in its own header; its two lines have **never been merged** into the root file. Do it here — `Disallow: /decktools/_app/` and `Sitemap: https://www.lordmzn.it/decktools/sitemap.xml`, alongside this site's own sitemap line. Note the current CRA `public/robots.txt` is the two-line default and already overwrites the root file on every deploy
- **`sitemap.xml`** — prerendered endpoint, three URLs
- **`cv/`** — copy `../cv/europass-eng/main.pdf` → `EmanueleMason-CV-EN.pdf` and `../cv/europass-ita/main.pdf` → `EmanueleMason-CV-IT.pdf`. Note in the README that these are build outputs of the `cv` repo and get refreshed by hand
- **Favicon + OG image** — the old CRA `favicon.ico`/`logo192.png` go. decktools' `jolly-roger.svg` is its brand, not this one; this site needs its own mark. Simplest honest option is a monogram on `slate-950`
- `<title>` / `<meta name="description">` / OG + Twitter tags per route. The old site had none beyond CRA defaults

---

## Phase 5 — quality gates

The current repo has **no build or test gate at all** — a broken build just fails the deploy job after the fact. Add `.github/workflows/ci.yml` copying decktools': `pnpm lint`, `pnpm check`, `pnpm test` on every push and PR, plus a Playwright job.

- Unit tests worth having: `site.test.ts` (`BASE_PATH` vs `kit.paths.base` drift), a content test asserting every link in `projects.ts`/`publications.ts` is an absolute `https:` URL — this is the test that would have caught the mockups' seven `href="#"` placeholders — and a messages test for missing keys
- Playwright smoke: all three routes render 200 with their `<h1>`, nav navigates between them, an unknown path renders the branded 404
- Make `deploy.yml` depend on CI passing (`needs:`), which the old workflow never did

---

## Phase 6 — deploy and verify

1. **Local static preview** of the real layout: `mkdir -p /tmp/htdocs && cp -R build/* /tmp/htdocs/ && cp -R ../LMdecktools/build /tmp/htdocs/decktools`, serve with `python3 -m http.server`. Catches base-path and asset-URL mistakes before they touch the host
2. **Dry run** — `workflow_dispatch` with `dry-run: true`, read the upload list, confirm the paths are what you expect
3. **Merge to `master`.** The push deploys. Upload order matters and the action handles it, but the rule behind it is decktools': hashed `_app/` assets before HTML, never the reverse
4. **Verify live** — `curl -sI https://www.lordmzn.it/` → 200; `/biography/` and `/library/` → 200; **`https://www.lordmzn.it/decktools/` → still 200**; `http://www.lordmzn.it/` → 301 to https. That last one should be unaffected now that no `.htaccess` ships from here, but check it anyway — it's the cheapest confirmation that the deploy stayed in its lane. `/nope/` will render Tophost's default 404, not the branded one; that's expected, per Phase 4
5. **Then, and only then, the manual FTP cleanup.** Delete from `/htdocs/`: `static/` (the CRA `js/`+`css/` output), `asset-manifest.json`, `precache-manifest.*.js`, `service-worker.js`, `manifest.json`, `logo192.png`, `logo512.png`, `favicon.ico` if replaced by a different filename, and any leftover `*.pdf`/`*.jpg` from the old bundle. **Do not touch** `/htdocs/decktools/`, `/htdocs/.htaccess`, `/htdocs/robots.txt`. Re-run the verification curls afterward
No service-worker migration is needed: `src/index.js:12` calls `serviceWorker.unregister()`, so the CRA service worker was never registered and no returning visitor is pinned to the old shell. Any `service-worker.js` / `precache-manifest.*.js` sitting on the server is inert build output — delete it in step 5 and nothing else is required.

---

## Open items — confirm before or during Phase 3

Carried from `00-README.md` §Known gaps, plus what I found locally. None block starting; all block shipping.

- ~~**Award citation `[B9]` vs `[B10]`**~~ — **resolved: it is `[B9]`**, "Water Resources Systems Operations via Multiagent Negotiation" (AAMAS 2016, Singapore), as the mockup already has it. The `[B10]` in the CV PDF is a bracket typo. **Still to fix in the `cv` repo** — out of scope here, but it's wrong there
- ~~**Paper `[A1]` has no DOI**~~ — **resolved: it stays missing.** The Library card links to the Google Scholar profile, as in the mockup. Don't revisit
- **Bibbase — still open.** `03-content-draft.md` keeps the embed as the "full list" link; the final mockup links only to Google Scholar. Building to the mockup (Scholar only) since it's the newer decision, but this is reversible until Phase 3 ships
- **`github.com/Lordmzn/mogle`** is listed in the CV's links checklist and does not resolve publicly. The "MORE" card says "previously known as MOGLE", so it's probably a rename leftover — decide: fix the CV link, publish the repo, or drop it
- **`github.com/Lordmzn/LMdecktools` public?** Confirmed mid-session during the Cowork review; re-check before shipping a link to it
- **CV PDFs**: confirm `europass-eng` / `europass-ita` are the right two to publish (vs. the one-page Italian), and that "last updated November 22, 2024" is still accurate — a stale date on a downloadable CV is worse than no date
- **`© 2026`** in all three mockup footers — make it a computed year
- **Hero CTA "Read the CV"** — target the EN PDF, or the Biography page's CV section?

## Sequencing

Phase 0 alone, today, as its own PR. Phases 1–2 next (skeleton green, old app gone — one branch, two commits, no half-migrated state). Phases 3–5 are the bulk of the work and can interleave. Phase 6 last, in order, with the manual cleanup strictly after live verification.
