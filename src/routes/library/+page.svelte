<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import RopeDivider from '$lib/components/RopeDivider.svelte';
	import PubCard from '$lib/components/PubCard.svelte';
	import * as m from '$lib/paraglide/messages';
	import { publications, award, scholarProfile } from '$lib/content/publications';
	import PageMeta from '$lib/components/PageMeta.svelte';
</script>

<PageMeta title={m.nav_library()} description={m.meta_library_description()} />

<PageHeader eyebrow={m.nav_library()} title={m.library_title()} lede={m.library_lede()} />

<div class="mx-auto flex max-w-[820px] flex-col gap-5 px-8 pb-10">
	{#each publications as publication (publication.tag)}
		<PubCard {publication} />
	{/each}
</div>

<!-- The award's paper is [B9], not the [B10] the CV PDF cites — see the note in
     src/lib/content/publications.ts for why, and fix the CV repo to match. -->
<div class="mx-auto max-w-[820px] px-8 pb-16">
	<article class="compact-card flex gap-5 px-8 py-7" style="border-color: rgba(249,115,22,0.2);">
		<div class="shrink-0 text-[1.6rem] text-orange-400" aria-hidden="true">★</div>
		<div>
			<h3 class="text-[1rem] font-bold text-orange-100">{award.title()}</h3>
			<p class="mt-2 text-[0.85rem] leading-[1.6] text-slate-400">
				<em>{award.paper()}</em>
				{award.authors}. {award.venue()}
			</p>
		</div>
	</article>
</div>

<RopeDivider />

<section class="mx-auto max-w-[700px] px-8 pt-14 pb-24 text-center">
	<p class="on-photo mb-6 text-slate-300">{m.library_full_list()}</p>
	<a href={scholarProfile} target="_blank" rel="noopener" class="btn btn-lg btn-ghost">
		{m.link_scholar()}
	</a>
</section>
