import { expect, test } from '@playwright/test';

/** The three pages, with the headline each should render. */
const PAGES = [
	{ path: '/', title: 'Portfolio', heading: 'Endures' },
	{ path: '/biography/', title: 'Biography', heading: 'How I Got Here' },
	{ path: '/library/', title: 'Library', heading: 'Published Work' }
] as const;

test.describe('every page renders', () => {
	for (const page_ of PAGES) {
		test(`${page_.path}`, async ({ page }) => {
			const response = await page.goto(page_.path);
			expect(response?.status()).toBe(200);

			await expect(page).toHaveTitle(`${page_.title} — Emanuele Mason`);
			await expect(page.locator('h1')).toContainText(page_.heading);

			// Prerendered, so the content is in the HTML before any JS runs —
			// that is the whole point of adapter-static here.
			await expect(page.locator('nav a', { hasText: page_.title })).toHaveAttribute(
				'aria-current',
				'page'
			);
		});
	}
});

test('bare paths redirect to the trailing-slash form', async ({ page }) => {
	// trailingSlash = 'always' is what lets a plain static host resolve routes
	// through DirectoryIndex with no rewrite rules. Verify the redirect exists
	// rather than assuming it.
	const response = await page.goto('/biography');
	expect(response?.status()).toBe(200);
	expect(new URL(page.url()).pathname).toBe('/biography/');
});

test('the nav moves between pages client-side', async ({ page }) => {
	await page.goto('/');

	await page.getByRole('link', { name: 'Biography', exact: true }).click();
	await expect(page).toHaveURL(/\/biography\/$/);
	await expect(page.locator('h1')).toContainText('How I Got Here');

	await page.getByRole('link', { name: 'Library', exact: true }).click();
	await expect(page).toHaveURL(/\/library\/$/);
	await expect(page.locator('h1')).toContainText('Published Work');
});

test('the 404 shell renders the branded error page', async ({ page }) => {
	// Loaded directly by filename, which is the honest test.
	//
	// Whether a visitor ever SEES this page depends on the host: it needs an
	// `ErrorDocument 404 /404.html`, and this site deliberately ships no
	// .htaccess, so today Tophost serves its own error page instead. (`vite
	// preview` does serve it, which is exactly why asserting a 404 on /nope/
	// would pass locally and misrepresent production.)
	//
	// So this asserts the artifact works, not that the host is wired to it. If
	// an ErrorDocument is ever added by hand on the server, this is what it
	// will get.
	await page.goto('/404.html');
	await expect(page.locator('h1')).toContainText('Off the chart');
	await expect(page.getByRole('link', { name: /Back to the portfolio/i })).toBeVisible();
});

test('no console errors on any page', async ({ page }) => {
	const errors: string[] = [];
	page.on('console', (msg) => {
		if (msg.type() === 'error') errors.push(msg.text());
	});
	page.on('pageerror', (err) => errors.push(err.message));

	for (const { path } of PAGES) {
		await page.goto(path);
		await page.waitForLoadState('networkidle');
	}

	expect(errors).toEqual([]);
});
