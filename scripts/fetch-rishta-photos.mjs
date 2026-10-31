/* Downloads the pothole se rishta photos into public/rishta-photos/ before every build, so /rishta serves them
   from our own domain and never depends on Wikimedia when someone opens the page.
   Every photo is openly licensed on Wikimedia Commons and credited on its card (see the P array in
   public/rishta.html). The files are not committed: .gitignore skips the folder.
   This script never fails the build. If a download fails, the card falls back to the image service, then to
   the Commons URL. Keep this list and the `file` names in public/rishta.html in step. */
import { mkdir, writeFile, stat } from 'node:fs/promises';

const COMMONS = 'https://upload.wikimedia.org/wikipedia/commons/thumb/';
export const PHOTOS = {
  'new-delhi.jpg': '1/14/Broken_Roads_in_India%27s_Capital_New_Delhi.jpg/960px-Broken_Roads_in_India%27s_Capital_New_Delhi.jpg',
  'kolkata-airport.jpg': '5/57/Potholed_road_outside_Kolkata_Airport.jpg/960px-Potholed_road_outside_Kolkata_Airport.jpg',
  'bihar.jpg': 'c/c6/Roads_in_Bihar_have_potholes.jpg/960px-Roads_in_Bihar_have_potholes.jpg',
  'munnekollala-1.jpg': '8/8c/Roads_deformed_T_munnekollala_Bengaluru.jpg/960px-Roads_deformed_T_munnekollala_Bengaluru.jpg',
  'munnekollala-2.jpg': '4/44/Roads_deformed_T_munnekollala_Bengaluru_2.jpg/960px-Roads_deformed_T_munnekollala_Bengaluru_2.jpg',
  'karimganj.jpg': '1/1d/Driving_through_potholes.jpg/960px-Driving_through_potholes.jpg',
  'assam.jpg': 'c/c1/Potholes_on_road.jpg/960px-Potholes_on_road.jpg',
  'bengaluru.jpg': '3/36/Potholes_in_Bengaluru_road.jpg/960px-Potholes_in_Bengaluru_road.jpg',
  'chennai.jpg': '3/31/India_-_Chennai_-_Monsoon_-_06_%283059058000%29.jpg/960px-India_-_Chennai_-_Monsoon_-_06_%283059058000%29.jpg',
};

const DIR = new URL('../public/rishta-photos/', import.meta.url);
const UA = 'Cars24PatchBuild/1.0 (https://www.potholefreeindia.org; credits each photo on the page)';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function exists(u) { try { return (await stat(u)).size > 10000; } catch { return false; } }

async function fetchOne(name, path) {
  const target = new URL(name, DIR);
  if (await exists(target)) return 'kept';
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(COMMONS + path, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(20000) });
      const type = res.headers.get('content-type') || '';
      if (res.ok && type.startsWith('image/')) {
        const buf = Buffer.from(await res.arrayBuffer());
        if (buf.length > 10000) { await writeFile(target, buf); return `${Math.round(buf.length / 1024)} KB`; }
      }
      throw new Error(`HTTP ${res.status} ${type}`);
    } catch (err) {
      if (attempt === 3) return `FAILED (${err.message}); the card will fall back`;
      await sleep(1500 * attempt);
    }
  }
}

await mkdir(DIR, { recursive: true });
for (const [name, path] of Object.entries(PHOTOS)) {
  console.log(`[rishta photos] ${name}: ${await fetchOne(name, path)}`);
  await sleep(400);   // be gentle with Wikimedia
}
