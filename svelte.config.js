import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// `fallback` gives unknown URLs a branded page: the client router fails
		// to match the path and +error.svelte renders.
		//
		// Unlike LMdecktools, nothing points Apache at it — this site ships no
		// .htaccess (see design/05-implementation-plan.md, Phase 4), so there is
		// no `ErrorDocument 404` and the host serves its own error page for
		// unknown paths. The fallback still covers a client-side navigation to a
		// bad route, which is why it stays.
		adapter: adapter({ fallback: '404.html' }),

		paths: {
			// Empty, not '/decktools': this site IS the document root. The
			// decktools app is a subfolder of it and sets its own base.
			base: '',

			// SvelteKit defaults this to `true`, which makes `base` a relative
			// string like `../..`. That breaks Paraglide, which resolves links
			// against the locale-stripped URL — a segment shallower than the
			// localised one the relative base was measured from — so the base
			// overshoots and links are left untranslated. Absolute paths remove
			// the ambiguity. Harmless while `base` is empty; load-bearing the
			// moment a locale prefix appears, which is why it is set now.
			relative: false
		},

		prerender: {
			// Prerendering has no request to read a host from, so `url.origin`
			// would otherwise be the placeholder `http://sveltekit-prerender`
			// and get baked into canonical/alternate links. Keep in sync with
			// SITE_URL in src/lib/site.ts — site.test.ts fails if they drift.
			origin: 'https://www.lordmzn.it',

			// /decktools/ is a real URL on this domain but it is not part of this
			// app: LMdecktools deploys its own build into that subfolder. Because
			// `origin` above makes it same-origin, the crawler treats the
			// portfolio's link to it as internal and fails the build on the 404.
			//
			// Scoped deliberately to that one prefix and rethrowing everything
			// else, so the build keeps working as a link checker for our own
			// routes — which is the reason `pnpm run build` is a CI step.
			handleHttpError: ({ path, referrer, message }) => {
				if (path === '/decktools' || path.startsWith('/decktools/')) return;
				throw new Error(`${message} (linked from ${referrer})`);
			}
		}
	}
};

export default config;
