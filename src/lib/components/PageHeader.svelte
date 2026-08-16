<script lang="ts">
	// Shared header for the two non-landing pages: mono eyebrow, big title, and
	// an optional lede. Sits directly on the photo, so the eyebrow takes the
	// on-photo-label treatment rather than a slate tone.
	let { eyebrow, title, lede }: { eyebrow: string; title: string; lede?: string } = $props();
</script>

<header class="mx-auto max-w-[800px] px-8 pt-20 pb-12 text-center">
	<div class="on-photo-label font-mono text-[0.62rem] tracking-[0.2em] uppercase">
		· {eyebrow}
	</div>
	<h1
		class="mt-4 text-[clamp(2.2rem,5vw,3.2rem)] font-black tracking-[-0.03em] text-white"
		style="text-shadow: 0 4px 30px rgba(0,0,0,0.5);"
	>
		{title}
	</h1>
	{#if lede}
		<p class="on-photo mx-auto mt-5 max-w-[560px] leading-[1.7] text-slate-300">{lede}</p>
	{/if}
</header>
