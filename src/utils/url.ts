const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefixes a site-relative path with the configured `base` (e.g. '/portfolio'). */
export function withBase(path: string): string {
  return `${base}/${path.replace(/^\//, '')}`;
}

/** Absolute URL of a site-relative path, for canonical/OG tags and text endpoints. */
export function absoluteUrl(path: string, site: URL | undefined): string {
  return site ? new URL(withBase(path), site).href : withBase(path);
}
