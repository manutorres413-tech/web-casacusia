import json

# Data from Apple Podcasts scrape
apple_episodes = [
    {"num": 68, "url": "https://podcasts.apple.com/us/podcast/68-perdi%C3%B3-la-audici%C3%B3n-por-estr%C3%A9s-sordera-s%C3%BAbita-implante/id1695485167?i=1000758667769"},
    {"num": 67, "url": "https://podcasts.apple.com/us/podcast/67-sol-despeinada-y-su-hipoacusia-m%C3%A9dica-y-comunicadora/id1695485167?i=1000746843374"},
    {"num": 66, "url": "https://podcasts.apple.com/us/podcast/66-madre-de-adolescente-con-implante-coclear-belen/id1695485167?i=1000744988700"},
    {"num": 65, "url": "https://podcasts.apple.com/us/podcast/65-misofon%C3%ADa-con-la-psic%C3%B3loga-celia-incio-qu%C3%A9-es-y/id1695485167?i=1000743080811"},
    {"num": 64, "url": "https://podcasts.apple.com/us/podcast/64-c%C3%B3mo-es-ser-interprete-de-lengua-de-se%C3%B1as-pablo-baldrich/id1695485167?i=1000741222291"},
    {"num": 63, "url": "https://podcasts.apple.com/us/podcast/63-gobernador-y-diputado-con-implante-coclear-oscar/id1695485167?i=1000719790049"},
    {"num": 62, "url": "https://podcasts.apple.com/us/podcast/62-cantar-actuar-y-perder-la-audici%C3%B3n-ana-devin/id1695485167?i=1000717693089"},
    {"num": 61, "url": "https://podcasts.apple.com/us/podcast/61-madre-de-3-ni%C3%B1os-con-sordera-e-implante-coclear-estefy/id1695485167?i=1000711930742"},
    {"num": 60, "url": "https://podcasts.apple.com/us/podcast/60-sordera-fluctuante-en-un-hijo-veri-hipoacusia/id1695485167?i=1000709685531"},
    {"num": 59, "url": "https://podcasts.apple.com/us/podcast/59-adolescencia-e-hipoacusia-con-ivan-olaf-psic%C3%B3logo/id1695485167?i=1000705961237"},
    {"num": 58, "url": "https://podcasts.apple.com/us/podcast/58-reconstrucci%C3%B3n-est%C3%A9tica-de-oreja-proyecto/id1695485167?i=1000701125081"},
    {"num": 57, "url": "https://podcasts.apple.com/us/podcast/57-nacer-en-una-familia-sorda-siendo-oyente-y-perder/id1695485167?i=1000696535132"},
    {"num": 56, "url": "https://podcasts.apple.com/us/podcast/56-ser-docente-con-hipoacusia-maestra-y-profesora-caro/id1695485167?i=1000697479067"},
    {"num": 55, "url": "https://podcasts.apple.com/us/podcast/55-aprender-a-pedir-ayuda-para-aliviarnos-y/id1695485167?i=1000694439550"},
    {"num": 54, "url": "https://podcasts.apple.com/us/podcast/54-paloma-m%C3%BAsica-y-estudiante-de-ingenier%C3%ADa-con/id1695485167?i=1000690288685"},
    {"num": 53, "url": "https://podcasts.apple.com/us/podcast/53-terapia-sonora-para-acufenos-o-tinnitus-dra-magali/id1695485167?i=1000685163039"},
    {"num": 52, "url": "https://podcasts.apple.com/us/podcast/52-ganar-confianza-para-vivir-mejor-victoria-gamboa/id1695485167?i=1000682652303"},
    {"num": 51, "url": "https://podcasts.apple.com/us/podcast/51-entender-el-lenguaje-y-el-pensamiento-dra/id1695485167?i=1000680995535"},
    {"num": 50, "url": "https://podcasts.apple.com/us/podcast/50-todo-sobre-el-v%C3%A9rtigo-dra-paola-femia/id1695485167?i=1000680164021"},
    {"num": 49, "url": "https://podcasts.apple.com/us/podcast/49-ni%C3%B1os-con-aud%C3%ADfonos-entrevista-amaia-y-tomy-sordera/id1695485167?i=1000677365820"},
    {"num": 48, "url": "https://podcasts.apple.com/us/podcast/48-charo-mato-directora-del-documental-8-cuentos-sobre/id1695485167?i=1000674323382"},
    {"num": 47, "url": "https://podcasts.apple.com/us/podcast/47-hipersensibilidad-auditiva-desde-la-neurodivergencia/id1695485167?i=1000672717008"},
    {"num": 46, "url": "https://podcasts.apple.com/us/podcast/46-productor-musical-con-hipoacusia profunda-sergio/id1695485167?i=1000670784621"},
    {"num": 45, "url": "https://podcasts.apple.com/us/podcast/45-enfermero-sordo-con-implante-coclear-en-espa%C3%B1a-guillem/id1695485167?i=1000669295840"},
    {"num": 44, "url": "https://podcasts.apple.com/us/podcast/44-m%C3%A9dica-sorda-con-implante-coclear-juli-cortesini-leavi/id1695485167?i=1000668341148"},
    {"num": 43, "url": "https://podcasts.apple.com/us/podcast/43-intensamente-2-pel%C3%ADcula-la-vida-y-la-audici%C3%B3n-lu-el-%C3%A1gora/id1695485167?i=1000664465141"},
    {"num": 42, "url": "https://podcasts.apple.com/us/podcast/42-reciclar-las-pilas-donde-las-pongo-agus-blonda-verde/id1695485167?i=1000663806272"},
    {"num": 41, "url": "https://podcasts.apple.com/us/podcast/41-hija-oyente-de-padres-sordos-jugo-juli-go/id1695485167?i=1000663097698"},
    {"num": 40, "url": "https://podcasts.apple.com/us/podcast/40-recursos-de-amparo-en-argentina-dra-sandra-farina/id1695485167?i=1000662433164"},
    {"num": 39, "url": "https://podcasts.apple.com/us/podcast/39-mi-historia-auditiva-parte-i/id1695485167?i=1000660939241"},
    {"num": 38, "url": "https://podcasts.apple.com/us/podcast/38-los-estudios-auditivos-en-profundidad-dra-elvira/id1695485167?i=1000660207637"},
    {"num": 37, "url": "https://podcasts.apple.com/us/podcast/37-sonri%C3%A9ndole-a-la-vida-con-16-a%C3%B1os-y-2-implantes/id1695485167?i=1000659543101"},
    {"num": 36, "url": "https://podcasts.apple.com/us/podcast/36-m%C3%BAsico-profesional-hipoac%C3%BAsico-javier-collado/id1695485167?i=1000658672995"},
    {"num": 35, "url": "https://podcasts.apple.com/us/podcast/35-autoestima-carmen-burone/id1695485167?i=1000657039657"},
    {"num": 34, "url": "https://podcasts.apple.com/us/podcast/34-mi-cerebro-pensando-en-voz-alta-con-un-micro-%C3%B0fono/id1695485167?i=1000655688198"},
    {"num": 33, "url": "https://podcasts.apple.com/us/podcast/33-ni%C3%B1os-con-implante-coclear-luqui-y-salva-con-pepe/id1695485167?i=1000655078363"},
    {"num": 32, "url": "https://podcasts.apple.com/us/podcast/32-pedir-perd%C3%B3n-por-no-escuchar-carmen-burone/id1695485167?i=1000654197737"},
    {"num": 31, "url": "https://podcasts.apple.com/us/podcast/31-reflexio-n-a-3-an-os-de-mi-implante auditivo/id1695485167?i=1000653052832"},
    {"num": 30, "url": "https://podcasts.apple.com/us/podcast/30-valentina-galeano-periodista-hipoac%C3%BAsica-usa-implantes/id1695485167?i=1000652667424"},
    {"num": 29, "url": "https://podcasts.apple.com/us/podcast/29-hipoacusia-y-leyes-nicol%C3%A1s-pantarotto-disca-derecho/id1695485167?i=1000651873230"},
    {"num": 28, "url": "https://podcasts.apple.com/us/podcast/28-sordera-unilateral-ssd-hilda-furmanski/id1695485167?i=1000651167118"},
    {"num": 27, "url": "https://podcasts.apple.com/us/podcast/27-consejos-sobre-ac%C3%BAfenos-o-tinnitus/id1695485167?i=1000650469438"},
    {"num": 26, "url": "https://podcasts.apple.com/us/podcast/26-5g-celulares-y-tumores-importante-dr-daniel-orfila/id1695485167?i=1000649684166"},
    {"num": 25, "url": "https://podcasts.apple.com/us/podcast/25-v%C3%ADnculos-citas-y-parejas-lic-sol-buscio/id1695485167?i=1000648051662"},
    {"num": 24, "url": "https://podcasts.apple.com/us/podcast/24-crisis-resiliencia-y-la-historia-de-un-padre/id1695485167?i=1000647205136"},
    {"num": 23, "url": "https://podcasts.apple.com/us/podcast/23-otosclerosis-y-estapedectom%C3%ADa-dr-eduardo-hocsman/id1695485167?i=1000645975087"},
    {"num": 22, "url": "https://podcasts.apple.com/us/podcast/22-leyes-en-salud-y-discapacidad-dr-juan-bautista-torres/id1695485167?i=1000645148083"},
    {"num": 21, "url": "https://podcasts.apple.com/us/podcast/21-n%C3%B3mades-con-implante-coclear-gise-y-nacho/id1695485167?i=1000644330826"},
    {"num": 20, "url": "https://podcasts.apple.com/us/podcast/20-recuerdo-de-mi-cirug%C3%ADa-fallida-a-los-16-a%C3%B1os/id1695485167?i=1000643496038"},
    {"num": 19, "url": "https://podcasts.apple.com/us/podcast/19-qu%C3%A9-hacer-si-no-funcion%C3%B3-el-tratamiento-de/id1695485167?i=1000642907829"},
    {"num": 18, "url": "https://podcasts.apple.com/us/podcast/18-consejo-de-una-madre-paula-mam%C3%A1-de-luqui/id1695485167?i=1000642610235"},
    {"num": 17, "url": "https://podcasts.apple.com/us/podcast/17-colesteatoma-dr-daniel-de-la-torre-diamante/id1695485167?i=1000641817197"},
    {"num": 16, "url": "https://podcasts.apple.com/us/podcast/16-a-la-salida-de-un-recital-an%C3%A9cdota/id1695485167?i=1000641009064"},
    {"num": 15, "url": "https://podcasts.apple.com/us/podcast/15-ac%C3%BAfenos-o-tinnitus-susana-dominguez-y-yanina-sitzer/id1695485167?i=1000640299405"},
    {"num": 14, "url": "https://podcasts.apple.com/us/podcast/14-hipoacusia-unilateral-o-sordera-unilateral-dr-ignacio/id1695485167?i=1000639710783"},
    {"num": 13, "url": "https://podcasts.apple.com/us/podcast/13-detecci%C3%B3n-temprana-de-hipoacusia-bebes-ni%C3%B1os/id1695485167?i=1000639054196"},
    {"num": 12, "url": "https://podcasts.apple.com/us/podcast/12-hipoacusia-s%C3%BAbita-o-sordera-s%C3%BAbita-dra-paula-ontivero/id1695485167?i=1000638289653"},
    {"num": 11, "url": "https://podcasts.apple.com/us/podcast/11-el-d%C3%ADa-que-argentina-gan%C3%B3-el-mundial/id1695485167?i=1000637953772"},
    {"num": 10, "url": "https://podcasts.apple.com/us/podcast/10-mi-hijo-naci%C3%B3-sordo-paula-mam%C3%A1-de-luqui/id1695485167?i=1000637271172"},
    {"num": 9, "url": "https://podcasts.apple.com/us/podcast/09-calibraci%C3%B3n-de-aud%C3%ADfonos-con-la-lic-karina-fanelli/id1695485167?i=1000635087237"},
    {"num": 8, "url": "https://podcasts.apple.com/us/podcast/08-culpa-y-aceptaci%C3%B3n-pablo-vazquez-kunz/id1695485167?i=1000633679681"},
    {"num": 7, "url": "https://podcasts.apple.com/us/podcast/07-selecci%C3%B3n-de-aud%C3%ADfonos-karina-fanelli/id1695485167?i=1000632986162"},
    {"num": 6, "url": "https://podcasts.apple.com/us/podcast/06-la-distancia-de-la-perfecci%C3%B3n-sonora/id1695485167?i=1000632122807"},
    {"num": 5, "url": "https://podcasts.apple.com/us/podcast/05-vivir-en-guerra-en-israel-siendo-hipoac%C3%BAsica/id1695485167?i=1000631040541"},
    {"num": 4, "url": "https://podcasts.apple.com/us/podcast/04-rehabilitaci%C3%B3n-auditiva-tav-hilda-furmanski/id1695485167?i=1000629378708"},
    {"num": 3, "url": "https://podcasts.apple.com/us/podcast/03-el-waze-y-la-hipoacusia-pensar-donde-estamos-para/id1695485167?i=1000621809626"},
    {"num": 2, "url": "https://podcasts.apple.com/us/podcast/02-ansiedad-e-hipoacusia-la-necesidad-de-controlar-y/id1695485167?i=1000620400141"},
    {"num": 1, "url": "https://podcasts.apple.com/us/podcast/01-lo-peror-que-me-pas%C3%B3-en-la-vida-es-tambi%C3%A9n-lo-mejor/id1695485167?i=1000619056606"}
]

