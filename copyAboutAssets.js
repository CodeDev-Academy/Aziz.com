import fs from 'fs';

const src = 'C:/Users/User/.gemini/antigravity-ide/brain/833cd50d-7233-487e-aaa5-72c55ad6ab7a';
const dst = 'c:/Users/User/.gemini/antigravity-ide/scratch/furniture-showroom/public/images';

fs.copyFileSync(src + '/about_hero_1782770105088.png', dst + '/about-hero.png');
fs.copyFileSync(src + '/about_story_1_1782770116141.png', dst + '/about-story-1.png');
fs.copyFileSync(src + '/about_story_2_1782770125732.png', dst + '/about-story-2.png');
console.log('About page images copied successfully');
