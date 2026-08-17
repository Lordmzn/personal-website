<script lang="ts">
	import type { Publication } from '$lib/content/publications';

	let { publication }: { publication: Publication } = $props();
</script>

<article class="surface-card surface-card-hover flex gap-5 p-6">
	<div
		class="h-fit shrink-0 rounded-lg border px-2.5 py-1 font-mono text-[0.7rem] font-bold text-orange-400"
		style="background: rgba(249,115,22,0.08); border-color: var(--border-subtle);"
	>
		{publication.tag}
	</div>

	<div class="min-w-0">
		<h3 class="text-[1rem] leading-snug font-bold text-orange-100">{publication.title()}</h3>
		<div class="mt-2 text-[0.82rem] text-slate-400">{publication.authors}</div>
		<div class="mt-1 font-mono text-[0.7rem] tracking-[0.04em] text-slate-500">
			{publication.venue()}
		</div>
		<a
			href={publication.link.href}
			target="_blank"
			rel="noopener"
			class="mt-3 inline-block text-[0.8rem] font-semibold text-orange-300 no-underline hover:text-orange-200 hover:underline"
		>
			{publication.link.label()} →
		</a>
	</div>
</article>
