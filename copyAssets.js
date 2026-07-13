import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDirs = [
  'C:/Users/User/.gemini/antigravity-ide/brain/b99af90c-0a47-44f9-80f2-14376d96e1d2',
  'C:/Users/User/.gemini/antigravity-ide/brain/833cd50d-7233-487e-aaa5-72c55ad6ab7a',
  'C:/Users/User/.gemini/antigravity-ide/brain/fd58f672-a4cc-40ac-9c0e-c376f30d8c43'
];
const targetDir = path.join(__dirname, 'public', 'images');
const productsTargetDir = path.join(targetDir, 'products');

// Create folders if they don't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}
if (!fs.existsSync(productsTargetDir)) {
  fs.mkdirSync(productsTargetDir, { recursive: true });
}
const blogTargetDir = path.join(targetDir, 'blog');
if (!fs.existsSync(blogTargetDir)) {
  fs.mkdirSync(blogTargetDir, { recursive: true });
}
const galleryTargetDir = path.join(targetDir, 'gallery');
if (!fs.existsSync(galleryTargetDir)) {
  fs.mkdirSync(galleryTargetDir, { recursive: true });
}

const mappings = [
  { prefix: 'hero_bg', dest: path.join(targetDir, 'hero-bg.png') },
  { prefix: 'cat_living', dest: path.join(targetDir, 'cat-living.png') },
  { prefix: 'cat_bedroom', dest: path.join(targetDir, 'cat-bedroom.png') },
  { prefix: 'cat_office', dest: path.join(targetDir, 'cat-office.png') },
  { prefix: 'prod_sofa', dest: path.join(productsTargetDir, 'oslo-sofa.png') },
  { prefix: 'prod_bed', dest: path.join(productsTargetDir, 'stockholm-bed.png') },
  { prefix: 'prod_desk', dest: path.join(productsTargetDir, 'kyoto-desk.png') },
  { prefix: 'prod_chair', dest: path.join(productsTargetDir, 'bergen-armchair.png') },
  { prefix: 'about_hero', dest: path.join(targetDir, 'about-hero.png') },
  { prefix: 'about_story_1', dest: path.join(targetDir, 'about-story-1.png') },
  { prefix: 'about_story_2', dest: path.join(targetDir, 'about-story-2.png') },
  { prefix: 'blog_wood_care', dest: path.join(blogTargetDir, 'wood-care.png') },
  { prefix: 'blog_dining_tips', dest: path.join(blogTargetDir, 'dining-tips.png') },
  { prefix: 'services_hero', dest: path.join(targetDir, 'services-hero.png') },
  { prefix: 'gallery_hero', dest: path.join(targetDir, 'gallery-hero.png') },
  { prefix: 'gallery_living_1', dest: path.join(galleryTargetDir, 'living-1.png') },
  { prefix: 'gallery_bedroom_1', dest: path.join(galleryTargetDir, 'bedroom-1.png') },
  { prefix: 'gallery_office_1', dest: path.join(galleryTargetDir, 'office-1.png') },
  { prefix: 'gallery_living_2', dest: path.join(galleryTargetDir, 'living-2.png') },
  { prefix: 'gallery_bedroom_2', dest: path.join(galleryTargetDir, 'bedroom-2.png') },
  { prefix: 'favicon', dest: path.join(__dirname, 'public', 'favicon.png') }
];

try {
  // Collect all files from all source directories
  let allFiles = [];
  sourceDirs.forEach((dir) => {
    try {
      const files = fs.readdirSync(dir);
      files.forEach(f => allFiles.push({ name: f, dir }));
    } catch {
      // Directory may not exist, skip
    }
  });
  
  mappings.forEach(({ prefix, dest }) => {
    const matchingFiles = allFiles.filter(f => f.name.startsWith(prefix) && f.name.endsWith('.png'));
    if (matchingFiles.length > 0) {
      matchingFiles.sort((a, b) => a.name.localeCompare(b.name));
      const match = matchingFiles[matchingFiles.length - 1];
      const sourceFile = path.join(match.dir, match.name);
      
      console.log(`Copying ${sourceFile} -> ${dest}`);
      fs.copyFileSync(sourceFile, dest);
    } else {
      console.warn(`No file found matching prefix: ${prefix}`);
    }
  });
  console.log('Assets copy completed successfully.');
} catch (err) {
  console.error('Error copying assets:', err);
}
