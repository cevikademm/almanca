// A2 Kelime Kategorileri — Yeniden Sınıflandırma
// Bu dosya WORDS dizisindeki A2 kelimelerini daha anlamlı kategorilere atar

// --- Yeni A2 kategorileri ---
Object.assign(CATEGORIES, {
  emotions:    { label: "Duygular",            icon: "❤️",  color: "#F48FB1" },
  hobbies:     { label: "Hobiler & Eğlence",   icon: "🎨",  color: "#CE93D8" },
  travel:      { label: "Seyahat & Tatil",     icon: "🧳",  color: "#80DEEA" },
  body:        { label: "Vücut & Sağlık",      icon: "🫀",  color: "#A5D6A7" },
  society:     { label: "Sosyal Hayat",        icon: "🤝",  color: "#FFCC80" },
  media:       { label: "Medya & İnternet",    icon: "💻",  color: "#90CAF9" },
  grammar:     { label: "Dilbilgisi Kelimeleri", icon: "📐", color: "#BCAAA4" },
  nature:      { label: "Doğa & Çevre",        icon: "🌿",  color: "#C8E6C9" },
  opinion:     { label: "Görüş & Düşünce",     icon: "💭",  color: "#E1BEE7" },
  apartment:   { label: "Daire & Kiralık",     icon: "🏢",  color: "#B3E5FC" },
  career:      { label: "Kariyer & İş Arama",  icon: "📋",  color: "#FFE0B2" },
  sports:      { label: "Spor & Fitness",      icon: "⚽",  color: "#DCEDC8" },
});

