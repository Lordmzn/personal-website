import * as m from '$lib/paraglide/messages';

/** The fallback for the full publication list, and for [A1], which has no DOI. */
export const scholarProfile = 'https://scholar.google.it/citations?hl=it&user=MSo2pEEAAAAJ';

/**
 * Library content, from design/03-content-draft.md.
 *
 * The three highest-impact journal articles plus the award, per the CV brief's
 * own one-page prioritisation. Citations come from the CV PDF — none are
 * reconstructed from memory.
 *
 * The full list links to Google Scholar rather than leading with the
 * bibbase.org embed the old site had: that embed loaded over plain http on an
 * https page, so browsers blocked it outright. Whether bibbase returns as a
 * secondary link is the one content question still open in the plan.
 */
export type Publication = {
	/** The CV's own citation code, shown in the mono tag box. */
	tag: string;
	title: () => string;
	authors: string;
	venue: () => string;
	link: { label: () => string; href: string };
};

export const publications: Publication[] = [
	{
		tag: 'A5',
		title: () => m.pub_a5_title(),
		authors: 'E. Mason, M. Giuliani, A. Castelletti, F. Amigoni',
		venue: () => m.pub_a5_venue(),
		link: {
			label: () => 'doi.org/10.1002/2017WR021431',
			href: 'https://doi.org/10.1002/2017WR021431'
		}
	},
	{
		tag: 'A4',
		title: () => m.pub_a4_title(),
		authors: 'S. Bizzi, A. Cominola, E. Mason, A. Castelletti, K. Paik',
		venue: () => m.pub_a4_venue(),
		link: {
			label: () => 'doi.org/10.1029/2018WR022977',
			href: 'https://doi.org/10.1029/2018WR022977'
		}
	},
	{
		// No DOI exists for this one anywhere in the CV or the old site, and
		// inventing one would be worse than omitting it, so the link goes to the
		// Scholar profile instead. Confirmed as a deliberate, settled decision —
		// do not "fix" this by guessing a DOI.
		tag: 'A1',
		title: () => m.pub_a1_title(),
		authors: 'M. Giuliani, A. Castelletti, F. Pianosi, E. Mason, P.M. Reed',
		venue: () => m.pub_a1_venue(),
		link: { label: () => m.link_scholar(), href: scholarProfile }
	}
];

/**
 * The award's underlying paper is [B9], not the [B10] the CV PDF cites.
 *
 * [B10] is the M3O Matlab toolbox paper at iEMSs 2016 (Toulouse), an
 * environmental-modelling-software conference with no connection to "IDEAS" or
 * to the AAMAS workshop chairs the CV's own award line also names. [B9] —
 * "Water Resources Systems Operations via Multiagent Negotiation", AAMAS 2016,
 * Singapore — is the actual match. Confirmed; the CV repo still needs the same
 * correction. See design/02-design-system.md "Corrections".
 */
export const award = {
	title: () => m.award_title(),
	paper: () => m.award_paper(),
	authors: 'F. Amigoni, A. Castelletti, P. Gazzotti, M. Giuliani, E. Mason',
	venue: () => m.award_venue()
};
