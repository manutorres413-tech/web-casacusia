import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = __dirname;
const publicDir = path.join(projectRoot, 'public');
const outDir = path.join(projectRoot, '..', 'imagenes-en-uso');

const dirsToScan = ['app', 'components', 'content', 'lib'];
const imageRegex = /(?:src=["']|:\s*["'])(\/(?:fotos|brand|aliados|images)\/[^"']+\.(?:jpg|jpeg|png|webp|svg|avif|gif))/gi;

async function walk(dir) {
  let results = [];
  const list = await fs.readdir(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(await walk(filePath));
    } else {
      results.push(filePath);
    }
  }
  return results;
}

async function run() {
  const usedImages = new Set();

  for (const dir of dirsToScan) {
    const fullDirPath = path.join(projectRoot, dir);
    try {
      const files = await walk(fullDirPath);
      for (const file of files) {
        if (!file.match(/\.(tsx|ts|json|js|mjs)$/)) continue;
        const content = await fs.readFile(file, 'utf8');
        let match;
        while ((match = imageRegex.exec(content)) !== null) {
          usedImages.add(match[1]);
        }
      }
    } catch (e) {
      console.error(`Error scanning ${dir}:`, e);
    }
  }

  // Create outDir
  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });

  let copiedCount = 0;
  for (const imgPath of usedImages) {
    // imgPath starts with / e.g. /fotos/hero.jpg
    const sourcePath = path.join(publicDir, imgPath);
    const destPath = path.join(outDir, imgPath);
    
    try {
      await fs.access(sourcePath); // check if exists
      // Ensure dest dir exists
      await fs.mkdir(path.dirname(destPath), { recursive: true });
      await fs.copyFile(sourcePath, destPath);
      copiedCount++;
      console.log(`Copied: ${imgPath}`);
    } catch (err) {
      console.log(`Missing file in public: ${imgPath}`);
    }
  }

  console.log(`Done! Copied ${copiedCount} images to ${outDir}`);
}

run().catch(console.error);
