import fs from 'fs';
import path from 'path';

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
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
            // Avoid recursion into system folders if any
            if (item.startsWith('.')) continue;
            
            let newCategory = category;
            if (item.includes('Encuentro')) newCategory = 'eventos';
            else if (item.includes('Kids')) newCategory = 'kids';
            else if (item.includes('Aliados')) newCategory = 'aliados';
            else if (item.includes('Merch')) newCategory = 'merch';
            
            await processDir(fullPath, newCategory || slugify(item));
        } else {
            const ext = path.extname(item).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.heic', '.mov', '.mp4'].includes(ext)) {
                // Skip files larger than 50MB for now
                if (stats.size > 50 * 1024 * 1024) {
                    console.log(`Skipping large file: ${item} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
                    continue;
                }
                const catDir = path.join(TARGET_DIR, category || 'otros');
                if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });
                
                const newName = `${slugify(path.basename(item, ext))}${ext}`;
                const destPath = path.join(catDir, newName);
                
                // For now, just copy. Conversion will be a second step.
                try {
                    fs.copyFileSync(fullPath, destPath);
                    console.log(`Copied: ${item} -> ${category || 'otros'}/${newName}`);
                } catch (err) {
                    console.error(`Error copying ${item}: ${err.message}`);
                }
            }
        }
    }
}

console.log('Starting photo organization...');
processDir(SOURCE_DIR).then(() => console.log('Finished!'));
