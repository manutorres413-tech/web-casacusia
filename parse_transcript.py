import json

with open("transcript_temp.es.json3", "r", encoding="utf-8") as f:
    data = json.load(f)

events = data.get("events", [])
paragraphs = []
current = []

for event in events:
    segs = event.get("segs", [])
    text = "".join(s.get("utf8", "") for s in segs).strip()
    if text and text != "\n":
        current.append(text)
        # Every ~5 segments make a paragraph
        if len(current) >= 5:
            paragraphs.append(" ".join(current))
            current = []

if current:
    paragraphs.append(" ".join(current))

# Take first ~15 paragraphs for a reasonable length demo
demo_paragraphs = paragraphs[:15]

result = "\n\n".join(demo_paragraphs)
print(f"Total paragraphs: {len(paragraphs)}")
print(f"Using first {len(demo_paragraphs)} paragraphs")
print(f"Total chars: {len(result)}")
print("\n--- PREVIEW ---")
print(result[:1000])

with open("transcript_final.txt", "w", encoding="utf-8") as f:
    f.write(result)
print("\nSaved to transcript_final.txt")
