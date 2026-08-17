import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROUTES, SITE_URL } from '../site';

const routesDir = new URL('../../routes/', import.meta.url).pathname;
const staticDir = new URL('../../../static/', import.meta.url).pathname;
const robots = readFileSync(join(staticDir, 'robots.txt'), 'utf8');

/** Every directory under src/routes that holds a +page.svelte, as a URL path. */
function pageRoutes(dir: string, prefix = '/'): string[] {
	const found: string[] = [];
	if (existsSync(join(dir, '+page.svelte'))) found.push(prefix);

	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		// Skip route groups and dynamic segments — there are none today, and if
		// one appears it should be listed deliberately rather than inferred.
		if (!entry.isDirectory() || entry.name.startsWith('(') || entry.name.startsWith('[')) continue;
		if (entry.name.endsWith('.xml')) continue;
		found.push(...pageRoutes(join(dir, entry.name), `${prefix}${entry.name}/`));
	}
	return found;
}

describe('sitemap', () => {
	it('lists exactly the routes that exist', () => {
		// The sitemap is hand-written because the site is small. This is what
		// stops it going stale when a page is added or removed.
		expect([...ROUTES].sort()).toEqual(pageRoutes(routesDir).sort());
	});

	it('uses trailing slashes, matching what the site actually serves', () => {
		// +layout.ts sets trailingSlash = 'always'. A sitemap entry without the
		// slash names a URL that 301s.
		for (const route of ROUTES) {
			expect(route.endsWith('/')).toBe(true);
		}
	});
});

describe('robots.txt', () => {
	it('carries this site&apos;s sitemap', () => {
		expect(robots).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
	});

	it("keeps decktools' two lines, which live here and nowhere else", () => {
		// Crawlers only read /robots.txt at the domain root, so LMdecktools'
		// own static/robots.txt is inert where it deploys. Its rules have to be
		// merged here or they do not apply at all.
		expect(robots).toContain('Disallow: /decktools/_app/');
		expect(robots).toContain(`Sitemap: ${SITE_URL}/decktools/sitemap.xml`);
	});
});

describe('static assets referenced by meta tags', () => {
	it('ships the OG image and both favicons', () => {
		for (const file of ['og-image.jpg', 'favicon.svg', 'favicon.png']) {
			expect(existsSync(join(staticDir, file)), `static/${file} is missing`).toBe(true);
		}
	});

	it('keeps the hero background within a sane page budget', () => {
		// It shipped once as a 1.1MB raw camera export. It sits under a dark
		// gradient, so it does not need to be pristine — but it is the single
		// heaviest thing on every page, so it needs a ceiling.
		const bytes = readFileSync(join(staticDir, 'hero-bg.jpg')).byteLength;
		expect(bytes).toBeLessThan(500_000);
	});
});
