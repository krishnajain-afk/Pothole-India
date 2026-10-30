# Cars24 Patch

Coming-soon site for Cars24 Patch, a Cars24 Rebellion. A Next.js app (App Router, no Tailwind, no CSS framework), being migrated
page by page from the original single-file HTML pages.

## Migration status

| Page | Where it lives now |
|---|---|
| `/` | **ported**: `app/page.tsx` + `components/home/*`, CSS in `app/globals.css`, behaviour in `lib/home-behaviour.js` |
| any missing URL | **ported**: `app/not-found.tsx` (+ `not-found.css`, `components/NotFoundEffects.tsx`) |
| `/lab`, `/updates`, `/research`, `/case-files`, `/wall-of-holes`, `/dodge`, `/on-the-move`, `/know-who` | not yet: the original HTML, unchanged, in `public/`, served at the clean route by `next.config.ts` |

To port a page: build it under `app/<route>/page.tsx`, check it against the HTML version (same DOM, same pixels, the
responsive audit), then delete `public/<route>.html` and its entry in `STATIC_PAGES` in `next.config.ts`.

New in the Next version: canonical URL, `robots.txt`, `sitemap.xml` (only indexable pages), structured data on the homepage,
the icon as `app/icon.svg`, and Vercel Analytics through `@vercel/analytics`.

## Pages

| Path | File | What it is |
|---|---|---|
| `/` | `app/page.tsx` | The homepage. Shut up ***hole. India has swerved, slowed down and suffered enough. |
| `/on-the-move` | `public/on-the-move.html` | The calm design. Every pothole has an owner. **And we’re on the move.** |
| `/know-who` | `public/know-who.html` | The calm design, other headline. Every pothole has an owner. **Soon, you’ll know who.** |
| `/lab` | `public/lab.html` | The lab. Experiments are built and tried here before they reach the homepage. Unlisted (`noindex`). |
| `/updates` | `public/updates.html` | What we're up to: the road to launch and the latest updates. Part of the lab, unlisted (`noindex`). |
| `/case-files` | `public/case-files.html` | The case-study repository: what we tried, what we found, what we learned. Part of the lab, unlisted (`noindex`). |
| `/research` | `public/research.html` | The research library: every study we read or run about potholes, with sources and evidence stamps. Part of the lab, unlisted (`noindex`). |
| `/wall-of-holes` | `public/wall-of-holes.html` | Biggest ***holes of the year: the wall of potholes. Part of the lab, unlisted (`noindex`). |
| `/dodge` | `public/dodge.html` | Dodge with your head: a camera game (the camera needs https). Part of the lab, unlisted (`noindex`). |
| any missing URL | `app/not-found.tsx` | The 404 page, in the homepage style. |

`/genz` used to be the Gen Z page and now redirects to `/` (see `vercel.json`), so old links keep working. The two calm pages are identical apart from one headline line and the matching `og:title`. They are marked `noindex`, so search engines only index the homepage. The lab pages are marked `noindex` too. `/dodge` loads MediaPipe face tracking from jsDelivr and Google Storage only when someone starts the camera; the video never leaves the device.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build && npm start` runs the production build.

## Deploy to Vercel

1. In Vercel, choose **Add New → Project** and import this repository.
2. `vercel.json` sets the framework to Next.js, so the build runs whatever the project's Framework Preset says. No environment variables are needed.
3. Deploy.

`next.config.ts` serves the HTML pages in `public/` at their clean routes, redirects `/genz` to `/` and `/<page>.html` to `/<page>`, and adds basic security headers.

From the CLI: `npx vercel` for a preview, `npx vercel --prod` for production.

## Collecting sign-ups

Each page with a "notify me" form posts `{ email, source, page, at }` to `CONFIG.endpoint`, set near the top of `lib/home-behaviour.js` for the homepage, and near the bottom of each HTML file in `public/` (search for `CONFIG`).

The pages post to a Google Apps Script web app that appends each sign-up to a private Google Sheet. The script is in `google-apps-script.gs`, with setup steps in its header comment. It lowercases emails, skips duplicates and rejects anything that is not a plain email address.

- The web app URL is visible in the page source. That cannot be avoided for a form on a static site. It only accepts new sign-ups: it cannot read the list.
- Keep the Sheet private, and do not commit its ID. In this repo `SHEET_ID` is a placeholder.
- If `endpoint` is empty, sign-ups are not sent anywhere and a warning is written to the browser console.

## Sources

The figures on the pages are cited in their footers. In short: pothole-related deaths for 2020–2024 (1,555 · 1,481 · 1,856 · 2,161 · 2,385) are MoRTH data from the Union Minister’s written reply in Parliament, as reported by The Tribune (14 Feb 2026). The “+53%”, “6.5 a day” and “1.2%” figures are derived from them, and the working is shown in the footers.

## Fonts

The homepage, the 404 and the lab pages use Bricolage Grotesque, Space Mono and Permanent Marker. `on-the-move.html` and `know-who.html` use Montserrat and Geist. All load from Google Fonts.
