# Cars24 Patch — project instructions

@BRAND-GUIDE.md

## Always (the short version — details are in the guide above)

- This site is **intentionally loud, funny, Gen Z and rebellious**. Never "normalise" it into a clean corporate/SaaS look. Copy the existing pages' style.
- **Copy benchmark = the homepage hero and the wall page:** quirky, human, one odd specific thing per block, one Gen Z touch at most. Copy that describes the page, lists three things or summarises reads as AI-written and has been rewritten twice; see BRAND-GUIDE §3 "Benchmark". Rewriting never adds facts.
- Voice: deadpan, lowercase source copy (CSS uppercases headlines), short fragments, **no exclamation marks**, no invented facts. Serious data stays straight and sourced. No jokes about the deaths.
- Brand name is **Cars24 Patch**, tagline **a Cars24 Rebellion** (pre-footer band + footer only — not hero, not navbar).
- **Stack:** Next.js 16 App Router + React 19 + TypeScript, no Tailwind. `npm install`, `npm run dev` (http://localhost:3000), `npm run build`. The repo is the source of truth; the old local files (`index-genz.html`, `index-genz-meme.html`, `404-genz.html`, `index-cfi*.html`) are retired.
- **Where things live:** homepage `/` = `app/page.tsx` + `components/home/*` (CSS `app/globals.css`, behaviour `lib/home-behaviour.js`, which finds elements by id/class, so keep them in sync). 404 = `app/not-found.tsx`. The lab and calm pages are still their original HTML in `public/` (`lab.html`, `updates.html`, `research.html`, `case-files.html`, `wall-of-holes.html`, `dodge.html`, `on-the-move.html`, `know-who.html`), served at clean routes by `STATIC_PAGES` in `next.config.ts`. Porting a page = move it to `app/<route>/`, delete its `public/` file and `STATIC_PAGES` entry, and pass the DOM + pixel parity check (BRAND-GUIDE §8).
- **Lab first:** every experiment goes live in **the lab first** (front page `public/lab.html` at `/lab`, plus the lab pages). Only after a final check and the user's confirmation is anything promoted to the homepage. Never edit the homepage first. Anything big gets its own lab page and the lab front page keeps a card for it.
- **Lab nav:** the three `LAB-NAV` blocks are identical in all six lab files (only `aria-current` and the logo link differ); links between pages use `a[data-page]`, never hard-coded paths. A new lab page also goes into `STATIC_PAGES`. See BRAND-GUIDE §12.5.
- **The homepage CSS is global.** A class name reused on another Next page picks up the homepage rule (this broke the 404 twice). Prefix page-only classes and pixel-diff.
- **The lab is a hub that grows** (BRAND-GUIDE §12.6): an event goes on `updates.html`, a lesson on `case-files.html`, the evidence itself on `research.html`. **Publishing red lines:** never put names or contact details of officials, scientists or companies, allegations, vendor criticism by name, costs or quotes, deal terms, unreleased tech, the pilot city or timeline, or internal chatter on the public site. What a source told us in a meeting is "told to us, not tested by us", in generic terms. Scan every public page for these before any push.
- **Do not push to GitHub unless the user says "push" or "go".** Push a branch first and check its Vercel preview; `main` deploys to production within a minute. Never force-push `main`. Do exactly what was asked, nothing more.
- Before adding a CSS class, id or variable name, **grep the whole repo first** (the homepage owns `.cf` = confetti; two variables both named `sr` once broke screen-reader announcements).
- Every change must pass the responsive audit (280–2560px, both themes, no horizontal scroll, nothing clipped) and `npm run build` before you call it done.
- Never commit the real Google Sheet ID (`google-apps-script.gs` keeps a placeholder). Intercept `script.google.com` when testing sign-ups.
- Never scrape or repost images from Google Images / social media. Ask before downloading any file.
- When a decision changes, update `BRAND-GUIDE.md` in the same commit.
