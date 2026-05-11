import json

with open("content/podcast.json", "r", encoding="utf-8") as f:
    episodes = json.load(f)

translations = {
    "Differences in Hearing Aid Ranges for Hearing Loss": {
        "titulo": "Diferencias entre gamas de audífonos para hipoacusia",
        "descripcion": "¿Qué cambia realmente entre un audífono básico y uno premium? En este video explico en detalle las diferencias entre los rangos de Phonak Audéo..."
    },
    "Guide to TRAVELING with hearing aids and a hearing implant: beach, mountains, campsites.": {
        "titulo": "Guía para VIAJAR con audífonos e implante auditivo: playa, montaña, camping",
        "descripcion": "🎒 ¿Viajás con audífono o implante coclear? Esta guía práctica va a salvarte el equipo y el viaje. Cubrimos TODO lo que necesitás saber..."
    },
    "ANDIS ceases to exist: it is transferred to the Ministry of Health (Decree 942/2025) — what chang...": {
        "titulo": "ANDIS deja de existir: pasa al Ministerio de Salud (Decreto 942/2025) — ¿qué cambia?",
        "descripcion": "La Agencia Nacional de Discapacidad (ANDIS) se cierra y su estructura pasa a la Secretaría Nacional de Discapacidad dentro del Ministerio de Salud..."
    },
    "Mild hearing loss in high frequencies and use of hearing aids": {
        "titulo": "Hipoacusia leve en frecuencias agudas y uso de audífonos",
        "descripcion": "🔊 ¿Escuchás pero no entendés? Puede ser hipoacusia leve en las frecuencias agudas. En este video, explico qué pasa cuando perdemos claridad..."
    },
    "AI-powered hearing aid: my real-world noise test of the Phonak Infinio": {
        "titulo": "Audífono con inteligencia artificial: mi prueba real del Phonak Infinio",
        "descripcion": "Probé un audífono con inteligencia artificial, dos modelos más avanzados que el mío… y al principio pensé 'está bien, pero no es para tanto'..."
    },
    "Hearing aid for the first time: tips to keep in mind": {
        "titulo": "Audífono por primera vez: consejos a tener en cuenta",
        "descripcion": "🎧 Errores comunes al usar audífonos por primera vez y cómo evitarlos | Guía para principiantes con hipoacusia..."
    },
    "How to CHOOSE a HEARING AID MOLD": {
        "titulo": "Cómo ELEGIR un molde para audífono",
        "descripcion": "¿Sabías que tu molde del audífono puede cambiar completamente tu experiencia auditiva? En este video te explico qué son los moldes..."
    },
    "HOW custom HEARING AID MOLDS are made": {
        "titulo": "Cómo se HACEN los moldes de audífonos a medida",
        "descripcion": "En este video te muestro el proceso completo para hacer un molde de audífono a medida. Desde que tomamos la impresión del oído hasta que está listo..."
    },
    "Which hearing aid should I choose? My experience with hearing loss": {
        "titulo": "¿Qué audífono elegir? Mi experiencia con la hipoacusia",
        "descripcion": "¿Cómo elegir el mejor audífono? Mi experiencia: cómo cambió mi vida. Cuando me operé y tuve un implante auditivo, sentí que podía escuchar el mundo..."
    },
    "Singing, acting, and losing your hearing": {
        "titulo": "Cantar, actuar y perder la audición",
        "descripcion": "🔊 ¿Se puede cantar cuando dejás de escuchar? En este nuevo episodio de Sordo pero no mudo, charlamos con Ana Devin: cantante, mamá de un adolescente e hipoacúsica..."
    },
    "🇲🇽 Mother of 3 children with deafness and cochlear implant": {
        "titulo": "🇲🇽 Mamá de 3 hijos con sordera e implante coclear",
        "descripcion": "Estefy tuvo su primer hijo con sordera profunda y tuvo que pasar por algo que no esperaba como mamá... muchas dudas, miedos, esfuerzo, emoción..."
    },
    "HOW TO CLEAN YOUR HEARING AID?": {
        "titulo": "¿CÓMO LIMPIAR TU AUDÍFONO?",
        "descripcion": "🧼 ¿Cómo limpiar tu audífono correctamente? Evitá errores que pueden arruinar el sonido o hacer que deje de funcionar. En este video te muestro paso a paso..."
    },
    "Adolescence and Hearing Loss with Ivan Olaf": {
        "titulo": "Adolescencia e hipoacusia con Iván Olaf",
        "descripcion": "Iván es licenciado en Psicología, usuario de implante coclear y también hablante de lengua de señas. En este episodio hablamos de muchas cosas: su vida..."
    },
    "Setting Up Your Bluetooth Hearing Aid with the myPhonak App": {
        "titulo": "Configurando tu audífono Bluetooth con la app myPhonak",
        "descripcion": "En este video te muestro qué podés hacer con la app de mi audífono (myPhonak, disponible en App Store y Play Store)..."
    },
    "BEING BORN into a DEAF FAMILY while HEARING (and losing your hearing)": {
        "titulo": "NACER en una FAMILIA SORDA siendo OYENTE (y perder la audición)",
        "descripcion": "Chiara nació en una familia sorda, pero ella nació como la única hija oyente. Con el tiempo perdió la audición y decidió no usar audífonos..."
    },
    "Sound Recognition for the Deaf or Hard of Hearing": {
        "titulo": "Reconocimiento de sonidos para sordos o hipoacúsicos",
        "descripcion": "Hay sonidos que no escuchamos, ya sea porque están fuera de rango, estamos haciendo otra cosa, o nos fuimos a dormir y no tenemos el audífono puesto..."
    },
    "Deaf nurse with cochlear implant in Spain": {
        "titulo": "Enfermero sordo con implante coclear en España",
        "descripcion": "Guillem nació sordo en Valencia en 1998 y recibió un implante coclear en el 2000. Hoy vive solo en Barcelona, trabajando como enfermero..."
    },
    "Deaf Doctor with Cochlear Implant": {
        "titulo": "Doctora sorda con implante coclear",
        "descripcion": "Juli es doctora hipoacúsica y comparte su historia y su mirada de la vida con nosotros. Nos cuenta su experiencia trabajando en un hospital..."
    },
    "OIDOS ENCENDIDOS: first sound community in LATAM": {
        "titulo": "OIDOS ENCENDIDOS: primera comunidad sonora de Latinoamérica",
        "descripcion": "Presentamos OIDOS ENCENDIDOS, la primera comunidad sonora de Latinoamérica que busca conectar, motivar y potenciar proyectos artísticos de personas con discapacidad auditiva..."
    },
    "🇪🇸 Fluctuating Deafness in a Child": {
        "titulo": "🇪🇸 Sordera fluctuante en un niño",
        "descripcion": "Veri es mamá de un niño con sordera fluctuante y bilingüe: lengua de señas y oral. En este episodio hablamos de distintos temas que movilizan..."
    },
    "Children with Cochlear Implants - Luqui and Salva with Pepe in the Clouds - Deaf but not m...": {
        "titulo": "Niños con implante coclear - Luqui y Salva con Pepe en las nubes",
        "descripcion": "Una conversación hermosa con familias que transitan el implante coclear en la infancia..."
    },
    "What to do if treatment for sudden deafness doesn't work": {
        "titulo": "Qué hacer si el tratamiento para la sordera súbita no funciona",
        "descripcion": "¿El tratamiento para tu sordera súbita no funcionó? En este video hablamos de las opciones y los caminos posibles cuando los corticoides no alcanzan..."
    },
    "#HearingLoss in the first person. Interview on Channel 9 with Lucas, who is hearing impair...": {
        "titulo": "Hipoacusia en primera persona. Entrevista en Canal 9 con Lucas",
        "descripcion": "Entrevista en Canal 9 donde Lucas cuenta en primera persona cómo es vivir con hipoacusia..."
    },
    "#Benefits of the Single Disability Certificate #CUD in Argentina | My Life with Hearing Lo...": {
        "titulo": "Beneficios del Certificado Único de Discapacidad (CUD) en Argentina",
        "descripcion": "¿Qué beneficios te da el CUD en Argentina? En este video repasamos los derechos y prestaciones que te corresponden..."
    }
}

