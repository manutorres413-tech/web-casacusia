import json

with open("content/podcast.json", "r", encoding="utf-8") as f:
    episodes = json.load(f)

with open("transcript_final.txt", "r", encoding="utf-8") as f:
    transcript_text = f.read()

# Find the episode with slug "fatiga-auditiva"
for ep in episodes:
    if ep["slug"] == "fatiga-auditiva":
        ep["transcripcion"] = transcript_text
        print(f"Transcript added to episode: {ep['titulo']}")
        break

with open("content/podcast.json", "w", encoding="utf-8") as f:
    json.dump(episodes, f, ensure_ascii=False, indent=2)
