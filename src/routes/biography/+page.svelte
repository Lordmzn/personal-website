<script lang="ts">
	import { base } from '$app/paths';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import RopeDivider from '$lib/components/RopeDivider.svelte';
	import TimelineItem from '$lib/components/TimelineItem.svelte';
	import CharterPanel from '$lib/components/CharterPanel.svelte';
	import * as m from '$lib/paraglide/messages';
	import { timeline, principles, cvDownloads } from '$lib/content/biography';
	import PageMeta from '$lib/components/PageMeta.svelte';
</script>

<PageMeta title={m.nav_biography()} description={m.meta_biography_description()} />

<PageHeader eyebrow={m.nav_biography()} title={m.bio_title()} />

<!-- Full paragraphs per step, not the title/date pairs an earlier mockup had.
     This page exists to close the biggest content gap in the original review:
     the old site's Biography tab was an <embed> of the CV PDF, with no
     web-native bio at all. -->
<ol class="mx-auto max-w-[720px] list-none px-8 pb-16">
	{#each timeline as step, i (step.id)}
		<TimelineItem {step} index={i} isLast={i === timeline.length - 1} />
	{/each}
</ol>

<RopeDivider />

<div class="mx-auto max-w-[700px] px-8 pt-16 pb-12">
	<CharterPanel label={m.practice_label()}>
		<blockquote class="mb-8 text-center text-[1.1rem] leading-[1.75] text-slate-300 italic">
			{m.practice_quote()}
		</blockquote>
		<ol
			class="mx-auto flex max-w-[440px] list-none flex-col gap-3 border-t pt-6"
			style="border-color: var(--border-subtle);"
		>
			{#each principles as principle (principle.numeral)}
				<li class="flex items-start gap-3 text-[0.85rem] leading-[1.5] text-slate-400">
					<span
						class="mt-0.5 shrink-0 font-mono text-[0.6rem] font-bold text-orange-500 opacity-70"
					>
						{principle.numeral}
					</span>
					<span>
						<strong class="font-semibold text-orange-200">{principle.lead()}</strong>
						{principle.body()}
					</span>
				</li>
			{/each}
		</ol>
	</CharterPanel>
</div>

<div class="mx-auto max-w-[700px] px-8 pb-12">
	<CharterPanel label={m.outside_label()}>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<p class="prose-links text-center leading-[1.8] text-slate-300">{@html m.outside_body()}</p>
	</CharterPanel>
</div>

<section class="mx-auto max-w-[700px] px-8 pb-24 text-center">
	<h2 class="mb-6 text-[1.4rem] font-bold text-white">{m.cv_heading()}</h2>
	<div class="flex flex-wrap justify-center gap-3">
		{#each cvDownloads as cv, i (cv.href)}
			<a href={`${base}${cv.href}`} class="btn btn-lg {i === 0 ? 'btn-primary' : 'btn-ghost'}">
				{cv.label()}
			</a>
		{/each}
	</div>
</section>
