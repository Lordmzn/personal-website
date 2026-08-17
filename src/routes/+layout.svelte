<script lang="ts">
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { i18n } from '$lib/i18n';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<ParaglideJS {i18n}>
	<!-- z-2 puts every page above the fixed photo backdrop (z-0) and the film
	     grain (z-1) that body::before / body::after paint. -->
	<div class="relative z-2 flex min-h-screen flex-col">
		<Nav />
		<main class="flex-1">
			{@render children()}
		</main>
		<Footer />
	</div>
</ParaglideJS>
