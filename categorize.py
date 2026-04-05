import json, sys, re
from collections import Counter
sys.stdout.reconfigure(encoding='utf-8')

with open('words_translated.json', encoding='utf-8') as f:
    words = json.load(f)

def assign_category(de, tr, example):
    d = de.lower()
    # Remove articles for matching
    d_bare = re.sub(r'^(der|die|das|ein|eine)\s+', '', d)

    def has(kw): return any(k in d for k in kw) or any(k in d_bare for k in kw)

    # --- FAMILY ---
    if has(['mutter','vater','bruder','schwester','eltern','großmutter','großvater','großeltern',
            'sohn','tochter','kind','ehefrau','ehemann','baby','junge','mädchen','onkel','tante',
            'cousin','cousine','enkel','enkelin','oma','opa','geschwister','verwandte',
            'heiraten','hochzeit','ledig','verheiratet','familienstand','familie']):
        return 'family'
    if d_bare in ('freund','freundin','mann','frau'): return 'family'

    # --- SHOPPING ---
    if has(['kaufen','verkaufen','geschäft','preis','billig','teuer','angebot','kasse','bezahlen',
            'einkaufen','laden','supermarkt','kleidung','jacke','schuh','größe','verkäufer','kunde',
            'einkaufszentrum','rechnung','rabatt','briefmarke','anzug','bluse','brille',
            'mantel','kleid','hose','hemd','pullover','rock','strumpf']):
        return 'shopping'
    if d_bare in ('mieten',): return 'shopping'

    # --- SCHOOL ---
    if has(['schule','lehrer','schüler','studieren','klasse','hausaufgabe','prüfung','studium',
            'unterricht','kurs','stundenplan','abitur','ausbildung','bibliothek','klassenfahrt',
            'praktikum','bleistift','wörterbuch','kugelschreiber','biologie','chemie','physik',
            'geografie','latein','sozialkunde','gymnasium','tafel','kreide','zeugnis']):
        return 'school'
    if d_bare in ('test','fach','buch','heft','lernen','lesen','schreiben','sprechen','verstehen'): return 'school'

    # --- AIRPORT/TRAVEL ---
    if has(['flughafen','flugzeug','fliegen','abflug','ankunft','gepäck','koffer','ticket',
            'fahrkarte','zoll','übernachten','hotel','rezeption','einzelzimmer','doppelzimmer',
            'ausflug','buchen','unterkunft','reiseführer']):
        return 'airport'
    if d_bare in ('reisen','reise','reisebüro','urlaub','pass','ausweis'): return 'airport'

    # --- FOOD ---
    if has(['kaffee','tee','bier','wein','saft','milch','brot','brötchen','butter','käse',
            'fisch','fleisch','gemüse','obst','apfel','banane','birne','tomate','kartoffel',
            'salat','kuchen','hähnchen','schinken','restaurant','café','frühstück','frühstücken',
            'speisekarte','hunger','durst','appetit','backen','braten','bohne','nudel','suppe',
            'pizza','zucker','öl','marmelade','honig','joghurt','schokolade','eis','pommes']):
        return 'food'
    if d_bare in ('essen','trinken','kochen','bestellen','schmecken','salz','reis','ei'): return 'food'

    # --- HOME ---
    if has(['wohnung','garten','balkon','möbel','sofa','schrank','lampe','kühlschrank','herd',
            'dusche','miete','vermieter','vermieten','umziehen','aufzug','treppe','aufräumen',
            'einziehen','waschmaschine','schlafzimmer','wohnzimmer','badezimmer','toilette','keller']):
        return 'home'
    if d_bare in ('haus','zimmer','küche','bad','tisch','bett','stuhl','wohnen','stock','fenster','tür'): return 'home'

    # --- WORK ---
    if has(['kollege','büro','kellner','bäcker','koch','fahrer','journalist','polizist',
            'arbeitslos','firma','bewerben','bewerbung','rentner','selbstständig','handwerker',
            'mechaniker','ingenieur','sekretär','künstler','musiker','sänger','schauspieler',
            'krankenpfleger','friseur','kaufmann','babysitter','beamte','hausfrau','hausmann']):
        return 'work'
    if d_bare in ('arzt','arbeit','arbeiten','beruf','stelle','termin','verdienen','chef'): return 'work'

    # --- TRANSPORT ---
    if has(['straßenbahn','s-bahn','bahnhof','bahnsteig','haltestelle','autobahn','kreuzung',
            'ampel','anschluss','motorrad','u-bahn']):
        return 'transport'
    if d_bare in ('zug','bus','auto','fahrrad','taxi','fahren','einsteigen','aussteigen',
                  'umsteigen','parken','links','rechts','geradeaus','brücke'): return 'transport'

    # --- HEALTH ---
    if has(['fieber','apotheke','medikament','tablette','krankenhaus','praxis','husten','schnupfen',
            'allergie','schmerz','blut','herz','lunge','magen','rezept','erkältung','pflaster']):
        return 'health'
    if d_bare in ('krank','müde','arzt','arm','bein','bauch','kopf','rücken'): return 'health'
    if 'weh' in d: return 'health'

    # --- TIME ---
    if has(['montag','dienstag','mittwoch','donnerstag','freitag','samstag','sonntag',
            'januar','februar','märz','april','juni','juli','august','september','oktober',
            'november','dezember','frühling','sommer','herbst','winter',
            'wochenende','feiertag','silvester','ostern','weihnachten','karneval']):
        return 'time'
    if d_bare in ('uhr','stunde','minute','sekunde','tag','woche','monat','jahr',
                  'heute','morgen','gestern','jetzt','immer','nie','oft','manchmal','bald',
                  'abend','nacht','mittag','nachmittag','früh','spät','pünktlich','datum',
                  'früher','damals','dann','danach','seitdem','vorher'): return 'time'

    # --- WEATHER ---
    if has(['wetter','regen','sonne','wind','schnee','bewölkt','wolke','sturm','frost',
            'nebel','gewitter','temperatur','klima','heiß','kalt','warm']):
        return 'weather'
    if 'grad' in d_bare and 'celsius' not in d_bare: return 'weather'

    # --- COLORS ---
    if d_bare in ('schwarz','weiß','rot','blau','grün','gelb','grau','braun','orange',
                  'lila','rosa','pink','violett','beige','bunt','farbe'): return 'colors'

    # --- PLACES ---
    if has(['museum','theater','oper','schwimmbad','stadion','zoo','strand','kirche','rathaus']):
        return 'places'
    if d_bare in ('stadt','dorf','kino','markt','disco','berg','meer','see','park',
                  'wald','insel','hafen','platz','land'): return 'places'

    # --- COMMUNICATION ---
    if has(['telefon','handy','telefonieren','e-mail','internet','computer','brief','zeitung',
            'fernsehen','chatten','blog','sms','radio','nachrichten','drucker']):
        return 'communication'
    if d_bare in ('schicken','post'): return 'communication'

    # --- MODALS ---
    if d_bare in ('können','müssen','wollen','sollen','dürfen','möchten','mögen'): return 'modals'

    # --- QUESTION WORDS ---
    if d_bare in ('wer','was','wo','wann','warum','woher','wohin','welche','welcher','welches'):
        return 'questions'
    if re.match(r'^wie\b', d_bare) and len(d.split()) <= 3: return 'questions'

    # --- PERSONAL ---
    if has(['vorname','familienname','geburtsdatum','geburtsort','staatsangehörigkeit',
            'formular','ausfüllen','unterschreiben','vorstellen']):
        return 'personal'
    if d_bare in ('name','adresse','alter'): return 'personal'

    # --- NUMBERS ---
    if d_bare in ('eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn',
                  'elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn',
                  'neunzehn','zwanzig','dreißig','vierzig','fünfzig','sechzig','siebzig','achtzig',
                  'neunzig','hundert','tausend','million','nummer','zahl','prozent'):
        return 'numbers'

    # --- PHRASES ---
    if has(['guten morgen','guten tag','guten abend','gute nacht','auf wiedersehen','tschüss',
            'herzlichen glückwunsch','herzlich willkommen','viel glück','guten appetit',
            'entschuldigung','wie geht']):
        return 'phrases'

    # --- ADJECTIVES ---
    adj = ['groß','klein','alt','neu','gut','schlecht','schön','lang','kurz','richtig','falsch',
           'einfach','schwer','leicht','schnell','langsam','laut','leise','wichtig','kaputt',
           'frei','besetzt','geöffnet','geschlossen','interessant','langweilig','aufregend',
           'berühmt','beliebt','bequem','dick','dünn','blond','dunkel','hell','jung','reich',
           'arm','nett','freundlich','lustig','traurig','wütend','ängstlich','ruhig','sauber',
           'schmutzig','teuer','billig','hoch','tief','breit','eng','voll','leer','fertig',
           'gleich','verschiedene','besondere','eigene','nächste','letzte','ganze']
    if d_bare in adj: return 'adjectives'

    # --- VERBS ---
    verb_list = ['sein','haben','werden','gehen','kommen','machen','sagen','wissen','denken',
                 'finden','brauchen','helfen','bringen','nehmen','geben','sehen','hören','bleiben',
                 'warten','suchen','anrufen','besuchen','treffen','spielen','tanzen','schwimmen',
                 'schlafen','aufstehen','duschen','waschen','reparieren','öffnen','schließen',
                 'beginnen','enden','dauern','kosten','empfehlen','erklären','wiederholen',
                 'ändern','ärgern','beeilen','beschreiben','beschweren','berichten','diskutieren',
                 'fahren','reisen','fliegen','kaufen','verkaufen','kochen','backen','braten',
                 'lesen','schreiben','sprechen','lernen','studieren','arbeiten','verdienen',
                 'bezahlen','heiraten','feiern','einladen','wandern','gratulieren','benutzen',
                 'antworten','fragen','erinnern','vergessen','verlieren','finden','probieren',
                 'versuchen','meinen','glauben','hoffen','wünschen','danken','bitten',
                 'erlauben','verbieten','erleben','erzählen','berichten','zeigen','stellen',
                 'legen','hängen','setzen','stehen','liegen','sitzen','fahren','laufen',
                 'rennen','springen','klettern','schreien','lachen','weinen','schlafen',
                 'wecken','aufwachen','einschlafen','träumen','denken','verstehen','erklären',
                 'übersetzen','buchstabieren','aufschreiben','ausdrucken','speichern','laden',
                 'herunterladen','hochladen','tippen','klicken','anklicken','abholen','abgeben',
                 'anmelden','abmelden','anmachen','ausmachen','aufmachen','zumachen','einschalten',
                 'ausschalten','drucken','kopieren','schneiden','kleben','falten','ordnen']
    if d_bare in verb_list: return 'verbs'
    # Heuristic: ends with -en and not a noun
    if d_bare.endswith('en') and not d_bare[0].isupper() and len(d_bare) > 3:
        if not any(d_bare.startswith(a) for a in ['ein ','der ','die ','das ']):
            return 'verbs'

    return 'extra'

result = []
for i, w in enumerate(words, 1):
    cat = assign_category(w['de'], w['tr'], w['example'])
    result.append({
        'id': i,
        'de': w['de'],
        'tr': w['tr'],
        'example': w['example'],
        'level': w['level'],
        'category': cat
    })

cats = Counter(e['category'] for e in result)
print('Category distribution:')
for k, v in sorted(cats.items(), key=lambda x: -x[1]):
    print(f'  {k}: {v}')
print(f'\nTotal: {len(result)} words')

with open('words_final.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)
print('Saved words_final.json')
