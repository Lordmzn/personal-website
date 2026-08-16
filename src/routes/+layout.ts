// Three static pages, no client-side data: prerender everything.
export const prerender = true;

// Emit `biography/index.html` rather than `biography.html`, so a plain static
// host (Tophost's Apache) resolves every route through DirectoryIndex with no
// rewrite rules — which matters here because this site ships no .htaccess.
// Bare `/biography` then 301s to `/biography/` for free.
export const trailingSlash = 'always';
