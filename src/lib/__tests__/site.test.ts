import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { SITE_URL, BASE_PATH, absoluteUrl, appRoute } from '../site';

const svelteConfig = readFileSync(new URL('../../../svelte.config.js', import.meta.url), 'utf8');

/**
 * site.ts duplicates two values that svelte.config.js also declares, because it
 * is read by plain unit tests and by the sitemap endpoint, neither of which has
 * the SvelteKit module graph. These tests are what keeps the duplication honest.
 */
describe('site constants track svelte.config.js', () => {
	it('SITE_URL matches kit.prerender.origin', () => {
		const origin = svelteConfig.match(/origin:\s*'([^']*)'/)?.[1];
		expect(origin).toBe(SITE_URL);
	});

	it('BASE_PATH matches kit.paths.base', () => {
		const base = svelteConfig.match(/base:\s*'([^']*)'/)?.[1];
		expect(base).toBe(BASE_PATH);
	});

	it('base is empty — this site is the document root, not a subfolder', () => {
		// If this ever becomes non-empty, /decktools is no longer a sibling and
		// the deploy target in .github/workflows/deploy.yml needs revisiting too.
		expect(BASE_PATH).toBe('');
	});
});

describe('absoluteUrl', () => {
	it('produces an absolute https URL', () => {
		expect(absoluteUrl('/biography/')).toBe('https://www.lordmzn.it/biography/');
	});
});

describe('appRoute', () => {
	it('normalises the trailing slash that +layout.ts forces', () => {
		expect(appRoute('/biography/', '')).toBe('/biography');
	});

	it('reduces the root to a bare slash', () => {
		expect(appRoute('/', '')).toBe('/');
	});

	it('strips a base path when there is one', () => {
		expect(appRoute('/decktools/collection/', '/decktools')).toBe('/collection');
	});
});
