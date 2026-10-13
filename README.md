# Trent Technologies / CostGard

Responsive React + Vite redesign based on the supplied navy and blue reference.

## Development

- `npm install`
- `npm run dev`
- `npm run build`

The old website's pages and images are preserved in `src/legacy.json` and `public/legacy/`. Technical PDFs and Word specifications link to their original public URLs. The importer in `scripts/import-legacy.py` can refresh that content; it requires network access and the original homepage at `/tmp/trent-home.html`.

Contact and quote forms prepare a draft in the visitor's email client; the visitor must send the draft. Links to the original online forms are also included. This project does not contain an email delivery backend.

Routes use browser history; static hosting must serve `index.html` for application routes.