// --- ID → yeni kategori ---
const A2_CAT_MAP = {
  // ===== DUYGULAR =====
  679: "emotions",  // ärgern — kızdırmak
  680: "emotions",  // ärgert
  696: "emotions",  // aufregend — heyecan verici
  797: "emotions",  // fühlen — hissetmek
  798: "emotions",  // fühlt
  800: "emotions",  // furchtbar — korkunç
  804: "emotions",  // freut — memnun
  812: "emotions",  // froh — memnun
  827: "emotions",  // hässlich — çirkin
  864: "emotions",  // leidtun — üzgün olmak
  941: "emotions",  // romantisch — romantik
  1002: "emotions", // traurig — üzgün
  1035: "emotions", // verlieben — aşık olmak
  1075: "emotions", // weinen — ağlamak
  1076: "emotions", // witzig — eğlenceli
  1083: "emotions", // wünschen — dilemek
  724:  "emotions", // blöd — saçma/kötü
  758:  "emotions", // dumm — aptal/saçma
  852:  "emotions", // komisch — eğlenceli/komik
  1040: "emotions", // vorsichtig — dikkatli

  // ===== HOBİLER & EĞLENCE =====
  700: "hobbies",  // backen — pişirmek
  705: "hobbies",  // basteln — el işi yapmak
  682: "hobbies",  // ausgehen — dışarı çıkmak
  684: "hobbies",  // ausruhen — dinlenmek
  730: "hobbies",  // braten — kızartmak
  740: "hobbies",  // chatten — sohbet etmek
  801: "hobbies",  // fotografieren — fotoğraf çekmek
  846: "hobbies",  // joggen — koşmak
  865: "hobbies",  // malen — resim yapmak
  1086: "hobbies", // zeichnen — çizmek
  793: "hobbies",  // fit
  685: "hobbies",  // ruht — dinleniyor

  // ===== SPOR =====
  // (joggen zaten hobbies'de, ama sport kelimeleri için)

  // ===== SEYAHAT & TATİL =====
  683: "travel",   // auspacken — bavul açmak
  688: "travel",   // aufmachen → (kapı açmak, burada travel değil)
  738: "travel",   // buchen — rezervasyon
  763: "travel",   // einpacken — paketlemek/toparlanmak
  764: "travel",   // packt — paketiyor
  836: "travel",   // informieren — bilgi almak (seyahat öncesi)
  1023: "travel",  // umsteigen — aktarma yapmak
  1043: "travel",  // verreisen — seyahat etmek
  1044: "travel",  // verreist — seyahatte
  939: "travel",   // Pass — pasaport
  796: "travel",   // fliegt — uçuyor

  // ===== VÜCUT & SAĞLIK =====
  782: "body",    // erkältet — üşüttüm
  835: "body",    // husten — öksürmek
  819: "body",    // gesund — sağlıklı
  1069: "body",   // wehtun — acımak
  1070: "body",   // tut — yapıyor (wehtun)
  799: "body",    // schein (Führerschein)

  // ===== SOSYAL HAYAT =====
  713: "society",  // bedanken — teşekkür etmek
  715: "society",  // bedankt
  716: "society",  // beschweren — şikayet etmek
  717: "society",  // beschwert
  749: "society",  // diskutieren — tartışmak
  780: "society",  // erinnern — hatırlamak
  808: "society",  // geehrt — saygıdeğer
  848: "society",  // klappen — çalışmak/olmak
  853: "society",  // kümmern — ilgilenmek
  854: "society",  // kümmert
  860: "society",  // lügen — yalan söylemek
  803: "society",  // freiwillig — gönüllü

  // ===== MEDYA & İNTERNET =====
  725: "media",    // Blog
  823: "media",    // herunterladen — indirmek
  838: "media",    // informiert
  840: "media",    // interessieren

  // ===== ÇEVRE & DOĞA =====
  707: "nature",   // bauen — inşa etmek
  884: "nature",   // neblig — sisli
  878: "nature",   // nass — ıslak
  851: "nature",   // kühl — serin

  // ===== DAİRE & KİRALIK =====
  694: "apartment",  // aufräumen — toplamak
  773: "apartment",  // einziehen — taşınmak
  856: "apartment",  // kündigen — sözleşme feshetmek

  // ===== KARİYER & İŞ ARAMA =====
  698: "career",   // beenden — bitirmek (eğitim)
  699: "career",   // begründen — gerekçe sunmak
  704: "career",   // beraten — danışmak
  706: "career",   // berichten — rapor vermek
  711: "career",   // beantworten — cevaplamak
  712: "career",   // beantwortet
  714: "career",   // beschreiben — tanımlamak
  723: "career",   // bestätigen — onaylamak
  727: "career",   // bestehen — geçmek (sınav)
  734: "career",   // bewerben — başvurmak
  735: "career",   // bewirbt
  822: "career",   // herstellen — üretmek
  857: "career",   // kontrollieren — kontrol etmek

  // ===== GÖRÜŞ & DÜŞÜNCE =====
  741: "opinion",  // denken — düşünmek
  771: "opinion",  // echt — gerçekten/hakikaten
  776: "opinion",  // eigentlich — aslında
  816: "opinion",  // genau — kesinlikle
  869: "opinion",  // meinen — düşünmek/demek istemek
  879: "opinion",  // natürlich — tabii ki
  1049: "opinion", // wahr — doğru
  1073: "opinion", // wirklich — gerçekten
  1051: "opinion", // wahrscheinlich — muhtemelen
  832:  "opinion", // hoffentlich — umarım
  830:  "opinion", // hoffen — ummak

  // ===== DİLBİLGİSİ KELİMELERİ (bağlaçlar, edatlar, zarflar) =====
  672: "grammar",  // anders — farklı
  677: "grammar",  // als — gibi/olarak
  687: "grammar",  // außer — dışında
  689: "grammar",  // außerdem — ayrıca
  690: "grammar",  // außerhalb — dışında
  742: "grammar",  // deshalb — bu yüzden
  747: "grammar",  // darüber — bu konuda
  748: "grammar",  // dabei — yanında
  750: "grammar",  // doch — ama/yine de
  753: "grammar",  // dort — orada
  754: "grammar",  // dringend — acilen
  755: "grammar",  // drinnen — içeride
  756: "grammar",  // dass — ki/olduğunu
  757: "grammar",  // drüben — orada/karşıda
  774: "grammar",  // egal — farketmez
  777: "grammar",  // endlich — sonunda
  784: "grammar",  // fast — neredeyse
  790: "grammar",  // erst — ancak/ilk
  791: "grammar",  // etwas — bir şey
  815: "grammar",  // gegenüber — karşısında
  817: "grammar",  // genug — yeterli
  820: "grammar",  // hatte — vardı
  821: "grammar",  // herein — içeri
  828: "grammar",  // hin — yöne doğru
  829: "grammar",  // hinter — arkasında
  833: "grammar",  // her — buraya
  834: "grammar",  // heraus — dışarı
  843: "grammar",  // jeder — her
  844: "grammar",  // jemand — birisi
  863: "grammar",  // mal — bir kez/sadece
  867: "grammar",  // manch — bazı
  868: "grammar",  // manchmal → zaten time
  874: "grammar",  // mindestens — en az
  879: "grammar",  // natürlich → opinion
  882: "grammar",  // nebenan — yan kapı
  885: "grammar",  // obwohl — karşın
  886: "grammar",  // ohne — olmadan
  888: "grammar",  // ohnehin — zaten
  926: "grammar",  // seit — beri
  944: "grammar",  // schon — zaten/artık
  957: "grammar",  // so — böyle/çok
  972: "grammar",  // trotzdem — yine de
  975: "grammar",  // überall — her yerde
  976: "grammar",  // überhaupt — genel olarak/hiç
  983: "grammar",  // ungefähr — yaklaşık
  987: "grammar",  // unter — altında
  997: "grammar",  // von — dan/den
  998: "grammar",  // vor — önünde
  1037: "grammar", // vorn — ön
  1042: "grammar", // vorwärts — ileri
  1057: "grammar", // wenn — eğer
  1058: "grammar", // wechseln → extra
  1061: "grammar", // weg — uzakta
  1066: "grammar", // wieder — tekrar
  1073: "grammar", // wirklich → opinion
  1074: "grammar", // weil — çünkü
  1079: "grammar", // wenigstens — en azından
  1081: "grammar", // zuerst — önce
  1082: "grammar", // könnt
  1085: "grammar", // zuletzt — en son
};

// Uygula
WORDS.forEach(w => {
  if (A2_CAT_MAP[w.id]) {
    w.category = A2_CAT_MAP[w.id];
  }
});
