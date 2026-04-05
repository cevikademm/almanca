import json, sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('words_final.json', encoding='utf-8') as f:
    words = json.load(f)

# Clean up de field: remove plural annotations like ", -en" or ", -Ä" at end
def clean_de(de):
    # Remove plural forms like ", -en" or ", -ü" or ", -Ä, e"
    de = re.sub(r',\s*[-äöüÄÖÜ¨\w]+(\s*,\s*[\w]+)?$', '', de).strip()
    return de

# Clean up tr field: remove malformed translations
def clean_tr(tr, de):
    if not tr: return de  # fallback to German if no translation
    # Remove if translation looks like German (not translated)
    if tr.lower() == de.lower(): return de
    return tr.strip()

# Fix common bad translations from Google
fixes = {
    'ab': 'dan/den itibaren (önek)',
    'aber': 'ama / fakat / ancak',
    'die Abfahrt': 'kalkış / ayrılış',
    'all-': 'hepsi / tüm',
    'ander-': 'diğer / başka',
    'an': 'a, e, da, de (edat)',
    'auf': 'üzerinde / açık (edat)',
    'aus': 'dan / dışında (edat)',
    'be-': 'ile- (önek)',
    'bei': 'yanında / sırasında',
    'bis': 'kadar / değin',
    'da': 'orada / şimdi / çünkü',
    'dabei': 'yanında / orada',
    'dadurch': 'bu sayede / bu yüzden',
    'dafür': 'bunun için / lehinde',
    'dagegen': 'buna karşılık / karşı',
    'damit': 'bunun için / böylece',
    'dann': 'sonra / o zaman',
    'das': 'bu / şu (artikel)',
    'denn': 'çünkü / zira',
    'der': 'bu / şu (artikel, eril)',
    'deshalb': 'bu yüzden / bu nedenle',
    'die': 'bu / şu (artikel, dişil)',
    'doch': 'ama / yine de / evet (ret)',
    'dort': 'orada',
    'durch': 'boyunca / vasıtasıyla',
    'eben': 'hemen şimdi / tam da',
    'eigentlich': 'aslında / gerçekte',
    'einmal': 'bir kez / bir defa',
    'es': 'o (nötr)',
    'etwas': 'bir şey / biraz',
    'für': 'için (edat)',
    'gegen': 'karşı / yaklaşık',
    'gerade': 'tam şimdi / düz',
    'gern': 'memnuniyetle / severek',
    'gleich': 'aynı / hemen / eşit',
    'immer': 'her zaman / daima',
    'in': 'içinde / -a,-e (edat)',
    'ja': 'evet',
    'jetzt': 'şimdi',
    'jed-': 'her / her biri',
    'jede': 'her / hepsi',
    'kein': 'hiç / hiçbir',
    'leider': 'ne yazık ki / maalesef',
    'man': 'kişi / insan (genel)',
    'mehr': 'daha fazla / artık',
    'mit': 'ile / birlikte (edat)',
    'nach': 'sonra / -e doğru (edat)',
    'nein': 'hayır',
    'nicht': 'değil',
    'nichts': 'hiçbir şey',
    'nie': 'asla / hiçbir zaman',
    'noch': 'henüz / hâlâ / daha',
    'nur': 'sadece / yalnızca',
    'obwohl': 'her ne kadar / rağmen',
    'oder': 'veya / ya da',
    'oft': 'sık sık',
    'ohne': 'olmadan / -sız/-siz',
    'schon': 'zaten / çoktan / şimdiden',
    'sehr': 'çok / oldukça',
    'seit': 'den beri / -dan itibaren',
    'so': 'böyle / öyle / çok',
    'sofort': 'hemen / derhal',
    'sonst': 'yoksa / başka türlü',
    'trotzdem': 'yine de / buna rağmen',
    'über': 'üzerinde / hakkında',
    'um': 'etrafında / saat (-de)',
    'und': 've',
    'unter': 'altında / arasında',
    'vielleicht': 'belki / olasılıkla',
    'von': 'dan/den (edat)',
    'vor': 'önünde / önce',
    'weil': 'çünkü / zira',
    'wenig': 'az / biraz',
    'wie': 'nasıl / gibi',
    'wieder': 'tekrar / yeniden',
    'wirklich': 'gerçekten / hakikaten',
    'wo': 'nerede',
    'wohl': 'herhalde / sanırım',
    'zu': 'a/e (edat) / çok / kapalı',
    'zum Beispiel': 'örneğin',
    'zusammen': 'birlikte / beraber',
    'zwischen': 'arasında',
    'also': 'yani / demek ki / o halde',
    'allein': 'yalnız / tek başına',
    'auch': 'da / de / ayrıca',
    'bald': 'yakında / çok geçmeden',
    'bereits': 'zaten / çoktan',
    'besonders': 'özellikle / özel olarak',
    'bitte': 'lütfen / rica ederim',
    'danke': 'teşekkür ederim',
    'direkt': 'direkt / doğrudan',
    'dringend': 'acil / acilen',
    'einverstanden': 'kabul / anlaşıldı',
    'endlich': 'sonunda / artık',
    'genau': 'tam / kesinlikle / haklısın',
    'her': 'buraya doğru / beri',
    'hin': 'oraya doğru / o tarafa',
    'hier': 'burada / buraya',
    'immer noch': 'hâlâ / hep',
    'inzwischen': 'bu arada / o zamandan beri',
    'klar': 'tabii / açık / anlaşıldı',
    'leise': 'sessizce / alçak sesle',
    'manchmal': 'bazen / zaman zaman',
    'meistens': 'çoğunlukla / genellikle',
    'nämlich': 'şöyle ki / zira / yani',
    'natürlich': 'tabii ki / doğal olarak',
    'nie': 'asla / hiçbir zaman',
    'normal': 'normal / olağan',
    'oben': 'yukarıda / üstte',
    'obwohl': 'her ne kadar / -e rağmen',
    'plötzlich': 'aniden / ansızın',
    'pünktlich': 'dakik / zamanında',
    'richtig': 'doğru / gerçek / tam',
    'schon': 'zaten / çoktan',
    'sehr': 'çok / oldukça',
    'sicher': 'emin / güvenli / kesinlikle',
    'so': 'böyle / öyle',
    'sogar': 'hatta / bile',
    'trotzdem': 'yine de / buna rağmen',
    'ungefähr': 'yaklaşık / tahminen',
    'vielleicht': 'belki',
    'vorsichtig': 'dikkatli / ihtiyatlı',
    'wahrscheinlich': 'muhtemelen / büyük olasılıkla',
    'wirklich': 'gerçekten',
    'zufrieden': 'memnun / tatmin olmuş',
    'zuerst': 'önce / ilk önce',
    'außerdem': 'bunun yanı sıra / ayrıca',
    'außerhalb': 'dışında / dış',
    'Achtung': 'Dikkat!',
    'die Aufgabe': 'görev / ödev / egzersiz',
    'das Auge': 'göz',
    'der Anfang': 'başlangıç / başlama',
    'die Anmeldung': 'kayıt / başvuru',
    'die Ansage': 'duyuru / anons',
    'die Antwort': 'cevap / yanıt',
    'die Anzeige': 'ilan / reklam / bildiri',
    'das Apartment': 'daire / apartman dairesi',
    'der Arbeitsplatz': 'iş yeri / çalışma alanı',
    'der Arm': 'kol',
    'der Ausgang': 'çıkış',
    'die Auskunft': 'bilgi / danışma',
    'das Ausland': 'yurt dışı',
    'der Ausländer': 'yabancı uyruklu',
    'das Auge': 'göz',
    'beantworter': 'cevaplayan (telefon sekreteri)',
    'der Anruf': 'telefon araması',
    'die Abfahrt': 'kalkış / hareket',
    'ab': 'dan/den itibaren',
}

