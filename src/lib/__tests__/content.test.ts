import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { currentProjects, researchProjects } from '../content/projects';
import { publications, award, scholarProfile } from '../content/publications';
import { timeline, principles, cvDownloads } from '../content/biography';

const messages = JSON.parse(
	readFileSync(new URL('../../../messages/en.json', import.meta.url), 'utf8')
) as Record<string, string>;

const allProjects = [...currentProjects, ...researchProjects];

describe('portfolio', () => {
	it('matches design/03-content-draft.md: 2 current, 5 research', () => {
		expect(currentProjects).toHaveLength(2);
		expect(researchProjects).toHaveLength(5);
	});

	it('does not resurrect the two cards the review cut', () => {
		// IMRR's xake.elet.polimi.it domain is dead, and the Raspberry Pi /
		// Looker Studio dashboard was cut as dated. design/01-review.md §5.
		const ids = allProjects.map((p) => p.id);
		expect(ids).not.toContain('imrr');
		expect(ids).not.toContain('raspenv');

		const hrefs = allProjects.flatMap((p) => p.links.map((l) => l.href));
		for (const href of hrefs) {
			expect(href).not.toMatch(/xake\.elet\.polimi\.it/);
			expect(href).not.toMatch(/datastudio\.google\.com/);
		}
	});

	it('gives every project at least one real outbound link', () => {
		for (const project of allProjects) {
			expect(project.links.length, `${project.id} has no links`).toBeGreaterThan(0);
			for (const link of project.links) {
				expect(link.href, `${project.id}`).toMatch(/^https:\/\//);
				expect(link.label(), `${project.id}`).not.toBe('');
			}
		}
	});

	it('has unique ids', () => {
		const ids = allProjects.map((p) => p.id);
		expect(new Set(ids).size).toBe(ids.length);
	});
});

describe('library', () => {
	it('carries the three prioritised articles', () => {
		expect(publications.map((p) => p.tag)).toEqual(['A5', 'A4', 'A1']);
	});

	it('links A5 and A4 by DOI, and A1 to Scholar because it has none', () => {
		expect(publications[0].link.href).toContain('doi.org/');
		expect(publications[1].link.href).toContain('doi.org/');
		// Deliberate and settled: no DOI exists for A1 and inventing one would be
		// worse than omitting it.
		expect(publications[2].link.href).toBe(scholarProfile);
	});

	it('attributes the award to the AAMAS paper, not the iEMSs toolbox paper', () => {
		// The CV PDF cites [B10] here, which is the M3O Matlab toolbox paper at
		// iEMSs 2016 (Toulouse). The real match is [B9], AAMAS 2016, Singapore.
		expect(award.venue()).toContain('AAMAS 2016');
		expect(award.venue()).not.toMatch(/iEMSs|Toulouse/);
		expect(award.paper()).toContain('Multiagent Negotiation');
	});
});

describe('biography', () => {
	it('has four career steps with unique ids', () => {
		expect(timeline).toHaveLength(4);
		expect(new Set(timeline.map((s) => s.id)).size).toBe(4);
	});

	it('has four principles', () => {
		expect(principles).toHaveLength(4);
	});

	it('points CV downloads at files that ship in static/', () => {
		for (const cv of cvDownloads) {
			expect(cv.href).toMatch(/^\/cv\/.+\.pdf$/);
		}
	});
});

describe('message strings rendered as HTML', () => {
	// Two strings carry inline anchors and render through {@html}. They are
	// authored here, not user input, but the blast radius of that assumption
	// changing is large enough to assert rather than trust.
	const richText = Object.entries(messages).filter(([, value]) => /<[a-z]/i.test(value));

	it('finds the rich-text strings', () => {
		expect(richText.length).toBeGreaterThan(0);
	});

	for (const [key, value] of richText) {
		it(`${key} contains only inline formatting and safe links`, () => {
			expect(value, 'script tag').not.toMatch(/<script/i);
			expect(value, 'inline event handler').not.toMatch(/\son\w+\s*=/i);
			expect(value, 'javascript: URL').not.toMatch(/javascript:/i);

			const tags = [...value.matchAll(/<\s*\/?\s*([a-z]+)/gi)].map((mm) => mm[1].toLowerCase());
			for (const tag of tags) {
				expect(['a', 'em', 'strong', 'code'], `unexpected <${tag}>`).toContain(tag);
			}

			for (const href of [...value.matchAll(/href="([^"]*)"/g)].map((mm) => mm[1])) {
				expect(href, 'external link must be https').toMatch(/^https:\/\//);
			}

			// Every anchor in these strings opens in a new tab, so each needs its
			// own rel — the layout cannot add it for them.
			const anchors = [...value.matchAll(/<a\b[^>]*>/g)].map((mm) => mm[0]);
			for (const anchor of anchors) {
				if (anchor.includes('target="_blank"')) {
					expect(anchor, 'target=_blank without rel=noopener').toMatch(/rel="[^"]*noopener/);
				}
			}
		});
	}
});
