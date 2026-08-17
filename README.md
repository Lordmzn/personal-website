# lordmzn.it

Personal site of Emanuele Mason — portfolio, biography, publications. Live at
**https://www.lordmzn.it**.

SvelteKit 2 + Svelte 5, Tailwind v4, prerendered to static HTML with
`adapter-static`. It shares its design system and build shape with
[LMdecktools](https://github.com/Lordmzn/LMdecktools), which is deployed into
`/decktools/` on the same domain.

## Commands

Requires Node 22 (`.nvmrc`) and pnpm 11 (`packageManager`). `node_modules/` is
not checked in.

```bash
pnpm install         # also compiles Paraglide messages, via `prepare`
pnpm dev             # dev server on http://localhost:5173
pnpm build           # static build into build/
pnpm preview         # serve the production build

pnpm lint            # prettier --check && eslint
pnpm check           # svelte-check
pnpm test            # vitest
pnpm paraglide       # recompile messages only
```

CI runs `lint`, `check`, `test` and `build` on every push and PR.

## Where things live

|                    |                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------- |
| `src/routes/`      | Three prerendered pages plus `sitemap.xml` and the 404 shell                       |
| `src/lib/content/` | **All page content**, as typed data — edit here, not in markup                     |
| `messages/en.json` | Every display string. Compiled to `src/lib/paraglide/` (generated, gitignored)     |
| `src/app.css`      | Design tokens and component classes, shared with decktools                         |
| `static/`          | Photo, favicons, OG image, CVs, `robots.txt`                                       |
| `design/`          | Handoff package: audit, design system, approved copy, mockups, implementation plan |

Start with `design/00-README.md`, then `design/05-implementation-plan.md` for
what is done and what is left.

### Editing content

Project cards, timeline steps, publications and principles are arrays in
`src/lib/content/`. URLs and glyphs live in those files; the prose lives in
`messages/en.json` and is referenced by message function. Tests in
`src/lib/__tests__/` assert that outbound links are real absolute https URLs,
that a couple of settled decisions stay settled (the award's citation, [A1]
having no DOI), and that the sitemap matches the routes that exist.

### Adding Italian

Paraglide is wired up but only `en` is registered. To add Italian: add
`"it-it"` to `languageTags` in `project.inlang/settings.json`, create
`messages/it-it.json`, and add the language switcher back to `Nav.svelte`.
No route changes are needed.

### Regenerating static assets

`static/og-image.jpg` is rendered from `design/og-image.html`. That file
references the fonts and background photo relatively, so copy them alongside it
first:

```bash
work=$(mktemp -d)
cp design/og-image.html "$work/index.html"
cp static/hero-bg.jpg "$work/hero-bg.jpg"
cp node_modules/.pnpm/@fontsource-variable+outfit@*/node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2 "$work/outfit.woff2"
cp node_modules/.pnpm/@fontsource+space-mono@*/node_modules/@fontsource/space-mono/files/space-mono-latin-700-normal.woff2 "$work/space-mono.woff2"

"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --hide-scrollbars --allow-file-access-from-files \
  --force-device-scale-factor=1 --window-size=1200,630 \
  --screenshot="$work/og.png" "file://$work/index.html"

sips -s format jpeg -s formatOptions 82 "$work/og.png" --out static/og-image.jpg
```

JPEG rather than PNG: the photo makes a PNG roughly five times larger for no
visible gain.

`static/hero-bg.jpg` is a downscaled, heavily-compressed crop of the original
camera export (kept in `design/assets/`). It sits under a dark gradient, so it
does not need to be pristine — but it is the heaviest asset on every page, and a
test caps it at 500 KB:

```bash
sips -Z 1920 -s format jpeg -s formatOptions 40 <original>.jpg --out static/hero-bg.jpg
```

### CVs

`static/cv/EmanueleMason-CV-{EN,IT}.pdf` are built from the sibling `cv` repo
(`europass-eng/main.pdf` and `europass-ita/main.pdf`) and copied over by hand.
Refresh them whenever that repo is rebuilt.

## Deployment

Pushing to `master` builds and uploads `build/` to Tophost over FTPS
(`.github/workflows/deploy.yml`). The workflow can also be run manually with
`dry-run: true` to see what it would upload without uploading anything.

Two things about that deploy are load-bearing and easy to undo by accident:

- **`SERVER_DIR` is `/htdocs/`, the main site's document root**, and a guard
  step fails the job unless it is exactly that. `/htdocs/decktools/` is a
  sibling deployed from another repo.
- **`dangerous-clean-slate` is never set.** The action syncs against a manifest
  it keeps on the server and only deletes files it uploaded itself. An earlier
  version of this workflow used `--delete`, which wiped `/decktools` on every
  push.

This repo deliberately ships **no `.htaccess`**. `/htdocs/.htaccess` is
hand-managed on the server and carries the HTTPS redirect that `/decktools`
depends on; a file here would overwrite it on every deploy.

`static/robots.txt` governs the whole domain, decktools included — crawlers only
read `/robots.txt` at the root. Keep the `/decktools/` lines in it.
