import { expect, test } from '@playwright/test';

test.describe('portfolio', () => {
	test('shows both project groups with all seven cards', async ({ page }) => {
		await page.goto('/');

		await expect(page.getByRole('heading', { name: 'Current', exact: true })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Research', exact: true })).toBeVisible();
		await expect(page.locator('#work article')).toHaveCount(7);

		for (const name of [
			'EMS Platform — Enersem',
			'LM Deck Tools',
			'DMMT',
			'SEC Negotiation Protocol',
			'MORE',
			'Classic Thesis @ DEIB',
			'Benefits of River Restoration'
		]) {
			await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
		}
	});

	test('every project card links somewhere real', async ({ page }) => {
		await page.goto('/');

		const links = page.locator('#work article a');
		const count = await links.count();
		expect(count).toBeGreaterThanOrEqual(7);

		for (let i = 0; i < count; i++) {
			const href = await links.nth(i).getAttribute('href');
			// The decktools link is same-origin, so the prerenderer rewrites it
			// to a root-relative path — everything else stays absolute.
			expect(href, 'placeholder href survived into the build').not.toBe('#');
			expect(href).toMatch(/^(https:\/\/|\/decktools\/)/);
			await expect(links.nth(i)).toHaveAttribute('rel', /noopener/);
		}
	});

	test('the hero CTA scrolls to the work section', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('link', { name: 'See the Work' }).click();
		await expect(page).toHaveURL(/#work$/);
	});
});

test.describe('biography', () => {
	test('shows four career steps in order', async ({ page }) => {
		await page.goto('/biography/');

		const steps = page.locator('ol li h3');
		await expect(steps).toHaveCount(4);
		await expect(steps.nth(0)).toContainText('Environmental Engineering');
		await expect(steps.nth(3)).toContainText('Energy Platform');
	});

	test('offers both CVs, and they are really downloadable', async ({ page, request }) => {
		await page.goto('/biography/');

		for (const label of ['Download CV (EN)', 'Download CV (IT)']) {
			const link = page.getByRole('link', { name: label });
			await expect(link).toBeVisible();

			// Fetch it rather than trusting the href: a CV button that 404s is
			// the kind of thing nobody notices until someone tries to hire you.
			const href = await link.getAttribute('href');
			const response = await request.get(href!);
			expect(response.status(), `${label} is not downloadable`).toBe(200);
			expect(response.headers()['content-type']).toContain('pdf');
		}
	});

	test('renders the inline links inside the rich-text copy', async ({ page }) => {
		await page.goto('/biography/');
		await expect(page.getByRole('link', { name: 'alumnus of the EI@DEIB group' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'FESK-registered' })).toBeVisible();
	});
});

test.describe('library', () => {
	test('shows the three publications and the award', async ({ page }) => {
		await page.goto('/library/');

		for (const tag of ['A5', 'A4', 'A1']) {
			await expect(page.getByText(tag, { exact: true })).toBeVisible();
		}

		// [B9], not the [B10] the CV cites — see src/lib/content/publications.ts.
		const award = page.getByText('IDEAS 2016 Best Paper Award');
		await expect(award).toBeVisible();
		await expect(page.getByText(/AAMAS 2016/)).toBeVisible();
	});
});

test.describe('site chrome', () => {
	test('the footer carries every profile link plus the CV', async ({ page }) => {
		await page.goto('/');
		const footer = page.locator('footer');

		for (const name of ['GitHub', 'LinkedIn', 'ResearchGate', 'Scholar', 'Spotify', 'CV']) {
			await expect(footer.getByRole('link', { name, exact: true })).toBeVisible();
		}
	});

	test('every page names a canonical URL and an OG image', async ({ page, request }) => {
		for (const path of ['/', '/biography/', '/library/']) {
			await page.goto(path);

			const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
			expect(canonical).toBe(`https://www.lordmzn.it${path}`);

			const og = await page.locator('meta[property="og:image"]').getAttribute('content');
			expect(og).toBe('https://www.lordmzn.it/og-image.jpg');
		}

		// The OG image is named by absolute URL, so nothing in the page proves it
		// exists. Ask the server.
		const image = await request.get('/og-image.jpg');
		expect(image.status()).toBe(200);
	});

	test('serves robots.txt and a sitemap that agree', async ({ request }) => {
		const robots = await request.get('/robots.txt');
		expect(robots.status()).toBe(200);
		expect(await robots.text()).toContain('Sitemap: https://www.lordmzn.it/sitemap.xml');

		const sitemap = await request.get('/sitemap.xml');
		expect(sitemap.status()).toBe(200);

		const xml = await sitemap.text();
		for (const path of ['/', '/biography/', '/library/']) {
			expect(xml).toContain(`https://www.lordmzn.it${path}`);
		}
	});
});
