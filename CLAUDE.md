# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is Yarn classic (`yarn.lock`). `node_modules/` is not checked in — run `yarn install` first.

```bash
yarn start          # dev server on http://localhost:3000
yarn build          # production build into build/ (what CI deploys)
yarn test           # Jest + React Testing Library in watch mode
CI=true yarn test    # single non-interactive run
yarn test -- -t "renders"   # run tests matching a name
```

There is no separate lint command — ESLint (`react-app` config) runs as part of `react-scripts start`/`build`.

## Architecture

Create React App 3.3.0 / React 16 single-page site, no router. All navigation is local state.

- `src/App.js` is effectively the whole app shell: it defines the Material-UI theme (orange `#f57f17` primary, olive secondary, translucent dark-brown panels over a fixed background photo from `src/assets/background.jpg`), the AppBar with external profile links, and the tab panels. Tab selection is a `useState` index rendered through an object literal keyed by index (`{0: <Showcase/>, 1: <embed cv>, ...}`), so adding a tab means touching both the `<Tab>` list and that map. Tab 3 (`DataStories`) is gated behind `{false && ...}` and its component is an empty stub.
- Tabs 1 and 2 are not React content at all: Biography is an `<embed>` of the bundled `src/assets/cv_EmanueleMason.pdf`, Library is an `<embed>` of an external bibbase.org URL (loaded over plain `http`, which browsers block on an https page).
- `src/components/Showcase.js` is the portfolio. Project content lives in the module-level `cards` array — edit that array, not JSX, to change projects. Each card's `actions` entries are dispatched by `action.type` (`code-github`, `external-link`, `internal-link`, `article`) through another object-literal-as-switch; `internal-link` swaps the Showcase's own `activeStuff` state to render a sub-view instead of the grid (currently only `RaspEnvDashboard`).
- `src/components/MdViewer.js` fetches a markdown file by URL and renders it with `react-markdown`. Markdown lives in `src/assets/prjcts/` and is imported as a path (CRA file-loader), then fetched at runtime.
- Styling is MUI v4 JSS (`makeStyles` / `createMuiTheme`), the pre-MUI-v5 API. No CSS modules or Tailwind.

## Deployment

`.github/workflows/main.yml` runs on every push to `master`: `yarn install && yarn build`, then FTP-uploads `build/` via `SamKirkland/FTP-Deploy-Action@2.0.0` using `FTP_SERVER`/`FTP_USERNAME`/`FTP_PASSWORD` repo secrets. There is no build/test gate — a broken build just fails the job.

**Known hazard:** the action runs with `ARGS: --delete`, which removes anything on the FTP server not present in `build/` — it wipes sibling paths on the same space (e.g. `/decktools`) on every deploy. Do not push to `master` casually without being aware of this. `design/01-review.md` §1 has the intended fix (upgrade to `@4.3.5`, use `exclude` / `dangerous-clean-slate: false`). The workflow also still pins Node 12.x.

## Repo state

- `src/App.test.js` is the untouched CRA boilerplate test looking for "learn react" text that no longer exists — it fails. Replace it rather than trusting it as a baseline.
- `design/` (untracked, not committed) is a handoff package for a planned full rewrite to **SvelteKit 2 + Svelte 5 + Tailwind v4**, matching the sibling `LMdecktools` repo. Read `design/00-README.md` first; it points to the audit, design tokens, approved copy, and static HTML mockups in `design/mockups/`. The mockups are reference-only, not production code. Before doing substantial work on the current React app, check whether the request is meant to land in the rewrite instead.
