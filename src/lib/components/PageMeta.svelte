<script lang="ts">
	import { page } from '$app/state';
	import { absoluteUrl } from '$lib/site';
	import { i18n } from '$lib/i18n';
	import * as m from '$lib/paraglide/messages';

	/**
	 * Per-page `<head>` tags. Only what differs per page lives here; anything
	 * identical across the site stays in +layout.svelte.
	 *
	 * The old CRA site shipped nothing beyond the boilerplate `<meta>` in
	 * public/index.html — no description, no canonical, no OG tags. That was
	 * flagged in design/01-review.md §6 as a discoverability gap.
	 */
	let { title, description }: { title: string; description: string } = $props();

	// `page.url` is absolute and correct during prerendering because
	// kit.prerender.origin is set; without it these would all name
	// http://sveltekit-prerender.
	const canonical = $derived(absoluteUrl(i18n.route(page.url.pathname)));
	const ogImage = absoluteUrl('/og-image.jpg');
	const fullTitle = $derived(`${title} — ${m.site_name()}`);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={m.site_name()} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImage} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>
