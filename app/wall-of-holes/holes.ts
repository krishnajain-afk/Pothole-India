/* THE WALL. To add a nominee, add one object to HOLES.
     src, alt      the Commons image URL, and a description of the pothole (not of any person)
     file          our own copy in /rishta-photos/ (the build downloads it: scripts/fetch-rishta-photos.mjs, the same
                   photos the rishta page uses; a new photo needs a line there too)
     place         where it is, shown on the tile
     by, link      the photographer and the page of the original (shown as the credit)
     lic, licUrl   the licence name and its page
     fixed         true once it has been repaired (shows a FIXED stamp)
     ex            true makes the "your ex" tile (blocked avatar, UNFIXABLE stamp). It stays item 5, the centre.
   These eight are openly licensed photos from Wikimedia Commons. Photos people send in go up only with their permission. */
export type Hole =
  | { ex: true }
  | { ex?: false; file: string; src: string; alt: string; place: string; by: string; lic: string; licUrl: string; link: string; fixed?: boolean };

export const HOLES: Hole[] = [
  { file: 'new-delhi.jpg', src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Broken_Roads_in_India%27s_Capital_New_Delhi.jpg/960px-Broken_Roads_in_India%27s_Capital_New_Delhi.jpg', alt: 'A broken, potholed road in New Delhi', place: 'New Delhi', by: 'Rrthakur22', lic: 'CC BY-SA 4.0', licUrl: 'https://creativecommons.org/licenses/by-sa/4.0', link: 'https://commons.wikimedia.org/wiki/File:Broken_Roads_in_India%27s_Capital_New_Delhi.jpg' },
  { file: 'kolkata-airport.jpg', src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Potholed_road_outside_Kolkata_Airport.jpg/960px-Potholed_road_outside_Kolkata_Airport.jpg', alt: 'A potholed road outside Kolkata Airport', place: 'Kolkata, West Bengal', by: 'Slyronit', lic: 'CC BY-SA 4.0', licUrl: 'https://creativecommons.org/licenses/by-sa/4.0', link: 'https://commons.wikimedia.org/wiki/File:Potholed_road_outside_Kolkata_Airport.jpg' },
  { file: 'munnekollala-1.jpg', src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Roads_deformed_T_munnekollala_Bengaluru.jpg/960px-Roads_deformed_T_munnekollala_Bengaluru.jpg', alt: 'A crumbling road with potholes at Munnekollala, Bengaluru', place: 'Munnekollala, Bengaluru', by: 'Gangaasoonu', lic: 'CC BY-SA 4.0', licUrl: 'https://creativecommons.org/licenses/by-sa/4.0', link: 'https://commons.wikimedia.org/wiki/File:Roads_deformed_T_munnekollala_Bengaluru.jpg' },
  { file: 'bihar.jpg', src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Roads_in_Bihar_have_potholes.jpg/960px-Roads_in_Bihar_have_potholes.jpg', alt: 'A road full of potholes in Bihar', place: 'Bihar', by: 'Savant dev', lic: 'CC BY-SA 4.0', licUrl: 'https://creativecommons.org/licenses/by-sa/4.0', link: 'https://commons.wikimedia.org/wiki/File:Roads_in_Bihar_have_potholes.jpg' },
  { ex: true },
  { file: 'karimganj.jpg', src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1d/Driving_through_potholes.jpg/960px-Driving_through_potholes.jpg', alt: 'A rickshaw driving through potholes in Karimganj, Assam', place: 'Karimganj, Assam', by: 'KEmel49', lic: 'CC BY-SA 4.0', licUrl: 'https://creativecommons.org/licenses/by-sa/4.0', link: 'https://commons.wikimedia.org/wiki/File:Driving_through_potholes.jpg' },
  { file: 'bengaluru.jpg', src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Potholes_in_Bengaluru_road.jpg/960px-Potholes_in_Bengaluru_road.jpg', alt: 'Potholes in a road in Bengaluru', place: 'Bengaluru, Karnataka', by: 'Mallikarjunasj', lic: 'CC0', licUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en', link: 'https://commons.wikimedia.org/wiki/File:Potholes_in_Bengaluru_road.jpg' },
  { file: 'chennai.jpg', src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/India_-_Chennai_-_Monsoon_-_06_%283059058000%29.jpg/960px-India_-_Chennai_-_Monsoon_-_06_%283059058000%29.jpg', alt: 'A flooded Chennai street in the monsoon, where potholes could be hiding underwater', place: 'Chennai, Tamil Nadu', by: 'McKay Savage from London, UK', lic: 'CC BY 2.0', licUrl: 'https://creativecommons.org/licenses/by/2.0', link: 'https://commons.wikimedia.org/wiki/File:India_-_Chennai_-_Monsoon_-_06_(3059058000).jpg' },
  { file: 'assam.jpg', src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Potholes_on_road.jpg/960px-Potholes_on_road.jpg', alt: 'Potholes on a road in Assam', place: 'Assam', by: 'KEmel49', lic: 'CC BY-SA 4.0', licUrl: 'https://creativecommons.org/licenses/by-sa/4.0', link: 'https://commons.wikimedia.org/wiki/File:Potholes_on_road.jpg' },
];
