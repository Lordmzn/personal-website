<script lang="ts">
	import { base } from '$app/paths';
	import * as m from '$lib/paraglide/messages';
	import RopeDivider from '$lib/components/RopeDivider.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import { currentProjects, researchProjects } from '$lib/content/projects';
	import PageMeta from '$lib/components/PageMeta.svelte';
</script>

<PageMeta title={m.nav_portfolio()} description={m.meta_portfolio_description()} />

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

<!-- Current before Research: the original review's sharpest finding was that
     every card on the old site was pre-2019 academic work, with nothing
     representing Enersem or decktools. See design/01-review.md §5. -->
<section id="work" class="mx-auto max-w-[1100px] px-8 pt-16 pb-20">
	<h2 class="on-photo-label mb-5 text-center font-mono text-[0.68rem] tracking-[0.15em] uppercase">
		{m.portfolio_group_current()}
	</h2>
	<div class="mb-14 grid gap-6 sm:grid-cols-2">
		{#each currentProjects as project (project.id)}
			<FeatureCard {project} />
		{/each}
	</div>

	<h2 class="on-photo-label mb-5 text-center font-mono text-[0.68rem] tracking-[0.15em] uppercase">
		{m.portfolio_group_research()}
	</h2>
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each researchProjects as project (project.id)}
			<FeatureCard {project} />
		{/each}
	</div>
</section>
