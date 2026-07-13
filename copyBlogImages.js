import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const brainDir = 'C:/Users/User/.gemini/antigravity-ide/brain/50f53d04-925c-45df-ad0d-48806c8ad375';
const blogTargetDir = path.join(__dirname, 'public', 'images', 'blog');

if (!fs.existsSync(blogTargetDir)) {
  fs.mkdirSync(blogTargetDir, { recursive: true });
}

// Map generated/fallback images to required filenames
const filesToCopy = [
  {
    src: path.join(brainDir, 'scandi_living_1783922918816.png'),
    dest: path.join(blogTargetDir, 'scandi-living.png'),
    fallback: path.join(__dirname, 'public', 'images', 'cat-living.png')
  },
  {
    src: path.join(brainDir, 'wood_types_1783922934419.png'),
    dest: path.join(blogTargetDir, 'wood-types.png'),
    fallback: path.join(__dirname, 'public', 'images', 'blog', 'wood-care.png')
  },
  {
    src: path.join(__dirname, 'public', 'images', 'services-hero.png'),
    dest: path.join(blogTargetDir, 'showroom-opening.png'),
    fallback: path.join(__dirname, 'public', 'images', 'blog', 'wood-care.png')
  }
];

filesToCopy.forEach(({ src, dest, fallback }) => {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${src} -> ${dest}`);
  } else if (fs.existsSync(fallback)) {
    fs.copyFileSync(fallback, dest);
    console.log(`Fallback copied ${fallback} -> ${dest}`);
  }
});

console.log('Blog images update completed.');
