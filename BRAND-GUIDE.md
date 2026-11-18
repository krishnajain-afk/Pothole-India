# Cars24 Patch — Brand, Design & Project Handoff Guide

> **Read this whole file before you change anything.**
> It is the single source of truth for the voice, design, language, tech and working rules of this project.
> It exists so the project can move to another account / machine / chat without losing anything.
>
> **The one rule that matters most:** this site is *intentionally loud, funny, Gen Z and rebellious*. Do **not** "normalise" it into a clean corporate / SaaS look. When in doubt, copy the existing pages, not your defaults.

Last updated: 2026-11-18 · Owner: Krishna (Cars24 / Crashfree India) · Repo: <https://github.com/krishnajain-afk/Pothole-India> (public)

---

## 0. Moving this to another account (do this first)

The chat history will **not** travel. Since 2026-10-30 **the GitHub repo is the source of truth** (it used to be a local folder). So:

1. **Clone the repo** (`git clone https://github.com/krishnajain-afk/Pothole-India`), then `npm install`. `BRAND-GUIDE.md` and `CLAUDE.md` live in the repo root; Claude Code auto-loads `CLAUDE.md`, which imports this file.
2. **The one file that must never be in the repo:** your local `google-apps-script.gs` with the real Sheet ID. The repo copy has a placeholder.
3. **Git access:** the repo owner is the GitHub user `krishnajain-afk`. The new account needs push access (an earlier push failed with 403 because a different GitHub login was active).
4. **Old local files are retired.** Before the migration the pages lived in a local `PotholeIndia/` folder as `index-genz.html`, `index-genz-meme.html`, `404-genz.html`, `index-cfi*.html`. Do **not** edit those any more: the repo files in §2 replaced them. (The older design by someone else, `app.js`, `styles.css`, `config.js`, `dist/`, `scripts/`, was only ever in that local folder and is not in the repo.)

Paste this as the first message in the new session:

```text
Read BRAND-GUIDE.md fully before doing anything. We are continuing work on the Cars24 Patch coming-soon site.
Keep the loud, funny, Gen Z "rebellion" design and voice exactly as documented. Do not push to GitHub unless I
say "push". Experiments go in the lab first. Tell me what you plan to change before large edits.
```

---

## 1. What this project is

**Cars24 Patch** is a *coming-soon* website for a road-safety initiative about potholes in India, part of **a Cars24 Rebellion**. It:

- says one thing: **we're done waiting, so we're fixing the potholes ourselves** (user, 2026-11-14). Not a complaint platform, not "who owns this road", no blame;
- tells, in a funny but serious-underneath way, *why potholes need fixing* (official death figures, cited);
- collects emails with one clear promise: **we email you the day we start fixing** (Google Sheet via Apps Script);
- is playful: a swerve-dodging mini game, a `***hole` → `POT` flip headline, tapes, stickers, memes;
- has a **lab**: a small set of unlisted pages where experiments go live first, plus a growing hub of updates, case files and research.

Audience: young urban Indians who ride/drive, scroll, and share. Tone goal: *share-worthy, not preachy.*

| Item | Value |
|---|---|
| Public brand name | **Cars24 Patch** |
| Umbrella tag | **a Cars24 Rebellion** |
| Live domain | `www.potholefreeindia.org` (old name, kept as the domain; canonical host is `www`) · also `pothole-india.vercel.app` |
| Hosting | Vercel, auto-deploys the GitHub `main` branch; every other branch gets a preview URL |
| Language | English (`lang="en-IN"`), light Hinglish in jokes |

