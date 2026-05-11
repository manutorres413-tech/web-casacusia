import json
import yt_dlp
import re

# Categories from our mapping
CATEGORIES = {
    "historias": [
        "67.", "66.", "64.", "63.", "62.", "61.", "60.", "59.", "57.", "56.", "54.", "49.", "48.", "46.", "45.", "44.", "41.", "39.", "37.", "36.", "33.", "30.", "21.", "20.", "18.", "16.", "11.", "10.", "05.", "Agente ruso", "Hipoacúsico: Quién soy", "malpractice", "Compilado SPMN", "Trailer", "Channel 9"
    ],
    "salud": [
        "stress: Sudden", "65.", "58.", "53.", "51.", "50.", "47.", "38.", "28.", "26.", "23.", "19.", "17", "15.", "14.", "13.", "12.", "08.", "04.", "AUDIOMETRÍA", "Tipos de hipoacusia"
    ],
    "tecnologia": [
        "Differences", "Mild hearing", "AI-powered", "Hearing aid for the first", "How to CHOOSE", "HOW custom", "Which hearing", "WATER RESISTANT", "HOW TO CLEAN", "Implante coclear y la escuela", "Rehabilitación auditiva implante", "cirugía infantil del implante", "El 'Audi' de Lucas", "¿Que tu hijo AME", "Setting Up Your Bluetooth", "Sound Recognition", "Mostrándole a un #NIÑO", "09.", "07."
    ],
    "bienestar": [
        "55.", "52.", "43.", "35.", "34.", "32.", "31.", "27.", "25.", "24.", "06.", "03.", "02.", "01."
    ],
    "derechos": [
        "ANDIS", "40.", "29.", "22.", "OIDOS ENCENDIDOS", "S3XO y DISCAPACIDAD", "#Benefits of the Single"
    ],
    "tips": [
        "Guide to TRAVELING", "OIR MEJOR", "Como ENTENDER MEJOR", "Tips para ESCUCHAR", "42.", "Músicos con sordera", "Conversación sobre percepción", "Tip clave para relacionarse", "Consejos para ir a un recital"
    ]
}

def get_category(title):
    for cat, keywords in CATEGORIES.items():
        for kw in keywords:
            if kw.lower() in title.lower():
                return cat
    return "historias" # default

def extract_number(title):
    match = re.match(r'^(\d+)\.\s*(.*)', title)
    if match:
        return int(match.group(1)), match.group(2)
    return 0, title

def format_duration(seconds):
    if not seconds: return "00:00"
    m, s = divmod(int(seconds), 60)
    if m >= 60:
        h, m = divmod(m, 60)
        return f"{h}:{m:02d}:{s:02d}"
    return f"{m:02d}:{s:02d}"

ydl_opts = {'extract_flat': 'in_playlist', 'quiet': True}
with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    info = ydl.extract_info("https://www.youtube.com/@Hipoacusico/videos", download=False)
    entries = info.get('entries', [])

new_episodes = []
for entry in entries:
    title = entry.get('title', '')
    desc = entry.get('description', '') or ''
    dur = entry.get('duration', 0)
    yt_id = entry.get('id', '')
    
    num, clean_title = extract_number(title)
    cat = get_category(title)
    
    invitado = None
    if "-" in clean_title:
        parts = clean_title.split("-", 1)
        if len(parts) == 2:
            inv_part = parts[1].strip()
            if len(inv_part) < 50:
                invitado = {"nombre": inv_part}
                clean_title = parts[0].strip()

    ep = {
        "slug": yt_id,
        "numero": num,
        "titulo": clean_title,
        "categoria": cat,
        "descripcion": desc.replace('\n', ' ')[:150] + "..." if len(desc) > 150 else desc.replace('\n', ' '),
        "fechaPublicacion": "2026-04-20", 
        "duracion": format_duration(dur),
        "youtubeId": yt_id,
        "destacado": False
    }
    if invitado:
        ep["invitado"] = invitado
        
    new_episodes.append(ep)

# Load existing
with open("content/podcast.json", "r", encoding="utf-8") as f:
    existing = json.load(f)

existing_slugs = {e["slug"] for e in existing}
for ne in new_episodes:
    if ne["slug"] not in existing_slugs:
        existing.append(ne)

with open("content/podcast.json", "w", encoding="utf-8") as f:
    json.dump(existing, f, ensure_ascii=False, indent=2)

print("Done. Added", len(new_episodes), "episodes.")
