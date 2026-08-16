# lordmzn.it redesign — design handoff

Produced in a Cowork session (Claude, cloud sandbox) reviewing `personal-website` and cross-referencing `LMdecktools` (your MTG app repo) for a shared visual identity. This folder is meant to be dropped into the `personal-website` repo (e.g. as `docs/design/`) and picked up by Claude Code locally, where there's push access and the GitHub Actions secrets needed to actually test deployment.

## Read in this order

1. **`01-review.md`** — audit of the current site: the CI bug, stack assessment, dead links, structural issues. Start here for the "why."
2. **`02-design-system.md`** — the actual design tokens (colors, fonts, component CSS patterns), pulled directly from `LMdecktools`'s `src/app.css` and `docs/pirate-landing-v3.html` (not guessed — verified against source). Also documents what changed across mockup revisions and why, plus a couple of open corrections worth double-checking (see "Corrections" section).
3. **`03-content-draft.md`** — final approved copy for all three pages (Portfolio/Biography/Library), including real links, real publication citations (pulled from `europasseng 2.pdf`, not invented), and every wording edit that was requested.
4. **`04-cv-upgrade-brief.md`** — reference copy of the CV positioning brief from the sibling `cv` repo project, for consistency between the CV and the website (same facts, same voice).
5. **`mockups/`** — three static HTML files (`portfolio.html`, `biography.html`, `library.html`) implementing the approved design + content. These are **not** production code — no framework, inline `<style>`, a base64-embedded placeholder background image. They exist so you can open them in a browser and see exactly what "done" should look like pixel-for-pixel, before translating to real SvelteKit components.
6. **`assets/hero-bg.jpg`** — the background photo used in the mockups (yours, provided during the session). Production should probably re-crop/re-compress this properly rather than reuse the mockups' inlined base64 version.

## The one urgent, independent item

Fix `.github/workflows/main.yml` **before** anything else here — it currently deploys with `ARGS: --delete` on `SamKirkland/FTP-Deploy-Action@2.0.0`, which wipes the entire FTP space (including `/decktools`) on every push. See `01-review.md` §1 for the exact fix. This has nothing to do with the redesign and shouldn't wait on it.

## Stack decision already made

SvelteKit + Tailwind CSS v4, matching `LMdecktools` exactly (confirmed via its `package.json`: SvelteKit 2, Svelte 5, `@tailwindcss/vite`, `@fontsource-variable/outfit`, `@fontsource/space-mono`). Not React/Vite — that alternative was considered in `01-review.md` but Svelte was the final call.

## Known gaps / things Claude Code should double check locally

- **Award citation in Library** (`03-content-draft.md` / `02-design-system.md`): the CV PDF cites `[B10]` next to the "IDEAS 2016 Best Paper Award," but that bracket appears to be a typo — the actual match is `[B9]` (AAMAS 2016, Singapore). Mockup uses B9. Worth confirming against the real award certificate/email if available.
- **Paper [A1]** ("Curses, tradeoffs...") has no DOI anywhere in the source CV or the current live site. Mockup links to the Google Scholar profile instead of a fabricated DOI — add the real one if you have it.
- **decktools repo link**: mockups link to `github.com/Lordmzn/LMdecktools` on the assumption it's public now (confirmed mid-session) — sanity check it's still public before shipping.
- **Film grain texture**: `LMdecktools`'s real `app.css` has a subtle fixed SVG noise overlay (`feTurbulence`, 0.04 opacity) on every page. It's documented in `02-design-system.md` but was never added to any of the static mockups — worth adding for full visual parity.
- **Fonts in mockups are Google-Fonts-hosted** (`fonts.googleapis.com`) for convenience; production should self-host via `@fontsource-variable/outfit` + `@fontsource/space-mono` like `LMdecktools` does (no third-party font requests — this matches decktools' own stated "no third-party requests, works offline" principle in its `app.css` comments).