**Name history (so you don't resurrect old names):** Pothole India → Potholefree India → "patch" → **Cars24 Patch (final, current)**. The domain still says *potholefreeindia*: that is expected. Never use the old names in copy.

---

## 2. Pages, files and routes

There are **two visual systems**. Do not mix them. And there are **two kinds of page** while the migration runs: pages already ported to Next.js (React, in `app/`), and pages still served as their original single-file HTML from `public/`.

| Live route | Source in the repo | System | Status |
|---|---|---|---|
| `/` | `app/page.tsx` + `components/home/*` · CSS `app/globals.css` · behaviour `lib/home-behaviour.js` | **Gen Z (loud)** | LIVE homepage, **ported to Next.js** |
| any missing URL | `app/not-found.tsx` + `app/not-found.css` + `components/NotFoundEffects.tsx` | Gen Z | LIVE, ported, real 404 status, `noindex` |
| `/lab` | `public/lab.html` | Gen Z | LIVE, unlisted (`noindex`). **The lab's front page:** homepage copy + swerve game + meme break + one card per lab page (`#inside`). Experiments go here first |
| `/updates` | `app/updates/page.tsx` · styles `components/site/hub.css` · filters `components/site/HubFilters.tsx` | Gen Z | LIVE, `noindex`, **ported to Next.js** 2026-11-18. "dear ***hole,": the road to launch + the latest updates |
| `/research` | `public/research.html` | Gen Z | LIVE, lab, `noindex`. The research library (§12.6) |
| `/case-files` | `app/case-files/page.tsx` · styles `components/site/hub.css` · filters `components/site/HubFilters.tsx` | Gen Z | LIVE, `noindex`, **ported to Next.js** 2026-11-15. The case-study repository |
| `/wall-of-holes` | `app/wall-of-holes/` (`page.tsx`, `holes.ts` = the tiles, `wall.css`) | Gen Z | LIVE, `noindex`, **ported to Next.js** 2026-11-12. Biggest ***holes of the year |
| `/dodge` | `public/dodge.html` | Gen Z | LIVE, lab, `noindex`. Head-lean camera game |
| `/rishta` | `public/rishta.html` | Gen Z | lab, `noindex`. **pothole se rishta**: swipe left to patch, right to match (§12.7) |
| `/on-the-move` | `public/on-the-move.html` | **Calm** (Crashfree India system) | LIVE, `noindex` |
| `/know-who` | `public/know-who.html` | Calm | LIVE, `noindex` |
| `/robots.txt`, `/sitemap.xml`, `/icon.svg` | `app/robots.ts`, `app/sitemap.ts`, `app/icon.svg` | — | LIVE (new with Next.js) |
| — | `google-apps-script.gs` | — | Apps Script for sign-ups. Repo copy has a placeholder Sheet ID; **never commit the real one** |

- `/genz` → 307 redirect to `/` (old link kept alive). `/<page>.html` → 308 redirect to `/<page>` for every page still in `public/`.
- How the HTML pages get their clean routes: `STATIC_PAGES` in `next.config.ts` rewrites `/lab` → `/lab.html` and so on. **When a page is ported**, it moves into `app/<route>/page.tsx`, its `public/<route>.html` is deleted, its name moves from `STATIC_PAGES` to `PORTED` in `next.config.ts` (so `/<route>.html` still redirects), and its route goes into `PORTED` in `components/site/SiteNav.tsx` (so links to it stay inside the app), all in the same change.
- **Everything is built in Next.js from now on** (user, 2026-11-12: "lets build completely in next js .. and we can remove completely HTML pages"). No new pages or features in `public/*.html`; every remaining HTML page gets ported, one at a time with the §8 parity check, and its HTML file is deleted.
- Local preview: `npm run dev` → <http://localhost:3000>. Every route above works locally exactly as live.

---

## 3. Brand voice

### The message (user, 2026-11-14) — read this before writing a single word
> **India has swerved, slowed down and suffered enough. So we're fixing the potholes ourselves.**

- **We fix them. Ourselves.** Not "the potholes are getting fixed" (by whom?), not "report it and we'll chase the authority". Say who does it: us.
- **No accountability, no blame, no "who owns this road".** Never tell people a road belongs to XYZ, never route complaints, never promise deadlines from anyone else. The old calm pages ("Every pothole has an owner", "Soon, you'll know who", report → route → track → close) were rewritten for this. Permission is different: we only work on a road with a yes in writing, and we say so plainly ("permission in writing"), without making it about the owner.
- **What the sign-up gets you:** the button says `tell me first ↗`, never `notify me` (notify about what?). The promise is the same on every page: *we email you the day we start fixing.* No spam.
- **How a fix is told:** properly, in dry weather, with permission, checked months later by someone with no stake in it, and the result goes public, failures included. That is the whole story the hub (diary, case files, research) proves.

### Who we write for: Gen Z (user, 2026-11-14)
Young urban Indians, roughly 18–28, who ride a scooter or sit on the back of one, and scroll a lot.
- **How they think:** "show me, don't sell me". They clock marketing in two seconds. A brand that does something beats a brand that says something. They trust receipts, screenshots and people who admit mistakes.
- **How they feel about potholes:** tired, not outraged. It's a daily side quest they've stopped noticing. Doom-scrolling about the system makes them feel powerless; someone simply fixing it feels like relief.
- **What they do:** skim the first line, maybe the second. Screenshot the funny bit. Send it to the group chat. Join if it costs nothing and promises something specific. Play a 30-second game.
- **What they won't do:** read a wall of text, fill a complaint form, follow an NGO's mission statement, trust a number with no source, click "learn more".
- **What they love to read:** one odd specific line (`shut up ***hole`, `your ex is nominated too`), deadpan honesty (`we know. we know.`), a dare, a meme shape, a stat that hits, a mistake owned (`it read FIXABLE`).
- **What they hate:** lectures and guilt-trips, corporate words (`leverage`, `solutions`, `stakeholders`), "learn more" buttons, blame-the-government rants, fake hype and exclamation marks, cringe slang piled up, being asked for their email with no idea why.
- **So, every block:** first line carries the whole idea (if they stop there, they got it). One joke per block, never next to the deaths. Long detail goes in a fold (`<details>`), a tl;dr sits on top of anything long (the research page has "the 30-second version"). Every ask says what you get.

### One line
> A tired, funny friend who is done swerving: deadpan, lowercase, specific, never cruel — and completely serious about the numbers.

### Principles
1. **Fact first, joke second.** Never joke *instead of* the fact. The "receipts" are always straight and sourced ("okay, serious for a sec.").
2. **Short.** One idea per line. Fragments are fine. End with a full stop. ("zero chill." / "no notes. just a hole.")
3. **Lowercase source copy.** Write display headlines in lowercase; CSS (`text-transform: uppercase`, condensed font) makes them loud. Keep capitals for proper nouns: *India, Cars24 Patch, MoRTH, Parliament, The Tribune*.
4. **Deadpan beats hype.** **No exclamation marks anywhere.** No "Amazing!", no "Don't miss out!!". Sarcasm and understatement do the work.
5. **Speak to "you", for "us".** "you've been doing this daily for years." / "India has swerved, slowed down and suffered enough."
6. **Rebellion = doing, not complaining.** We're annoyed *at the situation* (potholes, shrugging), not at people or authorities, and we answer it by fixing potholes ourselves. No accountability campaigns, no "who owns this road" (2026-11-14).
7. **Specific over vague.** Numbers, places, concrete images (your spine, your axle, your scooter).
8. **Self-aware and meme-literate, used sparingly.** 1–2 slang touches per surface, never a slang pile-up.

### Allowed slang / tics (already in use — reuse, don't multiply)
`it's giving pothole` · `no notes. just a hole.` · `bestie, this isn't it.` · `zero chill.` · `side quest` · `the receipts` · `okay, serious for a sec.` · `(it's "pot". relax.)` · `your spine says thanks` · `plot twists` · `are we there yet?` · `no bouncer.`

### Hinglish
Roman script, light, only in jokes and the meme/wall: *"kya bharosa", "apna pothole, apni selfie", "inn potholes ka kya bharosa"*. Never in the serious data sections.

### Hard "don'ts"
- ❌ No exclamation marks. ❌ No hashtags in page copy. ❌ No emoji except **✦** (separator) and **🛵** (scooter in the game / 404).
- ❌ Don't mock victims or make jokes about the deaths. The joke is the *situation*, not the loss. No puns next to the death figures.
- ❌ Don't invent facts, stats, activities, findings, quotes or dates. If it isn't in §5.4 or supplied by the user, mark it as a placeholder.
- ❌ Don't name or blame a specific authority/person on the page.
- ❌ Don't write corporate filler ("leverage", "solutions", "seamless", "empower", "stakeholders").
- ❌ Don't use the old brand names (Pothole India / Potholefree India / "Patch" alone).
- ❌ Don't encourage anything unsafe. Photo/selfie ideas always carry **footpath only, never in traffic, never while driving**.

### Voice examples (before → after)
| Flat | On-brand |
|---|---|
| "Report potholes on our platform." | "drop your email. we'll tell you when it's live." |
| "Potholes cause many accidents." | "2,385 people died in pothole crashes in India in 2024." |
| "Page not found." | "Cool. Another thing that doesn't work." |
| "Thank you for subscribing!" | "you're on the list. ride safe. we'll email you when it's live." |

### Benchmark: write like the hero and the wall (user feedback, 2026-10-24 and 2026-10-30)
The user's verdict: the **homepage hero and the wall of holes are the benchmark**. They feel like "a human thought has gone into it". Copy that only describes, lists or summarises reads "like AI content", with "no Gen Z flavour". Twice now the hub copy (journey, updates, case files, research, lab cards) was rewritten for this reason.

**The test:** does the block say *one odd, specific thing* (`shut up ***hole`, `your ex needs no introduction.`), or does it describe the page? If it describes, rewrite it.

**AI tells to avoid** (all of these were in earlier drafts):
- Describing the page instead of saying the thing (`everything we read about potholes…`, `the road to launch and the latest news`, `every study we read or run goes on this shelf`).
- Neutral lists of three (`what we did, what we found, and what we got wrong`; `the official numbers, the sums behind them, and what's missing`).
- A template heading on every block. Case files use `the hunch / what we tried / what turned up / what it taught us`.
- `no fluff`, `plain talk`, `no press releases`.
- Flat step titles (`do the homework`, `test a repair properly`, `the ideal system`).
- Repeating the summary inside the details.
- Explaining the fix instead of owning the mistake. Honest mistakes are the best material (the clipped stamp that read FIXABLE, a face tracker that read 12 px as 25).

**Do instead:** open with the odd, specific thing; end on a twist or a deadpan beat; one Gen Z touch per block at most (a meme shape, a slang word, a self-aware aside in brackets); keep every number, date and claim exactly as sourced (rewriting never adds a fact); no jokes about the deaths; safety lines stay plain.

| Flat (earlier draft) | Now (live) |
|---|---|
| `how it's going.` / `no press releases. just what we did, what we found, and what we got wrong.` → `it's us again. we've been busy. some of it even worked.` (rejected 2026-11-11: "still feels like AI") | `dear ***hole,` (flips to `POT`; was `dear diary.`) / `the potholes are winning. for now. this is us keeping score.` |
| `the road to launch` · `milestone: launch · date: soon` | `are we there yet?` · `destination: launch · eta: soon` |
| `do the homework` | `nerd out, properly` … `we took notes. a concerning amount of notes.` |
| `test a repair properly` | `fix one. then check it stays fixed.` … `filling a hole is easy. staying filled is the whole game.` |
| `what just happened` | `plot twists` |
| `we read everything about potholes.` | `we read forty-one pages about potholes. on purpose.` … `that zero is the headline.` |
| `we went to see the machine.` | `we met a pothole machine. it was busy.` … `because hearing isn't testing.` |
| `why potholes come back.` / `we keep filling the same holes…` | `the comeback nobody asked for.` / `same hole. same spot. again. like a sequel nobody ordered.` |
| `watching a machine work isn't evidence that it keeps working.` | `a machine working on the day is a demo, not a result.` |
| `the research.` / `every study we read or run about potholes goes on this shelf…` → `we did the reading.` (2026-11-11: "okay" but not Gen Z enough) | `***hole studies.` (the `***` flips to `POT`, like the hero and the wall) / `self-taught. forty-one pages, zero chill, and a receipt on every claim. where the receipt is missing, we say so.` |
| `surface or structural?` · `the ideal system.` · `how a fair test works.` | `a scratch, or a broken bone?` · `what would actually work.` · `how to test a fix without fooling yourself.` |
| `read the numbers` | `read the receipts` … `nobody trusts a number that won't show its working.` |
| `test the ideas` | `break things on purpose` … `still finding out which ideas are dumb.` |

---

## 4. Language: copy rules & the approved copy bank

### 4.1 Typography of words
- Curly apostrophes/quotes in copy: `’ “ ”`. En dash for ranges: `2020–2024`. Arrows `↗ → ←`. Separator `✦`.
- Numbers use Indian grouping where relevant (`1,72,890`), tabular figures for stats.
- The censor gag is written `***hole` / `***holes` (three asterisks). It **flips to `POT`** (see §6.9).
- Buttons are lowercase: `notify me ↗`, `play ↗`, `open it ↗`, `Go back` (404 only, user-supplied).

### 4.2 Approved copy — homepage (`/`) — change only when asked
The copy lives in `components/home/Hero.tsx`, `components/home/Sections.tsx` and `components/home/bits.tsx` (the sign-up form), plus the metadata in `app/page.tsx`.

| Surface | Exact copy |
|---|---|
| Tab title | `Cars24 Patch — shut up ***hole. Coming soon.` |
| Meta description | `India has swerved, slowed down and suffered enough. So we're fixing the potholes ourselves. Cars24 Patch, coming soon.` |
| Hero chip | `coming soon` |
| Hero headline | `shut up` / `***hole` (flips to `pot` `hole`) |
| Flip note | `(it's "pot". relax.)` |
| Lead | `India has swerved, slowed down and suffered enough.` — highlight marks on **swerved** (pink), **slowed down** (paper), **suffered enough** (blue) |
| Big line | `so we're fixing the potholes ourselves.` (squiggle under "ourselves.") — *was "The potholes are getting fixed." until 2026-11-14: it never said who fixes them* |
| Form | placeholder `drop your email` · button `tell me first ↗` (was `notify me`: notify about what?) · note `we'll email you the day we start fixing. no spam.` |
| Success | **`you're on the list.`** / `ride safe. we'll email you the day we start fixing.` |
| Errors | `type your email first.` · `that email looks off. check it?` · `something broke on our side. try again?` |
| Tape 1 | `coming soon ✦ fixing them ourselves ✦ your spine says thanks ✦ coming soon ✦ no blame game ✦ arrive in one piece` |
| Tape 2 | `shut up pothole ✦ shut up ***hole ✦ …` |
| Receipts | kicker `the receipts` · H2 `okay, serious for a sec.` · lead `the swerving isn't a joke. neither are the numbers.` |
| Stat 1 | `2,385` — `people died in pothole crashes in India in 2024.` — `official MoRTH data · source 1` |
| Stat 2 | `+53%` — `more than in 2020. and it's gone up every year since 2021.` — `1,555 → 2,385 · source 2` |
| Stat 3 | `6.5` — `people. every single day.` — `2,385 ÷ 366 days · source 2` |
| Closer | `no blame game. no complaint forms. we'll just fix them.` (was the road-owner line, retired 2026-11-14) |
| Game | chip `side quest` + `by Cars24 Patch` · H2 `swerve practice.` · `you've been doing this daily for years. let's see the score.` · pills `dodged` / `best` · hint `← → or A / D to swerve. on a phone, tap the left or right side.` · overlay `ready?` / `three lanes. loads of potholes. zero chill.` / button `play ↗` |
| Game over | `you swerved past N and hit one. that's exactly why we're filling them.` *(deliberately left as "filling")* |
| Sticker | starburst `fill 'em up` *(deliberately left)* · starburst `coming soon` |
| Ring text (around hole) | `COMING SOON ✦ WE FIX THEM OURSELVES ✦ …` |
| CTA | kicker `don't miss it` · H2 `potholes: getting fixed. by us.` / `you: first to know.` |
| Pre-footer band | pink pill `a Cars24 Rebellion` |
| Footer | `made by people who are tired of swerving.` / `Cars24 Patch · a Cars24 Rebellion.` · `© 2026 Cars24 Patch. All rights reserved.` · `coming soon.` |
| Sources (footer) | see §5.4 |

> **User decisions on "Cars24 Rebellion" placement:** it appears in the **pre-footer pink band**, the **footer line**, and the "by Cars24 Patch" chip in the game section. It was **removed from the hero** and the **navbar**. Do not add it back there.
> **Navbar** = logo + four links: `updates & journey` · `research` · `case files` · `the wall` (user decision 2026-11-11; it was logo-only before). Built in `components/home/HomeNav.tsx` (classes `hnav-`), inline from 960px, a `menu` panel below. **The meme break is never linked from the homepage.** These four pages keep their `draft` chips and `noindex` until the user says otherwise, but they are **not part of the lab**: no lab bar, and they never link to `/lab`, `/dodge` or `/rishta` (user, 2026-11-12: the lab and rishta are not combined with them). They share the site nav in §12.5. The "notify me" button stays off the homepage navbar (it still exists in the calm pages' navbars).

### 4.3 Approved copy — 404 (`app/not-found.tsx`) — user-supplied, exact
- H1: `Cool. Another thing that doesn't work.`
- H2: `Anyway. We're fixing the roads first.`
- Button: `Go back` (goes `history.back()` if the referrer is same-origin, otherwise to `/`)
- Rotating note (lowercase "patch" is intentional here): `(it's giving pothole.)` · `(no notes. just a hole.)` · `(bestie, this isn't it.)` · `(404, but make it a pothole.)` · `(we'll patch this too. eventually.)`
- Tape: `page not found ✦ anyway ✦ 404 ✦ roads first ✦ cool.`

### 4.4 Approved copy — calm pages (`/on-the-move`, `/know-who`)
Calm, plain, credible (sentence case, real punctuation, still no exclamation marks).
- Kicker `Coming soon` · H1 `Potholes don't fix themselves.` + line 3: **`And we're on the move.`** (on-the-move) or **`So we're fixing them.`** (know-who; was `Soon, you'll know who.`, retired 2026-11-14 with the whole owner story)
- `Potholes killed 2,385 people in India in 2024.`
- `So Cars24 Patch is fixing them ourselves — properly, with permission, and checked months later to make sure the fix lasts.` Illustrative card `Pothole repair`: Spotted → Permission in writing → Repaired properly → Still there after the monsoon.
- Form: `Tell me first` · `No spam. We'll email you the day we start fixing.` · success `You're on the list. We'll email you the day we start fixing.` · CTA `Be first to know when we start fixing.`
- Sections: `How it starts` (crack → water → traffic → hole) → `What it costs` (the figures; "a small share, but a fixable one") → `Why it keeps coming back` (`Filling a hole is easy. Keeping it filled is the job.`: 85% of patches survived at dry sites, 48% at wet ones, a weak base, no Indian survival study; source 4) → `What we're doing` (`Fix it properly. Check it stays fixed.`: Permission → Repair → Check → Publish). Footer tag `Fixing India's potholes ourselves, and checking they stay fixed.` `noindex`.

### 4.5 Lab copy (live, still marked `draft`)
Everything on the lab hub pages carries a `draft` chip until the user approves the wording. The current live lines are in the §3 benchmark table. Lab front page (`#inside`): kicker `behind the tape`, chip `pick a door`, H2 `while you were swerving, we were building.`, lead `we fell into a pothole. it went deeper than expected. this is everything we dragged out.` Cards: `the diary.` (`dear diary. today we read forty-one pages about bitumen. voluntarily.`), `the research.` (`we read the boring stuff so you don't have to. every claim gets a receipt, or gets called out.`), `case files.` (`every idea we tried, including the dumb ones. especially the dumb ones.`), `the wall of holes.`, `dodge with your head.`. Lab bar: `the lab: stuff we're still testing. not the official homepage. the real one is over here →`.

---

## 5. Content that must stay accurate

### 5.1 Never fabricate
Anything outside §5.4 (activities, findings, partners, dates, counts, quotes) must come from the user. Placeholders go in `[square brackets]` and are marked as samples.

### 5.2 Safety framing
Any photo/selfie/"snap it" content must state: **stand on the footpath or somewhere safe; never on the road; never while driving/riding; a friend takes the photo; daylight; keep other people's faces and number plates out.** Tone: "no heroics. footpath only."

### 5.3 Privacy
- Email list goes to a **private** Google Sheet. Never expose the Sheet ID, keys or tokens in pages or the repo.
- Photos of identifiable people need explicit consent; strip location data; handle under-18s carefully; have legal check wording. Takedown promise: "want yours off the wall? tell us and it comes down."

### 5.4 Verified data (MoRTH, via Union Minister's written reply in Parliament, reported by The Tribune, updated 14 Feb 2026)
| Year | Pothole-related deaths |
|---|---|
| 2020 | 1,555 |
| 2021 | 1,481 |
| 2022 | 1,856 |
| 2023 | 2,161 |
| 2024 | 2,385 |

Derived (shown with the working in the footer):
- **+53%** = (2,385 − 1,555) ÷ 1,555 · **6.5 a day** = 2,385 ÷ 366 (2024 was a leap year) · five-year total **9,438** (23,056 pothole-related accidents) · 2023: **2,161 of 1,72,890** road deaths ≈ **1.2%**.
- The research page also uses **~1.3% of 1,77,175 road deaths (2024)**, from MoRTH's *Road Accidents in India 2024* (Table 3.5) and the Lok Sabha reply of 12 Feb 2026 via ThePrint. Both shares are right; they are different years. Always name the year next to a share.
- Always say "recorded crashes only". The data goes up every year **since 2021** (2020→2021 dipped).
- Source line (footer, reproduced exactly on the homepage): *Pothole-related deaths, 2020–2024 (1,555 · 1,481 · 1,856 · 2,161 · 2,385): Ministry of Road Transport and Highways data, from the Union Minister's written reply in Parliament; reported by The Tribune, updated 14 February 2026. Recorded crashes only.* Link: tribuneindia.com article "pothole-deaths-rise-53-per-cent-in-5-years…".
- Repair methods: the research page lists **16** methods but its prose says "about fifteen" (the brief's own wording). Keep "about fifteen" in prose unless the user decides otherwise.

---

## 6. Design system — GEN Z (loud) pages

Applies to: the homepage, the 404 and the seven lab pages.
**Style keywords:** caution-tape yellow, asphalt black, electric blue, sticker pink, hard offset shadows, thick outlines, tilted stickers, tape strips, marquee tapes, film grain, springy motion. *Neo-brutalist / zine / sticker-bomb.*

### 6.1 Colour tokens (copy exactly)
In the Next.js pages these live in `app/globals.css`; each HTML page in `public/` still carries its own copy.
```css
:root {
  --ink:#121212; --paper:#F6F1E6; --yellow:#FFD60A; --blue:#3B2BFF;
  --pink:#FF5FA2; --red:#FF2D2D; --white:#FFFFFF;
  /* theme roles (yellow theme is the default) */
  --prim: var(--yellow); --on-prim: var(--ink);   /* nav, hero, tape, pills, CTA */
  --acc:  var(--blue);   --on-acc:  var(--white); /* stickers, highlight blocks, game section */
  --hi:#FFD60A; --focus: var(--blue); --edge:#FFD60A;
  --bd:3px solid var(--ink);          /* the standard outline */
  --sh:6px 6px 0 var(--ink);          /* the standard hard shadow */
  --ease:cubic-bezier(.2,.8,.2,1);
  --spring:cubic-bezier(.34,1.56,.64,1);
  --nav-h:72px;
}
html[data-theme="blue"] { /* swaps roles */
  --prim:var(--blue); --on-prim:var(--white); --acc:var(--yellow); --on-acc:var(--ink);
  --focus:var(--ink); --edge:#7A6FFF;
}
```
- **Default = yellow.** `?theme=blue` previews blue (nothing is saved). The theme is set by a tiny script before first paint (in `app/layout.tsx` for Next pages, in each HTML page's head otherwise). Always write components with the **role variables** (`--prim/--acc`), never hard-coded yellow/blue, so both themes work.
- Pink = stickers/secondary highlight and the "FOUND" / rebellion accents. Red = danger/`UNFIXABLE` only. Paper (`#F6F1E6`) = light section background. Ink = dark sections, text, outlines.
- Text on white/paper cards must be **ink** even inside a blue/yellow section.
- Shadows on **ink** backgrounds must use a light colour (`--hi`, pink, paper) — an ink shadow is invisible there.

### 6.2 Typography
| Role | Font | Notes |
|---|---|---|
| Display / body | **Bricolage Grotesque** (variable: `opsz,wdth,wght 12..96, 75..100, 200..800`) | Display = weight 800, `font-stretch:75%` + `font-variation-settings:'wdth' 75`, `text-transform:uppercase`, `letter-spacing:-.035em`, `line-height:.84–.95` |
| Labels / data | **Space Mono** 400/700 | Kickers, chips, pills, sources, stamps. Often uppercase with `letter-spacing:.1–.14em` |
| Scribble | **Permanent Marker** | Small handwritten notes only (e.g. the "pot" note) |

Loaded from Google Fonts (`preconnect` + one `css2` link; in `app/layout.tsx` for Next pages). Self-hosting through `next/font` is a planned improvement, not done yet. Type scales are fluid `clamp()`; big numbers/headlines inside cards use **container units**: `font-size: clamp(3.4rem, 33cqw, 9rem)`.
Body 17px/1.5 weight 500. Hero headline `clamp(3.6rem, 22cqw, 13rem)`. `.h2` `clamp(2.8rem, 1rem + 7vw, 6.4rem)/.88`.

### 6.3 Layout
- `.wrap`: `max-width:1280px; padding-inline:24px` (≥768: 40px; ≤300: 16px). Single column on phones; 2-column hero ≥960px.
- Section rhythm (homepage): **yellow hero → paper tapes → paper receipts → blue game → yellow CTA → paper band → ink footer.** The lab front page adds an ink `#inside` (cards) and a paper meme break. Alternate colours; every coloured section has a `3px` ink top/bottom border.
- Vertical padding `.sec`: 88px (≥1024: 120px).
- Sticky nav 72px: logo (mascot icon + "Cars24 Patch") + the four links on the homepage (§4.2).

### 6.4 Borders, shadows, radii, tilt
- Outline `3px solid ink` everywhere. Hard offset shadow `6px 6px 0` (hover `10px 10px 0`, press `2px 2px`). Radii: buttons 16, chips 999, kicker 10, cards 22–28, polaroids 16.
- **Everything is slightly tilted** (`rotate: -3deg … 3deg`, via `--r`) and straightens on hover. Highlight marks use `skew(-6deg) rotate(-1.2deg)`.
- Film grain overlay on `body::after` (SVG noise, `opacity:.09`, `mix-blend-mode:multiply`, `pointer-events:none`).

### 6.5 Component catalogue (reuse, don't reinvent)
| Component | Spec |
|---|---|
| **Button** `.btn` | 56px tall, 16px radius, ink bg + yellow text, `--sh` shadow; hover lifts `-2,-2`; active presses `+4,+4`; arrow `↗` nudges on hover. `.btn-sm` 46px. `.btn-yellow` = prim bg |
| **Kicker** `.kicker` | Space Mono 13px uppercase, `.14em`, white bg, 3px border, `rotate:-1.5deg` |
| **Chip** (`.tag-chip`, `.wh-chip`, `.upd-chip`) | pill, ink bg + yellow text (or pink bg + ink text), `rotate:±2deg` |
| **H2 highlight** `.h2 .hi` | inline block: prim bg, 3px border, 12px radius, `box-decoration-break:clone` |
| **Squiggle** `.squig` | repeating SVG wave underline (`--squig`) |
| **Card** `.card` | white, 26px radius, `--sh`, tilt; variants red-number / blue / pink |
| **Stat number** | `container-type:inline-size` card + `clamp(…33cqw…)`, `nowrap`, tabular figures, count-up on reveal |
| **Pill** `.pill` | 13px mono label + 30px number |
| **Starburst sticker** | 20-point SVG star, white fill, ink stroke, hard `drop-shadow`, bobbing. React: `<Starburst>` in `components/home/bits.tsx` |
| **Marquee tape** | two rotated bands (yellow `-3deg`, ink `+2.2deg`), each group's content duplicated so it is wider than any screen; `translateX(-50%)` loop 56s/68s. React: `<Tape>` in `components/home/Sections.tsx` |
| **Logo mark** | pothole face SVG, dark on yellow / yellow on black. React: `<Mark dark>` in `components/home/bits.tsx` |
| **Polaroid tile** `.tile` | white frame, 3px border, `--sh`, tape strip (`::before`), square photo, caption (mono) + credit line |
| **Stamp** `.tile-stamp` | rotated, 4px border, uppercase 800 display; pink = `FIXED`, red = `UNFIXABLE` |
| **Evidence stamp** `.stamp[data-k]` | established, corroborated, single source, claim, inference, mixed, not found, told (§12.6) |
| **Update card** `.upd` | date sticker + status tag (`found` pink / `doing` prim / `next` acc / `done` paper) + native `<details>` "the details +" |
| **Form** `.sub` | email input (56px, 16px radius, `--sh`) + button; honeypot field named `company`; states `is-loading`, `is-invalid`, `is-done`; status text `aria-live`. React: `<SubscribeForm>` in `components/home/bits.tsx` |
| **404 mascot** | pothole with eyes that roll; "4 🛵 4" |

### 6.6 Motion
- Entrances: `.pop` (rise + tilt, spring) and `.slap` (scale-in); on scroll: `.reveal` → `.in` via IntersectionObserver (`translate:0 36px` → 0, `--d` = stagger delay).
- Loops: ring text spin 22s; hole ripple; blink; scooter drive-by; tapes; bobbing sticker.
- Signature: **`***` ↔ `POT` 3D flip** (auto every ~4.5s, hover on desktop, click to pin).
- Celebration: WAAPI **confetti** on successful sign-up.
- Always honour `prefers-reduced-motion` (animations to ~0ms, content visible).
- Springs for playful, `--ease` for UI. Don't add animation libraries; everything is hand-written CSS/JS.

### 6.7 Imagery, icons
- **No stock photography.** Art is inline SVG + CSS: the **pothole mascot** (black ellipse, yellow ring, two white eyes with pointer-tracking pupils, smile), starbursts, the cross-section diagram (calm pages), scooter emoji `🛵`.
- Photos appear **only** on the Wall of Holes: openly licensed (Wikimedia Commons) or user-permitted, always credited, cropped to square by CSS.
- Favicon: yellow rounded square with the pothole face: `app/icon.svg` for Next pages (the HTML pages carry the same SVG as a data URI).

### 6.8 Accessibility (non-negotiable)
Skip link · `:focus-visible` outline (3px) · `lang="en-IN"` · semantic landmarks · 44px+ touch targets · `aria-live` on form/score · `noscript` fallbacks · decorative SVG `aria-hidden` · alt text describes the pothole, never a person · reduced-motion support · colour contrast checked (calm pages meet WCAG AA).

### 6.9 Signature features (how they behave)
- **Hero censor:** `*** hole` ⇄ `POT hole`. Two stacked faces (`.stars`, `.pot`) in an `inline-grid` with 3D `rotateX`; JS **measures** both widths into `--ws/--wp` so "***" hugs "hole" and the word slides on flip. Same markup/CSS/JS (`#censor`, `sizeCensor()`, `ResizeObserver`) everywhere the gag appears.
- **Pothole mascot:** pupils follow the pointer (`transform:translate(%…)`), mouth changes when POT shows.
- **Ring text:** SVG `textPath` with `textLength` around the hole.
- **Game (side quest):** canvas, 3 lanes, scooter dodges potholes; keys `← → / A D`, tap left/right; `touch-action:pan-y`; best score in `localStorage` (try/catch).
- **Receipts:** count-up numbers; cite sources.

---

## 7. Design system — CALM pages (`/on-the-move`, `/know-who`)

Crashfree India (CFI) house system: clean, trustworthy, minimal motion. **Do not add Gen Z styling here.** Both pages are identical except one headline line and the matching `og:title`.

```css
:root{ --brand:#4A35FF; --brand-fg:#fff; --brand-lite:#F8F7FF; --lavender:#F3F1FF;
  --danger:#F10015; --success:#00AA44; --ink:#1A1C1C; --muted:#666479; --border:#EDEEF2; --bg:#fff;
  --ff-head:'Montserrat',system-ui,sans-serif; --ff-body:'Geist',-apple-system,sans-serif;
  --r-card:16px; --r-panel:24px; --nav-h:72px; }
```
Fonts: Montserrat 500/600/700 (headings) + Geist 400/500/700 (body). Lucide-style stroke icons (SVG sprite). Sections separated by `1px` borders; white / brand-lite / brand-blue blocks. Navbar keeps a "Notify me" button.

---

## 8. Responsive & QA standard (every change must pass)

**Targets:** no horizontal scroll and no clipped/overflowing element at **280, 300, 320, 375, 414, 520, 640, 768, 900, 960, 1024, 1100, 1440, 1920, 2560 px**.

Method (a real browser; Playwright and Chromium are fine):
1. Resize to each width, force reveals visible (`.reveal` → `.in`), then run a JS audit: `documentElement.scrollWidth === innerWidth`; for every element in the changed section `getBoundingClientRect()` must stay within `[0, innerWidth]`; text containers must satisfy `scrollWidth <= clientWidth`. Skip `.sr-only` elements: they are clipped on purpose.
2. Open every `<details>`; check stamps/labels sit **fully inside** their frames (a clipped stamp once read "FIXABLE" instead of "UNFIXABLE").
3. Check yellow **and** `?theme=blue`, keyboard (Tab/Enter/Space), console errors, reduced motion.
4. Look at actual screenshots at phone (375) and desktop (1440), not just numbers. Screenshots taken mid-entrance-animation are not bugs: wait ~2.5 s.
5. `npm run build` must pass before any push.

**Porting a page to Next.js (parity check, how `/` and the 404 were verified):** serve the old HTML and the new route side by side, then
- compare the rendered DOM node by node (tag, classes, sorted attributes, text). Next adds one hidden `<div>`; nothing else may differ;
- pixel-diff full-page screenshots at 320 / 375 / 768 / 1024 / 1440 / 2560 in both themes with `reducedMotion: 'reduce'`, after moving the pointer once (the mascot's eyes react to the pointer);
- exercise the behaviour (form errors and success with the Apps Script request intercepted, counters, flip, game, any buttons);
- then run the audit above.

**Lessons learned (don't repeat):**
- Size things from the **container** (`cqw` / `container-type:inline-size`), not the viewport (`vw`) — a `vw`-sized tile fan overflowed its column at 1024px.
- Big numbers need `container-type` + `cqw` + `minmax(0,1fr)` grids or they overflow at 980–1280px and 320px.
- Put media-query overrides **after** the base rules.
- Don't reuse a CSS variable name for two jobs (`--d` = animation delay; parallax uses `--depth`).
- Marquee groups must each be wider than the screen (duplicate content) or a gap appears at ≥2560px.
- Long brand names need nav shrink rules at ≤420/400/360/340/300px.
- SVG shapes: use `fill-opacity`, not CSS `opacity`, when specificity fights; clip diagrams with `overflow:hidden`.
- `localStorage` can throw (private mode/`data:` URLs) — always `try/catch`.
- **The homepage CSS is global in Next.js** (`app/globals.css`). A ported page that reuses a homepage class name gets the homepage's rule too. The 404 port broke twice this way (a homepage reset removed an `h2` margin; the homepage tape dimmed every other 404 tape item). Prefix page-only classes (the 404 uses `nf-`) and pixel-diff.
- In the sandbox, `pkill -f <pattern>` can kill its own shell when the pattern is in the command line. Kill by PID instead.

---

## 9. Technical architecture

- **Next.js 16 (App Router) + React 19 + TypeScript 5**, no Tailwind, no CSS framework, no UI library. `npm run dev` / `npm run build` / `npm start`. Node 22+.
- **Everything is prerendered as static pages**: Next.js is used for structure (components, one shared CSS, metadata, sitemap), not for servers or databases.
- **Hybrid during the migration (ending: everything moves to Next.js):** ported pages live in `app/`; unported pages are the original single-file HTML in `public/`, served at clean routes by `next.config.ts` (`STATIC_PAGES` rewrites, `.html` → clean 308 redirects). Never hand-edit a route in two places.
- **Moving between ported pages does not reload the page** (that was the point of the port, user 2026-11-12). Links to ported routes are Next `<Link>`s through `PageLink` in `components/site/SiteNav.tsx`; links to pages still in `public/` stay plain links (a full load) until they are ported. So every page's behaviour must **start and stop cleanly**: an effect that adds listeners, timers, animation loops or observers returns a cleanup, and any class it puts on `<html>` comes off on cleanup (the homepage's custom cursor sets `has-cursor`, which hides the mouse).
- **Shared site components** (`components/site/`): `SiteNav.tsx` (`Nav` with `current`, `PageLink`, `PORTED`), `PageFooter.tsx` (the hub pages' footer; children go between the logo row and the copyright, e.g. the sources), `PageEffects.tsx` (reveal on scroll + the `#censor` flip, with cleanup), `Photo.tsx` (a photo with the three-step fallback: `/rishta-photos/` → `/_next/image` → Commons), `hub.css` (the hub styles: `upd-`, `hub-`, `jr-`, `cf-`, `cfp-`, `.stamp`, `.more-go`; for case files and the diary now, research when it is ported), `HubFilters.tsx` (the filter chips + `#id` deep links + `a[data-open]` of a hub page: give it the card selector, the filters, the unit, the count id and `TOTAL`), and `HashLinks.tsx` (in `app/layout.tsx`, below).
- **In-page `#` links go through the router** (`components/site/HashLinks.tsx`, 2026-11-15). A plain `#src-1` / `#subscribe` / `#main` jump adds a history entry Next.js doesn't know, and after it, going to another page and pressing back showed the other page's content under this page's address (it was live on the homepage after the wall port). `HashLinks` catches same-page `#` clicks, uses `history.pushState` (which Next.js tracks), then scrolls, focuses the target and fires `hashchange` like the browser would. Don't set `location.hash` in page code; write `<a href="#id">` and let it work. Page-only CSS lives next to its page (`app/wall-of-holes/wall.css`) and stays loaded after you leave, so its classes carry a page prefix (`wh-`).
- **Homepage structure:** `app/page.tsx` (metadata + JSON-LD + layout) → server components in `components/home/` (`Hero.tsx`, `Sections.tsx` with Tapes / Receipts / Swerve / Cta / RebBand / Nav / Footer, `bits.tsx` with Mark / Starburst / SubscribeForm / `vars()`). The nav is the shared `components/site/SiteNav.tsx`. The behaviour (flip, eyes, counters, forms, confetti, game, custom cursor, parallax) is the original vanilla script in `lib/home-behaviour.js`, started by the client component `components/home/HomeEffects.tsx`; `startHome()` returns a stop function that undoes everything (2026-11-12), so the homepage works again when you come back to it without a reload. It works on the server-rendered markup **by id and class**, so keep ids/classes in the components in sync with it.
- **`vercel.json`** sets `"framework": "nextjs"` (the Vercel project itself has no framework preset). **`next.config.ts`**: `/genz` → `/` (307), the static-page rewrites and redirects, and headers `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`. No CSP. `poweredByHeader: false`.
- **SEO** (`lib/site.ts` holds `SITE_URL = https://www.potholefreeindia.org`): `metadataBase`, canonical `/`, Open Graph + Twitter tags, `WebSite` JSON-LD with only on-page facts, `app/robots.ts` (allow all + sitemap), `app/sitemap.ts` (indexable pages only: today just `/`). Lab and calm pages keep their own `noindex` tags. Vercel adds `x-robots-tag: noindex` to **preview** deployments only.

### Email capture
- `CONFIG = { endpoint, storageKey, bestKey }`: in `lib/home-behaviour.js` for the homepage, near the bottom of each HTML page's script otherwise. `endpoint` is a **Google Apps Script web app URL** (Execute as: me · Access: anyone). It is public in page source by design; it can only **append**; `GET` returns a health JSON only.
- Page sends `fetch(endpoint,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON})` with `{email, source, page, at}`. Response is opaque, so the success UI always shows. `source` = `hero` / `footer` (form `data-source`). `page` = `location.origin+pathname` on http(s) else `local-preview`.
- Script (`google-apps-script.gs`): lowercases, dedupes, validates, rejects values starting with `= + - @` (formula injection), uses `LockService`, appends `Timestamp, Email, Source, Page`. After editing: **Deploy → Manage deployments → Edit → New version** (URL stays the same).
- The Sheet is **private** (owner only). Its ID lives only in the owner's local `.gs` — **never commit it**; in the repo `SHEET_ID` is a placeholder.
- `storageKey: pothole-india-genz:subscribed` (remembers sign-up), `bestKey: pothole-india-genz:best` (game score).
- Honeypot input named `company` (hidden) blocks naive bots.
- **Testing:** intercept `script.google.com` in the test browser so no test email reaches the Sheet.

### Analytics
- Next pages: `<Analytics />` from `@vercel/analytics/next` in `app/layout.tsx`.
- HTML pages in `public/`: the plain snippet (`window.va` + `/_vercel/insights/script.js`).
- Works only after **Vercel → project → Analytics → Enable**. Locally the script 404s (expected). Cookieless: no consent banner needed.

### Third-party runtime (only `/dodge`)
`public/dodge.html` loads **MediaPipe Tasks Vision `@1.1.1`** (`cdn.jsdelivr.net`, ESM + WASM) and its **Face Landmarker** model (`face_landmarker.task`, 3.6 MB, `storage.googleapis.com`; the first load downloads ~4 MB), only when the player starts the camera. Video is processed **on the device**; nothing is uploaded. For production consider self-hosting both files. Credit "MediaPipe, by Google" is shown on the page.

### Domain / DNS (user's action items)
`www.potholefreeindia.org` works and is the canonical host. The **apex** (`potholefreeindia.org`) has stale GoDaddy A records — delete `76.223.105.230` and `13.248.243.5`, keep `216.198.79.1`.

---

## 10. Working rules & user preferences (learned the hard way)

0. **Lab first (user rule, 2026-10-23, restated 2026-10-30):** every experiment goes live in **the lab first** (front page `public/lab.html` at `/lab`, plus the lab pages). Only after a final check and the user's confirmation is anything promoted to the homepage (`/`, now `app/page.tsx` + `components/home/`). Never edit the homepage first. Anything big gets **its own lab page**, and the lab front page keeps a card for it (`#inside`).
1. **Never push unless the user says "push" / "go".** Many requests are "try it locally". A push to `main` is public within a minute.
2. **Do exactly what was asked — nothing more.** Change one thing, report it, ask before widening scope. If an instruction is ambiguous about copy, change only the named strings.
3. **Exact user copy is sacred** (404 text, hero line). Don't "improve" it.
4. **Report outcomes honestly:** what changed, what was verified (widths, console, build), what is on a branch vs live.
5. **Verify before claiming:** run the §8 audit; after a push, check the deployment is READY and the live routes serve the new content (§11).
6. **Downloads/third-party assets:** ask before downloading any file (state name, source, size). **Never scrape or repost images from Google Images / Instagram / X.** Use openly licensed (Wikimedia Commons, CC0/CC BY/CC BY-SA) with visible credit, or user-supplied/permitted photos.
7. **No invented content** (see §5.1).
8. **Backups:** git history is the backup. Before a risky change, note the commit you started from; Vercel keeps the previous production deployment as a one-click rollback.
9. **Copy changes ripple:** when a word changes (e.g. "filled" → "fixed") grep **all** occurrences incl. metadata in `app/page.tsx`, `aria-label`, ring text, tapes, game text, and the HTML pages in `public/`.
10. **Grep before naming anything:** before adding a CSS class, id or variable, grep the whole repo (`app/`, `components/`, `lib/`, `public/`). The homepage owns `.cf` = confetti; two variables both named `sr` once broke dodge's screen-reader announcements.
11. **Memory:** this guide is the memory. Keep it updated when decisions change, and commit it with the change.

---

## 11. How to push safely (when the user says "push")

1. Work on a branch. `npm run build` passes; the §8 audit passes; for a port, the §8 parity check passes.
2. Scan the diff for secrets: the Sheet ID, API keys (`AIza`, `sk-`, `ghp_`), emails, tokens. Scan public pages for the publishing red lines (§12.6).
3. Commit with a descriptive message. Push the **branch** first: Vercel builds a preview (find it with the Vercel connector `list_deployments` filtered by `sha` or `branch`; previews sit behind Vercel login, so read them with the connector's `web_fetch_vercel_url`). Check the preview: status codes, the changed text, headers.
4. Only when the user says so, fast-forward `main` to the branch (`git push origin HEAD:main` after checking `origin/main` is an ancestor). Never force-push `main`.
5. Wait for the production deployment to be READY (Vercel connector), then verify the live routes serve the pushed content (`/` title, canonical, the changed pages byte-identical to their files, `/genz` → 307, a bad URL → 404). Report the commit hash. If the sandbox cannot reach the domain directly, verify through `pothole-india.vercel.app` with the connector.

Repo layout: `app/`, `components/`, `lib/`, `public/`, `next.config.ts`, `vercel.json`, `package.json`, `tsconfig.json`, `google-apps-script.gs` (placeholder ID), `README.md`, `BRAND-GUIDE.md`, `CLAUDE.md`, `.gitignore`.

---

## 12. The lab (all live, unlisted)

### 12.1 Updates & journey (`app/updates/`, ported 2026-11-18) + case files (`app/case-files/`, ported 2026-11-15)
The old "dispatches" section grew into a hub that was split into pages on 2026-10-24 (the user: everything on one page "won't look good"). The idea: the updates grow into a **case-study / portfolio repository** of everything done on the way to the milestone (studies, learnings, landings, photos), with the journey, updates and case files all linked.
- **The diary (`app/updates/page.tsx`):** yellow hero `dear ***hole,` (the `***`⇄`POT` flip; the diary is a letter to the pothole) / `the potholes are winning. for now. this is us keeping score.`, then an ink section with jump chips (`are we there yet? · plot twists · research ↗ · case files ↗`), the two parts below and a `more behind the tape` button row.
- **1. Are we there yet? (`#journey`):** progress bar + **6** step cards (`data-s` done/doing/next; 3 columns at ≥1000px). `destination: launch · eta: soon`. Steps: read the receipts (done) → hang the sign (done) → nerd out, properly (done: the research and the machine visit) → break things on purpose (doing) → fix one. then check it stays fixed. (next: a real road, the permission in writing, someone independent checking; **no place names, no timeline**) → launch (next).
- **2. Plot twists (`#updates-feed`):** dated cards, newest first, with **filter chips** (all / research / field visits / experiments / milestones, driven by `data-type`) and a live count. Today: the research (oct 2026), the machine visit (oct 2026), dodge (22 Oct), the wall (16 Oct), the finding (1 Oct), the list (1 Oct) + a hidden empty slot. **The research and visit dates are month-only on purpose until the exact days are confirmed.**
- **3. Case files (`case-files.html`):** filter chips (all/studies/experiments/landings, live count), 2-column grid, a card with open details spans the full row, `#cf-02` deep links open that card. Each case file = the hunch · what we tried · what turned up (numbers/bars/chips) · what it taught us (numbered) · links. Built: **01 "2,385 people. one table."**, **02 "the wall of holes."**, **03 "dodge with your head."**, **04 "the comeback nobody asked for."**, **05 "we met a pothole machine."** + an empty template slot. All wording is marked **`draft`**.
- **Linking:** `<a href="case-files.html#cf-02" data-page="case-files" data-hash="#cf-02">` (the target page opens that card on load). `<a href="#u-list" data-open>` opens an in-page update card. Ids: `cf-01..05`, `u-research`, `u-visit`, `u-dodge`, `u-wall`, `u-found`, `u-list`, `journey`, `updates-feed`, `more`.
- **How to add:** a **case file**: in `app/case-files/page.tsx`, copy the last `<li className="upd cfile reveal">`, number it `cf-06`…, set `data-type` to `study` / `experiment` / `landing` (space-separated) and raise `TOTAL` (the count shown before any filter). The empty "your turn" slot is no longer rendered (it only ever showed on localhost); the comment above the list is the template. An **update**: in `app/updates/page.tsx`, copy an `<li className="upd reveal">` to the top of the feed and raise `TOTAL`; the empty template slot is no longer rendered (the comment above the journey is the guide). A comment at the top of each page explains it. Never add facts that didn't happen.
- **Gotcha (fixed):** the homepage uses `.cf` for **confetti** (`position: fixed; pointer-events: none`). Case files are `.cfile`. **Always grep for an existing class name before adding a new one.**

> Content still needed from the user: confirm/edit the journey steps and the milestone, review each `draft` entry, and supply real future updates and case files.

### 12.2 Meme break (`#meme` on `/lab`)
Paper section: `meme break` kicker; white tilted card with tape: **1 kachori + 2 samosa = pothole (worried face)**, hand-drawn SVGs; caption **`Inn potholes ka kya bharosa??`** (the last part on a blue highlight). **User decision (2026-10-02): not going on the homepage for now.**

### 12.3 Wall of Holes (`app/wall-of-holes/`, ported 2026-11-12)
- Concept: **"Biggest ***holes of the year"** (satirical nominees wall).
- **H1:** `biggest ***holes of the year.` with the `***`⇄`POT` flip. Chips `2026 edition`, `your ex is nominated too`. Lead: `the nominees are in. real potholes on real Indian roads. and, obviously, your ex.`
- **Grid:** 3×3 (auto-fit, 3/2/1 columns), polaroid tiles, **the "your ex" tile is item #5 = the exact centre.**
- **Photos:** 8 openly licensed Wikimedia Commons photos (New Delhi, Kolkata, Bengaluru ×2, Bihar, Karimganj/Assam, Chennai, Assam) — CC BY-SA 4.0 / CC BY 2.0 / CC0. Served from our own domain since 2026-11-12: each entry in `HOLES` has a `file` and the tile loads the same build-time copy as rishta (`/rishta-photos/<file>`, §12.7), then `/_next/image`, then the Commons URL, so a tile never shows blank (the hot-linked photos could show blank, like rishta's did). Each tile shows `photo: <author> · <licence>` linking to the Commons file page and licence. Entries live in `HOLES` in `app/wall-of-holes/holes.ts` (`file, src, alt, place, by, link, lic, licUrl, fixed, ex`); the tiles are rendered on the server now, so they show without JavaScript. Only `https` credit links become links (the CC0 licence page is `http`, so it stays plain text, as before). Page-only classes use the `wh-` prefix (`wh-grid`, `wh-tile`, `wh-stamp`, `wh-steps`, `wh-safe-card`, `wh-credit`…). The port passed the §8 parity check: identical DOM (162 nodes, classes mapped) and 0 differing pixels below the nav at 320–2560px in both themes.
- **"your ex" tile:** blocked-person avatar + red **`UNFIXABLE`** stamp; caption `your ex` / `the other kind of ***hole`; credit `photo: deleted. we don't talk about them.`
- Below: how it works (`snap. pin. fixed.`), safety card (`no heroics. footpath only.`), CTA `nominations open soon` (links to `/#subscribe`), "about the photos" card. **The takedown sentence and contact email are hidden** until there is an email (a comment in the file says how to restore them).

### 12.4 Dodge — head-lean camera game (`public/dodge.html`)
- **Flow:** intro → `start camera` (or `no camera? use taps`) → load head tracking → calibrate ("sit where you are", 2.2 s) → 3-2-1 → play → crash → **"that was pretend." + big `2,385` + "people it wasn't. pothole crashes in India, 2024." (source 1)** → `play again` / `dare a friend` / `re-centre` / `lean needed` / `stop camera` / `notify me when it's live`.
- **Controls:** `steer = sideways movement (in face-widths) + 0.6 × head tilt (20° = 1)` from the **Face Landmarker** (478 points; head centre = average of 9 landmarks; tilt = line through the outer eye corners, mirrored). Lane switch at `lean needed` small 0.16 / **medium 0.24 (default)** / big 0.36, leave at 55% of that. The neutral spot follows your posture (τ≈3 s) in the middle lane. A **lean meter** shows how far you lean. Tap mode = tap halves or ← → / A D. `Esc` or ✕ exits and **stops the camera**.
- **Don't go back to the lighter BlazeFace detector:** its readings were coarse (12 px read as ~25 px) and its tilt was wrong.
- **Scoring:** +1 per pothole passed; speed ramps 0.40→1.18 over ~50 s; spawn gap 1.1 s→0.52 s; two-lane rows after 14 s; best in `localStorage` `pothole-india-genz:dodge-best`; lean size in `pothole-india-genz:dodge-lean`.
- **Share:** Web Share API, clipboard fallback, `?beat=N` shows "a friend dodged N. beat that." (0–999).
- **Safety/privacy (non-negotiable):** play still, indoors, never walking/riding/driving; "camera on · stays on this device"; no recording/upload; camera stops on exit/`pagehide`.
- **Debug:** `?debug` exposes `window.dodgeDebug` incl. `step(dt)`. Camera needs a secure context (https or localhost).
- **Gotchas:** `video.currentTime` doesn't advance for camera streams in some browsers → detect on a ~30 Hz timer. The screen-reader box is `srEl` (`sr` is the smoothed tilt): **never reuse a variable name inside one big script.**

### 12.5 Lab pages and the nav
| Nav label | File | Live route |
|---|---|---|
| the lab | `public/lab.html` | `/lab` |
| updates & journey | `app/updates/` (Next.js) | `/updates` |
| research | `public/research.html` | `/research` |
| case files | `app/case-files/` (Next.js) | `/case-files` |
| the wall | `app/wall-of-holes/` (Next.js) | `/wall-of-holes` |
| dodge | `public/dodge.html` | `/dodge` |
| *(not in the nav)* | `public/rishta.html` | `/rishta`: reached only from its card on `/lab` (user, 2026-11-11) |

- **One shared nav, copy-pasted into every HTML page still in `public/`** (ported pages use `components/site/SiteNav.tsx` instead). Three marked blocks: `/* LAB-NAV:css:start … end */`, `<!-- LAB-NAV:html:start … end -->`, `/* LAB-NAV:js:start … end */`. The css and js blocks must be **identical in every HTML lab file** (four since the wall, case files and the diary were ported: lab, dodge, rishta, research). The HTML block comes in two kinds:
  - **`LAB-NAV:html`** on the three lab-only pages (`lab.html`, `dodge.html`, `rishta.html`): the lab bar + logo to the lab (`#top` on the lab front page, `/lab` elsewhere) + six links (the lab, the four hub pages, dodge). Identical in those three except `aria-current` and the logo.
  - **`SITE-NAV:html`** on the hub page still in HTML (`research`; the wall, case files and the diary are ported and use `SiteNav`): no lab bar, logo to `/`, the same four links as the homepage, footer link `back to the homepage`. **These pages never link to `/lab`, `/dodge` or `/rishta`** (not in the nav, the footer or the content: the `play it ↗` / `play dodge` links were removed 2026-11-12). Grep for `data-page="(lab|dodge|rishta)"` before any push.
  After changing one, copy it to the others of its kind and re-diff (checksums).
- **Markup (lab nav):** the `lab-bar` above the sticky yellow `header.nav`: logo · `menu` button · `<nav id="nav-links">` with six `.nav-link`s (rishta is deliberately left out; `PAGES` still maps `rishta` so the `/lab` card link works). The site nav uses the same classes without the lab bar and with four links.
- **Behaviour:** ≥1100px inline pills (seven links still fit on one row at 1100px, checked 2026-10-31), current page = ink pill tilted −2°. <1100px a `menu` button opens a paper panel; closes on link click, outside click, Esc (focus returns) and on resize to desktop. Without JS the links wrap.
- **Links between pages** use `<a href="…" data-page="home|lab|updates|research|case-files|wall|dodge|rishta" data-hash="#id">`. The shared script rewrites `href`: on localhost to the old local file names (`index-genz.html`, `index-genz-meme.html`, `updates.html`…), on a real host to the clean route. `next.config.ts` rewrites `index-genz.html` → `/` and `index-genz-meme.html` → `/lab.html`, so these links work under `npm run dev` too. Never hard-code page paths.
- **To add a lab page:** build it from `public/case-files.html` (head, CSS, footer, the three nav blocks), add it to `PAGES` in the JS block and as a `.nav-link` in **every** lab page, add its name to `STATIC_PAGES` in `next.config.ts`, then add a card to `#inside` on the lab front page.
- **Template slots:** each head script sets `is-local` on localhost and `html:not(.is-local) .upd-slot { display: none }` hides the empty "your turn" slots for live visitors.
- **Gotcha:** the current-page link is rotated, so compare `offsetTop`, not `getBoundingClientRect().top`, in tests.

### 12.6 The hub: updates, case files and the research library
The user: "we are going to put updates whenever we have something … a hub, like a repo where whatever research study we are doing, anyone can go and see." Each kind of thing has one home:

| It is… | It goes on… | Test |
|---|---|---|
| an **event** (something happened, with a date) | `updates.html`, top of the feed | "something happened" |
| a **lesson** (hunch, tried, turned up, taught us) | `case-files.html`, a new `cf-0N` | "we learned something" |
| the **evidence itself** (a study, a brief, field notes) | `research.html`, on the shelf | "someone should be able to read it" |
| a **status** (where we are on the road) | `updates.html#journey` | "what's done, what's next" |

**To add a research item:** copy an `<li class="res-card reveal">` on the shelf (`#shelf`), put it **above** the first one, set `data-s` and the type chip (desk research · field notes · experiment · data), add the matching update and, if there is a lesson, a case file.

**The stamps** (`.stamp[data-k]`): established, corroborated, single source, claim, inference, mixed, not found, and `told` (= "told to us", what a source said in a meeting and we have not tested). Use them only where the source applied that label. Where we found nothing we say **"not found"**. The stamp CSS lives in `research.html` and `case-files.html`.

**What is public:** `research.html` is a **public edition** of the Crashfree India brief "Potfill: Initial Research Brief" (Oct 2026, 41 pages, kept on the owner's machine): the short answer, what counts as a pothole, how one forms, surface vs structural, how much of India is asphalt, how potholes get fixed (16 methods by category, no product names, no costs), what decides whether a patch lasts, what India knows, the ideal system, a fair test, what we couldn't find, glossary, sources. Every number was checked against the brief. **The PDF itself is not published** (its summary and tables name products and a pilot city). The page credits Crashfree India as the author; `Potfill` stays internal.

**Publishing red lines (never on the public site without the owner's written OK):** names, emails or contact routes of officials, scientists or companies; allegations about named people or companies; vendor criticism by name; costs, quotes, prices, contract, exclusivity or partnership terms; unreleased technology; the pilot city, the road authority, the timeline, offers of free test stretches; another firm's claims or offers; "profit" or funding-route talk; Slack mentions and internal opinions. Anything a source told us in a meeting is shown as **told to us, not tested by us**, in generic terms ("a government road research lab"), and only where our own research agrees or we say it is unsettled. **Scan every public page for these before any push** (grep for names like CRRI/the scientists, `@` emails, `₹`/`Rs`, `profit`, `exclusiv`, `pilot city`, `slack`, `Potfill`).

### 12.7 pothole se rishta (`public/rishta.html`, built 2026-10-31)
- **Idea (the user's):** "pothole Tinder", tied to the dating-app memes. Name chosen by the user: **pothole se rishta**; profiles are a **mix of drawings and real photos**. Never use the Tinder name, flame logo or a look-alike app screen (trademark); the swipe gesture carries the reference on its own.
- **How it plays:** a stack of 9 pothole "dating profiles", every one a real photo. Swipe left (or `← patch it`, or the ← key) = **patched**, pink stamp; swipe right (`match it →`, →) = **it's a match**, red stamp. A short drag snaps back. A deadpan line reacts to every swipe (`ghosted. honestly, healthy.` / `it's a match. your suspension has questions.`). Score pills `patched` / `matched`. The end card `no more potholes near you.` gives a line based on the score, `match with the people fixing them ↗` (→ `/#subscribe`), `send your match ↗` (Web Share, clipboard fallback) and `swipe again ↻`.
- **Profiles** (9) live in the `P` array in the page script: `name, place, bio, q, a`, optional `note` / `badge`, and the photo: `file` (the copy served from our domain), `src` (the Commons original), `alt, by, link, lic, licUrl`. **Every card is a real photo** (user, 2026-10-31: "it needs to be photos, not fake"); the drawn cards and the `art()` generator were removed, and `cone_wearer` was dropped because its joke depended on a drawing.
- **The 9 photos** (all openly licensed Wikimedia Commons files, credited on their cards; the deck uses every Indian road photo in Commons' *Potholes in India* category that shows no identifiable person working, plus two from the wall): New Delhi (Rrthakur22, CC BY-SA 4.0) · outside Kolkata airport (Slyronit, CC BY-SA 4.0) · Bihar (Savant dev, CC BY-SA 4.0) · Munnekollala, Bengaluru ×2 (Gangaasoonu, CC BY-SA 4.0) · Karimganj, Assam and Assam (KEmel49, CC BY-SA 4.0) · Bengaluru (Mallikarjunasj, CC0) · Chennai monsoon flood (McKay Savage, CC BY 2.0; badge `monsoon edition`, line `somewhere under that water`: it shows a flooded street, not a visible pothole, so it says so). Skipped: a jeeps photo whose file page gives no place; two photos of named people fixing potholes; a heron on a river-rock "pothole".
- **How the photos load (never blank):** `scripts/fetch-rishta-photos.mjs` runs as `prebuild` and downloads the 9 files into `public/rishta-photos/` (git-ignored, not committed), so Vercel serves them from our own domain. The card tries 1. `/rishta-photos/<file>`, 2. `/_next/image?url=<Commons file>` (Vercel's image service; `upload.wikimedia.org` and `thumb.wikimedia.org` are allowed in `next.config.ts`), 3. the Commons URL directly. The script never fails the build; if a download fails it says so in the build log. Keep its list and the page's `file` names in step. History: hot-linked straight from Wikimedia, the photos showed blank for the user (2026-10-31). Note: Commons now hands out thumbnails on `thumb.wikimedia.org`; `upload.wikimedia.org` still serves the same files. The wall now uses the same copies (2026-11-12).
- **Copy rules for profiles:** dating-app formats (bio, prompt, green flag / red flag, "i'm a 10 but…", situationship, delulu), one joke per card, the joke is the pothole's personality. Never a real person's name, never a joke about the people hurt by potholes, no death figures on this page. Each card names only the real place from the Commons file page; everything else on a card is plainly made up (the page says so: `every bio is made up. the potholes are not.`). Hinglish is fine here (it's a joke page): `settled hai. kahin nahi jayega.`
- **Layout:** the card's text takes the height it needs and the picture fills the rest (never under 34%), so nothing clips. The photo is absolutely positioned inside the picture area with `object-fit: cover` (without that it showed only its top slice); checked for all 9 cards at 280–2560px. Page-only classes use the `rs-` prefix.
- **Status:** all copy `draft`. Live, but linked **only from its card on `/lab`**: not in the lab nav, not on the homepage (user, 2026-11-11: "keep it on /lab page only").

**Known source quirks:** the meeting minutes spell one scientist "Sikha" and CRRI's own page "Siksha"; the minutes muddle hot mix, emulsion and solvents (hot mix is not made with emulsion; emulsion cold mix is water-based, cutback uses a solvent such as kerosene); "10% concrete / 90% bitumen" matches the brief only as a share of **paved** roads.

---

## 13. Current state (2026-10-31)

### Live on `main` = `56dc686`
- **`/` and the 404 run on Next.js** (merged 2026-10-30 from `claude/nextjs-migration`, a fast-forward from `cc2bb93`). Verified on the preview and on production: build READY, homepage title/canonical/JSON-LD/form/game present, `/genz` 307, a bad URL 404, sitemap and robots correct.
- **The lab copy pass is live** on `/lab`, `/updates`, `/research`, `/case-files` (the §3 table); every number, stamp and source unchanged. Still `draft`.
- `/dodge`, `/on-the-move`, `/know-who`: unchanged HTML in `public/`. `/wall-of-holes` ported to Next.js (2026-11-12).
- **`/rishta` is live** (pothole se rishta, §12.7), with its card on `/lab` and the `rishta` link in the lab nav (`main` = `26758b7`, 2026-10-31); this guide and `CLAUDE.md` are in the repo.
- Previous production deployment (the last all-HTML version, `cc2bb93`) is kept by Vercel as the rollback candidate.
- Branches `claude/compassionate-wozniak-1k5k4x` (copy pass) and `claude/nextjs-migration` are merged into `main`; `feature/lab` and `feature/research` are older and redundant. Deleting them needs the owner's say-so.

### Migration: what's next
1. Port every remaining HTML page, one at a time, and delete its HTML (user, 2026-11-12). Done: `/`, the 404, `/wall-of-holes`, `/case-files`, `/updates`. Next: `/research` (`SiteNav`, `PageFooter`, `PageEffects` and `hub.css` are ready; it adds the research card styles), then the lab (`/lab`, `/dodge`, `/rishta`, with the lab nav as one React component) and the calm pages.
2. Self-host the fonts with `next/font` (pixel-check the change).
3. ~~Self-host the wall photos~~ (done 2026-11-12, via the rishta build download); consider `next/image`.
4. Once the hub is indexable: one URL per case file / study with its own metadata and share image, added to the sitemap.

### Open items
- **Wall:** photos self-hosted (done 2026-11-12); legal check of CC BY-SA share-alike on the crops; get a contact email, then restore the takedown line; maybe swap the weakest photo (Chennai flooded street) for *Roads deformed T munnekollala Bengaluru 2.jpg*.
- **Lab content:** confirm the exact dates of the research and the visit (both `oct 2026`); whether CRRI may be named; photos of the visit; review every `draft`.
- **Owner, not code:** delete the two stale apex A records (§9); turn on Vercel Analytics; delete the two test rows in the Sheet; decide how to source more photos (permission-based DMs recommended).

---

## 14. Decision log (condensed)

1. Built a calm CFI-system design + a loud Gen Z design; user preferred **Gen Z as the homepage** (`/genz` → `/`).
2. Email list: Supabase failed (project limit) → **Google Sheet + Apps Script**.
3. Brand: Pothole India → Potholefree India → "patch" → **Cars24 Patch** (user: "lets change back patch to Cars24 Patch … nothing more").
4. Added **a Cars24 Rebellion** tag: pre-footer band + footer + "by Cars24 Patch" chip; removed from hero & navbar by request.
5. **Yellow theme is the default**; blue kept as `?theme=blue` preview.
6. Navbar "notify me" removed from homepage.
7. Hero line: "getting filled" → **"getting fixed"**; then every other "filled" → "fixed" (left "fill 'em up" and "we're filling them" intentionally — ask before changing).
8. 404 copy supplied by the user, Gen Z styled.
9. Calm pages marked `noindex`.
10. Meme section built then **shelved** for the homepage.
11. Updates ("dispatches") section built as an empty template (no invented content).
12. Analytics via plain snippet (no npm) — superseded for Next pages by `@vercel/analytics` (entry 19).
13. Wall of Holes concept → "Biggest ***holes of the year" with a "your ex" tile; photos from Wikimedia Commons (not Google Images).
14. 2026-10-22: camera/AR "sensation" idea → **Dodge with your head** (MediaPipe in-browser, lanes by head lean, fact beat after a crash, dare-a-friend share).
15. 2026-10-23: **lab first** rule: every experiment is built in the lab before it is promoted to the homepage.
16. 2026-10-24: the lab became **pages with one shared nav** because "putting everything on the home page won't look good"; embedded wall and dodge copies removed.
17. 2026-10-29: the lab became a **hub that grows** (updates, case files, research library); the research brief published as a **web public edition**, not the PDF; the publishing red lines (§12.6) became a standing rule.
18. 2026-10-30: user: the hub copy "feels like AI content … no Gen Z flavour", unlike the hero and the wall. **Copy pass** on the lab hub pages (§3 table), reviewed on a preview, then made live in the lab.
19. 2026-10-30: **migration to Next.js** (user: better for SEO "and other things too"). Decision: static App Router app on Vercel; port page by page with DOM + pixel parity checks; unported pages served unchanged from `public/`. The homepage and the 404 ported first; canonical, sitemap, robots, JSON-LD, `app/icon.svg`, `@vercel/analytics` added. The guide's old "no framework, no build, no package.json" rule is retired.
20. 2026-10-30: user restated the workflow: **experiments go live in the lab first**; after a final check and confirmation the user decides whether they move to the homepage.
21. 2026-10-31: user idea "pothole Tinder" → **pothole se rishta** (name and drawings + photos mix chosen by the user), built as its own lab page `/rishta` with a card on `/lab`. No Tinder branding.
22. 2026-10-31: rishta photo cards showed blank for the user → photos now served through Vercel's image service from our own domain (fallback: direct Commons URL); crop fixed; all 4 confirmed as Commons *Potholes in India* photos.
23. 2026-10-31: user: not every card had a photo (6 of 10 were drawings) and "it needs to be photos, not fake" → every card is now a real Commons photo (9 cards; `cone_wearer` dropped); the build downloads the photos so they are served from our own domain, with the image service and Commons as fallbacks.
24. 2026-11-11: the homepage nav gets four links (updates & journey, research, case files, the wall); the meme is never linked from `/`; the four pages stay lab pages (lab bar, draft, noindex). Copy: the diary line ("still feels like AI") → `the potholes are winning. for now. this is us keeping score.`; the research hero → `***hole studies.` with the `***`⇄`POT` flip. Options were offered and the user picked.
25. 2026-11-11: more `***` heroes, chosen by the user from options: the diary → `dear ***hole,` (a letter to the pothole); case files → `the ***hole files.` with the chip `the truth is down there` (an X-Files nod). The gag is now on the homepage, wall, dodge, research, diary and case files: don't add it to more pages without asking.
26. 2026-11-11: rishta is taken out of the lab nav (which the homepage's four links lead into); it is reachable only from its card on `/lab`.
27. 2026-11-12: user: clicking case files or the wall from the homepage still exposed the lab (and through it rishta), "as both pages we are not combining". The four homepage-linked pages get their own site nav (logo → `/`, the same four links, no lab bar) and no links to `/lab`, `/dodge` or `/rishta`. The lab pages keep the lab nav, which still links to the four.
28. 2026-11-12: user: "fix the wall photos too". The wall's 8 photos are the same Commons files as rishta's, so the wall now loads the build-time copies in `/rishta-photos/`, with the image service and Commons as fallbacks.
29. 2026-11-12: user: "while navigating why the whole page loads … we are using next js right", then "start porting the wall .. and from lets build completely in next js .. and we can remove completely HTML pages". The wall is ported (parity-checked) and its HTML deleted; the homepage nav became the shared `SiteNav` with `<Link>`s to ported pages, so home ↔ wall no longer reloads; the homepage script now stops cleanly when you leave. Every other HTML page follows, one at a time.
30. 2026-11-14: user: "we are not going to make people accountable for who owns the road … we are going to fix the potholes by ourselves", "what does notify refer to?", and a full copy audit of every page for Gen Z (less text, top-down flow). Done: the message and the Gen Z profile in §3; the homepage and lab hero say `so we're fixing the potholes ourselves.`; the road-owner closer became `no blame game. no complaint forms. we'll just fix them.`; `notify me` became `tell me first ↗` with the promise `we'll email you the day we start fixing.` everywhere; the calm pages were rewritten (no owners, report or deadlines: permission → repair → check → publish); `road owner` lines on the diary, case files and research became `permission in writing`; research got `the 30-second version.` on top; metas lost their lists of three. The 404 copy stayed (user-supplied, and `We're fixing the roads first` already says it).
31. 2026-11-15: user: "start porting the case files page". Ported to `app/case-files/` (parity: identical DOM, 299 nodes; pixels identical except text anti-aliasing noise and the footer link underline, which now has the same 3px offset as the wall's). Filters and `#cf-0N` deep links in `CaseFileFilters`; the hub styles moved unchanged into `components/site/hub.css`. Found while testing: after an in-page `#` link, going to another page and back showed the wrong page (already live on the homepage since the wall port); fixed for every page with `HashLinks` in the layout.
32. 2026-11-18: user: "start porting the updates page". Ported to `app/updates/` (parity: identical DOM, 259 nodes; pixels identical except text anti-aliasing noise on the filter labels and the shared footer underline). The case-files filter component became the shared `HubFilters` (also handles `a[data-open]`); `hub.css` took the diary's extra rules (`.more-go`, `.upd[hidden]`, the jump chips' spacing, the 3-column journey from 1000px) and case files' filter-bar rule was scoped so it doesn't touch the diary's. A deep link from case files into the diary (`/updates#u-dodge`) now opens the card without a reload.

---

## 15. Quick start for a new Claude session

1. Read this file, then skim `app/page.tsx`, `components/home/` and `app/globals.css` (the reference implementation of the style), and one lab page in `public/`.
2. `npm install && npm run dev`, open <http://localhost:3000>.
3. For any new page/section: reuse the `:root` tokens, `.btn`, `.kicker`, `.h2 .hi`, `.reveal` patterns and the React bits in `components/home/bits.tsx`; write lowercase copy; no exclamation marks; tilt things; thick outlines + hard shadows; support both themes.
4. Experiments go in the lab. Run the §8 audit and `npm run build`; summarise what changed and what is on a branch vs live; **ask before pushing**.
5. When the user shares new decisions, update this guide.
