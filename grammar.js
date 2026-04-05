// Almanca Gramer Konuları
// Her konu: başlık, açıklama, kurallar, örnekler, mini quiz

const GRAMMAR_TOPICS = [
  {
    id: 1,
    title: "Artikeller: der, die, das",
    icon: "📖",
    level: "A1",
    description: "Almancada her ismin bir cinsi (Genus) vardır: Eril (maskulin), Dişil (feminin) veya Nötr (neutral).",
    rules: [
      { rule: "der → Eril (maskulin)", examples: ["der Mann (erkek)", "der Tisch (masa)", "der Tag (gün)", "der Bahnhof (istasyon)"] },
      { rule: "die → Dişil (feminin)", examples: ["die Frau (kadın)", "die Schule (okul)", "die Stadt (şehir)", "die Sprache (dil)"] },
      { rule: "das → Nötr (neutral)", examples: ["das Kind (çocuk)", "das Auto (araba)", "das Buch (kitap)", "das Haus (ev)"] },
      { rule: "die → Çoğul (tüm isimler)", examples: ["die Männer (erkekler)", "die Frauen (kadınlar)", "die Kinder (çocuklar)"] },
    ],
    tips: [
      "İngilizce'den farklı olarak Almancada 'the' kelimesi üç şekilde değişir.",
      "Her yeni kelimeyi artikeli ile birlikte öğrenin: sadece 'Tisch' değil, 'der Tisch'.",
      "İpucu: -ung, -heit, -keit, -schaft, -tion ile biten isimler çoğunlukla 'die' alır.",
      "İpucu: -chen, -lein ile biten isimler daima 'das' alır (das Mädchen, das Brötchen).",
      "İpucu: Erkek kişiler/meslekler çoğunlukla 'der' alır (der Lehrer, der Arzt).",
    ],
    quiz: [
      { question: "_____ Buch liegt auf dem Tisch.", options: ["der", "die", "das", "dem"], answer: 2 },
      { question: "_____ Frau heißt Maria.", options: ["der", "die", "das", "den"], answer: 1 },
      { question: "Ich sehe _____ Kind.", options: ["der", "die", "das", "den"], answer: 2 },
      { question: "_____ Bahnhof ist groß.", options: ["der", "die", "das", "den"], answer: 0 },
    ]
  },
  {
    id: 2,
    title: "Çoğul Ekleri (Plural)",
    icon: "📚",
    level: "A1",
    description: "Almancada çoğul çok farklı şekillerde yapılır. Her ismin çoğulunu artikeli ile birlikte öğrenmek gerekir.",
    rules: [
      { rule: "Ek yok (-)", examples: ["der Lehrer → die Lehrer", "das Zimmer → die Zimmer", "der Schüler → die Schüler"] },
      { rule: "-e eki", examples: ["der Tag → die Tage", "der Brief → die Briefe", "der Hund → die Hunde"] },
      { rule: "-er eki (+ Umlaut)", examples: ["das Buch → die Bücher", "das Kind → die Kinder", "der Mann → die Männer"] },
      { rule: "-en / -n eki", examples: ["die Frau → die Frauen", "die Schule → die Schulen", "die Blume → die Blumen"] },
      { rule: "-s eki (yabancı kelimeler)", examples: ["das Auto → die Autos", "das Hotel → die Hotels", "das Café → die Cafés"] },
    ],
    tips: [
      "Sözlükte çoğul genellikle şöyle gösterilir: der Tisch, -e (→ die Tische).",
      "Umlaut (ä, ö, ü) çoğul oluşturmada önemlidir: der Apfel → die Äpfel.",
      "Çoğulda daima 'die' artikeli kullanılır.",
    ],
    quiz: [
      { question: "'das Auto' kelimesinin çoğulu nedir?", options: ["die Autos", "die Autoen", "die Autore", "die Autöe"], answer: 0 },
      { question: "'die Frau' kelimesinin çoğulu nedir?", options: ["die Fraue", "die Frauen", "die Fraus", "die Fräue"], answer: 1 },
      { question: "'das Buch' kelimesinin çoğulu nedir?", options: ["die Buchs", "die Buche", "die Bücher", "die Büche"], answer: 2 },
    ]
  },
  {
    id: 3,
    title: "sein (olmak) Fiil Çekimi",
    icon: "🔤",
    level: "A1",
    description: "'sein' (olmak) Almancada en temel ve en sık kullanılan fiildir. Çekimi düzensizdir.",
    rules: [
      { rule: "Tekil (Singular)", examples: [
        "ich bin → Ben varım / ım",
        "du bist → Sen varsın / sın",
        "er/sie/es ist → O var / dır",
      ]},
      { rule: "Çoğul (Plural)", examples: [
        "wir sind → Biz varız / ız",
        "ihr seid → Siz (yakın) varsınız",
        "sie/Sie sind → Onlar / Siz (resmi) var",
      ]},
    ],
    tips: [
      "'ich bin' = 'I am' (İngilizce)",
      "Resmi 'Sie' (siz, saygı) daima büyük harf ile yazılır.",
      "'sein' ile sıfat veya isim kullanılır: Ich bin müde. (Yorgunum.) / Er ist Arzt. (O doktor.)",
    ],
    examples: [
      "Ich bin 25 Jahre alt. (25 yaşındayım.)",
      "Du bist sehr nett. (Çok naziksin.)",
      "Er ist Lehrer. (O öğretmendir.)",
      "Wir sind in Berlin. (Berlindeyiz.)",
      "Sie sind verheiratet. (Evliler.)",
    ],
    quiz: [
      { question: "Ich _____ müde.", options: ["bin", "bist", "ist", "sind"], answer: 0 },
      { question: "Du _____ sehr nett.", options: ["bin", "bist", "ist", "sind"], answer: 1 },
      { question: "Er _____ Arzt.", options: ["bin", "bist", "ist", "sind"], answer: 2 },
      { question: "Wir _____ in Berlin.", options: ["bin", "bist", "ist", "sind"], answer: 3 },
    ]
  },
  {
    id: 4,
    title: "haben (sahip olmak) Fiil Çekimi",
    icon: "✋",
    level: "A1",
    description: "'haben' (sahip olmak, var olmak) da çok sık kullanılan temel bir fiildir.",
    rules: [
      { rule: "Tekil (Singular)", examples: [
        "ich habe → Benim var",
        "du hast → Senin var",
        "er/sie/es hat → Onun var",
      ]},
      { rule: "Çoğul (Plural)", examples: [
        "wir haben → Bizim var",
        "ihr habt → Sizin (yakın) var",
        "sie/Sie haben → Onların / Sizin (resmi) var",
      ]},
    ],
    tips: [
      "'haben' ile sahip olunan şeyler ifade edilir: Ich habe ein Auto. (Arabam var.)",
      "'haben' ayrıca geçmiş zaman (Perfekt) oluşturmak için yardımcı fiil olarak kullanılır.",
      "Sık kullanım: Ich habe Hunger. (Açım.) / Ich habe Durst. (Susamış.)",
    ],
    examples: [
      "Ich habe ein neues Auto. (Yeni bir arabam var.)",
      "Hast du Zeit? (Vakit var mı?)",
      "Er hat blaue Augen. (Mavi gözleri var.)",
      "Wir haben Hunger. (Açız.)",
    ],
    quiz: [
      { question: "Ich _____ ein neues Auto.", options: ["habe", "hast", "hat", "haben"], answer: 0 },
      { question: "_____ du Zeit?", options: ["Habe", "Hast", "Hat", "Haben"], answer: 1 },
      { question: "Er _____ Hunger.", options: ["habe", "hast", "hat", "haben"], answer: 2 },
      { question: "Wir _____ keine Zeit.", options: ["habe", "hast", "hat", "haben"], answer: 3 },
    ]
  },
  {
    id: 5,
    title: "Yardımcı Fiiller (Modalverben)",
    icon: "🔧",
    level: "A1",
    description: "Modal fiiller bir diğer fiilin anlamını değiştirir. Cümlede sona gönderilen fiilin mastar hali kullanılır.",
    rules: [
      { rule: "können (yapabilmek)", examples: [
        "Ich kann Deutsch. (Almanca bilirim.)",
        "Kannst du mir helfen? (Bana yardım edebilir misin?)",
        "Er kann gut kochen. (İyi yemek yapabilir.)",
      ]},
      { rule: "müssen (zorunda olmak)", examples: [
        "Ich muss arbeiten. (Çalışmak zorundayım.)",
        "Du musst schlafen. (Uyumak zorundayısın.)",
        "Er muss zum Arzt gehen. (Doktora gitmesi lazım.)",
      ]},
      { rule: "wollen (istemek)", examples: [
        "Ich will ein Auto kaufen. (Araba almak istiyorum.)",
        "Willst du mitkommen? (Gelmek ister misin?)",
      ]},
      { rule: "dürfen (izinli olmak)", examples: [
        "Hier darf man nicht rauchen. (Burada sigara içmek yasaktır.)",
        "Darf ich telefonieren? (Telefon edebilir miyim?)",
      ]},
      { rule: "sollen (yapması beklenmek)", examples: [
        "Soll ich kommen? (Gelmemi mi istiyorsun?)",
        "Du sollst das nicht machen. (Bunu yapmamalısın.)",
      ]},
      { rule: "möchten (kibar istek)", examples: [
        "Ich möchte einen Kaffee. (Bir kahve istiyorum.)",
        "Möchten Sie bestellen? (Sipariş vermek ister misiniz?)",
      ]},
    ],
    tips: [
      "Modal fiil ikinci pozisyona gelir, asıl fiil (mastar) cümlenin sonuna gider.",
      "Örnek: Ich muss heute arbeiten. (Ben bugün çalışmak zorundayım.)",
      "'möchten' aslında 'mögen' fiilinin Konjunktiv II biçimidir ama A1'de ayrı öğrenilir.",
    ],
    quiz: [
      { question: "Ich _____ einen Kaffee trinken. (kibarca istek)", options: ["muss", "kann", "möchte", "darf"], answer: 2 },
      { question: "Hier _____ man nicht rauchen. (yasak)", options: ["muss", "kann", "will", "darf"], answer: 3 },
      { question: "_____ du mir helfen? (yetenek/olanak)", options: ["Muss", "Kannst", "Willst", "Darfst"], answer: 1 },
      { question: "Ich _____ morgen früh aufstehen. (zorunluluk)", options: ["muss", "kann", "will", "darf"], answer: 0 },
    ]
  },
  {
    id: 6,
    title: "Zamirler (Personalpronomen)",
    icon: "👤",
    level: "A1",
    description: "Kişi zamirleri fiilin çekiminde değişir. Almancada 'Sie' hem 3. çoğul (onlar) hem de resmi 'siz' anlamına gelir.",
    rules: [
      { rule: "Kişi zamirleri", examples: [
        "ich → ben",
        "du → sen (samimi)",
        "er → o (erkek)",
        "sie → o (kadın) / onlar",
        "es → o (nötr)",
        "wir → biz",
        "ihr → siz (samimi, çoğul)",
        "Sie → Siz (resmi, tekil/çoğul)",
      ]},
    ],
    tips: [
      "'du' samimi hitap için kullanılır (aile, arkadaşlar, çocuklar).",
      "'Sie' resmi hitap için kullanılır (yabancılar, büyükler, iş ortamı). Daima büyük 'S' ile.",
      "Almanca öğrenirken sizi bir insan adı ile karşılaştığınızda 'du' mu 'Sie' mi kullanılacağından emin olmak önemlidir.",
    ],
    quiz: [
      { question: "Benim için doğru zamir: '_____ bin müde.'", options: ["du", "ich", "er", "wir"], answer: 1 },
      { question: "Bir arkadaşınıza nasıl hitap edersiniz?", options: ["Sie", "Ihr", "Du", "Er"], answer: 2 },
      { question: "'das Kind' için doğru zamir:", options: ["er", "sie", "es", "ich"], answer: 2 },
      { question: "Resmi 'siz' için doğru zamir:", options: ["du", "ihr", "wir", "Sie"], answer: 3 },
    ]
  },
  {
    id: 7,
    title: "Ayrılabilir Fiiller (Trennbare Verben)",
    icon: "✂️",
    level: "A1",
    description: "Bazı Almanca fiillerin ön eki (Präfix) cümle içinde ayrılarak cümlenin sonuna gider.",
    rules: [
      { rule: "Sık kullanılan ayrılabilir önekler", examples: [
        "an- : anrufen (telefon etmek) → Ich rufe dich an.",
        "auf- : aufstehen (kalkmak) → Ich stehe früh auf.",
        "aus- : aussteigen (inmek) → Wo stiegst du aus?",
        "ab- : abfahren (kalkmak/ayrılmak) → Der Zug fährt ab.",
        "ein- : einschlafen (uyumak) → Das Kind schläft ein.",
        "mit- : mitkommen (birlikte gelmek) → Kommst du mit?",
        "zu- : zumachen (kapatmak) → Mach bitte die Tür zu.",
      ]},
    ],
    tips: [
      "Kural: Yüklem 2. pozisyonda, ön ek (Präfix) cümlenin en sonunda olur.",
      "Soruyla: Rufst du mich an? (Beni arıyor musun?) — 'an' sona gidiyor.",
      "Mastar halinde ayrılmazlar: Ich muss anrufen. (Telefon etmem lazım.)",
    ],
    examples: [
      "Ich rufe dich um 8 Uhr an. (Seni saat 8'de arıyorum.)",
      "Wann stehst du auf? (Ne zaman kalkıyorsun?)",
      "Mach bitte das Licht aus! (Işığı söndür lütfen!)",
      "Der Zug fährt um 10 Uhr ab. (Tren saat 10'da kalkıyor.)",
    ],
    quiz: [
      { question: "Ich _____ um 7 Uhr _____. (aufstehen)", options: ["stehe / auf", "auf / stehe", "stehen / auf", "auf / stehen"], answer: 0 },
      { question: "Wann _____ der Zug _____? (abfahren)", options: ["fahrt / ab", "fährt / ab", "ab / fährt", "fährt / abe"], answer: 1 },
      { question: "Mach bitte das Licht _____! (ausmachen)", options: ["aus", "ausmachen", "aus-", "machen"], answer: 0 },
    ]
  },
  {
    id: 8,
    title: "Almanca Cümle Yapısı",
    icon: "🔡",
    level: "A1",
    description: "Almancada fiil daima 2. pozisyonda gelir. Bu kural neredeyse istisnasızdır.",
    rules: [
      { rule: "Temel cümle yapısı: Özne + Fiil + Nesne", examples: [
        "Ich kaufe ein Buch. (Ben bir kitap satın alıyorum.)",
        "Er trinkt Kaffee. (O kahve içiyor.)",
        "Wir fahren nach Berlin. (Biz Berlin'e gidiyoruz.)",
      ]},
      { rule: "Zaman ifadesi başa gelirse fiil yine 2. pozisyonda:", examples: [
        "Heute kaufe ich ein Buch. (Bugün bir kitap satın alıyorum.)",
        "Morgen fahren wir nach Berlin. (Yarın Berlin'e gidiyoruz.)",
      ]},
      { rule: "Soru cümlesi (W-Frage):", examples: [
        "Wer kommt? (Kim geliyor?)",
        "Was kostet das? (Bu ne kadar?)",
        "Wo wohnst du? (Nerede oturuyorsun?)",
      ]},
      { rule: "Evet/Hayır sorusu (fiil başa gelir):", examples: [
        "Kommst du mit? (Geliyor musun?)",
        "Haben Sie Zeit? (Vaktiniz var mı?)",
        "Ist das richtig? (Bu doğru mu?)",
      ]},
    ],
    tips: [
      "Almancada Verb Second (V2) kuralı: Fiil her zaman 2. sıradadır.",
      "Bu kural yan cümleciklerde (weil, dass, wenn) geçerli değildir — orada fiil sona gider.",
      "Yan cümle örneği: Ich komme nicht, weil ich krank bin. (çünkü hasta-'ım' → 'bin' sona gider)",
    ],
    quiz: [
      { question: "Doğru sıralama: (Heute / ich / kaufe / ein Buch)", options: ["Heute kaufe ich ein Buch.", "Heute ich kaufe ein Buch.", "Ich kaufe heute ein Buch nicht.", "Heute ein Buch kaufe ich."], answer: 0 },
      { question: "Soru cümlesi: (du / Hast / Zeit)", options: ["Du Hast Zeit?", "Hast du Zeit?", "Zeit du hast?", "Du Zeit Hast?"], answer: 1 },
    ]
  },
  {
    id: 9,
    title: "Akkusativ (Belirtme Hali)",
    icon: "➡️",
    level: "A1",
    description: "Akkusativ, fiilin etkilediği nesneyi (doğrudan nesne) gösterir. Eril artikelde 'der' → 'den' olur.",
    rules: [
      { rule: "Artikelin değişimi", examples: [
        "Nominativ: der Mann / die Frau / das Kind / die (pl.)",
        "Akkusativ: den Mann / die Frau / das Kind / die (pl.)",
        "→ Sadece eril 'der' → 'den' olur!",
      ]},
      { rule: "Örnekler", examples: [
        "Ich sehe den Mann. (Erkeği görüyorum.) [der → den]",
        "Ich kaufe die Jacke. (Ceketi satın alıyorum.) [die → die]",
        "Ich esse das Brot. (Ekmeği yiyorum.) [das → das]",
        "Ich besuche die Kinder. (Çocukları ziyaret ediyorum.) [die → die]",
      ]},
    ],
    tips: [
      "Akkusativ gerektiren sık fiiller: haben, kaufen, sehen, brauchen, nehmen, essen, trinken, mögen",
      "Belirli edat + Akkusativ: durch, für, gegen, ohne, um",
      "Örnek: Ich kaufe ein Buch FÜR dich. (Senin için bir kitap alıyorum.)",
    ],
    quiz: [
      { question: "Ich sehe _____ Mann. (der → ?)", options: ["der", "die", "den", "dem"], answer: 2 },
      { question: "Ich kaufe _____ Jacke. (die → ?)", options: ["der", "die", "den", "dem"], answer: 1 },
      { question: "Hast du _____ Schlüssel? (der → ?)", options: ["der", "die", "den", "dem"], answer: 2 },
    ]
  },
  {
    id: 10,
    title: "Dativ (Yönelme Hali)",
    icon: "🔄",
    level: "A2",
    description: "Dativ, dolaylı nesneyi (kime/neye) ve bazı edatlı yapıları gösterir. Eril ve nötr 'dem', dişil 'der' olur.",
    rules: [
      { rule: "Artikelin değişimi Dativ'de", examples: [
        "Nominativ:  der / die / das / die",
        "Dativ:      dem / der / dem / den (+n)",
        "→ Eril: der → dem",
        "→ Dişil: die → der",
        "→ Nötr: das → dem",
      ]},
      { rule: "Dativ gerektiren edatlar (her zaman)", examples: [
        "mit: Ich fahre mit dem Zug. (Trenle gidiyorum.)",
        "bei: Ich wohne bei meinen Eltern. (Ailemle oturuyorum.)",
        "nach: Wir fahren nach Berlin. (Berlin'e gidiyoruz.)",
        "seit: Ich lerne seit drei Jahren Deutsch. (3 yıldır Almanca öğreniyorum.)",
        "von: Das Auto von dem/vom Mann. (Erkeğin arabası.)",
        "zu: Ich gehe zum Arzt. (Doktora gidiyorum.)",
        "aus: Er kommt aus der Türkei. (Türkiye'den geliyor.)",
      ]},
    ],
    tips: [
      "Kolay hatırlatıcı: 'mit, bei, nach, seit, von, zu, aus' → daima Dativ!",
      "'zum' = zu + dem | 'zur' = zu + der | 'vom' = von + dem | 'beim' = bei + dem | 'im' = in + dem",
    ],
    quiz: [
      { question: "Ich fahre mit _____ Zug. (der → ?)", options: ["der", "die", "dem", "den"], answer: 2 },
      { question: "Er kommt aus _____ Türkei. (die → ?)", options: ["die", "der", "dem", "den"], answer: 1 },
      { question: "Ich wohne bei _____ Eltern. (die, pl.)", options: ["den", "dem", "der", "die"], answer: 0 },
    ]
  },
  {
    id: 11,
    title: "Sık Kullanılan Kalıplar",
    icon: "💡",
    level: "A1",
    description: "Bu kalıpları ezberleyin — günlük konuşmada çok sık kullanılır!",
    rules: [
      { rule: "Tanışma ve selamlama", examples: [
        "Wie heißen Sie? / Wie heißt du? → Adınız / Adın ne?",
        "Ich heiße... → Adım...",
        "Woher kommen Sie? → Nerelisiniz?",
        "Ich komme aus der Türkei. → Türkiye'denim.",
        "Wie geht es Ihnen / dir? → Nasılsınız / Nasılsın?",
        "Danke, gut. / Es geht. → Teşekkürler, iyiyim. / İdare eder.",
      ]},
      { rule: "Yardım istemek", examples: [
        "Können Sie mir helfen? → Bana yardım edebilir misiniz?",
        "Entschuldigung, wo ist...? → Pardon, ... nerede?",
        "Wie komme ich zu...? → ...'ye nasıl gidebilirim?",
        "Wie bitte? → Efendim? / Ne dediniz?",
        "Können Sie das bitte wiederholen? → Tekrar edebilir misiniz?",
      ]},
      { rule: "Sipariş ve alışveriş", examples: [
        "Ich möchte... → ... istiyorum.",
        "Was kostet...? / Wie viel kostet...? → ... ne kadar?",
        "Das ist zu teuer. → Bu çok pahalı.",
        "Haben Sie...? → ... var mı?",
        "Die Rechnung, bitte. → Hesap lütfen.",
      ]},
      { rule: "Zaman ve yer", examples: [
        "Wann? → Ne zaman?",
        "Um wie viel Uhr? → Saat kaçta?",
        "Wo? → Nerede?",
        "Wie lange? → Ne kadar süre?",
        "Wie weit? → Ne kadar uzak?",
      ]},
    ],
    tips: [
      "Bu kalıpları cümle olarak ezberleyin, kelime kelime değil.",
      "Almancada çok kibarca konuşmak için 'möchten' ve 'würden Sie' kullanın.",
      "Anlamadığınızda: 'Entschuldigung, ich verstehe nicht. Können Sie das bitte wiederholen?' deyin.",
    ],
    quiz: [
      { question: "'Nasılsınız?' sorusunun Almancası:", options: ["Wie heißen Sie?", "Wie geht es Ihnen?", "Woher kommen Sie?", "Was möchten Sie?"], answer: 1 },
      { question: "'... istiyorum' kalıbı:", options: ["Ich brauche...", "Ich möchte...", "Ich muss...", "Ich will..."], answer: 1 },
      { question: "'Hesap lütfen' kalıbı:", options: ["Das Essen, bitte.", "Die Karte, bitte.", "Die Rechnung, bitte.", "Der Preis, bitte."], answer: 2 },
    ]
  },
  {
    id: 12,
    title: "Geçmiş Zaman: Perfekt",
    icon: "⏪",
    level: "A2",
    description: "Konuşma dilinde geçmişi anlatmak için Perfekt kullanılır. 'haben' veya 'sein' + Partizip II.",
    rules: [
      { rule: "Düzenli fiillerde Partizip II: ge- + Stamm + -t", examples: [
        "machen → gemacht (yaptım)",
        "kaufen → gekauft (satın aldım)",
        "spielen → gespielt (oynadım)",
        "lernen → gelernt (öğrendim)",
        "arbeiten → gearbeitet (çalıştım)",
      ]},
      { rule: "Sık kullanılan düzensiz Partizip II'ler", examples: [
        "sein → gewesen (idim)",
        "haben → gehabt (vardı / sahiptim)",
        "gehen → gegangen (gittim)",
        "kommen → gekommen (geldim)",
        "fahren → gefahren (gittim/sürdüm)",
        "essen → gegessen (yedim)",
        "trinken → getrunken (içtim)",
        "schreiben → geschrieben (yazdım)",
        "lesen → gelesen (okudum)",
        "sehen → gesehen (gördüm)",
        "schlafen → geschlafen (uyudum)",
        "sprechen → gesprochen (konuştum)",
      ]},
      { rule: "'haben' ile Perfekt (çoğu fiil)", examples: [
        "Ich habe das Buch gelesen. (Kitabı okudum.)",
        "Er hat Kaffee getrunken. (Kahve içti.)",
        "Wir haben viel gelernt. (Çok şey öğrendik.)",
      ]},
      { rule: "'sein' ile Perfekt (hareket ve durum değişimi)", examples: [
        "Ich bin nach Berlin gefahren. (Berlin'e gittim.)",
        "Er ist spät aufgestanden. (Geç kalktı.)",
        "Wir sind ins Kino gegangen. (Sinemaya gittik.)",
      ]},
    ],
    tips: [
      "'sein' ile: gehen, fahren, kommen, fliegen, reisen, aufstehen, einschlafen...",
      "Ayrılabilir fiillerde ge- önekin arasına girer: aufmachen → aufgemacht.",
      "-ieren ile biten fiiller ge- almaz: telefonieren → telefoniert (ge-siz!)",
    ],
    quiz: [
      { question: "Ich _____ das Buch _____. (lesen - Perfekt)", options: ["habe / gelesen", "bin / gelesen", "habe / lesen", "habe / gelesst"], answer: 0 },
      { question: "Wir _____ nach Berlin _____. (fahren - Perfekt)", options: ["haben / gefahren", "sind / gefahren", "sind / fahren", "haben / fahren"], answer: 1 },
      { question: "'kaufen' fiilinin Partizip II'si:", options: ["gekauft", "gekoufft", "kauft", "kaugte"], answer: 0 },
    ]
  },
];
