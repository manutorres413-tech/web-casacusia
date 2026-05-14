import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { readdirSync, statSync } from "fs";
import { join } from "path";

/** Photos already used in components */
const USED_PHOTOS = new Set([
  "/fotos/propuestas/Casacusia_GZ-21.jpg",
  "/fotos/propuestas/DSC00009.jpg",
  "/fotos/propuestas/DSC00020.jpg",
  "/fotos/propuestas/DSC00021.jpg",
  "/fotos/propuestas/casacusia_kids_alta_169.jpg",
  "/fotos/propuestas/casacusia_kids_alta_186.jpg",
  "/fotos/propuestas/casacusia_kids_alta_245.jpg",
  "/fotos/propuestas/casacusia_kids_alta_252.jpg",
  "/fotos/sumate-donar.jpg",
  "/fotos/taller-adultos.jpg",
  "/fotos/taller-ceramica.jpg",
  "/fotos/hero-comunidad.jpg",
]);

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function getPhotosFromDir(dir: string, basePath: string): string[] {
  const publicDir = join(process.cwd(), "public");
  const fullDir = join(publicDir, dir);
  const photos: string[] = [];

  try {
    const entries = readdirSync(fullDir);
    for (const entry of entries) {
      const fullPath = join(fullDir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        photos.push(...getPhotosFromDir(join(dir, entry), basePath));
      } else {
        const ext = entry.substring(entry.lastIndexOf(".")).toLowerCase();
        if (IMAGE_EXTENSIONS.has(ext)) {
          photos.push("/" + join(dir, entry));
        }
      }
    }
  } catch {
    // directory doesn't exist
  }

  return photos;
}

export default async function FotosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const folders = ["fotos", "fotos-nuevas/fotos", "fotos-nuevas/casacusia-kids-2026-3-001", "fotos-nuevas/eventos", "fotos-nuevas/kids"];
  const allPhotos = folders.flatMap((f) => getPhotosFromDir(f, f));

  // Group by folder
  const groups: Record<string, string[]> = {};
  for (const photo of allPhotos) {
    const parts = photo.split("/");
    const folder = parts.slice(1, -1).join("/") || "raíz";
    if (!groups[folder]) groups[folder] = [];
    groups[folder]!.push(photo);
  }

  let globalIndex = 0;

  return (
    <div className="min-h-screen bg-[#143642] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-2">Fotos disponibles</h1>
        <p className="text-white/60 mb-2">
          Las fotos con opacidad reducida ya están en uso. Indicá el número para cambiar alguna.
        </p>
        <p className="text-white/40 text-sm mb-8">
          Total: {allPhotos.length} fotos
        </p>

        {Object.entries(groups).sort(([a], [b]) => a.localeCompare(b)).map(([folder, photos]) => (
          <div key={folder} className="mb-12">
            <h2 className="font-display text-xl font-semibold text-[#FFC001] mb-4 sticky top-0 bg-[#143642] py-2 z-10">
              /{folder} <span className="text-white/40 text-sm font-normal">({photos.length})</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {photos.map((photo) => {
                globalIndex++;
                const isUsed = USED_PHOTOS.has(photo);
                const fileName = photo.split("/").pop() ?? "";
                return (
                  <div
                    key={photo}
                    className={`group relative rounded-xl overflow-hidden border-2 ${
                      isUsed ? "border-[#00B980] opacity-70" : "border-transparent hover:border-[#FFC001]"
                    }`}
                  >
                    <div className="aspect-[4/3] relative bg-black/20">
                      <Image
                        src={photo}
                        alt={fileName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                      />
                    </div>
                    {/* Number overlay */}
                    <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      #{globalIndex}
                    </div>
                    {isUsed && (
                      <div className="absolute top-2 right-2 bg-[#00B980] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        EN USO
                      </div>
                    )}
                    {/* Filename on hover */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[10px] text-white/90 truncate">{photo}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
