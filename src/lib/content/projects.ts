import * as m from '$lib/paraglide/messages';

/**
 * The portfolio, from design/03-content-draft.md.
 *
 * Content lives in this array rather than in the page markup, preserving the
 * ergonomic the old React `Showcase.js` had: editing the portfolio means
 * editing a list, not JSX. Two things are split apart, though —
 *
 *   - URLs and the icon glyph live here. They are not translatable, and the
 *     link test in src/lib/__tests__/content.test.ts asserts every one is a
 *     real absolute https URL rather than a mockup placeholder.
 *   - Titles and blurbs are message functions, so an Italian translation is a
 *     messages/it-it.json away rather than a second copy of this file.
 *
 * Grouped Current-first because the original review's sharpest finding was that
 * every card on the old site was pre-2019 academic work, with nothing
 * representing Enersem or decktools (design/01-review.md §5).
 */
export type ProjectLink = {
	/** Short label: "Code", "Article", "App", "Report". */
	label: () => string;
	href: string;
};

export type Project = {
	id: string;
	/** A single glyph, not an icon font — see design/02-design-system.md. */
	glyph: string;
	title: () => string;
	blurb: () => string;
	links: ProjectLink[];
};

export const currentProjects: Project[] = [
	{
		id: 'ems',
		glyph: '▲',
		title: () => m.project_ems_title(),
		blurb: () => m.project_ems_blurb(),
		links: [{ label: () => m.link_site(), href: 'https://enersem.eu' }]
	},
	{
		id: 'decktools',
		glyph: '◆',
		title: () => m.project_decktools_title(),
		blurb: () => m.project_decktools_blurb(),
		links: [
			{ label: () => m.link_app(), href: 'https://www.lordmzn.it/decktools/' },
			{ label: () => m.link_code(), href: 'https://github.com/Lordmzn/LMdecktools' }
		]
	}
];

export const researchProjects: Project[] = [
	{
		id: 'dmmt',
		glyph: '●',
		title: () => m.project_dmmt_title(),
		blurb: () => m.project_dmmt_blurb(),
		links: [{ label: () => m.link_code(), href: 'https://github.com/Lordmzn/pydmmt' }]
	},
	{
		id: 'sec',
		glyph: '✦',
		title: () => m.project_sec_title(),
		blurb: () => m.project_sec_blurb(),
		links: [
			{ label: () => m.link_article(), href: 'https://doi.org/10.1002/2017WR021431' },
			{ label: () => m.link_code(), href: 'https://github.com/Lordmzn/evolving-tradeoffs' }
		]
	},
	{
		id: 'more',
		glyph: '≈',
		title: () => m.project_more_title(),
		blurb: () => m.project_more_blurb(),
		links: [{ label: () => m.link_article(), href: 'https://doi.org/10.1029/2018WR022977' }]
	},
	{
		id: 'classic-thesis',
		glyph: '§',
		title: () => m.project_thesis_title(),
		blurb: () => m.project_thesis_blurb(),
		links: [
			{ label: () => m.link_code(), href: 'https://github.com/Lordmzn/ClassicThesis-at-DEIB' }
		]
	},
	{
		id: 'river-restoration',
		glyph: '≋',
		title: () => m.project_restoration_title(),
		blurb: () => m.project_restoration_blurb(),
		links: [
			{
				label: () => m.link_report(),
				href: 'https://europe.wetlands.org/publications/benefits-european-river-restoration-schemes/'
			}
		]
	}
];
