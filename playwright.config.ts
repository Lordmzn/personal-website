import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './tests/e2e',

	// `preview`, not `dev`: these specs check prerendered output — the built
	// HTML, the trailing-slash routes the adapter emits, and the static assets
	// the meta tags point at. A dev server would serve all of that from a
	// different pipeline and prove less.
	webServer: {
		command: 'pnpm run build && pnpm run preview --port 4173',
		port: 4173,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000
	},

	// No base path: unlike LMdecktools, this site is the document root.
	use: { baseURL: 'http://localhost:4173/' },

	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? 'list' : 'html',

	projects: [{ name: 'chromium', use: { browserName: 'chromium' } }]
});
