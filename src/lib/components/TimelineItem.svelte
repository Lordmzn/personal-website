<script lang="ts">
	import type { TimelineStep } from '$lib/content/biography';

	let { step, index, isLast }: { step: TimelineStep; index: number; isLast: boolean } = $props();
</script>

<li class="relative flex gap-6 pb-10 last:pb-0">
	<!-- Vertical dashed connector, same rope treatment as the horizontal route
	     strip in the design system. Driven by an explicit `isLast` rather than a
	     `last:` variant: this element is the first child of the <li>, so a
	     last-child variant would never match the last step. -->
	{#if !isLast}
		<div
			class="absolute top-13 bottom-0 left-6.5 w-0.5"
			style="background: repeating-linear-gradient(180deg, rgba(249,115,22,0.2) 0px, rgba(249,115,22,0.2) 6px, transparent 6px, transparent 12px);"
			aria-hidden="true"
		></div>
	{/if}

	<div class="waypoint-marker shrink-0">{index + 1}</div>

	<div class="pt-2">
		<h3 class="text-[1.05rem] font-bold tracking-[-0.01em] text-orange-100">{step.title()}</h3>
		<div class="on-photo-label mt-1 font-mono text-[0.68rem] tracking-[0.08em] uppercase">
			{step.meta()}
		</div>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<p class="on-photo prose-links mt-3 leading-[1.7] text-slate-300">{@html step.body()}</p>
	</div>
</li>
