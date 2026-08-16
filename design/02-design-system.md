# lordmzn.it — Design System (real tokens, pulled from LMdecktools repo)

Source: `github.com/Lordmzn/LMdecktools` (`src/app.css`, `docs/pirate-landing-v3.html`, `package.json`) — repo access worked on retry. This replaces an earlier version of this doc that was built from visual approximation of screenshots only; those guesses (Baloo 2, Inter, JetBrains Mono, a slightly different palette) are superseded by the values below.

## Stack confirmed

SvelteKit 2 + Svelte 5, Tailwind CSS v4 (via `@theme` in `app.css`, no separate `tailwind.config.js`), TypeScript, Yjs for local CRDT storage. This validates the SvelteKit + Tailwind direction chosen for the main site — it'll sit on the same stack as decktools, not just share a look.

## Fonts (exact)

- **Outfit** (variable, weights 400–900) — used for everything: headings and body both (`--font-sans` and `--font-display` are the same value in their tokens).
- **Space Mono** (400, 700) — eyebrows, labels, numeric badges, footer legal text.
- Loaded self-hosted in the real app via `@fontsource-variable/outfit` + `@fontsource/space-mono` — no third-party font requests. The mockups in this folder load them from Google Fonts for convenience only; production should self-host to match decktools' own "no third-party requests, works offline" principle.

## Color tokens (exact, from `src/app.css` and `docs/pirate-landing-v3.html`)

