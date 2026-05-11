import yt_dlp
import json

ydl_opts = {'extract_flat': True, 'quiet': True}
with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    info = ydl.extract_info("https://www.youtube.com/@Hipoacusico/videos", download=False)
    titles = [entry.get('title', '') for entry in info.get('entries', [])]
    with open("podcast_titles.json", "w", encoding="utf-8") as f:
        json.dump(titles, f, ensure_ascii=False, indent=2)
