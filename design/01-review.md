# lordmzn.it — Review & Upgrade Proposal

*Based on a read of the `personal-website` repo (master, last real commit Dec 2023 — mostly dependabot noise since), the `cv_upgrade_brief.md` in this project, and a link check of the current portfolio.*

## 1. The urgent fix: CI is nuking the whole FTP space

`.github/workflows/main.yml` deploys with:

```yaml
- name: FTP-Deploy-Action
  uses: SamKirkland/FTP-Deploy-Action@2.0.0
  with: ...
  ARGS: --delete
```

`--delete` tells the action to remove any file on the FTP server that isn't in `LOCAL_DIR` (`build`). Since `build/` only ever contains the React app's output, every push wipes everything else on the space — including `/decktools`, once you deploy it separately. This is the correct diagnosis of the symptom you described.

**Fix (do this first, independent of anything else below):**
- Upgrade the action to a current major (`SamKirkland/FTP-Deploy-Action@4.3.5`, the `2.0.0` tag is from 2020 and unmaintained) — it supports an `exclude` list.
- Add `/decktools/**` (and any other manually-managed paths) to `exclude`, or better, set `dangerous-clean-slate: false` (v4's safer default) and only allow `--delete`-equivalent behavior scoped to the site's own output directory.
- Alternative if you want zero risk of this ever happening again regardless of config drift: deploy the site to a subdirectory the CI owns exclusively (e.g. root already, decktools is separate — so exclusion is the right model) and keep decktools's own deploy job/action completely separate with its own scoped target.

This is a 10-minute change and worth shipping today, before any redesign work — it's the only item here with an active blast radius.

Also flag: the workflow builds on **Node 12.x**, which is long EOL and increasingly hard to get GitHub's `setup-node` to even provision reliably. Worth bumping regardless of what else changes.

## 2. Stack assessment: keep React, or move to Svelte?

Current stack: Create React App 3.3.0 (React 16, deprecated toolchain — CRA was officially deprecated by the React team), Material-UI v4 (predates the MUI v5 rename, styling via the old JSS `makeStyles`), Yarn classic.

Given you're using Svelte elsewhere and want Tailwind either way, here's the honest tradeoff:

**Rebuild in SvelteKit + Tailwind**
- Pro: one mental model across your projects, smaller bundle, SvelteKit gives you routing/SSR for free if you ever want it, clean slate to drop MUI's opinionated components entirely (which fights against a custom piratey theme anyway).
- Con: this site is small (single page, tabs) — a full rebuild is a few days of work, not a config change, since content (Showcase cards, PDF embed, bio) needs porting.

**Keep React, modernize + add Tailwind**
- Pro: much smaller diff — swap CRA for Vite (`vite + @vitejs/plugin-react`), drop MUI in favor of Tailwind utility classes, keep component structure (`Showcase.js`, `MdViewer.js`) largely intact.
- Con: doesn't consolidate your stack; you'd have two frontend frameworks across projects.

Given the site is essentially a single-page portfolio (not app-like, no complex state), **either is a reasonable size of effort — this is really a preference call**, not a technical constraint. If the appeal of Svelte is mostly "I want one framework everywhere," I'd lean Svelte. If you'd rather spend the time on content/design than on a rewrite, Vite+React+Tailwind gets you 90% of the benefit (fast build, no MUI, Tailwind theming) for a fraction of the migration cost. Worth a quick decision before I start building either way.

Tailwind itself: yes, straightforward win regardless of framework choice — it'll make the piratey/orange theme far easier to express consistently (custom color palette, custom fonts, textures) than fighting MUI's theme object.

**Decision made after this review**: SvelteKit + Tailwind. See `02-design-system.md` — the choice was further validated once `LMdecktools`'s actual stack was confirmed (SvelteKit 2 + Svelte 5 + Tailwind v4), so the new site will share infrastructure with decktools, not just a look.

## 3. Design direction: orange + "slightly piratey"

Current theme (`App.js`): orange/amber primary (`#f57f17`), olive-green secondary, dark brown translucent panels over a fixed background photo, I Ching hexagram (履) in the header, Chinese text (道可道...) in the footer — there's already a "philosophy through imagery" instinct here that pairs well with your kung-fu framing from the CV brief.

For "slightly piratey" without tipping into costume-party territory, I'd suggest:
- **Palette**: keep the orange/amber as the anchor, deepen the browns toward aged wood/leather/parchment tones, add a muted gold for accents (map ink, wax seal) instead of the current flat green secondary.
- **Typography**: a display serif with a bit of weathered character for headings (not a literal "pirate font" — those read as kitsch), clean sans for body copy.
- **Texture**: replace or complement the current background photo with a subtle parchment/aged-paper or nautical-chart texture — low contrast, doesn't fight readability.
- **Iconography, used sparingly**: a compass rose or ship's wheel as a loading/section-divider motif, an anchor or "X marks the spot" as a subtle bullet/CTA marker, a wax-seal-style badge for the "download CV" button.
- **Copy micro-touches**: your footer already has a literary/philosophical voice — a single well-placed nautical turn of phrase (e.g. framing the portfolio as "charted waters" or projects as a "log") goes further than repeated pirate-speak.
- **Nice thematic tie-in**: your HEMA (historical fencing) and martial arts background from the CV brief actually connects naturally to a nautical/adventurer motif — could be a genuine thread rather than decoration bolted on.

I'd treat this as "professional site with a wink," not a themed site — given this represents you professionally (it's linked from your CV), I'd keep any piratey elements as accents (favicon, one section divider, maybe the 404 page) rather than pervasive.

