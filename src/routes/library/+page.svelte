<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import * as m from '$lib/paraglide/messages';

	// Phase 1 ships the shell. Publication cards, the award card and the Scholar
	// fallback land in Phase 3 from design/03-content-draft.md.
</script>

<svelte:head>
	<title>{m.site_name()} — {m.nav_library()}</title>
</svelte:head>

<PageHeader eyebrow={m.nav_library()} title={m.library_title()} lede={m.library_lede()} />
