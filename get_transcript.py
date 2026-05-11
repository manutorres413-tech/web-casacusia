import yt_dlp
import json

# Try to get subtitles/transcript for the "Ganar CONFIANZA" video (ONoNGmQ9tL0)
ydl_opts = {
    'writesubtitles': True,
    'writeautomaticsub': True,
    'subtitleslangs': ['es'],
    'subtitlesformat': 'json3',
    'skip_download': True,
    'quiet': True,
    'outtmpl': 'transcript_temp'
}

video_url = "https://www.youtube.com/watch?v=ONoNGmQ9tL0"

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    info = ydl.extract_info(video_url, download=True)
    subs = info.get('requested_subtitles', {})
    print("Available subs:", json.dumps(list(subs.keys()) if subs else []))
    
    auto_subs = info.get('automatic_captions', {})
    print("Auto caption languages:", list(auto_subs.keys())[:10] if auto_subs else "none")