**Note**: this section was written before `LMdecktools`'s actual design system was pulled and reviewed — see `02-design-system.md` for the real, verified tokens that superseded these early guesses (typography ended up as Outfit + Space Mono, not a display serif; the palette is Tailwind's stock orange scale plus a custom dark slate).

## 4. Content refresh (from `cv_upgrade_brief.md`)

The brief is written for the CV docs, but the positioning applies directly to the "Biography" tab and site framing:
- **About/bio**: currently the tab just embeds the CV PDF directly — there's no actual web-native bio. Worth writing a short "systems thinker" narrative (environmental engineering → water resource management → RL/multi-agent AI → energy platforms) instead of relying on the PDF alone. The kung-fu philosophy line from the one-pager ("mastery through patient, sustained effort") is a strong pull-quote for the homepage or footer.
- **Personal site link**: the CV brief lists `lordmzn.it` as the personal website — good, just confirm the deployed site matches (worth double-checking DNS/HTTPS is solid, I couldn't reach it from this sandboxed environment to verify current live state, so worth you spot-checking).
- **Current role**: site doesn't currently reflect Enersem / Digital Solutions Manager / EMS platform work at all — the portfolio is entirely pre-2018 academic/research projects. This is the biggest content gap: your most recent and arguably most relevant professional work (the platform you actually build and ship today) isn't represented.

**Resolved**: see `03-content-draft.md` for the final approved copy that fills this gap.

## 5. Portfolio ("Showcase") review — what's live, what's dead weight

| Card | Links to | Status | Recommendation |
|---|---|---|---|
| IoT experiments | Google Data Studio dashboard | Loads (exists), but Data Studio has been rebranded/migrated to **Looker Studio** — link format is old, worth confirming it still redirects | Update link or retire; this is a hobby Raspberry Pi project, lowest relevance to current positioning |
| SEC negotiation protocol | DOI 10.1002/2017WR021431, `Lordmzn/evolving-tradeoffs` | Repo **exists** on GitHub, DOI presumably stable | Keep |
| Benefits of river restoration | wetlands.org report | Confirmed working by user | Keep |
| MORE (river erosion) | DOI 10.1029/2018WR022977, politesi.polimi.it thesis link | DOI stable; PoliMi thesis repo links are usually long-lived | Keep |
| DMMT | `Lordmzn/pydmmt` | Repo **exists**, confirmed on GitHub | Keep — also referenced in your CV brief's GitHub links, so it's already a "canonical" link |
| IMRR | `xake.elet.polimi.it/imrr` (and a report PDF on same domain) | **This domain looks dead** — `xake.elet.polimi.it` is an old PoliMi lab subdomain from the ELET department naming era (department was renamed years ago); I'd bet this 404s or fails DNS entirely | **Cut** — confirmed cut in `03-content-draft.md` |
| Classic thesis @ DEIB | `Lordmzn/ClassicThesis-at-DEIB` | Repo **exists**, has a `gh-pages` branch and tags | Keep — this one's a nice "useful open-source utility" entry, arguably worth promoting rather than cutting |

Also worth noting: the CV brief separately lists `github.com/Lordmzn/mogle` as a link that should be on the CV — **I checked and this repo does not resolve publicly** (private or deleted). Since "MORE" (the current showcase card) explicitly says "previously known as MOGLE," this is probably just a naming leftover, but flagging it so the CV and site don't both point at a dead repo.

**Bigger picture on the portfolio section**: every single card was pre-2019 academic/research work. Nothing represented Enersem, the EMS platform, or decktools. **Resolved**: `03-content-draft.md` groups the portfolio into "Current" (EMS Platform, LM Deck Tools) and "Research" (DMMT, SEC, MORE, Classic Thesis, river restoration review), with IMRR and the IoT/Raspberry Pi card cut.

## 6. Other things I noticed while reading the code

- `src/components/DataStories.js` is an empty stub — it's already hidden behind `{false && <Tab .../>}` in `App.js`. Either build it out or delete it; dead code either way. (Not carried into the SvelteKit rebuild — a fresh start doesn't need to port dead code.)
- `MdViewer.js` uses `react-markdown` v4's old `source` prop (renamed to `children` in v5+) — a leftover from the CRA-era dependency freeze. Moot once the rebuild happens.
- The "Library" tab embeds a `bibbase.org` iframe-style embed pulling from Zotero — this returned a 403 when checked from the Cowork sandbox (could be the sandbox, could be bibbase itself being flaky); worth a manual check since it's a fairly fragile integration to depend on for a "publications" page. **Resolved in content**: the new Library page leads with a hand-picked list of top publications and links to Google Scholar as the fallback for the full list, rather than leading with the bibbase embed.
- No `robots.txt`/sitemap or meta description beyond CRA defaults in `public/index.html` — minor SEO/discoverability gap worth fixing during the rebuild.

## Proposed sequencing

1. **Now, independent of everything else**: fix the FTP `--delete` scope so decktools deploys safely. Small, urgent, no design/stack dependency.
2. ~~Decide: Svelte rewrite vs. React+Vite+Tailwind modernization~~ — **decided: SvelteKit + Tailwind**.
3. ~~Content pass~~ — **done**, see `03-content-draft.md`.
4. ~~Design pass~~ — **done**, see `02-design-system.md` and `mockups/`.
5. **Next**: real SvelteKit implementation from the mockups + content draft, plus the CI fix — this is the remaining work, best done locally with push access and the ability to test the live deploy.