js_lines = ['// Goethe-Zertifikat A1 + A2 — Tüm Kelime Veritabanı',
            '// PDF kaynak: A1_SD1_Wortliste_02.pdf + Goethe-Zertifikat_A2_Wortliste.pdf',
            f'// Toplam: {len(words)} kelime',
            '',
            'const WORDS = [']

for w in words:
    de_clean = clean_de(w['de'])
    tr = fixes.get(w['de'], fixes.get(de_clean, clean_tr(w['tr'], w['de'])))
    example = w['example'].replace('\\', '\\\\').replace('`', "'").replace('"', '\\"')
    de_js = de_clean.replace('"', '\\"')
    tr_js = tr.replace('"', '\\"')

    js_lines.append(
        f'  {{ id:{w["id"]}, de:"{de_js}", tr:"{tr_js}", '
        f'example:"{example[:100]}", level:"{w["level"]}", category:"{w["category"]}" }},'
    )

js_lines.append('];')
js_lines.append('')

# Add CATEGORIES constant
js_lines.append('const CATEGORIES = {')
categories = {
    'family': ('Aile', '👨‍👩‍👧', '#FF6B6B'),
    'shopping': ('Alışveriş', '🛒', '#4ECDC4'),
    'school': ('Okul', '🏫', '#45B7D1'),
    'airport': ('Havalimanı & Seyahat', '✈️', '#96CEB4'),
    'food': ('Yemek & İçecek', '🍽️', '#FFEAA7'),
    'home': ('Ev & Mobilya', '🏠', '#DDA0DD'),
    'work': ('İş & Meslekler', '💼', '#98D8C8'),
    'transport': ('Ulaşım', '🚌', '#F7DC6F'),
    'health': ('Sağlık', '💊', '#AED6F1'),
    'time': ('Zaman', '⏰', '#A9DFBF'),
    'weather': ('Hava Durumu', '🌤️', '#85C1E9'),
    'phrases': ('Günlük İfadeler', '💬', '#F1948A'),
    'adjectives': ('Sıfatlar', '🏷️', '#C39BD3'),
    'colors': ('Renkler', '🎨', '#F8C471'),
    'personal': ('Kişisel Bilgiler', '👤', '#82E0AA'),
    'verbs': ('Temel Fiiller', '⚡', '#F0B27A'),
    'numbers': ('Sayılar', '🔢', '#AEB6BF'),
    'communication': ('İletişim & Teknoloji', '📱', '#76D7C4'),
    'places': ('Yerler', '📍', '#F9E79F'),
    'questions': ('Soru Kelimeleri', '❓', '#D7BDE2'),
    'modals': ('Yardımcı Fiiller', '🔧', '#A8D8EA'),
    'extra': ('Diğer Kelimeler', '🎯', '#D5DBDB'),
}
for key, (label, icon, color) in categories.items():
    js_lines.append(f'  {key}: {{ label: "{label}", icon: "{icon}", color: "{color}" }},')
js_lines.append('};')

with open('words.js', 'w', encoding='utf-8') as f:
    f.write('\n'.join(js_lines))

print(f'Generated words.js with {len(words)} words')

# Print stats
from collections import Counter
cats = Counter(w['category'] for w in words)
for k, v in sorted(cats.items(), key=lambda x: -x[1]):
    print(f'  {k}: {v}')
