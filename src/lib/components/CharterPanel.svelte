<script lang="ts">
	import type { Snippet } from 'svelte';

	// The gradient panel with corner marks, used for both the Practice manifesto
	// and "Outside of Work". design/02-design-system.md calls this .compact-card;
	// the name here says what it is rather than how big it is.
	let { label, children }: { label: string; children: Snippet } = $props();
</script>

<section class="compact-card px-12 py-14">
	<div class="compact-label mb-6">{label}</div>
	{@render children()}
</section>
