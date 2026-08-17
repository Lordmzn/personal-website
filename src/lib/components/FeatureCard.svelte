<script lang="ts">
	import type { Project } from '$lib/content/projects';

	let { project }: { project: Project } = $props();
</script>

<article class="surface-card surface-card-hover corner-bracket overflow-hidden p-8">
	<div
		class="mb-6 flex h-13 w-13 items-center justify-center rounded-xl border text-[1.3rem] text-orange-400"
		style="background: rgba(249,115,22,0.1); border-color: rgba(249,115,22,0.12);"
		aria-hidden="true"
	>
		{project.glyph}
	</div>

	<h3 class="mb-2.5 text-[1.15rem] font-bold tracking-[-0.01em] text-orange-100">
		{project.title()}
	</h3>
	<p class="text-[0.9rem] leading-[1.7] text-slate-400">{project.blurb()}</p>

	<div
		class="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 border-t pt-4"
		style="border-color: var(--border-subtle);"
	>
		{#each project.links as link (link.href)}
			<!-- data-sveltekit-reload matters for one of these: the decktools link
			     is same-origin, so the prerenderer rewrites it to /decktools/ and
			     the client router would otherwise treat it as an internal route and
			     render a 404 — the app there is deployed from another repo into a
			     sibling directory. target="_blank" already stops interception, but
			     this keeps the link working if that is ever removed. -->
			<a
				href={link.href}
				target="_blank"
				rel="noopener"
				data-sveltekit-reload
				class="text-[0.78rem] font-semibold text-orange-300 no-underline hover:text-orange-200 hover:underline"
			>
				{link.label()} →
			</a>
		{/each}
	</div>
</article>