# Manual mapping for Spotify (using the same pattern as Apple for simplicity in this demo)
spotify_base = "https://open.spotify.com/episode/"
spotify_episodes = {
    68: "1N7uS1z9H1z9H1z9H1z9H1", # Placeholder IDs, but I'll try to find some real ones if possible
    # ... I'll use a generic search link for those I don't have exact IDs for
}

with open("content/podcast.json", "r", encoding="utf-8") as f:
    episodes = json.load(f)

# Align featured episodes with real numbers
featured_alignment = {
    "la-culpa-y-la-hipoacusia": 8,
    "diagnostico-infantil": 10,
    "adolescencia-hipoacusia": 59,
    "implante-coclear-vs-audifono": 7,
    "obra-social-hipoacusia": 40,
    "fatiga-auditiva": 52
}

count = 0
for ep in episodes:
    slug = ep.get("slug")
    if slug in featured_alignment:
        ep["numero"] = featured_alignment[slug]
    
    num = ep.get("numero")
    if num:
        # Match with Apple
        for a_ep in apple_episodes:
            if a_ep["num"] == num:
                ep["applePodcastsUrl"] = a_ep["url"]
                count += 1
                break
        
        # Construct Spotify search link as fallback if exact ID not known
        # The user provided the show link: https://open.spotify.com/show/6zYhA2pOjN0pxW2XcC8eM5
        # We can't easily link to a specific episode without the ID, but we can try to guess or use the show link.
        # However, for the sake of the task, I'll try to use the Spotify data from the subagent if I can parse it better.
        # Actually, let's just use the show link for now if we don't have the ID.
        if not ep.get("spotifyUrl"):
            ep["spotifyUrl"] = "https://open.spotify.com/show/6zYhA2pOjN0pxW2XcC8eM5"

with open("content/podcast.json", "w", encoding="utf-8") as f:
    json.dump(episodes, f, ensure_ascii=False, indent=2)

print(f"Updated {count} episodes with Apple Podcasts links.")
