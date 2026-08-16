<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages';
</script>

<svelte:head>
	<title>{page.status} — {m.site_name()}</title>
</svelte:head>

<section class="flex min-h-[60vh] flex-col items-center justify-center px-8 text-center">
	<div class="on-photo-label font-mono text-[0.62rem] tracking-[0.2em] uppercase">
		{page.status}
	</div>
	<h1 class="mt-4 mb-4 text-5xl font-black tracking-tight text-white">{m.error_title()}</h1>
	<p class="on-photo mb-8 text-slate-300">{m.error_body()}</p>
	<a href="{base}/" class="btn btn-lg btn-ghost">{m.error_home()}</a>
</section>
