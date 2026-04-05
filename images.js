// Word → Emoji image map
// Keys: lowercase German word (article stripped)
const WORD_IMAGES = {
  // === AİLE ===
  "mutter": "👩", "vater": "👨", "bruder": "👦", "schwester": "👧",
  "eltern": "👪", "großmutter": "👵", "großvater": "👴", "großeltern": "👴👵",
  "sohn": "👦", "tochter": "👧", "kind": "🧒", "mann": "👨",
  "frau": "👩", "familie": "👪", "baby": "👶", "junge": "👦",
  "mädchen": "👧", "onkel": "👨‍🦳", "tante": "👩‍🦳",
  "hochzeit": "💒", "heiraten": "💍",

  // === YİYECEK ===
  "brot": "🍞", "butter": "🧈", "käse": "🧀", "wurst": "🌭",
  "fleisch": "🥩", "fisch": "🐟", "ei": "🥚", "milch": "🥛",
  "wasser": "💧", "saft": "🧃", "kaffee": "☕", "tee": "🍵",
  "bier": "🍺", "wein": "🍷", "apfel": "🍎", "banane": "🍌",
  "orange": "🍊", "zitrone": "🍋", "tomate": "🍅", "kartoffel": "🥔",
  "salat": "🥗", "suppe": "🍲", "pizza": "🍕", "nudeln": "🍝",
  "reis": "🍚", "kuchen": "🎂", "schokolade": "🍫", "eis": "🍦",
  "zucker": "🍬", "salz": "🧂", "öl": "🫙", "gemüse": "🥦",
  "obst": "🍎", "fleisch": "🥩", "hähnchen": "🍗", "eier": "🥚",
  "joghurt": "🥛", "marmelade": "🍯", "honig": "🍯",

  // === EV ===
  "haus": "🏠", "wohnung": "🏢", "zimmer": "🚪", "küche": "🍳",
  "bad": "🛁", "badezimmer": "🛁", "schlafzimmer": "🛏️",
  "wohnzimmer": "🛋️", "tisch": "🪑", "stuhl": "🪑",
  "bett": "🛏️", "sofa": "🛋️", "lampe": "💡", "fenster": "🪟",
  "tür": "🚪", "schrank": "🗄️", "boden": "🧹", "treppe": "🪜",
  "garten": "🌿", "balkon": "🏠", "keller": "🏚️",
  "schlüssel": "🔑", "adresse": "📍",

  // === ALIŞVERİŞ ===
  "kaufen": "🛒", "verkaufen": "💰", "geschäft": "🏪", "preis": "🏷️",
  "kasse": "💳", "geld": "💵", "euro": "💶", "cent": "🪙",
  "einkaufen": "🛍️", "markt": "🏪", "supermarkt": "🛒",
  "kleidung": "👗", "jacke": "🧥", "hose": "👖", "hemd": "👔",
  "t-shirt": "👕", "pullover": "🧶", "rock": "👗", "kleid": "👗",
  "schuh": "👟", "stiefel": "🥾", "tasche": "👜", "rucksack": "🎒",
  "mütze": "🧢", "handschuhe": "🧤", "schal": "🧣",
  "größe": "📏", "farbe": "🎨",

  // === TRANSPORT ===
  "auto": "🚗", "bus": "🚌", "zug": "🚂", "bahn": "🚇",
  "fahrrad": "🚲", "motorrad": "🏍️", "taxi": "🚕",
  "flugzeug": "✈️", "schiff": "🚢", "boot": "⛵",
  "bahnhof": "🚉", "flughafen": "✈️", "haltestelle": "🚏",
  "straße": "🛣️", "fahren": "🚗", "fliegen": "✈️",
  "ticket": "🎫", "fahrkarte": "🎫", "benzin": "⛽",

  // === OKUL ===
  "schule": "🏫", "klasse": "🏫", "unterricht": "📚",
  "lehrer": "👨‍🏫", "lehrerin": "👩‍🏫", "schüler": "👨‍🎓",
  "buch": "📖", "heft": "📓", "stift": "✏️", "bleistift": "✏️",
  "tafel": "📋", "hausaufgaben": "📝", "prüfung": "📝",
  "universität": "🎓", "studium": "🎓", "kurs": "📚",

  // === İŞ ===
  "arbeit": "💼", "büro": "🏢", "chef": "👔", "kollege": "🤝",
  "beruf": "💼", "arzt": "👨‍⚕️", "ärztin": "👩‍⚕️",
  "krankenhaus": "🏥", "apotheke": "💊", "polizei": "👮",
  "feuerwehr": "🚒", "bäcker": "🥐", "supermarkt": "🏪",

  // === HAVA DURUMU ===
  "sonne": "☀️", "regen": "🌧️", "schnee": "❄️", "wind": "💨",
  "wolke": "☁️", "gewitter": "⛈️", "nebel": "🌫️",
  "warm": "🌡️", "kalt": "❄️", "heiß": "🔥",

  // === ZAMAN ===
  "uhr": "🕐", "stunde": "⏰", "minute": "⏱️",
  "tag": "📅", "woche": "📅", "monat": "📆", "jahr": "🗓️",
  "morgen": "🌅", "abend": "🌙", "nacht": "🌙",
  "montag": "📅", "dienstag": "📅", "mittwoch": "📅",
  "donnerstag": "📅", "freitag": "🎉", "samstag": "🎈", "sonntag": "☀️",
  "januar": "❄️", "februar": "❄️", "märz": "🌸", "april": "🌧️",
  "mai": "🌼", "juni": "☀️", "juli": "🏖️", "august": "🌻",
  "september": "🍂", "oktober": "🎃", "november": "🍁", "dezember": "🎄",
  "geburtstag": "🎂", "weihnachten": "🎄", "ostern": "🐣",

  // === KİŞİSEL ===
  "name": "🪪", "alter": "🎂", "telefon": "📱", "handy": "📱",
  "e-mail": "📧", "brief": "✉️", "foto": "📷",
  "pass": "🛂", "personalausweis": "🪪",

  // === SAĞLIK ===
  "gesund": "💪", "krank": "🤒", "arzt": "👨‍⚕️",
  "medikament": "💊", "tablette": "💊", "schmerzen": "🤕",
  "kopfschmerzen": "🤕", "fieber": "🌡️",

  // === YERLER ===
  "stadt": "🏙️", "dorf": "🏡", "land": "🌾",
  "park": "🌳", "museum": "🏛️", "kino": "🎬",
  "restaurant": "🍽️", "cafe": "☕", "hotel": "🏨",
  "bank": "🏦", "post": "📮", "kirche": "⛪",
  "krankenhaus": "🏥", "bibliothek": "📚",

  // === DOĞA ===
  "baum": "🌳", "blume": "🌸", "tier": "🐾",
  "hund": "🐶", "katze": "🐱", "vogel": "🐦",
  "fisch": "🐟", "pferd": "🐴", "kuh": "🐄",
  "meer": "🌊", "see": "🏞️", "berg": "⛰️", "wald": "🌲",
  "fluss": "🌊",

  // === FIILLER ===
  "essen": "🍽️", "trinken": "🥤", "schlafen": "😴",
  "arbeiten": "💼", "lernen": "📚", "lesen": "📖",
  "schreiben": "✍️", "sprechen": "🗣️", "hören": "👂",
  "sehen": "👁️", "gehen": "🚶", "kommen": "🏃",
  "fahren": "🚗", "fliegen": "✈️", "schwimmen": "🏊",
  "spielen": "⚽", "kochen": "🍳", "kaufen": "🛒",
  "öffnen": "🔓", "schließen": "🔒", "anrufen": "📞",
  "schicken": "📤", "helfen": "🤝", "wohnen": "🏠",
  "heißen": "🪪", "sein": "✨", "haben": "✋",
  "wissen": "🧠", "denken": "💭", "fragen": "❓",
  "antworten": "💬", "suchen": "🔍", "finden": "🔍",
  "lachen": "😄", "weinen": "😢", "lieben": "❤️",

  // === SAYILAR / RENKLER ===
  "rot": "🔴", "blau": "🔵", "grün": "🟢", "gelb": "🟡",
  "schwarz": "⚫", "weiß": "⚪", "orange": "🟠",
  "eins": "1️⃣", "zwei": "2️⃣", "drei": "3️⃣",

  // === TEKNOLOJİ ===
  "computer": "💻", "internet": "🌐", "handy": "📱",
  "fernseher": "📺", "radio": "📻", "kamera": "📷",

  // === SPOR ===
  "sport": "⚽", "fußball": "⚽", "tennis": "🎾",
  "schwimmen": "🏊", "laufen": "🏃",

  // === KATEGORI FALLBACK ===
  "_family": "👪", "_food": "🍽️", "_shopping": "🛍️",
  "_transport": "🚗", "_school": "🏫", "_work": "💼",
  "_weather": "🌤️", "_time": "⏰", "_home": "🏠",
  "_health": "💊", "_places": "📍", "_verbs": "⚡",
  "_adjectives": "✨", "_personal": "🪪", "_extra": "💬",
  "_colors": "🎨", "_numbers": "🔢", "_modals": "💬",
  "_communication": "📡", "_airport": "✈️", "_questions": "❓",
  "_phrases": "💬",
};

function getWordEmoji(word) {
  // Strip article
  const clean = word.de.replace(/^(der|die|das|den|dem|des)\s+/i, '').toLowerCase().trim();

  // Direct match
  if (WORD_IMAGES[clean]) return WORD_IMAGES[clean];

  // Partial match (first word of compound)
  const first = clean.split(/[\s-]/)[0];
  if (WORD_IMAGES[first]) return WORD_IMAGES[first];

  // Category fallback
  return WORD_IMAGES['_' + word.category] || '📝';
}
