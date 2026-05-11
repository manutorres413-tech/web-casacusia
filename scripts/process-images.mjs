import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PHOTOS_DIR = 'd:/web-casacusia/web-casacusia/Fotos/Lanzamiento CASACUSIA - 22-03-2025-3-001/Lanzamiento CASACUSIA - 22-03-2025';
const PUBLIC_DIR = 'd:/web-casacusia/web-casacusia/public/fotos';

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

const mapping = [
  { src: 'Casacusia_GZ-120.jpg', dest: 'hero-comunidad.jpg', width: 1200 },
  { src: 'LMA00045.JPG', dest: 'equipo-casacusia.jpg', width: 1200 },
  { src: 'Casacusia_GZ-1.jpg', dest: 'encuentro-patio.jpg', width: 1200 },
  { src: 'DSC00037.jpg', dest: 'sumate-comunidad.jpg', width: 1200 },
  { src: 'DSC00030.jpg', dest: 'sumate-hero.jpg', width: 1920 }, 
  { src: 'DSC00018.jpg', dest: 'sumate-voluntariado.jpg', width: 800 },
  { src: 'DSC00040.jpg', dest: 'testimonio-hablame-claro.jpg', width: 800 },
  { src: 'Casacusia_GZ-15.jpg', dest: 'sumate-donar.jpg', width: 1200 },
  { src: 'DSC00008.jpg', dest: 'sumate-proyectos.jpg', width: 1200 },
  { src: 'Casacusia_GZ-120.jpg', dest: 'fundadores.jpg', width: 1200 },
  { src: 'LMA00045.JPG', dest: 'grupo-voluntarios.jpg', width: 1200 },
];

async function processPhotos() {
  for (const item of mapping) {
    const srcPath = path.join(PHOTOS_DIR, item.src);
    const destPath = path.join(PUBLIC_DIR, item.dest);

    if (fs.existsSync(srcPath)) {
      console.log(`Processing ${item.src} -> ${item.dest}...`);
      try {
        await sharp(srcPath)
          .resize(item.width)
          .jpeg({ quality: 80, mozjpeg: true })
          .toFile(destPath);
        console.log(`Done: ${item.dest}`);
      } catch (err) {
        console.error(`Error processing ${item.src}:`, err);
      }
    } else {
      console.warn(`Source not found: ${srcPath}`);
    }
  }
}

processPhotos();
