# African Cubing

A small, front-end-only guide to World Cube Association competitions in Africa. The home page combines an interactive SVG map with filterable upcoming and past competition lists, and ships in English, French, Arabic, Portuguese, and Swahili.

## Local development

The project uses Node 24, declared in [`.nvmrc`](.nvmrc).

```sh
nvm use
npm ci
npm run data
npm run dev
```

Other useful commands:

```sh
npm run check   # lint and type-check
npm run build   # production build in dist/
npm run preview # preview the production build
```

## Competition data

[`scripts/generate-data.mjs`](scripts/generate-data.mjs) fetches the compact competition index from the official WCA API using its Africa continent filter. It follows pagination, validates the response, and writes a small static snapshot to [`public/data/africa.json`](public/data/africa.json).

The browser only downloads that snapshot. It does not need API credentials, a database, a server-side process, or dozens of country requests.

Country names use the browser's localized Unicode display names, with centralized overrides in [`format.ts`](src/lib/format.ts) where WCA-standardized names need to remain unambiguous and consistent across browsers.

## Deployment

[`pages.yml`](.github/workflows/pages.yml) builds and deploys the site to GitHub Pages:

- on every push to `master`;
- daily at 03:17 UTC to refresh WCA data;
- manually through **Actions → Build and deploy GitHub Pages → Run workflow**.

In the repository settings, set **Pages → Source** to **GitHub Actions**. A custom domain can then be attached in the same Pages settings without changing Vite's relative asset paths.

GitHub can disable scheduled workflows after a long period without repository activity. The manual trigger remains available if the freshness date on the site stops advancing.

## Map

The geometry in [`africa-map.svg`](src/assets/africa-map.svg) was extracted from the original Vue prototype and made keyboard-interactive by the React map component. The original remains available in Git history; the live app does not compile or ship Vue code.
