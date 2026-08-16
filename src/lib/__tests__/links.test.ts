import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The static mockups in design/mockups/ ship seven `href="#"` placeholders in
 * their footers, and the approved content draft lists real URLs for all of them.
 * This is the test that stops a placeholder being carried into a component: any
 * outbound link must be a real absolute https URL.
 *
 * In-page anchors (`#work`) and internal links built from `base` are exempt —
 * they are matched separately below.
 */
function svelteSources(dir: string): string[] {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) return svelteSources(path);
		return entry.name.endsWith('.svelte') ? [path] : [];
	});
}

const files = svelteSources(new URL('../../', import.meta.url).pathname);

/**
 * Markup only. Without this, a comment explaining what a placeholder looks like
 * trips the very test that bans them — which is exactly what happened the first
 * time this ran.
 */
function markup(source: string): string {
	return source.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<!--[\s\S]*?-->/g, '');
}

describe('outbound links', () => {
	it('finds components to check', () => {
		expect(files.length).toBeGreaterThan(0);
	});

	for (const file of files) {
		it(`${file.split('/src/')[1]} has no placeholder hrefs`, () => {
			const source = markup(readFileSync(file, 'utf8'));

			// Literal href="..." values only; href={expr} is dynamic and checked
			// by whatever produces the expression.
			const literals = [...source.matchAll(/href="([^"{}]*)"/g)].map((m) => m[1]);

			for (const href of literals) {
				expect(href, `bare placeholder href in ${file}`).not.toBe('#');
				expect(href, `empty href in ${file}`).not.toBe('');
			}
		});
	}
});

describe('external links carry rel=noopener', () => {
	for (const file of files) {
		it(`${file.split('/src/')[1]}`, () => {
			const source = markup(readFileSync(file, 'utf8'));
			const externalAnchors = [...source.matchAll(/<a\b[^>]*>/gs)].filter((m) =>
				m[0].includes('target="_blank"')
			);

			for (const anchor of externalAnchors) {
				expect(anchor[0], `target=_blank without rel=noopener in ${file}`).toMatch(
					/rel="[^"]*noopener/
				);
			}
		});
	}
});

describe('no plain-http URLs', () => {
	// The old React site embedded bibbase.org over plain http on an https page,
	// which browsers block outright. Nothing should reintroduce that.
	for (const file of files) {
		it(`${file.split('/src/')[1]}`, () => {
			const source = readFileSync(file, 'utf8');
			expect(source, `insecure http:// URL in ${file}`).not.toMatch(/http:\/\/(?!localhost)/);
		});
	}
});
