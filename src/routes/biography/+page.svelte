<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import * as m from '$lib/paraglide/messages';

	// Phase 1 ships the shell. The vertical timeline, Practice panel, "Outside of
	// Work" card and CV CTAs land in Phase 3 from design/03-content-draft.md.
</script>

<svelte:head>
	<title>{m.site_name()} — {m.nav_biography()}</title>
</svelte:head>

<PageHeader eyebrow={m.nav_biography()} title={m.bio_title()} />
