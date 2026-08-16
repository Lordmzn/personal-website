<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { i18n } from '$lib/i18n';
	import { appRoute } from '$lib/site';
	import * as m from '$lib/paraglide/messages';

	// Text-only brand, three links. No language switcher: Paraglide is wired up
	// but only `en` ships, so a switcher would be a control with one option.
	// Adding `it-it` to project.inlang + messages/ is what turns it on.
	const links = [
		{ href: '/', label: m.nav_portfolio() },
		{ href: '/biography', label: m.nav_biography() },
		{ href: '/library', label: m.nav_library() }
	];

	const current = $derived(appRoute(i18n.route(page.url.pathname), base));
</script>

<nav
	class="sticky top-0 z-100 flex h-15 items-center justify-between border-b px-8"
	style="border-color: var(--border-subtle); background: rgba(10,12,16,0.8); backdrop-filter: blur(20px) saturate(1.2);"
>
	<a href="{base}/" class="text-[0.95rem] font-bold tracking-tight text-orange-50 no-underline">
		{m.site_name()}
	</a>

	<ul class="flex list-none gap-1">
		{#each links as link (link.href)}
			<li>
				<a
					href={`${base}${link.href}`}
					aria-current={current === link.href ? 'page' : undefined}
					class="rounded-lg px-3.5 py-1.5 text-[0.82rem] font-medium no-underline transition-colors {current ===
					link.href
						? 'bg-orange-500/10 text-orange-400'
						: 'text-slate-400 hover:bg-orange-500/6 hover:text-orange-300'}"
				>
					{link.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>
