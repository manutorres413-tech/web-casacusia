import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import convert from 'heic-convert';

const SOURCE_DIR = 'd:/web-casacusia/web-casacusia/Fotos';
const TARGET_DIR = 'd:/web-casacusia/web-casacusia/public/fotos-nuevas';

if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
}

function slugify(text) {
    return text.toString().toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

async function processDir(dir, category = '') {
    const items = fs.readdirSync(dir);
    let countInFolder = 0;
    const MAX_PER_FOLDER = 100; // Limit to avoid 2600+ files at once
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
            if (item.startsWith('.')) continue;
            
            let newCategory = category;
            if (item.toLowerCase().includes('encuentro') || item.toLowerCase().includes('lanzamiento')) newCategory = 'eventos';
            else if (item.toLowerCase().includes('kids')) newCategory = 'kids';
            else if (item.toLowerCase().includes('aliados')) newCategory = 'aliados';
            else if (item.toLowerCase().includes('retrato')) newCategory = 'retratos';
            
            await processDir(fullPath, newCategory || slugify(item));
        } else {
            const ext = path.extname(item).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.heic'].includes(ext)) {
                if (countInFolder >= MAX_PER_FOLDER) continue;
                
                // Skip files larger than 50MB
                if (stats.size > 50 * 1024 * 1024) continue;

                const catDir = path.join(TARGET_DIR, category || 'otros');
                if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });
                
                const baseName = slugify(path.basename(item, ext));
                const destPath = path.join(catDir, `${baseName}.jpg`);
                
                if (fs.existsSync(destPath)) {
                    countInFolder++;
                    continue;
                }

                console.log(`Processing: ${item} -> ${category || 'otros'}/${baseName}.jpg`);
                
                try {
                    let buffer;
                    if (ext === '.heic') {
                        const inputBuffer = fs.readFileSync(fullPath);
                        buffer = await convert({
                            buffer: inputBuffer,
                            format: 'JPEG',
                            quality: 1
                        });
                    } else {
                        buffer = fullPath;
                    }

                    await sharp(buffer)
                        .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
                        .jpeg({ quality: 80, mozjpeg: true })
                        .toFile(destPath);
                    
                    countInFolder++;
                } catch (err) {
                    console.error(`Error processing ${item}: ${err.message}`);
                }
            }
        }
    }
}

console.log('Starting photo organization and optimization...');
processDir(SOURCE_DIR)
    .then(() => console.log('Finished! Optimized photos are in public/fotos-nuevas/'))
    .catch(err => console.error('Fatal error:', err));
