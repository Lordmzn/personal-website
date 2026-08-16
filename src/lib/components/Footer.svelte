<script lang="ts">
	import { base } from '$app/paths';
	import * as m from '$lib/paraglide/messages';

	// Real URLs, not the `href="#"` placeholders the static mockups carry —
	// these are the live ones from the old App.js plus the two the content
	// draft adds. src/lib/__tests__/links.test.ts asserts none of them regress
	// to a placeholder.
	const links = [
		{ href: 'https://github.com/Lordmzn', label: m.footer_github() },
		{ href: 'https://www.linkedin.com/in/emanuele-mason-a182112a/', label: m.footer_linkedin() },
		{
			href: 'https://www.researchgate.net/profile/Emanuele_Mason',
			label: m.footer_researchgate()
		},
		{
			href: 'https://scholar.google.it/citations?hl=it&user=MSo2pEEAAAAJ',
			label: m.footer_scholar()
		},
		{ href: 'https://open.spotify.com/user/1168245883', label: m.footer_spotify() }
	];

	// Computed, so the footer does not quietly claim to be from 2026 forever.
	const year = new Date().getFullYear();
</script>

<footer
	class="relative z-2 border-t px-8 py-8"
	style="border-color: rgba(249,115,22,0.06); background: rgba(10,12,16,0.4);"
>
	<div class="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4">
		<div class="font-mono text-[0.62rem] tracking-[0.08em] text-slate-500 uppercase">
			© {year}
			{m.site_name()} · lordmzn.it · {m.footer_tagline()}
		</div>
		<div class="flex flex-wrap gap-5 text-[0.85rem]">
			{#each links as link (link.href)}
				<a
					href={link.href}
					target="_blank"
					rel="noopener"
					class="text-slate-400 no-underline transition-colors hover:text-orange-400"
				>
					{link.label}
				</a>
			{/each}
			<a
				href="{base}/cv/EmanueleMason-CV-EN.pdf"
				class="text-slate-400 no-underline transition-colors hover:text-orange-400"
			>
				{m.footer_cv()}
			</a>
		</div>
	</div>
</footer>
