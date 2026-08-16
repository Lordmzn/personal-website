<script lang="ts">
	import { base } from '$app/paths';
	import * as m from '$lib/paraglide/messages';
	import RopeDivider from '$lib/components/RopeDivider.svelte';

	// Phase 1 ships the hero only. The Current/Research project grid lands in
	// Phase 3 from design/03-content-draft.md — see design/05-implementation-plan.md.
</script>

<svelte:head>
	<title>{m.site_name()} — {m.nav_portfolio()}</title>
</svelte:head>

<section
	class="flex min-h-[70vh] flex-col items-center justify-center px-8 pt-20 pb-16 text-center"
>
	<div class="hero-tag mb-8">
		<span class="dot"></span>
		{m.hero_eyebrow()}
	</div>

	<h1
		class="mb-5 text-[clamp(3rem,7vw,5rem)] leading-[1.02] font-black tracking-[-0.035em] text-white"
		style="text-shadow: 0 4px 30px rgba(0,0,0,0.5);"
	>
		{m.hero_headline_lead()}<br />
		<span class="bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent">
			{m.hero_headline_accent()}
		</span>
	</h1>

	<p class="on-photo mx-auto max-w-[480px] text-[1.1rem] leading-[1.7] text-slate-300">
		{m.hero_subhead()}
	</p>

	<div class="mt-10 flex flex-wrap justify-center gap-3">
		<a href="#work" class="btn btn-lg btn-primary">{m.hero_cta_work()}</a>
		<a href="{base}/cv/EmanueleMason-CV-EN.pdf" class="btn btn-lg btn-ghost">
			{m.hero_cta_cv()}
		</a>
	</div>
</section>

<RopeDivider />

<section id="work" class="mx-auto max-w-[1100px] px-8 pt-16 pb-20"></section>
