# Patch

Coming-soon site for Patch, a Cars24 Rebellion. Static, single-file pages: no framework, no build step.

## Pages

| Path | File | What it is |
|---|---|---|
| `/` | `index.html` | The homepage. Shut up ***hole. India has swerved, slowed down and suffered enough. |
| `/on-the-move` | `on-the-move.html` | The calm design. Every pothole has an owner. **And we’re on the move.** |
| `/know-who` | `know-who.html` | The calm design, other headline. Every pothole has an owner. **Soon, you’ll know who.** |
| any missing URL | `404.html` | The 404 page, in the homepage style. |

`/genz` used to be the Gen Z page and now redirects to `/` (see `vercel.json`), so old links keep working. The two calm pages are identical apart from one headline line and the matching `og:title`. They are marked `noindex`, so search engines only index the homepage.

## Run locally

```bash
npx serve .
```

or open any of the HTML files directly in a browser.

## Deploy to Vercel

1. In Vercel, choose **Add New → Project** and import this repository.
2. Set **Framework Preset** to `Other`. Leave **Build Command**, **Output Directory** and **Install Command** empty.
3. Deploy. No environment variables are needed.

`vercel.json` turns on clean URLs (so `/on-the-move` and `/know-who` work without `.html`), redirects `/genz` to `/`, and adds basic security headers. Vercel serves `404.html` automatically for any URL that does not exist.

From the CLI: `npx vercel` for a preview, `npx vercel --prod` for production.

## Collecting sign-ups

Each page with a "notify me" form posts `{ email, source, page, at }` to `CONFIG.endpoint`, set near the bottom of the HTML file (search for `CONFIG`).

The pages post to a Google Apps Script web app that appends each sign-up to a private Google Sheet. The script is in `google-apps-script.gs`, with setup steps in its header comment. It lowercases emails, skips duplicates and rejects anything that is not a plain email address.

- The web app URL is visible in the page source. That cannot be avoided for a form on a static site. It only accepts new sign-ups: it cannot read the list.
- Keep the Sheet private, and do not commit its ID. In this repo `SHEET_ID` is a placeholder.
- If `endpoint` is empty, sign-ups are not sent anywhere and a warning is written to the browser console.

## Sources

The figures on the pages are cited in their footers. In short: pothole-related deaths for 2020–2024 (1,555 · 1,481 · 1,856 · 2,161 · 2,385) are MoRTH data from the Union Minister’s written reply in Parliament, as reported by The Tribune (14 Feb 2026). The “+53%”, “6.5 a day” and “1.2%” figures are derived from them, and the working is shown in the footers.

## Fonts

`index.html` and `404.html` use Bricolage Grotesque, Space Mono and Permanent Marker. `on-the-move.html` and `know-who.html` use Montserrat and Geist. All load from Google Fonts.