| Token | Value |
|---|---|
| `orange-50`…`orange-700` | `#fff7ed, #ffedd5, #fed7aa, #fdba74, #fb923c, #f97316, #ea580c, #c2410c` (this is Tailwind's *stock* orange scale) |
| `slate-950` (page bg) | `#0a0c10` |
| `slate-900` (card surface) | `#0f1218` |
| `slate-800` (raised surface) | `#1a1d26` |
| `slate-700` / `slate-500` / `slate-400` / `slate-300` | `#272b36 / #636878 / #8b90a0 / #b0b4c0` — **custom** slate scale, deliberately darker/less blue than Tailwind's stock slate at the low end |

Hero gradient accent (headline word): `linear-gradient(135deg, orange-400, orange-600)`. Primary button: solid `orange-500` fill with **dark** (`slate-950`) text, not white — decktools' own `app.css` has a comment flagging that white-on-orange-500 is only 2.9:1 contrast vs. 7:1 for dark text, so the current app deliberately uses dark text on solid orange.

**Legibility rule for anything sitting directly on the photo background with no card behind it** (hero copy, the vertical timeline on Biography): mono/label text uses `orange-300` rather than `slate-500`/`slate-400` — those read as near-invisible against a bright photo — and everything gets a `text-shadow` (e.g. `0 1px 8px rgba(0,0,0,0.8)` for small mono labels, `0 1px 10px rgba(0,0,0,0.75)` for body copy). Content inside a card (`.feature-card`, `.pub-card`, etc.) doesn't need this since the solid `slate-900` card background already provides contrast. (This rule exists because the first pass of the Biography timeline shipped with unreadable gray-on-photo text — see "Corrections" below.)

## Component patterns (exact CSS, from `docs/pirate-landing-v3.html` + `src/app.css`)

- **`.hero-tag`**: pill badge, `rgba(249,115,22,0.08)` bg, `1px solid rgba(249,115,22,0.15)` border, pill radius, Space Mono 0.65rem uppercase text, small pulsing dot.
- **`.rope-divider`**: two `.rope-line` segments + a `.rope-knot` circle between them. The line is a `repeating-linear-gradient` (8px orange-600 dash, 4px gap, 8px orange-700 dash, 4px gap) at 0.2 opacity — this is the "rope" texture, not a plain CSS dashed border.
- **`.feature-card`**: solid `slate-900` background, `1px solid rgba(249,115,22,0.08)` border, 16px radius, a corner-bracket accent (`::before`, top-right, grows on hover), lifts 4px + glows on hover. Reused directly for the Portfolio project grid with an added `.project-links` footer row for outbound links.
- **`.route` / `.waypoint`** (Portfolio, short captions): 4-up grid connected by a dashed horizontal line (`repeating-linear-gradient`); each waypoint is a 52px circle, 2px solid `orange-500` border, `slate-900` fill, Space Mono number inside.
- **Vertical timeline** (Biography, full paragraphs — new pattern, not from the decktools repo): same waypoint-marker circle, stacked vertically with a `repeating-linear-gradient` vertical connector instead of horizontal.
- **`.compact-card`** (manifesto/principles panel): `linear-gradient(160deg, rgba(249,115,22,0.06) 0%, rgba(15,18,24,0.9) 50%)`, 1px orange border at 0.12 opacity, 20px radius, corner-bracket marks top-left/bottom-right (like a charter document), centered label with flanking hairlines, blockquote, then a numbered articles list below a hairline rule. Also reused for Biography's "Outside of Work" card.
- **`.pub-card`** (Library — new pattern): small Space Mono tag box for the citation code ([A5]/[A4]/[A1]) + title/authors/journal-meta/DOI link.
- **Film grain**: a fixed, full-viewport SVG `feTurbulence` noise layer at 0.04 opacity sits above the background and below content on every page in the real decktools app. **Not yet added to any mockup in this folder** — worth adding for full visual parity when this moves to the real SvelteKit build.

## Page inventory (content in `03-content-draft.md`, visuals in `mockups/`)

Site is 3 tabs, no separate "Home" — Portfolio doubles as landing via a short hero.

- **Portfolio** (`mockups/portfolio.html`): hero (pill, two-tone headline, honest bio copy) → rope divider → **project grid** (Current: EMS Platform, LM Deck Tools; Research: DMMT, SEC, MORE, Classic Thesis @ DEIB, river restoration review — each a `.feature-card` with real outbound links) → footer. (The career timeline and Practice panel were removed from this page — they live only on Biography now, to avoid duplication.)
- **Biography** (`mockups/biography.html`): page header → vertical timeline (full paragraphs per career step) → rope divider → Practice/manifesto panel (English quote) → "Outside of Work" prose card (gradient-panel treatment matching the manifesto panel) → CV download CTAs (EN/IT) → footer.
- **Library** (`mockups/library.html`): page header → publication cards (A5/A4/A1, citations pulled from the CV PDF, not invented) → award card → rope divider → "View on Google Scholar" fallback → footer.

Footer link row, all three pages: GitHub, LinkedIn, ResearchGate, Scholar, Spotify, CV. ResearchGate was on the original site (`App.js`) and had been dropped in an early mockup pass; restored.

## Corrections made across the review/feedback cycle (useful context if something looks like it was fixed for a reason)

- Dropped an invented skull-in-tricorn nav icon ("ridiculous" per feedback) — nav is text-only, just the name.
- Swapped a placeholder CSS gradient background for a real user-supplied photo (fixed/cover, dark overlay for text contrast, translucent/solid cards on top depending on component).
- Fixed several factual errors in early copy drafts: one platform not "platforms" (EMS at Enersem), "Shaolin" not "Shaolin Chang" (not a real style name — later further simplified per request, dropping even the "(Chang style)" qualifier), no invented "practices at night" framing, fencing corrected to "sabers and other swords" (not "longswords"), no invented racing hobby (F1 is spectator-only per the CV brief).
- Swapped every visually-guessed design token for the real ones once `LMdecktools` repo access worked (see Fonts/Colors above).
- Portfolio's project grid was accidentally left out of two mockup revisions (a leftover 3-card teaser row from before content was finalized stood in its place) — fixed, now matches `03-content-draft.md` exactly.
- Biography timeline text contrast was fixed (see the legibility rule above) and the "Outside of Work" card was changed from a flat solid box to match the Practice panel's gradient treatment.
- Library's award citation was wrong: the CV PDF lists "Apr 2016 IDEAS 2016 Best Paper Award – [B10]", but [B10] is the M3O Matlab toolbox paper at iEMSs 2016 (Toulouse) — an environmental-modelling-software conference with no connection to "IDEAS" or "AAMAS Workshop Chairs" (also named in the award line). [B9], "Water Resources Systems Operations via Multiagent Negotiation," was presented at AAMAS 2016 in Singapore — that's the actual match, and is now used. Likely a bracket typo in the source CV itself — **worth confirming against the real award certificate/email if available**, since this is inferred from an internal inconsistency in the CV text, not independently confirmed.