# Also translate remaining English descriptions/invitados
invitado_translations = {
    "hearing loss in the first person": "Hipoacusia en primera persona",
    "Example with Amplitone Phonak Infinio Sphere": "Ejemplo con Amplitone Phonak Infinio Sphere",
    "Veri (Fluctuating Hearing Loss)": "Veri (Hipoacusia fluctuante)",
    "Estefy from Mexico": "Estefy de México",
    "Extend its lifespan": "Extendé su vida útil",
    "contado por una madre": "contado por una madre",
    "contada por una mamá": "contada por una mamá",
    "te lo cuenta la mamá": "te lo cuenta la mamá",
    "Implante Coclear Infantil": "Implante Coclear Infantil",
    "Implanted Psychologist, LSA Speaker": "Psicólogo implantado, hablante de LSA",
    "iPhone or Android": "iPhone o Android",
    "Chiara Ivey": "Chiara Ivey",
    "Ana Devin": "Ana Devin",
    "La hipoacusia de Oscar Herrera Ahuad": "La hipoacusia de Oscar Herrera Ahuad",
    "Pablo Baldrich - Experiencia en primera persona": "Pablo Baldrich - Experiencia en primera persona",
    "Guillem Bodi - hearing impaired": "Guillem Bodi - hipoacúsico",
    "Juli Cortesini Leavi": "Juli Cortesini Leavi",
    "Tips para hipoacusicos": "Tips para hipoacúsicos"
}

count = 0
for ep in episodes:
    titulo = ep.get("titulo", "")
    for eng_title, translation in translations.items():
        if titulo.startswith(eng_title[:30]):
            ep["titulo"] = translation["titulo"]
            ep["descripcion"] = translation["descripcion"]
            count += 1
            break
    
    inv = ep.get("invitado", {})
    if inv:
        nombre = inv.get("nombre", "")
        if nombre in invitado_translations:
            ep["invitado"]["nombre"] = invitado_translations[nombre]

with open("content/podcast.json", "w", encoding="utf-8") as f:
    json.dump(episodes, f, ensure_ascii=False, indent=2)

print(f"Translated {count} episode titles to Spanish.")
