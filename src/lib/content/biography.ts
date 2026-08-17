import * as m from '$lib/paraglide/messages';

/**
 * Biography content, from design/03-content-draft.md.
 *
 * The career arc is four waypoints with real paragraphs rather than the
 * title/date pairs an earlier mockup had. Two of the paragraphs carry an inline
 * link, so `body` is rendered with `{@html}` — see the note on
 * `richText` below.
 */
export type TimelineStep = {
	id: string;
	title: () => string;
	/** Institution / role / dates line under the title. */
	meta: () => string;
	/** May contain inline anchors; rendered as HTML. */
	body: () => string;
};

export const timeline: TimelineStep[] = [
	{
		id: 'environmental-engineering',
		title: () => m.bio_step1_title(),
		meta: () => m.bio_step1_meta(),
		body: () => m.bio_step1_body()
	},
	{
		id: 'water-resources',
		title: () => m.bio_step2_title(),
		meta: () => m.bio_step2_meta(),
		body: () => m.bio_step2_body()
	},
	{
		id: 'multi-agent-rl',
		title: () => m.bio_step3_title(),
		meta: () => m.bio_step3_meta(),
		body: () => m.bio_step3_body()
	},
	{
		id: 'energy-platform',
		title: () => m.bio_step4_title(),
		meta: () => m.bio_step4_meta(),
		body: () => m.bio_step4_body()
	}
];

/**
 * The Practice panel. Split into `lead` and `body` rather than storing
 * "**Depth over breadth.** Patient, sustained..." as one marked-up string —
 * the emphasis is structural, so it belongs in the markup, not in the copy.
 */
export type Principle = {
	numeral: string;
	lead: () => string;
	body: () => string;
};

export const principles: Principle[] = [
	{ numeral: 'I.', lead: () => m.practice_1_lead(), body: () => m.practice_1_body() },
	{ numeral: 'II.', lead: () => m.practice_2_lead(), body: () => m.practice_2_body() },
	{ numeral: 'III.', lead: () => m.practice_3_lead(), body: () => m.practice_3_body() },
	{ numeral: 'IV.', lead: () => m.practice_4_lead(), body: () => m.practice_4_body() }
];

/** CV downloads. The Italian file is added in Phase 4; see the plan. */
export const cvDownloads = [
	{ label: () => m.cv_download_en(), href: '/cv/EmanueleMason-CV-EN.pdf' }
];
