import yt_dlp
import json

ydl_opts = {'extract_flat': 'in_playlist', 'quiet': True}
with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    info = ydl.extract_info("https://www.youtube.com/@Hipoacusico/videos", download=False)
    entries = info.get('entries', [])
    if entries:
        print(json.dumps(entries[0], indent=2))
