# Portfolio

Personal portfolio of Josué Fernández Díaz, Senior Software Engineer and Tech Lead.

Live at **https://j0suefdz.github.io/portfolio/**

Single-page static site built with [Astro](https://astro.build) and Tailwind CSS, hosted on GitHub Pages.

## Editing content

All content lives in JSON files. No component changes are needed for routine updates.

| File | Controls |
|---|---|
| `src/data/home.json` | Name, title, intro, availability badge, contact links, SEO fields |
| `src/data/metrics.json` | The four headline numbers under the hero |
| `src/data/experience.json` | "Recent Roles" spotlight: stats, areas of ownership and stack per role |
| `src/data/billing.json` | "Payments & Billing" section: the receipt lines and ownership areas |
| `src/data/projects.json` | "Selected Work" case studies (context, role, result) |
| `src/data/adaptability.json` | "New Stack, Same Result" section: statement, stats and stack per team |
| `src/data/shoutouts.json` | "Shoutouts" carousel: one sentence and a name per person |
| `src/data/career.json` | Career and education timeline |
| `src/data/tech.json` | Skills and tools, by category |
| `src/config.ts` | Color palette (`quetzal` by default; palettes are in `src/styles/global.css`) |
| `public/Josue-Fernandez-CV.pdf` | The downloadable CV. Replace the file to update it |

To use a photo instead of the initials, add it to `src/assets/` and set `photoUrl` in `home.json` to its file name.

After changing the name, title or headline numbers, run `npm run images` to regenerate the social preview image.

## Development

Requires Node 22 or newer.

```sh
npm install
npm run dev          # local dev server
npm run check        # type check
npm run build        # production build into dist/
npm run check:links  # verify links and assets in dist/
npm run preview      # serve the production build
```

## Deployment

- Pull requests run `.github/workflows/ci.yml`: type check, build, link check.
- Merging to `main` runs `.github/workflows/deploy.yml`, which repeats the checks and publishes to GitHub Pages.

The site is served from `/portfolio`, set as `base` in `astro.config.mjs`. Use `withBase()` from `src/utils/url.ts` for any link to a local file. To move to a custom domain, set `site` to the domain, remove `base`, add `public/CNAME`, and update `BASE` in `scripts/check-links.mjs`.

## Credits

Based on the [Career Portfolio template](https://github.com/nbakh16/career-portfolio-template) by Nabil Akhunjee, MIT licensed. See `LICENSE`.
