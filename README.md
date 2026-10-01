# Pothole-India

Coming-soon page for Pothole India. A static, single-file site: no framework, no build step.

## Pages

| Path | File | Headline |
|---|---|---|
| `/` | `index.html` | Every pothole has an owner. **And we’re on the move.** |
| `/know-who` | `know-who.html` | Every pothole has an owner. **Soon, you’ll know who.** |

The two files are identical apart from that headline line (and the matching `og:title`).

## Run locally

```bash
npx serve .
```

or open `index.html` directly in a browser.

## Deploy to Vercel

1. In Vercel, choose **Add New → Project** and import this repository.
2. Set **Framework Preset** to `Other`. Leave **Build Command**, **Output Directory** and **Install Command** empty.
3. Deploy. No environment variables are needed.

`vercel.json` turns on clean URLs (so `/know-who` works) and adds basic security headers.

From the CLI: `npx vercel` for a preview, `npx vercel --prod` for production.

## Subscribe form

Both pages have a "Notify me" form. It posts JSON `{ email, source, page, at }` to `CONFIG.endpoint`, which is set near the bottom of each HTML file (search for `CONFIG`).

**Until `endpoint` is set, sign-ups are not stored anywhere.** The form still shows a success state, and a warning is written to the browser console. Point it at Formspree, a Vercel/Supabase function or any endpoint that accepts a JSON POST.

## Sources

The figures on the page are cited in its footer. In short: pothole-related deaths for 2020–2024 (1,555 · 1,481 · 1,856 · 2,161 · 2,385) are MoRTH data from the Union Minister’s written reply in Parliament, as reported by The Tribune (14 Feb 2026). The “+53%”, “6.5 a day” and “1.2%” figures are derived from them, and the working is shown in the footer.

## Fonts

Montserrat and Geist, loaded from Google Fonts.
