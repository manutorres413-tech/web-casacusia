import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = __dirname;
const publicDir = path.join(projectRoot, 'public');
const fotosDir = path.join(projectRoot, 'Fotos');

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
  const publicFiles = await walk(publicDir);
  
  // Create map of filename -> full path in public
  const publicFileMap = new Map();
  for (const pf of publicFiles) {
    publicFileMap.set(path.basename(pf), pf);
  }

  const filesInFotos = await fs.readdir(fotosDir);

  for (const file of filesInFotos) {
    const filePath = path.join(fotosDir, file);
    const stat = await fs.stat(filePath);
    
    if (!stat.isFile()) continue;

    let targetFilename = file;
    // Fix " (1)" suffixes often added by downloads
    targetFilename = targetFilename.replace(/ \(\d+\)(\.[a-zA-Z0-9]+)$/, '$1');

    if (publicFileMap.has(targetFilename)) {
      const destInPublic = publicFileMap.get(targetFilename);
      
      // Copy to public to replace original
      await fs.copyFile(filePath, destInPublic);
      console.log(`Replaced: ${destInPublic.replace(projectRoot, '')}`);

      // Now organize inside Fotos based on parent directory in public
      const relativeToPublic = path.relative(publicDir, destInPublic);
      const topLevelFolder = relativeToPublic.split(path.sep)[0]; // e.g. "fotos", "brand", "aliados"
      
      const newFotosSubdir = path.join(fotosDir, topLevelFolder);
      await fs.mkdir(newFotosSubdir, { recursive: true });
      
      const newFotosPath = path.join(newFotosSubdir, targetFilename);
      await fs.rename(filePath, newFotosPath);
      console.log(`Moved to: ${newFotosPath.replace(projectRoot, '')}`);
    } else {
      console.log(`No match found in public/ for: ${file}`);
    }
  }

  console.log("Done organizing and replacing.");
}

run().catch(console.error);
