import { absoluteUrl, ROUTES } from '$lib/site';
import type { RequestHandler } from './$types';

export const prerender = true;

// The route list lives in $lib/site: SvelteKit allows only a fixed set of
// exports from a +server.ts, and seo.test.ts needs to read it too.
export const GET: RequestHandler = () => {
	const urls = ROUTES.map(
		(route) => `	<url>
		<loc>${absoluteUrl(route)}</loc>
	</url>`
	).join('\n');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
		{ headers: { 'Content-Type': 'application/xml' } }
	);
};
