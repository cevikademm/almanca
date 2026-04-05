// =============================================
// GÜNLÜK HAYAT KONUŞMA KALIPLARI — GENİŞLETİLMİŞ
// Her senaryo 8-10 kullanıcı adımı
// =============================================

const CONVERSATIONS = [
  {
    id: 'cafe',
    title: 'Kafede Sipariş',
    icon: '☕',
    color: '#8B5E3C',
    bg: '#FFF8F0',
    level: 'A1',
    situation: 'Bir kafede oturuyorsun. Garson sana geliyor. Kahve iç, kruvasan yemek ve hesabı ödemek istiyorsun.',
    npcName: 'Kellner (Garson)',
    npcEmoji: '🧑‍🍳',
    turns: [
      { speaker: 'npc', text: 'Guten Morgen! Willkommen! Ist der Platz noch frei?', translation: 'Günaydın! Hoş geldiniz! Yer hâlâ boş mu?' },
      { speaker: 'user', options: [
        { text: 'Ja, bitte! Ich setze mich hier hin.', translation: 'Evet, lütfen! Buraya oturuyorum.', correct: true, feedback: '"Ich setze mich" = oturuyorum. Çok doğal!' },
        { text: 'Nein, besetzt.', translation: 'Hayır, dolu.', correct: false, feedback: 'Yer boşsa "Ja, bitte!" de.' },
        { text: 'Ich weiß nicht.', translation: 'Bilmiyorum.', correct: false, feedback: '"Ja, bitte" veya "Nein, der Platz ist reserviert" de.' }
      ]},
      { speaker: 'npc', text: 'Was möchten Sie trinken?', translation: 'Ne içmek istersiniz?' },
      { speaker: 'user', options: [
        { text: 'Ich möchte einen Cappuccino, bitte.', translation: 'Bir kapuçino istiyorum, lütfen.', correct: true, feedback: '"Ich möchte" = istiyorum. Kahve siparişinin en doğal ifadesi!' },
        { text: 'Kaffee gut.', translation: 'Kahve iyi.', correct: false, feedback: '"Kaffee gut" grammatik değil. "Einen Kaffee bitte" de.' },
        { text: 'Haben Sie Tee?', translation: 'Çayınız var mı?', correct: true, feedback: '"Haben Sie...?" = var mı? İçecek sormak için doğru kalıp!' }
      ]},
      { speaker: 'npc', text: 'Großer oder kleiner Cappuccino?', translation: 'Büyük mü küçük mü kapuçino?' },
      { speaker: 'user', options: [
        { text: 'Groß bitte, ich bin sehr müde heute.', translation: 'Büyük lütfen, bugün çok yorgunum.', correct: true, feedback: '"Ich bin sehr müde" = çok yorgunum. Sohbeti zenginleştirdin!' },
        { text: 'Klein, danke.', translation: 'Küçük, teşekkürler.', correct: true, feedback: 'Kısa ve net! "Danke" eklemen çok kibar.' },
        { text: 'Alles ist gut.', translation: 'Her şey iyi.', correct: false, feedback: '"Groß" (büyük) veya "Klein" (küçük) de.' }
      ]},
      { speaker: 'npc', text: 'Möchten Sie auch etwas essen? Wir haben frische Croissants.', translation: 'Bir şey de yemek ister misiniz? Taze kruasanımız var.' },
      { speaker: 'user', options: [
        { text: 'Ja, ein Croissant bitte. Ist es mit Butter oder Marmelade?', translation: 'Evet, bir kruasan lütfen. Tereyağlı mı reçelli mi?', correct: true, feedback: 'Sipariş verdin ve detay sordun. Harika konuşma akışı!' },
        { text: 'Nein danke, ich habe keinen Hunger.', translation: 'Hayır teşekkürler, açım değil.', correct: true, feedback: '"Keinen Hunger" = açlık yok. Kibarca reddettın!' },
        { text: 'Was kostet das?', translation: 'Ne kadar?', correct: true, feedback: 'Fiyat sormak mantıklı! "Was kostet ein Croissant?" de.' }
      ]},
      { speaker: 'npc', text: 'Beides! Mit Butter und Marmelade. Es kostet zwei Euro fünfzig.', translation: 'İkisi de! Tereyağı ve reçel. İki euro elli sent.' },
      { speaker: 'user', options: [
        { text: 'Super, dann nehme ich das.', translation: 'Harika, o zaman onu alıyorum.', correct: true, feedback: '"Dann nehme ich das" = o zaman onu alıyorum. Çok doğal karar ifadesi!' },
        { text: 'Das ist zu teuer.', translation: 'Bu çok pahalı.', correct: false, feedback: '2,50€ kruasan için normal. "Ja bitte" de.' },
        { text: 'Ich mag keine Marmelade.', translation: 'Reçeli sevmiyorum.', correct: true, feedback: '"Ich mag keine Marmelade" = reçeli sevmiyorum. Tercihini belirttin!' }
      ]},
      { speaker: 'npc', text: 'Sehr gerne. Noch etwas?', translation: 'Tabii ki. Başka bir şey?' },
      { speaker: 'user', options: [
        { text: 'Nein danke, das ist alles.', translation: 'Hayır teşekkürler, hepsi bu kadar.', correct: true, feedback: '"Das ist alles" = hepsi bu kadar. Klasik restoran/kafe ifadesi!' },
        { text: 'Ja, ein Glas Wasser bitte.', translation: 'Evet, bir bardak su lütfen.', correct: true, feedback: 'Su istemek çok normal! "Ein Glas Wasser" = bir bardak su.' },
        { text: 'Noch einen Cappuccino.', translation: 'Bir kapuçino daha.', correct: true, feedback: '"Noch einen" = bir tane daha. Tekrar sipariş için ideal!' }
      ]},
      { speaker: 'npc', text: 'Gerne! Das Essen kommt gleich. Hier ist eine Zeitung, falls Sie warten möchten.', translation: 'Tabii! Yemek hemen gelecek. Beklemek isterseniz işte bir gazete.' },
      { speaker: 'user', options: [
        { text: 'Oh danke, das ist nett von Ihnen.', translation: 'Oh teşekkürler, bu çok nazik sizden.', correct: true, feedback: '"Das ist nett von Ihnen" = bu çok nazik sizden. Harika bir ifade!' },
        { text: 'Ich lese lieber mein Handy.', translation: 'Telefonumu okumayı tercih ederim.', correct: true, feedback: 'Günlük ve dürüst! "Ich schaue lieber auf mein Handy" daha doğal ama anlaşılır.' },
        { text: 'Nein, ich kann nicht lesen.', translation: 'Hayır, okuyamıyorum.', correct: false, feedback: 'Okuyamazsan "Danke, aber nein" de.' }
      ]},
      { speaker: 'npc', text: 'Hat es Ihnen geschmeckt?', translation: 'Yemek nasıldı?' },
      { speaker: 'user', options: [
        { text: 'Ja, sehr lecker! Das Croissant war wunderbar.', translation: 'Evet, çok lezzetliydi! Kruasan harikaydı.', correct: true, feedback: '"Wunderbar" = harikaydı. "War" geçmiş zamanla mükemmel kullanım!' },
        { text: 'Gut, danke. Kann ich die Rechnung haben?', translation: 'İyi, teşekkürler. Hesabı alabilir miyim?', correct: true, feedback: '"Die Rechnung bitte" = hesap lütfen. Kafelerde en sık kullanılan cümle!' },
        { text: 'Es war okay.', translation: 'İdare ederdi.', correct: false, feedback: 'Biraz soğuk. "Es war sehr gut!" veya "Es hat sehr gut geschmeckt!" de.' }
      ]},
      { speaker: 'npc', text: 'Das macht zusammen sechs Euro achtzig. Zahlen Sie bar oder mit Karte?', translation: 'Toplam altı euro seksen. Nakit mi kart mı?' },
      { speaker: 'user', options: [
        { text: 'Mit Karte bitte. Hier.', translation: 'Kartla lütfen. Buyurun.', correct: true, feedback: 'Modern ve pratik ödeme!' },
        { text: 'Bar — hier sind sieben Euro. Stimmt so.', translation: 'Nakit — işte yedi euro. Üstü kalsın.', correct: true, feedback: '"Stimmt so" = üstü kalsın. Almanya\'da çok kullanılan bahşiş ifadesi!' },
        { text: 'Ich habe kein Geld.', translation: 'Param yok.', correct: false, feedback: 'Olamaz! "Mit Karte" veya "Bar" de.' }
      ]}
    ]
  },

  {
    id: 'doctor',
    title: 'Doktorda',
    icon: '🏥',
    color: '#2E86AB',
    bg: '#F0F8FF',
    level: 'A2',
    situation: 'Baş ağrısı, ateş ve yorgunlukla doktora gidiyorsun. Randevu almak, belirtileri anlatmak ve reçete almak istiyorsun.',
    npcName: 'Dr. Müller',
    npcEmoji: '👨‍⚕️',
    turns: [
      { speaker: 'npc', text: 'Guten Morgen! Haben Sie einen Termin?', translation: 'Günaydın! Randevunuz var mı?' },
      { speaker: 'user', options: [
        { text: 'Ja, ich habe einen Termin um 10 Uhr. Mein Name ist Yilmaz.', translation: 'Evet, saat 10\'da randevum var. Adım Yılmaz.', correct: true, feedback: 'Randevu saatini ve ismini söyledin. Mükemmel!' },
        { text: 'Nein, aber ich fühle mich sehr krank.', translation: 'Hayır, ama kendimi çok hasta hissediyorum.', correct: true, feedback: '"Ich fühle mich krank" = kendimi hasta hissediyorum. Acil için geçerli!' },
        { text: 'Was ist ein Termin?', translation: 'Randevu nedir?', correct: false, feedback: '"Termin" = randevu. "Ja, ich habe einen Termin" veya "Nein, leider nicht" de.' }
      ]},
      { speaker: 'npc', text: 'Was sind Ihre Beschwerden?', translation: 'Şikayetleriniz neler?' },
      { speaker: 'user', options: [
        { text: 'Ich habe starke Kopfschmerzen und Fieber seit gestern.', translation: 'Dünden beri şiddetli baş ağrım ve ateşim var.', correct: true, feedback: '"Seit gestern" = dünden beri. Zamanı belirtmek doktora çok yardımcı!' },
        { text: 'Mir ist schlecht und ich bin sehr müde.', translation: 'Midem bulanıyor ve çok yorgunum.', correct: true, feedback: '"Mir ist schlecht" = midem bulanıyor. Önemli semptom ifadesi!' },
        { text: 'Ich bin krank.', translation: 'Hastayım.', correct: false, feedback: 'Çok genel. Belirtilerini say: "Ich habe Kopfschmerzen und Fieber." de.' }
      ]},
      { speaker: 'npc', text: 'Wie hoch ist Ihr Fieber?', translation: 'Ateşiniz kaç?' },
      { speaker: 'user', options: [
        { text: 'Ungefähr 38,5 Grad, habe ich heute Morgen gemessen.', translation: 'Yaklaşık 38,5 derece, bugün sabah ölçtüm.', correct: true, feedback: '"Ich habe gemessen" = ölçtüm (geçmiş zaman). Çok doğru kullanım!' },
        { text: 'Ich weiß nicht genau, ich fühle mich aber sehr heiß.', translation: 'Tam bilmiyorum ama kendimi çok sıcak hissediyorum.', correct: true, feedback: '"Ich fühle mich heiß" = kendimi sıcak hissediyorum. Dürüst cevap!' },
        { text: 'Vielleicht 40 Grad.', translation: 'Belki 40 derece.', correct: false, feedback: 'Kesin bilmiyorsan "Ungefähr" (yaklaşık) de.' }
      ]},
      { speaker: 'npc', text: 'Haben Sie auch Halsschmerzen oder Husten?', translation: 'Boğaz ağrınız ya da öksürüğünüz var mı?' },
      { speaker: 'user', options: [
        { text: 'Ja, ich habe leichten Husten, aber keine Halsschmerzen.', translation: 'Evet, hafif öksürüğüm var ama boğaz ağrım yok.', correct: true, feedback: '"Leicht" = hafif. "Kein" = yok. İkisini de net belirttın!' },
        { text: 'Nein, nur der Kopf tut mir weh.', translation: 'Hayır, sadece başım ağrıyor.', correct: true, feedback: '"Der Kopf tut mir weh" = başım ağrıyor. Çok önemli kalıp!' },
        { text: 'Ich mag nicht husten.', translation: 'Öksürmeyi sevmiyorum.', correct: false, feedback: '"Haben Sie Husten?" sorusuna Ja/Nein ile cevapla.' }
      ]},
      { speaker: 'npc', text: 'Nehmen Sie regelmäßig Medikamente?', translation: 'Düzenli ilaç kullanıyor musunuz?' },
      { speaker: 'user', options: [
        { text: 'Ja, ich nehme täglich ein Blutdruckmittel.', translation: 'Evet, günlük tansiyon ilacı alıyorum.', correct: true, feedback: '"Täglich" = her gün. "Blutdruckmittel" = tansiyon ilacı. Tıbbi Almanca!' },
        { text: 'Nein, normalerweise nicht.', translation: 'Hayır, normalde almıyorum.', correct: true, feedback: '"Normalerweise" = normalde. Doğru ve net!' },
        { text: 'Manchmal Aspirin.', translation: 'Bazen aspirin.', correct: true, feedback: '"Manchmal" = bazen. Kısa ama anlaşılır!' }
      ]},
      { speaker: 'npc', text: 'Ich messe kurz Blutdruck und Temperatur. Bitte machen Sie den Ärmel hoch.', translation: 'Kısaca tansiyon ve ateş ölçeceğim. Lütfen kolunuzu kaldırın.' },
      { speaker: 'user', options: [
        { text: 'Natürlich. Bitte.', translation: 'Tabii ki. Buyurun.', correct: true, feedback: 'Kısa ve işbirlikçi. Doktora en iyi cevap!' },
        { text: 'Tut das weh?', translation: 'Acıyor mu?', correct: true, feedback: '"Tut das weh?" = acıyor mu? Endişeni dile getirmek çok normal!' },
        { text: 'Ich habe Angst vor Spritzen.', translation: 'Enjeksiyondan korkuyorum.', correct: false, feedback: 'Tansiyon ölçmek enjeksiyon değil! "Natürlich" de.' }
      ]},
      { speaker: 'npc', text: 'Blutdruck ist normal. Temperatur 38,7 Grad. Sie haben eine leichte Grippe. Ich schreibe Ihnen ein Rezept.', translation: 'Tansiyon normal. Ateş 38,7 derece. Hafif grip geçiriyorsunuz. Reçete yazıyorum.' },
      { speaker: 'user', options: [
        { text: 'Was soll ich nehmen? Und wie oft?', translation: 'Ne almalıyım? Ve günde kaç kez?', correct: true, feedback: '"Wie oft?" = kaç kez? İlaç için en kritik soru!' },
        { text: 'Muss ich ins Krankenhaus?', translation: 'Hastaneye gitmem gerekiyor mu?', correct: true, feedback: '"Muss ich...?" = ...gerekiyor mu? Endişeni dile getirmek doğal.' },
        { text: 'Grippe ist nicht gefährlich.', translation: 'Grip tehlikeli değil.', correct: false, feedback: 'Doktor karar verir. "Was empfehlen Sie?" de.' }
      ]},
      { speaker: 'npc', text: 'Ibuprofen dreimal täglich nach dem Essen. Trinken Sie viel Wasser und schlafen Sie viel.', translation: 'İbuprofen günde üç kez yemekten sonra. Bol su için ve çok uyuyun.' },
      { speaker: 'user', options: [
        { text: 'Wie lange werde ich krank sein?', translation: 'Ne kadar süre hasta kalacağım?', correct: true, feedback: '"Wie lange werde ich...?" = ne kadar süre ...olacağım? Gelecek zaman sorusu!' },
        { text: 'Brauche ich eine Krankmeldung für die Arbeit?', translation: 'İş için hastalık raporu gerekiyor mu?', correct: true, feedback: '"Krankmeldung" = hastalık raporu. Almanya\'da çok önemli belge!' },
        { text: 'Ich nehme keine Medikamente.', translation: 'İlaç almıyorum.', correct: false, feedback: 'Doktor önerdi. "Danke. Wie lange soll ich sie nehmen?" de.' }
      ]},
      { speaker: 'npc', text: 'Circa 5-7 Tage. Kommen Sie wieder, wenn es nicht besser wird. Gute Besserung!', translation: 'Yaklaşık 5-7 gün. İyileşmezse tekrar gelin. Geçmiş olsun!' },
      { speaker: 'user', options: [
        { text: 'Vielen Dank, Herr Doktor. Auf Wiedersehen!', translation: 'Çok teşekkürler, doktor bey. Hoşça kalın!', correct: true, feedback: '"Herr Doktor" = doktor bey. Resmi hitap şekli!' },
        { text: 'Danke! Hoffentlich werde ich schnell besser.', translation: 'Teşekkürler! Umarım çabuk iyileşirim.', correct: true, feedback: '"Hoffentlich" = umarım. "Ich werde besser" = iyileşirim. Harika cümle!' },
        { text: 'Tschüss, und danke.', translation: 'Görüşürüz ve teşekkürler.', correct: false, feedback: '"Tschüss" doktora çok gayri resmi. "Auf Wiedersehen" veya "Danke sehr" de.' }
      ]}
    ]
  },

  {
    id: 'station',
    title: 'İstasyonda Bilet',
    icon: '🚂',
    color: '#E63946',
    bg: '#FFF5F5',
    level: 'A1',
    situation: 'Tren istasyonundasın. Berlin\'e bilet almak, tren saatini öğrenmek ve peronu bulmak istiyorsun.',
    npcName: 'Bahnmitarbeiter (Görevli)',
    npcEmoji: '🎫',
    turns: [
      { speaker: 'npc', text: 'Guten Tag, wie kann ich Ihnen helfen?', translation: 'İyi günler, nasıl yardımcı olabilirim?' },
      { speaker: 'user', options: [
        { text: 'Ich möchte eine Fahrkarte nach Berlin kaufen.', translation: 'Berlin\'e bilet almak istiyorum.', correct: true, feedback: '"Fahrkarte" = bilet, "kaufen" = satın almak. İstasyonda temel kelimeler!' },
        { text: 'Wann fährt der nächste Zug nach Berlin?', translation: 'Berlin\'e en yakın tren ne zaman?', correct: true, feedback: '"Wann fährt...?" = ne zaman gidiyor? Önce saat sormak da mantıklı!' },
        { text: 'Ich suche Berlin.', translation: 'Berlin arıyorum.', correct: false, feedback: '"Ich suche" burada tuhaf. "Ich möchte nach Berlin fahren" de.' }
      ]},
      { speaker: 'npc', text: 'Wann möchten Sie fahren — heute oder morgen?', translation: 'Ne zaman gitmek istiyorsunuz — bugün mü yoksa yarın mı?' },
      { speaker: 'user', options: [
        { text: 'Heute Nachmittag, wenn möglich so früh wie möglich.', translation: 'Bugün öğleden sonra, mümkünse en erken.', correct: true, feedback: '"So früh wie möglich" = mümkün olduğunca erken. Çok kullanışlı ifade!' },
        { text: 'Morgen früh um 8 Uhr.', translation: 'Yarın sabah saat 8\'de.', correct: true, feedback: '"Morgen früh" = yarın sabah. Saat belirterek konuştun. Harika!' },
        { text: 'Schnell bitte.', translation: 'Hızlı lütfen.', correct: false, feedback: 'Bugün mü yarın mı? "Heute" veya "Morgen" de.' }
      ]},
      { speaker: 'npc', text: 'Es gibt einen Zug um 14:32 Uhr. Er kommt um 17:15 in Berlin an.', translation: '14:32\'de bir tren var. Berlin\'e 17:15\'te varır.' },
      { speaker: 'user', options: [
        { text: 'Perfekt! Muss ich umsteigen?', translation: 'Mükemmel! Aktarma yapmam gerekiyor mu?', correct: true, feedback: '"Umsteigen" = aktarma yapmak. İstasyonda çok önemli kelime!' },
        { text: 'Das ist zu spät. Gibt es einen früheren Zug?', translation: 'Bu çok geç. Daha erken bir tren var mı?', correct: true, feedback: '"Einen früheren Zug" = daha erken bir tren. Alternatif istemek harika!' },
        { text: 'Okay, Berlin ist schön.', translation: 'Tamam, Berlin güzel.', correct: false, feedback: 'Konu dışı! "Der Zug ist gut" veya "Muss ich umsteigen?" de.' }
      ]},
      { speaker: 'npc', text: 'Nein, direkter Zug. Erste oder zweite Klasse?', translation: 'Hayır, direkt tren. Birinci mi ikinci sınıf mı?' },
      { speaker: 'user', options: [
        { text: 'Zweite Klasse, bitte. Was kostet das?', translation: 'İkinci sınıf, lütfen. Ne kadar?', correct: true, feedback: 'Seçim yaptın ve fiyat sordun. Pratik!' },
        { text: 'Was ist der Unterschied im Preis?', translation: 'Fiyat farkı nedir?', correct: true, feedback: '"Der Unterschied" = fark. Bilinçli tüketici!' },
        { text: 'Erste Klasse immer.', translation: 'Her zaman birinci sınıf.', correct: false, feedback: 'Güzel ama fiyatı da sor! "Was kostet erste Klasse?" de.' }
      ]},
      { speaker: 'npc', text: 'Zweite Klasse kostet 49 Euro. Mit BahnCard 25 nur 37 Euro.', translation: 'İkinci sınıf 49 Euro. BahnCard 25 ile sadece 37 Euro.' },
      { speaker: 'user', options: [
        { text: 'Ich habe keine BahnCard. Dann 49 Euro bitte.', translation: 'BahnCard\'ım yok. O zaman 49 Euro lütfen.', correct: true, feedback: '"Dann" = o zaman. Durumu açıkladın ve karar verdin.' },
        { text: 'Was ist eine BahnCard?', translation: 'BahnCard nedir?', correct: true, feedback: 'Bilmiyorsan sor! BahnCard = Deutsche Bahn indirim kartı.' },
        { text: 'Das ist zu teuer!', translation: 'Bu çok pahalı!', correct: false, feedback: 'Berlin için 49€ makul. "Gibt es einen Rabatt?" de daha kibar.' }
      ]},
      { speaker: 'npc', text: 'Möchten Sie Hin- und Rückfahrt oder nur einfache Fahrt?', translation: 'Gidiş-dönüş mü yoksa sadece gidiş mi?' },
      { speaker: 'user', options: [
        { text: 'Nur einfache Fahrt, ich komme mit dem Flugzeug zurück.', translation: 'Sadece gidiş, uçakla döneceğim.', correct: true, feedback: '"Ich komme zurück" = döneceğim. Nedenini açıklaman çok doğal!' },
        { text: 'Hin- und Rückfahrt bitte. Wann fährt der letzte Zug zurück?', translation: 'Gidiş-dönüş lütfen. Son tren ne zaman döner?', correct: true, feedback: '"Letzte Zug" = son tren. Dönüş için de düşündün!' },
        { text: 'Ich weiß nicht.', translation: 'Bilmiyorum.', correct: false, feedback: 'Berlin\'den ne zaman döneceğini düşün. "Einfache Fahrt" veya "Hin und Zurück" de.' }
      ]},
      { speaker: 'npc', text: 'Alles klar. Möchten Sie einen Sitzplatz reservieren? Es kostet vier Euro extra.', translation: 'Peki. Koltuk rezervasyonu ister misiniz? 4 Euro ek ücret.' },
      { speaker: 'user', options: [
        { text: 'Ja bitte, am Fenster wenn möglich.', translation: 'Evet lütfen, mümkünse pencere kenarı.', correct: true, feedback: '"Am Fenster" = pencere kenarı. "Wenn möglich" = mümkünse. Harika tercih!' },
        { text: 'Nein danke, das ist nicht nötig.', translation: 'Hayır teşekkürler, gerekli değil.', correct: true, feedback: '"Das ist nicht nötig" = gerekli değil. Net ve kibar.' },
        { text: 'Ich sitze gerne überall.', translation: 'Her yerde oturmaktan hoşlanırım.', correct: false, feedback: '"Ja" veya "Nein, danke" de.' }
      ]},
      { speaker: 'npc', text: 'Hier ist Ihr Ticket. Gleis 7, Abfahrt 14:32. Gute Reise!', translation: 'İşte biletiniz. 7. peron, kalkış 14:32. İyi yolculuklar!' },
      { speaker: 'user', options: [
        { text: 'Vielen Dank! Wo ist Gleis 7 bitte?', translation: 'Çok teşekkürler! 7. peron nerede lütfen?', correct: true, feedback: '"Wo ist Gleis...?" = peron nerede? İstasyonda en çok sorulan soru!' },
        { text: 'Danke! Wieviel Zeit habe ich noch?', translation: 'Teşekkürler! Ne kadar vaktim kaldı?', correct: true, feedback: '"Wieviel Zeit habe ich noch?" = ne kadar vaktim kaldı? Pratik soru!' },
        { text: 'Auf Wiedersehen und tschüss.', translation: 'Hoşça kalın ve görüşürüz.', correct: false, feedback: 'Peronun nerede olduğunu sormadan gitme! "Wo ist Gleis 7?" de.' }
      ]}
    ]
  },

  {
    id: 'hotel',
    title: 'Otelde Check-in',
    icon: '🏨',
    color: '#6B4226',
    bg: '#FFFBF5',
    level: 'A2',
    situation: 'Seyahatte bir otele geliyorsun. Rezervasyonun var, ama birkaç isteğin de var: pencere kenarı oda, erken check-in gibi.',
    npcName: 'Rezeptionist (Resepsiyonist)',
    npcEmoji: '🛎️',
    turns: [
      { speaker: 'npc', text: 'Herzlich willkommen! Haben Sie eine Reservierung?', translation: 'Hoş geldiniz! Rezervasyonunuz var mı?' },
      { speaker: 'user', options: [
        { text: 'Ja, auf den Namen Yilmaz. Für zwei Nächte.', translation: 'Evet, Yılmaz adına. İki gece için.', correct: true, feedback: '"Auf den Namen..." = ...adına. Rezervasyon için standart ifade!' },
        { text: 'Ich habe online gebucht.', translation: 'Online rezervasyon yaptım.', correct: true, feedback: '"Ich habe gebucht" = rezervasyon yaptım (geçmiş zaman). Doğru!' },
        { text: 'Ja, ich brauche ein Zimmer.', translation: 'Evet, bir odaya ihtiyacım var.', correct: false, feedback: 'Rezervasyonun var! "Ich habe eine Reservierung, mein Name ist..." de.' }
      ]},
      { speaker: 'npc', text: 'Einen Moment bitte... Ah ja, Herr Yilmaz. Ein Einzelzimmer, zwei Nächte. Stimmt das?', translation: 'Bir saniye lütfen... Ah evet, Bay Yılmaz. Bir kişilik oda, iki gece. Doğru mu?' },
      { speaker: 'user', options: [
        { text: 'Ja, genau. Kann ich ein Zimmer mit Aussicht bekommen?', translation: 'Evet, kesinlikle. Manzaralı bir oda alabilir miyim?', correct: true, feedback: '"Mit Aussicht" = manzaralı. Kibar ve özgüvenli istek!' },
        { text: 'Ja stimmt. Wann ist Check-out?', translation: 'Evet doğru. Check-out ne zaman?', correct: true, feedback: '"Check-out" Almancada da kullanılır. Pratik soru!' },
        { text: 'Nein, ich möchte ein Doppelzimmer.', translation: 'Hayır, çift kişilik oda istiyorum.', correct: false, feedback: 'Rezervasyonun tek kişilik. "Ja stimmt" veya sorun varsa söyle.' }
      ]},
      { speaker: 'npc', text: 'Natürlich. Ich versuche ein Zimmer im dritten Stock mit Stadtblick zu geben.', translation: 'Tabii ki. Üçüncü katta şehir manzaralı oda vermeyi deneyeceğim.' },
      { speaker: 'user', options: [
        { text: 'Das wäre wunderbar. Vielen Dank!', translation: 'Bu harika olurdu. Çok teşekkürler!', correct: true, feedback: '"Das wäre wunderbar" = bu harika olurdu. Koşullu kip harika kullanım!' },
        { text: 'Gibt es auch einen Aufzug?', translation: 'Asansör de var mı?', correct: true, feedback: '"Aufzug" = asansör. Üçüncü katta önemli!' },
        { text: 'Das ist nicht wichtig.', translation: 'Bu önemli değil.', correct: false, feedback: 'Az önce istedin! "Danke, das ist sehr nett" de.' }
      ]},
      { speaker: 'npc', text: 'Darf ich Ihren Ausweis und Ihre Kreditkarte sehen?', translation: 'Kimliğinizi ve kredi kartınızı görebilir miyim?' },
      { speaker: 'user', options: [
        { text: 'Natürlich, hier bitte.', translation: 'Tabii ki, buyurun.', correct: true, feedback: 'Kısa ve hazırlıklı. Hızlı check-in!' },
        { text: 'Einen Moment, ich suche meinen Ausweis.', translation: 'Bir saniye, kimliğimi arıyorum.', correct: true, feedback: '"Ich suche" = arıyorum. Dürüst ve doğal!' },
        { text: 'Warum brauchen Sie das?', translation: 'Neden buna ihtiyaç var?', correct: false, feedback: 'Otellerde kimlik göstermek zorunlu. "Natürlich" de.' }
      ]},
      { speaker: 'npc', text: 'Danke schön. Das Frühstück ist täglich von 7 bis 10 Uhr im Erdgeschoss.', translation: 'Çok teşekkürler. Kahvaltı her gün 7\'den 10\'a kadar zemin katta.' },
      { speaker: 'user', options: [
        { text: 'Ist das Frühstück im Preis inklusive?', translation: 'Kahvaltı fiyata dahil mi?', correct: true, feedback: '"Im Preis inklusive" = fiyata dahil. Önemli ve akıllı soru!' },
        { text: 'Ich stehe nicht früh auf. Gibt es Roomservice?', translation: 'Erken kalkmıyorum. Oda servisi var mı?', correct: true, feedback: '"Roomservice" = oda servisi. Günlük hayatta çok kullanışlı!' },
        { text: 'Ich esse morgens nichts.', translation: 'Sabahları hiçbir şey yemiyorum.', correct: false, feedback: 'Kişisel bilgi ama "Danke für die Information" daha uygun.' }
      ]},
      { speaker: 'npc', text: 'Ja, Frühstück ist inklusive. Haben Sie noch andere Fragen?', translation: 'Evet, kahvaltı dahil. Başka sorunuz var mı?' },
      { speaker: 'user', options: [
        { text: 'Ja, gibt es WLAN im Zimmer? Und wie ist das Passwort?', translation: 'Evet, odada Wi-Fi var mı? Şifre nedir?', correct: true, feedback: '"WLAN" = Wi-Fi. "Wie ist das Passwort?" = şifre nedir? Günümüzde şart!' },
        { text: 'Gibt es einen Parkplatz?', translation: 'Otopark var mı?', correct: true, feedback: '"Parkplatz" = otopark. Arabayla geldiniz demek!' },
        { text: 'Nein, alles gut.', translation: 'Hayır, her şey tamam.', correct: true, feedback: 'Tamam dediysen WLAN şifresini sormayı unutma!' }
      ]},
      { speaker: 'npc', text: 'Ja, WLAN ist kostenlos. Das Passwort steht auf dieser Karte. Ihr Zimmer ist 312.', translation: 'Evet, Wi-Fi ücretsiz. Şifre bu kartta yazıyor. Odanız 312.' },
      { speaker: 'user', options: [
        { text: 'Perfekt! Wie spät ist es und kann ich jetzt einchecken?', translation: 'Mükemmel! Saat kaç ve şimdi check-in yapabilir miyim?', correct: true, feedback: '"Kann ich jetzt einchecken?" = check-in yapabilir miyim? Tam zamanında soru!' },
        { text: 'Danke! Gibt es einen Safe im Zimmer?', translation: 'Teşekkürler! Odada kasa var mı?', correct: true, feedback: '"Safe" = kasa. Değerli eşyalar için önemli!' },
        { text: 'Zimmer 312, zweiter Stock?', translation: 'Oda 312, ikinci kat?', correct: false, feedback: 'Az önce üçüncü katta dedi! "Dritter Stock" de ya da onaylayarak sor.' }
      ]},
      { speaker: 'npc', text: 'Natürlich, hier ist Ihr Schlüssel. Der Aufzug ist rechts. Angenehmen Aufenthalt!', translation: 'Tabii ki, işte anahtarınız. Asansör sağda. Keyifli konaklamalar!' },
      { speaker: 'user', options: [
        { text: 'Vielen Dank! Ach, noch eine Frage: Gibt es einen Wäscheservice?', translation: 'Çok teşekkürler! Ah, bir sorum daha: Çamaşır servisi var mı?', correct: true, feedback: '"Wäscheservice" = çamaşır servisi. "Ach, noch eine Frage" = ah, bir sorum daha. Doğal!' },
        { text: 'Danke sehr! Schönen Tag noch!', translation: 'Çok teşekkürler! Güzel günler!', correct: true, feedback: '"Schönen Tag noch" = güzel günler. Sıcak ve kibar kapanış!' },
        { text: 'Okay tschüss.', translation: 'Tamam görüşürüz.', correct: false, feedback: '"Auf Wiedersehen" veya "Danke sehr!" daha uygun.' }
      ]}
    ]
  },

  {
    id: 'meeting',
    title: 'Yeni Biriyle Tanışma',
    icon: '🤝',
    color: '#2D6A4F',
    bg: '#F0FFF4',
    level: 'A1',
    situation: 'Dil kursunda yeni biriyle tanışıyorsun. Birbirinizi tanıyacak, hobiler ve Almanya\'ya neden geldiğinizi konuşacaksınız.',
    npcName: 'Emma (Sınıf arkadaşın)',
    npcEmoji: '👩‍🎓',
    turns: [
      { speaker: 'npc', text: 'Hallo! Der Platz neben dir ist noch frei, oder? Darf ich mich setzen?', translation: 'Merhaba! Yanındaki yer hâlâ boş, değil mi? Oturabilir miyim?' },
      { speaker: 'user', options: [
        { text: 'Ja natürlich, bitte! Ich bin Cem.', translation: 'Evet tabii, buyur! Ben Cem.', correct: true, feedback: 'Yer verdin ve ismini söyledin. Harika başlangıç!' },
        { text: 'Ja, kein Problem. Setz dich!', translation: 'Evet, sorun yok. Otur!', correct: true, feedback: '"Kein Problem" = sorun yok. Rahat ve arkadaşça!' },
        { text: 'Der Platz ist besetzt.', translation: 'Yer dolu.', correct: false, feedback: 'Yer boş! "Ja, bitte" de ve yeni bir arkadaş edin.' }
      ]},
      { speaker: 'npc', text: 'Danke! Ich bin Emma. Bist du auch neu hier?', translation: 'Teşekkürler! Ben Emma. Sen de burada yeni misin?' },
      { speaker: 'user', options: [
        { text: 'Ja, ich bin erst seit zwei Wochen hier. Und du?', translation: 'Evet, burada sadece iki haftadır. Ya sen?', correct: true, feedback: '"Erst seit" = sadece ...den beri. "Und du?" ile karşılık sordun. Süper!' },
        { text: 'Nein, ich bin schon seit einem Jahr hier.', translation: 'Hayır, bir yıldır buradayım.', correct: true, feedback: '"Seit einem Jahr" = bir yıldır. Güzel zaman ifadesi!' },
        { text: 'Ich heiße Cem.', translation: 'Adım Cem.', correct: false, feedback: '"Bist du neu?" sorusuna evet/hayır ile cevap ver, sonra ismini de söyleyebilirsin.' }
      ]},
      { speaker: 'npc', text: 'Woher kommst du?', translation: 'Nerelisin?' },
      { speaker: 'user', options: [
        { text: 'Aus der Türkei, aus Istanbul. Und du, Emma?', translation: 'Türkiye\'den, İstanbul\'dan. Sen, Emma?', correct: true, feedback: '"Und du?" ile sohbeti devam ettirdin. Sosyal beceri!' },
        { text: 'Ich komme aus der Türkei. Istanbul ist meine Heimatstadt.', translation: 'Türkiye\'den geliyorum. İstanbul benim memleketiim.', correct: true, feedback: '"Heimatstadt" = memleket/doğduğun şehir. Güzel kelime!' },
        { text: 'Türkei.', translation: 'Türkiye.', correct: false, feedback: 'Biraz kısa. "Ich komme aus der Türkei" de.' }
      ]},
      { speaker: 'npc', text: 'Oh cool! Ich komme aus Schweden. Warum lernst du Deutsch?', translation: 'Oh harika! Ben İsveç\'ten geliyorum. Neden Almanca öğreniyorsun?' },
      { speaker: 'user', options: [
        { text: 'Ich lerne Deutsch wegen der Arbeit. Ich möchte hier arbeiten.', translation: 'İş için Almanca öğreniyorum. Burada çalışmak istiyorum.', correct: true, feedback: '"Wegen" = nedeniyle. "Ich möchte hier arbeiten" = burada çalışmak istiyorum. Süper!' },
        { text: 'Weil mir die Sprache gefällt. Sie klingt interessant!', translation: 'Çünkü dili beğeniyorum. İlginç geliyor!', correct: true, feedback: '"Sie klingt interessant" = ilginç geliyor. "Klingen" = kulağa gelmek. Harika!' },
        { text: 'Weil Deutsch einfach ist.', translation: 'Çünkü Almanca kolay.', correct: false, feedback: 'Almanca kolay değil! "Weil ich in Deutschland leben möchte" de.' }
      ]},
      { speaker: 'npc', text: 'Ich auch! Was machst du beruflich?', translation: 'Ben de! Mesleki olarak ne yapıyorsun?' },
      { speaker: 'user', options: [
        { text: 'Ich bin Ingenieur. Ich arbeite bei einer IT-Firma. Und du?', translation: 'Mühendisim. Bir IT şirketinde çalışıyorum. Sen?', correct: true, feedback: '"Und du?" = peki sen? Sohbeti karşılıklı tutuyorsun. Bravo!' },
        { text: 'Ich studiere noch. Ich bin Student.', translation: 'Hâlâ okuyorum. Öğrenciyim.', correct: true, feedback: '"Ich studiere noch" = hâlâ okuyorum. "Noch" = hâlâ!' },
        { text: 'Das ist privat.', translation: 'Bu kişisel.', correct: false, feedback: 'Mesleğini paylaşmaktan çekinme. "Ich bin..." de.' }
      ]},
      { speaker: 'npc', text: 'Cool! Ich bin Designerin. Hast du schon Freunde hier in der Stadt?', translation: 'Harika! Ben tasarımcıyım. Burada şehirde arkadaşın var mı?' },
      { speaker: 'user', options: [
        { text: 'Noch nicht viele. Deswegen bin ich froh, dich kennenzulernen!', translation: 'Henüz fazla yok. Bu yüzden seni tanımaktan memnunum!', correct: true, feedback: '"Deswegen" = bu yüzden. "Ich bin froh" = memnunum. Çok samimi!' },
        { text: 'Ja, ich habe ein paar Freunde vom Kurs.', translation: 'Evet, kurstan birkaç arkadaşım var.', correct: true, feedback: '"Ein paar" = birkaç. Güzel ifade!' },
        { text: 'Nein, ich brauche keine Freunde.', translation: 'Hayır, arkadaşa ihtiyacım yok.', correct: false, feedback: 'Bu çok soğuk! "Noch nicht viele" de.' }
      ]},
      { speaker: 'npc', text: 'Was machst du in deiner Freizeit gerne?', translation: 'Boş zamanında ne yapmayı seversin?' },
      { speaker: 'user', options: [
        { text: 'Ich lese gerne und gehe oft ins Kino. Und du?', translation: 'Okumayı severim ve sık sık sinemaya giderim. Sen?', correct: true, feedback: '"Gern" + fiil = ...yapmayı sevmek. "Oft" = sık sık. Harika hobi ifadesi!' },
        { text: 'Ich mache Sport, vor allem Fußball. Magst du Sport?', translation: 'Spor yapıyorum, özellikle futbol. Spor sever misin?', correct: true, feedback: '"Vor allem" = özellikle. "Magst du?" = sever misin? Sohbet açıcı!' },
        { text: 'Ich schlafe gerne.', translation: 'Uyumayı severim.', correct: false, feedback: 'Dürüst ama hobi gibi değil. "Ich lese gerne" veya "Ich höre Musik" de.' }
      ]},
      { speaker: 'npc', text: 'Oh, ich gehe auch gerne ins Kino! Wollen wir mal zusammen gehen?', translation: 'Oh, ben de sinemaya gitmekten hoşlanırım! Bir gün birlikte gidelim mi?' },
      { speaker: 'user', options: [
        { text: 'Ja, sehr gerne! Hast du eine Handynummer, damit wir uns verabreden können?', translation: 'Evet, çok memnuniyetle! Buluşabilmemiz için telefon numaran var mı?', correct: true, feedback: '"Damit wir uns verabreden können" = buluşabilmek için. Harika bağlaç kullanımı!' },
        { text: 'Gerne! Hier ist meine Nummer.', translation: 'Memnuniyetle! İşte numaram.', correct: true, feedback: '"Hier ist meine Nummer" = işte numaram. Pratik ve doğal!' },
        { text: 'Nein, ich gehe lieber alleine.', translation: 'Hayır, yalnız gitmeyi tercih ederim.', correct: false, feedback: 'Yeni arkadaşınla gitme şansını kaçırıyorsun! "Ja, gerne!" de.' }
      ]}
    ]
  },

  {
    id: 'supermarket',
    title: 'Süpermarkette',
    icon: '🛒',
    color: '#457B9D',
    bg: '#F0F8FF',
    level: 'A1',
    situation: 'Haftalık alışverişini yapıyorsun. Bir ürünü bulamıyor, kasada indirim sormak ve ödeme yapmak istiyorsun.',
    npcName: 'Verkäufer (Görevli)',
    npcEmoji: '🏪',
    turns: [
      { speaker: 'npc', text: 'Guten Tag! Brauchen Sie Hilfe?', translation: 'İyi günler! Yardıma ihtiyacınız var mı?' },
      { speaker: 'user', options: [
        { text: 'Ja, bitte. Wo finde ich die Milch?', translation: 'Evet, lütfen. Sütü nerede bulabilirim?', correct: true, feedback: '"Wo finde ich...?" = nerede bulabilirim? Süpermarkette en kullanışlı soru!' },
        { text: 'Ich suche Käse. In welchem Gang?', translation: 'Peynir arıyorum. Hangi koridorda?', correct: true, feedback: '"In welchem Gang?" = hangi koridorda? Süpermarkette çok pratik!' },
        { text: 'Nein danke, alles gut.', translation: 'Hayır teşekkürler, her şey iyi.', correct: false, feedback: 'Yardım lazım! "Ja, bitte" de.' }
      ]},
      { speaker: 'npc', text: 'Die Milch ist im Gang vier, bei den Kühlprodukten.', translation: 'Süt dördüncü koridorda, soğutulmuş ürünlerin yanında.' },
      { speaker: 'user', options: [
        { text: 'Danke! Gang vier. Und wo ist die Butter?', translation: 'Teşekkürler! Dördüncü koridor. Peki tereyağı nerede?', correct: true, feedback: 'Bilgiyi tekrarladın ve başka soru sordun. Süper!' },
        { text: 'Entschuldigung, können Sie das wiederholen? Welcher Gang?', translation: 'Özür dilerim, tekrar eder misiniz? Hangi koridor?', correct: true, feedback: '"Können Sie das wiederholen?" = tekrar eder misiniz? Duyamadıysan sormak çok doğal!' },
        { text: 'Ich mag keine Milch.', translation: 'Sütü sevmiyorum.', correct: false, feedback: 'Süt alacaktın! "Danke, Gang vier" de.' }
      ]},
      { speaker: 'npc', text: 'Butter ist auch im Gang vier, direkt neben der Milch.', translation: 'Tereyağı da dördüncü koridorda, tam sütün yanında.' },
      { speaker: 'user', options: [
        { text: 'Prima! Noch eine Frage: Haben Sie heute Angebote?', translation: 'Harika! Bir sorum daha: Bugün indiriminiz var mı?', correct: true, feedback: '"Angebote" = indirimler/kampanyalar. Akıllı alışverişçi!' },
        { text: 'Super, das ist praktisch. Vielen Dank!', translation: 'Harika, çok pratik. Çok teşekkürler!', correct: true, feedback: '"Das ist praktisch" = çok pratik. Minnettarlığını gösterdin!' },
        { text: 'Ich weiß, wo die Butter ist.', translation: 'Tereyağının nerede olduğunu biliyorum.', correct: false, feedback: 'Söyledik! "Danke sehr" de ve alışverişe devam et.' }
      ]},
      { speaker: 'npc', text: 'Ja, Joghurt und Käse sind heute im Angebot. 20% Rabatt.', translation: 'Evet, yoğurt ve peynir bugün indirimde. %20 indirim.' },
      { speaker: 'user', options: [
        { text: 'Oh, dann nehme ich auch Käse. Wo ist er genau?', translation: 'Oh, o zaman peynir de alıyorum. Tam olarak nerede?', correct: true, feedback: '"Dann nehme ich auch" = o zaman da alıyorum. Fırsatı değerlendirdin!' },
        { text: 'Toll! Welche Marke ist im Angebot?', translation: 'Harika! Hangi marka indirimde?', correct: true, feedback: '"Welche Marke?" = hangi marka? Bilinçli tüketici sorusu!' },
        { text: 'Ich brauche keinen Käse.', translation: 'Peynire ihtiyacım yok.', correct: false, feedback: 'İndirim var! "Dann nehme ich Käse" de.' }
      ]},
      { speaker: 'npc', text: 'Der Käse ist im Gang drei. Brauchen Sie noch etwas anderes?', translation: 'Peynir üçüncü koridorda. Başka bir şeye ihtiyacınız var mı?' },
      { speaker: 'user', options: [
        { text: 'Ja, haben Sie türkisches Brot oder Fladenbrot?', translation: 'Evet, Türk ekmeği ya da pide var mı?', correct: true, feedback: '"Fladenbrot" = pide/yassı ekmek. Kültürlerarası alışveriş!' },
        { text: 'Nein danke, ich glaube ich habe jetzt alles.', translation: 'Hayır teşekkürler, sanırım artık her şeyim var.', correct: true, feedback: '"Ich glaube, ich habe alles" = sanırım her şeyim var. Doğal ifade!' },
        { text: 'Wo ist die Kasse?', translation: 'Kasa nerede?', correct: true, feedback: '"Kasse" = kasa. Alışverişi bitiriyorsun!' }
      ]},
      { speaker: 'npc', text: 'Brot finden Sie in Gang eins. Die Kasse ist vorne links.', translation: 'Ekmek birinci koridorda. Kasa önde solda.' },
      { speaker: 'user', options: [
        { text: 'Danke für Ihre Hilfe! Sie haben mir sehr geholfen.', translation: 'Yardımınız için teşekkürler! Çok yardımcı oldunuz.', correct: true, feedback: '"Sie haben mir sehr geholfen" = çok yardımcı oldunuz. Takdir etmek harika!' },
        { text: 'Danke! Gang eins für Brot, Kasse vorne links. Alles klar!', translation: 'Teşekkürler! Birinci koridor ekmek, kasa önde sol. Tamam!', correct: true, feedback: 'Tüm bilgiyi tekrarladın. Mükemmel öğrenme tekniği!' },
        { text: 'Okay.', translation: 'Tamam.', correct: false, feedback: 'Biraz soğuk. "Vielen Dank für Ihre Hilfe!" de.' }
      ]},
      { speaker: 'npc', text: '(Kasa görevlisi) Das macht zusammen 23 Euro 40. Haben Sie eine Kundenkarte?', translation: '(Kasa görevlisi) Toplam 23 Euro 40. Müşteri kartınız var mı?' },
      { speaker: 'user', options: [
        { text: 'Nein, leider nicht. Kann ich eine bekommen?', translation: 'Hayır, maalesef. Bir tane alabilir miyim?', correct: true, feedback: '"Kann ich eine bekommen?" = bir tane alabilir miyim? Fırsatı kaçırmadın!' },
        { text: 'Ja, hier bitte.', translation: 'Evet, buyurun.', correct: true, feedback: 'Kartın varsa hazır et. "Hier bitte" = buyurun.' },
        { text: 'Was ist das?', translation: 'Bu nedir?', correct: false, feedback: '"Kundenkarte" = müşteri kartı. "Nein, leider nicht" veya "Ja, hier" de.' }
      ]},
      { speaker: 'npc', text: 'Hier ist ein Antragsformular. Zahlen Sie heute bar oder mit Karte?', translation: 'İşte başvuru formu. Bugün nakit mi kart mı ödüyorsunuz?' },
      { speaker: 'user', options: [
        { text: 'Mit EC-Karte bitte. Hier.', translation: 'Banka kartıyla lütfen. Buyurun.', correct: true, feedback: '"EC-Karte" = banka kartı. Almanya\'da yaygın ödeme yöntemi!' },
        { text: 'Ich zahle bar. Hier sind 25 Euro — stimmt so.', translation: 'Nakit ödüyorum. İşte 25 Euro — üstü kalsın.', correct: true, feedback: '"Stimmt so" = üstü kalsın. Almanca\'da şık bahşiş ifadesi!' },
        { text: 'Ich habe kein Geld.', translation: 'Param yok.', correct: false, feedback: 'Alışveriş yapacaksan para olmalı! "Mit Karte" de.' }
      ]}
    ]
  },

  {
    id: 'phone',
    title: 'Telefonda Konuşma',
    icon: '📞',
    color: '#6A0572',
    bg: '#FFF5FF',
    level: 'A2',
    situation: 'Bir diş kliniğini arıyorsun. Randevu almak, iptal etmek ve yeniden planlamak istiyorsun.',
    npcName: 'Sekretärin (Sekreter)',
    npcEmoji: '📱',
    turns: [
      { speaker: 'npc', text: 'Zahnarztpraxis Schneider, guten Morgen!', translation: 'Schneider Diş Kliniği, günaydın!' },
      { speaker: 'user', options: [
        { text: 'Guten Morgen! Ich möchte gern einen Termin vereinbaren.', translation: 'Günaydın! Randevu almak istiyorum.', correct: true, feedback: '"Einen Termin vereinbaren" = randevu almak. "Vereinbaren" daha resmi ve doğru!' },
        { text: 'Hallo, bin ich bei Doktor Schneider?', translation: 'Merhaba, Doktor Schneider\'de miyim?', correct: true, feedback: 'Doğru yere ulaştığını kontrol etmek akıllıca!' },
        { text: 'Ich habe Zahnschmerzen!', translation: 'Diş ağrım var!', correct: true, feedback: '"Zahnschmerzen" = diş ağrısı. Acil durumda doğrudan söylemek geçerli!' }
      ]},
      { speaker: 'npc', text: 'Natürlich. Wie ist Ihr Name bitte?', translation: 'Tabii ki. Adınız nedir lütfen?' },
      { speaker: 'user', options: [
        { text: 'Yilmaz, Cem Yilmaz. Y-I-L-M-A-Z.', translation: 'Yılmaz, Cem Yılmaz. Y-I-L-M-A-Z.', correct: true, feedback: 'İsmi harf harf söylemek Almanya\'da çok yaygın. Profesyonel!' },
        { text: 'Mein Name ist Cem. Ich bin Neukunde.', translation: 'Adım Cem. Yeni müşteriyim.', correct: true, feedback: '"Neukunde" = yeni müşteri. Sisteme kayıt için önemli bilgi!' },
        { text: 'Das sage ich nicht.', translation: 'Bunu söylemiyorum.', correct: false, feedback: 'Adını söylemek zorundasın! "Mein Name ist..." de.' }
      ]},
      { speaker: 'npc', text: 'Sind Sie Kassenpatient oder Privatpatient?', translation: 'Kamu sigortası mı yoksa özel sigorta mı?' },
      { speaker: 'user', options: [
        { text: 'Ich bin Kassenpatient. Ich habe die AOK.', translation: 'Kamu sigortasıyım. AOK\'m var.', correct: true, feedback: '"Kassenpatient" = devlet sigortası. AOK Almanya\'nın büyük sigorta şirketi!' },
        { text: 'Ich habe eine private Krankenversicherung.', translation: 'Özel sağlık sigortam var.', correct: true, feedback: '"Private Krankenversicherung" = özel sağlık sigortası. Bilginç bir ifade!' },
        { text: 'Was bedeutet das?', translation: 'Bu ne anlama geliyor?', correct: true, feedback: 'Bilmiyorsan sor! Kasa = devlet, Privat = özel sigorta.' }
      ]},
      { speaker: 'npc', text: 'Verstanden. Wann passt es Ihnen?', translation: 'Anlaşıldı. Size ne zaman uygun?' },
      { speaker: 'user', options: [
        { text: 'Am liebsten nächste Woche, Dienstag oder Mittwoch nachmittags.', translation: 'En çok gelecek hafta, Salı ya da Çarşamba öğleden sonra.', correct: true, feedback: '"Am liebsten" = en çok tercih. Birden fazla seçenek sunmak harika!' },
        { text: 'Haben Sie heute noch etwas frei? Es ist dringend.', translation: 'Bugün hâlâ boş yeriniz var mı? Acil.', correct: true, feedback: '"Es ist dringend" = acil. Diş ağrısında bunu söylemek çok doğru!' },
        { text: 'Wann haben Sie Zeit?', translation: 'Sizin vaktiniz ne zaman var?', correct: false, feedback: 'Sen müşterisin, seninle ilgili! "Mir passt..." (bana ...uyuyor) de.' }
      ]},
      { speaker: 'npc', text: 'Ich hätte Donnerstag um 15:30 Uhr. Wäre das okay?', translation: 'Perşembe saat 15:30\'da yer var. Uygun olur mu?' },
      { speaker: 'user', options: [
        { text: 'Ja, das passt mir gut. Donnerstag um halb vier.', translation: 'Evet, bana uyuyor. Perşembe saat üç buçukta.', correct: true, feedback: '"Halb vier" = üç buçuk (3:30). Alman saat söyleme şekli bilinmeli!' },
        { text: 'Hmm, haben Sie nichts früher? Vielleicht um 10 Uhr?', translation: 'Hmm, daha erken bir şeyiniz yok mu? Belki saat 10?', correct: true, feedback: 'Alternatif önermek çok doğal!' },
        { text: 'Ich komme nicht nach Donnerstag.', translation: 'Perşembeye gelemiyorum.', correct: false, feedback: '"Donnerstag passt mir nicht" (Perşembe uymuyor) daha doğru. Sonra alternatif sun.' }
      ]},
      { speaker: 'npc', text: 'Perfekt. Und wie erreiche ich Sie, falls sich etwas ändert?', translation: 'Mükemmel. Bir şey değişirse sizi nasıl ulaşabilirim?' },
      { speaker: 'user', options: [
        { text: 'Meine Handynummer ist 0176 123 456 78.', translation: 'Cep telefonu numaram 0176 123 456 78.', correct: true, feedback: 'Numarayı söyledin. Almanya\'da numara söylerken çift rakamlar kullanılır!' },
        { text: 'Am besten per E-Mail oder SMS.', translation: 'En iyisi e-posta veya SMS.', correct: true, feedback: '"Am besten" = en iyisi. Modern iletişim tercihi!' },
        { text: 'Ich melde mich selbst.', translation: 'Ben kendim haber veririm.', correct: false, feedback: 'Numarını ver ki sana ulaşabilsinler. "Meine Nummer ist..." de.' }
      ]},
      { speaker: 'npc', text: 'Gut. Also Donnerstag, 14. April, um 15:30 Uhr. Bitte bringen Sie Ihre Versicherungskarte mit.', translation: 'Peki. Yani Perşembe 14 Nisan, saat 15:30. Lütfen sigorta kartınızı getirin.' },
      { speaker: 'user', options: [
        { text: 'Alles klar. Muss ich noch etwas mitbringen?', translation: 'Peki. Başka bir şey getirmem gerekiyor mu?', correct: true, feedback: '"Muss ich noch etwas mitbringen?" = başka bir şey getirmeli miyim? Çok pratik soru!' },
        { text: 'Verstanden. Bis Donnerstag, auf Wiederhören!', translation: 'Anladım. Perşembeye kadar, telefonda görüşürüz!', correct: true, feedback: '"Auf Wiederhören" = telefonda görüşürüz. Sadece telefon için kullanılır!' },
        { text: 'Ich habe keine Versicherungskarte.', translation: 'Sigorta kartım yok.', correct: false, feedback: 'Sigortan yoksa söyle ama kartın varsa "Alles klar" de.' }
      ]}
    ]
  },

  {
    id: 'restaurant',
    title: 'Restoranda Akşam Yemeği',
    icon: '🍽️',
    color: '#C77DFF',
    bg: '#FFF5FF',
    level: 'A2',
    situation: 'Bir Alman restoranındasın. Sipariş vermek, tavsiye istemek, bir şeyden şikayet etmek ve hesabı ödemek istiyorsun.',
    npcName: 'Kellnerin (Garson)',
    npcEmoji: '🍽️',
    turns: [
      { speaker: 'npc', text: 'Guten Abend! Haben Sie reserviert?', translation: 'İyi akşamlar! Rezervasyonunuz var mı?' },
      { speaker: 'user', options: [
        { text: 'Ja, auf den Namen Yilmaz, für zwei Personen.', translation: 'Evet, Yılmaz adına, iki kişi için.', correct: true, feedback: '"Für zwei Personen" = iki kişi için. Rezervasyon için standart ifade!' },
        { text: 'Nein, aber haben Sie noch einen Tisch frei?', translation: 'Hayır, ama boş masanız var mı?', correct: true, feedback: '"Einen Tisch frei" = boş masa. Rezervasyonsuz gelince bunu sor!' },
        { text: 'Guten Abend! Ja.', translation: 'İyi akşamlar! Evet.', correct: false, feedback: 'Adını ve kişi sayısını söyle. "Auf den Namen..." de.' }
      ]},
      { speaker: 'npc', text: 'Sehr gut. Bitte folgen Sie mir. Hier ist die Speisekarte.', translation: 'Çok iyi. Lütfen beni takip edin. İşte menü.' },
      { speaker: 'user', options: [
        { text: 'Danke. Was empfehlen Sie heute?', translation: 'Teşekkürler. Bugün ne tavsiye edersiniz?', correct: true, feedback: '"Was empfehlen Sie?" = ne tavsiye edersiniz? Restoranların en popüler sorusu!' },
        { text: 'Haben Sie vegetarische Gerichte?', translation: 'Vejeteryan yemekleriniz var mı?', correct: true, feedback: '"Vegetarische Gerichte" = vejeteryan yemekler. Almanya\'da çok sorulan soru!' },
        { text: 'Das Buch ist schön.', translation: 'Kitap güzel.', correct: false, feedback: '"Speisekarte" = menü, kitap değil. "Was empfehlen Sie?" de.' }
      ]},
      { speaker: 'npc', text: 'Heute ist unser Rinderbraten besonders lecker. Mit Rotkohl und Klößen.', translation: 'Bugün sığır rostomuzu özellikle lezzetli. Kırmızı lahanà ve patates köftesiyle.' },
      { speaker: 'user', options: [
        { text: 'Das klingt lecker! Ich nehme das. Und für meine Begleiterin?', translation: 'Kulağa lezzetli geliyor! Bunu alıyorum. Peki arkadaşım için?', correct: true, feedback: '"Das klingt lecker" = kulağa lezzetli geliyor. "Begleiterin" = bayan arkadaş/eş!' },
        { text: 'Ich bin Vegetarier. Was können Sie empfehlen?', translation: 'Vejeteryenim. Ne önerebilirsiniz?', correct: true, feedback: 'Alternatif istemek çok doğal!' },
        { text: 'Was sind Kloße?', translation: 'Kluße nedir?', correct: true, feedback: '"Klöße" = patates ya da hamurdan yapılmış Alman köftesi. Sormak çok doğal!' }
      ]},
      { speaker: 'npc', text: 'Und was möchten Sie trinken?', translation: 'Peki ne içmek istersiniz?' },
      { speaker: 'user', options: [
        { text: 'Ein Glas Rotwein und ein Wasser, bitte.', translation: 'Bir bardak kırmızı şarap ve bir su, lütfen.', correct: true, feedback: '"Rotwein" = kırmızı şarap. Klasik Alman restoran siparişi!' },
        { text: 'Was haben Sie vom Fass? Ein Bier wäre schön.', translation: 'Fıçıdan ne var? Bir bira güzel olurdu.', correct: true, feedback: '"Vom Fass" = fıçıdan. Alman bira kültürü için önemli soru!' },
        { text: 'Wasser ist gut.', translation: 'Su iyi.', correct: false, feedback: '"Ich möchte Wasser" veya "Ein Glas Wasser bitte" de.' }
      ]},
      { speaker: 'npc', text: 'Gerne. Das Essen kommt in circa 20 Minuten.', translation: 'Tabii. Yemek yaklaşık 20 dakikada gelecek.' },
      { speaker: 'user', options: [
        { text: 'Kein Problem. Können wir noch Brot bekommen?', translation: 'Sorun değil. Ekmek alabilir miyiz?', correct: true, feedback: '"Können wir noch...?" = daha ...alabilir miyiz? Alman restoranlarında ekmek istenir!' },
        { text: 'Das ist zu lang. Wir haben es eilig.', translation: 'Bu çok uzun. Aceleyle.', correct: false, feedback: '20 dakika restoran için normal. "Kein Problem" de.' },
        { text: 'Super, danke!', translation: 'Harika, teşekkürler!', correct: true, feedback: 'Kısa ve pozitif. Beklerken keyifli bir sohbet yapabilirsin!' }
      ]},
      { speaker: 'npc', text: 'Das Essen kommt! Guten Appetit!', translation: 'Yemek geldi! Afiyet olsun!' },
      { speaker: 'user', options: [
        { text: 'Danke! Guten Appetit auch Ihnen.', translation: 'Teşekkürler! Size de afiyet olsun.', correct: true, feedback: 'Karşılık vermek çok kibar. "Ihnen auch" = size de!' },
        { text: 'Oh, entschuldigung — ich habe kein Besteck bekommen.', translation: 'Oh, özür dilerim — çatal bıçak almadım.', correct: true, feedback: '"Besteck" = çatal bıçak takımı. Eksiklik varsa söylemek doğal!' },
        { text: 'Endlich!', translation: 'Sonunda!', correct: false, feedback: 'Bu biraz nezaketsiz! "Danke, guten Appetit!" de.' }
      ]},
      { speaker: 'npc', text: 'Hat es Ihnen geschmeckt?', translation: 'Yemek nasıldı?' },
      { speaker: 'user', options: [
        { text: 'Ja, ausgezeichnet! Der Rinderbraten war wunderbar.', translation: 'Evet, mükemmeldi! Sığır rostu harikaydı.', correct: true, feedback: '"Ausgezeichnet" = mükemmel. "War" geçmiş zamanıyla değerlendirme yaptın!' },
        { text: 'Sehr gut, aber das Fleisch war ein bisschen trocken.', translation: 'Çok iyiydi, ama et biraz kuru gibiydi.', correct: true, feedback: '"Ein bisschen trocken" = biraz kuru. Dürüst geri bildirim. "Aber" = ama ile dengeyi koruydun!' },
        { text: 'Ja.', translation: 'Evet.', correct: false, feedback: 'Daha fazla söyle! "Ja, es war sehr lecker!" de.' }
      ]},
      { speaker: 'npc', text: 'Schön! Möchten Sie noch einen Nachtisch? Wir haben Schwarzwälder Kirschtorte.', translation: 'Güzel! Tatlı ister misiniz? Kara Orman pastamız var.' },
      { speaker: 'user', options: [
        { text: 'Ja, gerne! Ich hätte gerne ein Stück Torte.', translation: 'Evet, memnuniyetle! Bir dilim pasta istiyorum.', correct: true, feedback: '"Ich hätte gerne" = istiyorum (kibar form). "Ein Stück" = bir dilim. Harika!' },
        { text: 'Nein danke, ich bin satt. Können wir die Rechnung haben?', translation: 'Hayır teşekkürler, doydum. Hesabı alabilir miyiz?', correct: true, feedback: '"Ich bin satt" = doydum. "Die Rechnung" = hesap. Restoranın sonu!' },
        { text: 'Torte ist ungesund.', translation: 'Pasta sağlıksız.', correct: false, feedback: 'Evet ama lezzetli! "Ja bitte" veya "Nein danke, die Rechnung bitte" de.' }
      ]}
    ]
  },

  {
    id: 'directions',
    title: 'Yol Tarifi',
    icon: '🗺️',
    color: '#2A9D8F',
    bg: '#F0FFFC',
    level: 'A2',
    situation: 'Yabancı bir şehirde kayboluyorsun. Müzeyi bulmak için yol soruyorsun ve ulaşım seçeneklerini öğreniyorsun.',
    npcName: 'Passant (Yoldan geçen)',
    npcEmoji: '🚶',
    turns: [
      { speaker: 'npc', text: '(Sen yabancıya sormaya karar veriyorsun...)', translation: '(Sen yabancıya sormaya karar veriyorsun...)' },
      { speaker: 'user', options: [
        { text: 'Entschuldigung, können Sie mir helfen? Ich suche das Stadtmuseum.', translation: 'Özür dilerim, yardımcı olabilir misiniz? Şehir müzesini arıyorum.', correct: true, feedback: '"Entschuldigung" = özür dilerim. Yabancıya yaklaşmak için standart açılış!' },
        { text: 'Hallo! Kennen Sie die Stadt gut?', translation: 'Merhaba! Şehri iyi biliyor musunuz?', correct: true, feedback: 'Önce yeterliliğini kontrol etmek akıllıca!' },
        { text: 'Sprechen Sie Deutsch?', translation: 'Almanca biliyor musunuz?', correct: false, feedback: 'Almanya\'da Almanca konuşmak normal! "Entschuldigung, wo ist...?" de.' }
      ]},
      { speaker: 'npc', text: 'Ja natürlich. Das Stadtmuseum? Das ist ein bisschen weit von hier.', translation: 'Evet tabii. Şehir müzesi mi? Buradan biraz uzak.' },
      { speaker: 'user', options: [
        { text: 'Wie weit ungefähr? Kann ich zu Fuß gehen?', translation: 'Yaklaşık ne kadar uzak? Yürüyerek gidebilir miyim?', correct: true, feedback: '"Zu Fuß gehen" = yürüyerek gitmek. Her zaman sormaya değer!' },
        { text: 'Gibt es eine U-Bahn oder einen Bus dahin?', translation: 'Oraya metro ya da otobüs var mı?', correct: true, feedback: '"Gibt es eine U-Bahn...?" = metro var mı? Ulaşım seçeneklerini sormak akıllıca!' },
        { text: 'Dann gehe ich nicht hin.', translation: 'O zaman gitmiyorum.', correct: false, feedback: 'Pes etme! "Wie weit ist es?" de.' }
      ]},
      { speaker: 'npc', text: 'Zu Fuß etwa 25 Minuten. Mit der U-Bahn nur 5 Minuten. Nehmen Sie die Linie 3.', translation: 'Yürüyerek yaklaşık 25 dakika. Metroyla sadece 5 dakika. 3 numaralı hattı alın.' },
      { speaker: 'user', options: [
        { text: 'Linie 3, verstanden. Wo ist die nächste U-Bahn-Station?', translation: '3 numaralı hat, anladım. En yakın metro istasyonu nerede?', correct: true, feedback: 'Bilgiyi tekrarladın ve takip sorusu sordun. Mükemmel!' },
        { text: 'Das Wetter ist schön heute, ich gehe zu Fuß. Wie gehe ich?', translation: 'Hava bugün güzel, yürüyeceğim. Nasıl gidiyorum?', correct: true, feedback: 'Yürümeyi seçtin ve tarif istiyorsun. Aktif!' },
        { text: 'U-Bahn ist teuer.', translation: 'Metro pahalı.', correct: false, feedback: 'Almanya\'da metro çok uygun. "Wo ist die U-Bahn-Station?" de.' }
      ]},
      { speaker: 'npc', text: 'Die Station "Rathausplatz" ist zwei Minuten von hier. Gehen Sie diese Straße geradeaus.', translation: '"Rathausplatz" istasyonu buradan iki dakika. Bu sokaktan düz gidin.' },
      { speaker: 'user', options: [
        { text: 'Geradeaus. Und dann? Muss ich umsteigen?', translation: 'Düz ileri. Peki sonra? Aktarma yapmam gerekiyor mu?', correct: true, feedback: '"Muss ich umsteigen?" = aktarma yapmalı mıyım? Metro için kritik soru!' },
        { text: 'Rathausplatz, geradeaus. Das habe ich verstanden. Vielen Dank!', translation: 'Rathausplatz, düz ileri. Anladım. Çok teşekkürler!', correct: true, feedback: 'Bilgiyi pekiştirdin ve teşekkür ettin. Harika kapanış!' },
        { text: 'Ich kenne diese Straße nicht.', translation: 'Bu sokağı tanımıyorum.', correct: false, feedback: 'Sadece düz git! "Alles klar, danke!" de.' }
      ]},
      { speaker: 'npc', text: 'Nein, direkte Verbindung. Steigen Sie an der Haltestelle "Museum" aus.', translation: 'Hayır, direkt bağlantı. "Museum" durağında inin.' },
      { speaker: 'user', options: [
        { text: 'Super! Wie viele Stationen sind es?', translation: 'Harika! Kaç durak?', correct: true, feedback: '"Wie viele Stationen?" = kaç durak? Metro için çok pratik bilgi!' },
        { text: 'Bis wann ist das Museum geöffnet?', translation: 'Müze saat kaça kadar açık?', correct: true, feedback: '"Bis wann geöffnet?" = saat kaça kadar açık? Boşuna gitme!' },
        { text: 'Museum klingt langweilig.', translation: 'Müze sıkıcı gelir.', correct: false, feedback: 'Konu dışı! "Vielen Dank für die Hilfe!" de.' }
      ]},
      { speaker: 'npc', text: 'Vier Stationen. Das dauert wirklich nur fünf Minuten. Viel Spaß im Museum!', translation: 'Dört durak. Gerçekten sadece beş dakika sürer. Müzede eğlenceli vakit geçirin!' },
      { speaker: 'user', options: [
        { text: 'Danke vielmals! Sie haben mir sehr geholfen.', translation: 'Çok teşekkürler! Çok yardımcı oldunuz.', correct: true, feedback: '"Danke vielmals" = çok teşekkürler. "Geholfen" = yardım ettiniz. Minnettar ifade!' },
        { text: 'Vielen Dank! Haben Sie noch einen Tipp für das Museum?', translation: 'Çok teşekkürler! Müze için bir ipucunuz var mı?', correct: true, feedback: '"Haben Sie einen Tipp?" = ipucunuz var mı? Meraklı ve sohbet açıcı!' },
        { text: 'Okay, bye.', translation: 'Tamam, bye.', correct: false, feedback: '"Auf Wiedersehen!" veya "Tschüss und danke!" de. "Bye" çok gayri resmi.' }
      ]}
    ]
  },

  {
    id: 'work_firstday',
    title: 'İlk İş Günü',
    icon: '💼',
    color: '#264653',
    bg: '#F5F5FF',
    level: 'A2',
    situation: 'Yeni bir işe başlıyorsun. Tanışmak, ofisi keşfetmek ve ilk toplantıya hazırlanmak istiyorsun.',
    npcName: 'Stefan (Meslektaşın)',
    npcEmoji: '👨‍💼',
    turns: [
      { speaker: 'npc', text: 'Guten Morgen! Du bist der Neue, oder? Herzlich willkommen!', translation: 'Günaydın! Sen yeni gelensin, değil mi? Hoş geldin!' },
      { speaker: 'user', options: [
        { text: 'Ja! Ich bin Cem Yilmaz, der neue Softwareentwickler. Freut mich!', translation: 'Evet! Ben Cem Yılmaz, yeni yazılım geliştirici. Memnun oldum!', correct: true, feedback: '"Der neue Softwareentwickler" = yeni yazılım geliştirici. Profesyonel tanıtım!' },
        { text: 'Hallo! Ich bin noch etwas nervös. Es ist mein erster Tag.', translation: 'Merhaba! Hâlâ biraz gerginim. İlk günüm.', correct: true, feedback: '"Es ist mein erster Tag" = ilk günüm. Dürüstlük insanları sempatik kılar!' },
        { text: 'Ja. Wo ist das Büro?', translation: 'Evet. Ofis nerede?', correct: false, feedback: 'Önce kendini tanıt! "Ich bin Cem. Und du?" de.' }
      ]},
      { speaker: 'npc', text: 'Ich bin Stefan aus der IT-Abteilung. Ich zeige dir alles! Zuerst der Computer.', translation: 'Ben IT bölümünden Stefan. Sana her şeyi göstereyim! Önce bilgisayar.' },
      { speaker: 'user', options: [
        { text: 'Super, danke Stefan! Hast du einen Moment Zeit?', translation: 'Harika, teşekkürler Stefan! Biraz vaktin var mı?', correct: true, feedback: '"Hast du einen Moment?" = biraz vaktin var mı? Dostça soru!' },
        { text: 'Ja gerne. Welches Programm benutzen wir hier?', translation: 'Evet memnuniyetle. Burada hangi program kullanıyoruz?', correct: true, feedback: '"Welches Programm?" = hangi program? İlk gün için çok pratik!' },
        { text: 'Ich kenne mich aus.', translation: 'Kendim bilirim.', correct: false, feedback: 'İlk gün yardım kabul et! "Ja, gerne!" de.' }
      ]},
      { speaker: 'npc', text: 'Wir nutzen hauptsächlich Microsoft Teams und Jira. Hast du schon Zugangsdaten bekommen?', translation: 'Ağırlıklı olarak Microsoft Teams ve Jira kullanıyoruz. Erişim bilgilerin geldi mi?' },
      { speaker: 'user', options: [
        { text: 'Ja, ich habe eine E-Mail mit den Zugangsdaten bekommen.', translation: 'Evet, erişim bilgileriyle bir e-posta aldım.', correct: true, feedback: '"Ich habe bekommen" = aldım (geçmiş zaman Perfekt). Doğru kullanım!' },
        { text: 'Noch nicht. An wen muss ich mich wenden?', translation: 'Henüz değil. Kime başvurmalıyım?', correct: true, feedback: '"An wen muss ich mich wenden?" = kime başvurmalıyım? Çok profesyonel!' },
        { text: 'Was ist Jira?', translation: 'Jira nedir?', correct: true, feedback: 'Bilmiyorsan sor! Jira = proje yönetim yazılımı.' }
      ]},
      { speaker: 'npc', text: 'Gut. Um 10 Uhr haben wir ein Team-Meeting. Das Besprechungszimmer ist im zweiten Stock.', translation: 'İyi. Saat 10\'da takım toplantımız var. Toplantı odası ikinci katta.' },
      { speaker: 'user', options: [
        { text: 'Perfekt. Soll ich etwas vorbereiten oder mitbringen?', translation: 'Mükemmel. Bir şey hazırlamam ya da getirmem gerekiyor mu?', correct: true, feedback: '"Soll ich...?" = ...gerekiyor mu? İlk toplantı için çok sorumluluk gösteren soru!' },
        { text: 'Danke für den Hinweis. Zweiter Stock — gibt es einen Aufzug?', translation: 'Teşekkürler uyarı için. İkinci kat — asansör var mı?', correct: true, feedback: '"Danke für den Hinweis" = uyarı için teşekkürler. "Aufzug" = asansör. Pratik!' },
        { text: 'Ich mag keine Meetings.', translation: 'Toplantıları sevmiyorum.', correct: false, feedback: 'İlk gün bunu söyleme! "Danke, ich komme um 10 Uhr" de.' }
      ]},
      { speaker: 'npc', text: 'Nein, nur zuhören. Übrigens — Mittagessen essen wir alle zusammen um 12:30 in der Kantine. Kommst du mit?', translation: 'Hayır, sadece dinle. Bu arada — öğle yemeğini hep birlikte 12:30\'da kantinde yiyoruz. Seninle gelir misin?' },
      { speaker: 'user', options: [
        { text: 'Ja, sehr gerne! Das ist eine tolle Gelegenheit, alle kennenzulernen.', translation: 'Evet, çok memnuniyetle! Bu herkesi tanımak için harika bir fırsat.', correct: true, feedback: '"Eine tolle Gelegenheit" = harika bir fırsat. Sosyal ve pozitif!' },
        { text: 'Was gibt es heute in der Kantine?', translation: 'Bugün kantinde ne var?', correct: true, feedback: '"Was gibt es heute?" = bugün ne var? Yemek meraklısı!' },
        { text: 'Ich esse lieber allein.', translation: 'Yalnız yemeyi tercih ederim.', correct: false, feedback: 'İlk gün özellikle! "Ja, gerne!" de ve ekibi tanı.' }
      ]},
      { speaker: 'npc', text: 'Wunderbar! Hast du noch Fragen? Ich helfe dir gerne.', translation: 'Harika! Sorun var mı? Seve seve yardım ederim.' },
      { speaker: 'user', options: [
        { text: 'Ja! Wo sind die Toiletten und die Kaffeemaschine? Das sind die wichtigsten Dinge!', translation: 'Evet! Tuvaletler ve kahve makinesi nerede? Bunlar en önemli şeyler!', correct: true, feedback: 'Mizahla soruyorsun! "Die wichtigsten Dinge" = en önemli şeyler. Eğlenceli!' },
        { text: 'Gibt es einen Dresscode hier?', translation: 'Burada kıyafet kuralı var mı?', correct: true, feedback: '"Dresscode" = kıyafet kuralı. IT şirketlerinde genelde casual!' },
        { text: 'Nein, danke. Ich kenne alles.', translation: 'Hayır, teşekkürler. Her şeyi biliyorum.', correct: false, feedback: 'İlk gün mütevazı ol! "Ja, wo ist die Küche?" de.' }
      ]},
      { speaker: 'npc', text: 'Haha! Die Kaffeemaschine ist gleich hier um die Ecke. Und das WC ist am Ende des Flurs.', translation: 'Haha! Kahve makinesi burada köşe başında. Ve WC koridorun sonunda.' },
      { speaker: 'user', options: [
        { text: 'Perfekt! Das Wichtigste zuerst. Danke Stefan, du bist sehr hilfsbereit!', translation: 'Mükemmel! En önemli şey önce. Teşekkürler Stefan, çok yardımseversin!', correct: true, feedback: '"Hilfsbereit" = yardımsever. Meslektaşına iltifat etmek iyi ilişki başlangıcı!' },
        { text: 'Klasse! Ich mache zuerst einen Kaffee — möchtest du auch einen?', translation: 'Harika! Önce bir kahve yapıyorum — sen de ister misin?', correct: true, feedback: 'Kahve teklif etmek Almanya\'da çok arkadaşça. Ekibe hemen ısındın!' },
        { text: 'Okay, danke.', translation: 'Tamam, teşekkürler.', correct: false, feedback: '"Du bist sehr nett!" de. Biraz daha sıcak ol!' }
      ]}
    ]
  },

  {
    id: 'apartment',
    title: 'Daire Kiralama',
    icon: '🏠',
    color: '#E76F51',
    bg: '#FFF8F5',
    level: 'A2',
    situation: 'Bir daire kiracısı olmak istiyorsun. Ev sahibiyle görüşüyor, daireyi geziyor ve sözleşme şartlarını öğreniyorsun.',
    npcName: 'Vermieter (Ev Sahibi)',
    npcEmoji: '🔑',
    turns: [
      { speaker: 'npc', text: 'Guten Tag! Sie sind Herr Yilmaz? Ich bin der Vermieter, Herr Bauer.', translation: 'İyi günler! Siz Bay Yılmaz mısınız? Ben ev sahibi Bay Bauer.' },
      { speaker: 'user', options: [
        { text: 'Ja, guten Tag Herr Bauer. Schön, Sie kennenzulernen.', translation: 'Evet, iyi günler Bay Bauer. Sizi tanımak güzel.', correct: true, feedback: 'Resmi ve nazik tanışma. Ev sahibiyle iyi ilişki kurmak şart!' },
        { text: 'Ja, hallo! Die Wohnung sieht von außen sehr schön aus.', translation: 'Evet, merhaba! Daire dışarıdan çok güzel görünüyor.', correct: true, feedback: '"Sieht gut aus" = iyi görünüyor. İltifat iyi başlangıç!' },
        { text: 'Ja. Zeigen Sie mir die Wohnung.', translation: 'Evet. Daireyi gösterin.', correct: false, feedback: 'Çok doğrudan! "Schön Sie kennenzulernen" ile başla.' }
      ]},
      { speaker: 'npc', text: 'Bitte kommen Sie rein. Das ist das Wohnzimmer — 20 Quadratmeter.', translation: 'Lütfen girin. Bu oturma odası — 20 metrekare.' },
      { speaker: 'user', options: [
        { text: 'Sehr schön! Ist die Wohnung möbliert?', translation: 'Çok güzel! Daire mobilyalı mı?', correct: true, feedback: '"Möbliert" = mobilyalı. Almanya\'da çoğu daire boş kiralanır!' },
        { text: 'Wie alt ist das Gebäude?', translation: 'Bina ne kadar eski?', correct: true, feedback: '"Wie alt ist das Gebäude?" = bina kaç yaşında? Önemli soru!' },
        { text: 'Das ist zu klein.', translation: 'Bu çok küçük.', correct: false, feedback: 'Hemen yargılama. "Wie viele Zimmer hat die Wohnung?" de.' }
      ]},
      { speaker: 'npc', text: 'Die Wohnung ist unmöbliert. Hier ist die Küche — neu renoviert.', translation: 'Daire mobilyasız. İşte mutfak — yeni tadilat.' },
      { speaker: 'user', options: [
        { text: 'Oh, sehr modern! Hat die Küche einen Geschirrspüler?', translation: 'Oh, çok modern! Mutfakta bulaşık makinesi var mı?', correct: true, feedback: '"Geschirrspüler" = bulaşık makinesi. Almanya\'da kira ilanlarında önemli detay!' },
        { text: 'Unmöbliert — das bedeutet ich brauche eigene Möbel?', translation: 'Mobilyasız — bu kendi mobilyama ihtiyacım var demek mi?', correct: true, feedback: 'Anlayıp soru sormak mükemmel. "Das bedeutet..." = bu demek ki...' },
        { text: 'Ich mag keine Küche.', translation: 'Mutfağı sevmiyorum.', correct: false, feedback: 'Tuhaf! "Die Küche ist sehr schön" de.' }
      ]},
      { speaker: 'npc', text: 'Ja, Geschirrspüler ist eingebaut. Und hier ist das Schlafzimmer — ruhige Lage, Innenhof.', translation: 'Evet, bulaşık makinesi entegre. Ve işte yatak odası — sessiz konum, iç avlu.' },
      { speaker: 'user', options: [
        { text: 'Sehr gut, das ist wichtig. Wie hoch ist die Miete genau?', translation: 'Çok iyi, bu önemli. Kira tam olarak ne kadar?', correct: true, feedback: '"Genau" = tam olarak. Belirsizlikleri gidermen harika!' },
        { text: 'Gibt es einen Balkon oder eine Terrasse?', translation: 'Balkon ya da teras var mı?', correct: true, feedback: '"Balkon oder Terrasse?" Almanya\'da çok değerli ek! Sormak mantıklı.' },
        { text: 'Ich brauche kein Schlafzimmer.', translation: 'Yatak odasına ihtiyacım yok.', correct: false, feedback: 'Çok tuhaf! "Das Schlafzimmer ist sehr ruhig" de.' }
      ]},
      { speaker: 'npc', text: 'Kaltmiete 850 Euro, Nebenkosten circa 200 Euro. Also warm 1050 Euro.', translation: 'Net kira 850 Euro, yan giderler yaklaşık 200 Euro. Yani brüt 1050 Euro.' },
      { speaker: 'user', options: [
        { text: 'Was sind die Nebenkosten genau? Heizung und Wasser?', translation: 'Yan giderler tam olarak neler? Isıtma ve su?', correct: true, feedback: '"Heizung" = ısıtma. "Nebenkosten" içeriğini sormak çok önemli!' },
        { text: 'Ist Verhandlung möglich? Ich zahle pünktlich.', translation: 'Pazarlık mümkün mü? Düzenli ödüyorum.', correct: true, feedback: '"Ich zahle pünktlich" = düzenli ödüyorum. Bu ev sahipleri için çok önemli!' },
        { text: 'Das ist zu teuer, ich gehe.', translation: 'Bu çok pahalı, gidiyorum.', correct: false, feedback: 'Berlin/Hamburg için makul fiyat. "Kann man darüber reden?" de.' }
      ]},
      { speaker: 'npc', text: 'Heizung, Wasser und Hausmeister sind dabei. Haben Sie ein geregeltes Einkommen?', translation: 'Isıtma, su ve kapıcı dahil. Düzenli geliriniz var mı?' },
      { speaker: 'user', options: [
        { text: 'Ja, ich arbeite fest bei einer IT-Firma. Ich kann gerne Gehaltsabrechnungen zeigen.', translation: 'Evet, bir IT firmasında düzenli çalışıyorum. Maaş bordrolarını gösterebilirim.', correct: true, feedback: '"Gehaltsabrechnungen" = maaş bordroları. Almanya\'da kira için şart!' },
        { text: 'Ja, ich verdiene 3000 Euro netto im Monat.', translation: 'Evet, ayda 3000 Euro net kazanıyorum.', correct: true, feedback: '"Netto" = vergi sonrası. Almanya\'da kural: kira, net gelirin 1/3\'ünden az olmalı.' },
        { text: 'Das ist privat.', translation: 'Bu kişisel.', correct: false, feedback: 'Kira sözleşmesi için göstermek zorundasın. "Ja, ich habe Arbeit" de.' }
      ]},
      { speaker: 'npc', text: 'Gut. Ab wann möchten Sie einziehen?', translation: 'İyi. Ne zaman taşınmak istiyorsunuz?' },
      { speaker: 'user', options: [
        { text: 'Ab dem 1. Mai, wenn das möglich ist.', translation: '1 Mayıs\'tan itibaren, mümkünse.', correct: true, feedback: '"Ab dem 1. Mai" = 1 Mayıs\'tan itibaren. "Wenn das möglich ist" = mümkünse. Kibar!' },
        { text: 'So schnell wie möglich. Ich wohne momentan in einem Hotel.', translation: 'Mümkün olduğunca çabuk. Şu an bir otelde kalıyorum.', correct: true, feedback: '"So schnell wie möglich" = mümkün olduğunca çabuk. Acil durum açıklı!' },
        { text: 'Ich weiß noch nicht.', translation: 'Henüz bilmiyorum.', correct: false, feedback: 'Bir tarih söyle. "Ab dem ersten..." de.' }
      ]},
      { speaker: 'npc', text: 'Der 1. Mai wäre möglich. Ich schicke Ihnen den Mietvertrag per E-Mail.', translation: '1 Mayıs mümkün. Kira sözleşmesini e-posta ile göndereceğim.' },
      { speaker: 'user', options: [
        { text: 'Super! Kann ich den Vertrag vorher von einem Anwalt prüfen lassen?', translation: 'Harika! Sözleşmeyi önceden bir avukatan incelatabilir miyim?', correct: true, feedback: '"Prüfen lassen" = incelatmak. Almanya\'da kira sözleşmesini avukattan geçirmek akıllıca!' },
        { text: 'Danke! Wie lange ist der Vertrag? Ein Jahr?', translation: 'Teşekkürler! Sözleşme ne kadar süre? Bir yıl mı?', correct: true, feedback: '"Wie lange ist der Vertrag?" = sözleşme ne kadar süre? Önemli soru!' },
        { text: 'Ich lese keine Verträge.', translation: 'Sözleşme okumam.', correct: false, feedback: 'Her zaman sözleşmeyi oku! "Danke, ich prüfe das" de.' }
      ]}
    ]
  },

  {
    id: 'bank',
    title: 'Bankada',
    icon: '🏦',
    color: '#1D3557',
    bg: '#F0F4FF',
    level: 'A2',
    situation: 'Almanya\'da bir bankaya gidiyorsun. Hesap açmak, kart başvurusu yapmak ve para transferi hakkında bilgi almak istiyorsun.',
    npcName: 'Bankmitarbeiter Herr Fischer',
    npcEmoji: '💼',
    turns: [
      { speaker: 'npc', text: 'Guten Tag! Womit kann ich Ihnen helfen?', translation: 'İyi günler! Size nasıl yardımcı olabilirim?' },
      { speaker: 'user', options: [
        { text: 'Guten Tag! Ich bin neu in Deutschland und möchte ein Konto eröffnen.', translation: 'İyi günler! Almanya\'da yeniyim ve hesap açmak istiyorum.', correct: true, feedback: '"Ich bin neu in Deutschland" = Almanya\'da yeniyim. Bankalara açıklayıcı başlangıç!' },
        { text: 'Ich möchte Geld überweisen.', translation: 'Para transfer etmek istiyorum.', correct: true, feedback: '"Überweisen" = havale/transfer etmek. Bankada temel kelime!' },
        { text: 'Haben Sie Geld?', translation: 'Paranız var mı?', correct: false, feedback: 'Bu komik bir soru! "Ich möchte ein Konto eröffnen" de.' }
      ]},
      { speaker: 'npc', text: 'Sehr gerne. Möchten Sie ein Girokonto oder ein Sparkonto?', translation: 'Memnuniyetle. Vadesiz hesap mı yoksa tasarruf hesabı mı?' },
      { speaker: 'user', options: [
        { text: 'Was ist der Unterschied? Können Sie das kurz erklären?', translation: 'Fark nedir? Kısaca açıklayabilir misiniz?', correct: true, feedback: '"Was ist der Unterschied?" = fark nedir? "Kurz erklären" = kısaca açıklamak. Harika!' },
        { text: 'Ein Girokonto bitte, für tägliche Zahlungen.', translation: 'Vadesiz hesap lütfen, günlük ödemeler için.', correct: true, feedback: '"Tägliche Zahlungen" = günlük ödemeler. Amacını açıkladın. Süper!' },
        { text: 'Ich weiß nicht, was ist besser?', translation: 'Bilmiyorum, hangisi daha iyi?', correct: true, feedback: 'Öneri istemek akıllıca. "Was empfehlen Sie?" daha resmi ama bu da doğru.' }
      ]},
      { speaker: 'npc', text: 'Girokonto ist für den Alltag, Sparkonto für das Sparen. Ich empfehle Ihnen zuerst ein Girokonto.', translation: 'Vadesiz günlük kullanım için, tasarruf biriktirmek için. Önce vadesiz hesap öneririm.' },
      { speaker: 'user', options: [
        { text: 'Gut, dann ein Girokonto bitte. Gibt es monatliche Gebühren?', translation: 'İyi, o zaman vadesiz hesap lütfen. Aylık ücret var mı?', correct: true, feedback: '"Monatliche Gebühren" = aylık ücretler. Almanya\'da bazı bankalar ücret alır!' },
        { text: 'Kann ich das Konto auch online nutzen?', translation: 'Hesabı online da kullanabilir miyim?', correct: true, feedback: '"Online nutzen" = online kullanmak. Online banking çok önemli!' },
        { text: 'Sparkonto klingt besser.', translation: 'Tasarruf hesabı daha iyi geliyor.', correct: false, feedback: '"Girokonto" günlük kullanım için şart. "Dann Girokonto bitte" de.' }
      ]},
      { speaker: 'npc', text: 'Das Konto ist kostenlos, wenn Sie monatlich 700 Euro einzahlen. Ansonsten 5 Euro pro Monat.', translation: 'Aylık 700 Euro yatırırsanız hesap ücretsiz. Aksi halde ayda 5 Euro.' },
      { speaker: 'user', options: [
        { text: 'Das schaffe ich. Ich habe ein festes Gehalt.', translation: 'Bunu başarabilirim. Düzenli maaşım var.', correct: true, feedback: '"Das schaffe ich" = bunu yapabilirim. "Festes Gehalt" = düzenli maaş. Harika!' },
        { text: 'Und wenn ich weniger einzahle?', translation: 'Daha az yatırırsam?', correct: true, feedback: '"Wenn ich weniger einzahle?" = daha az yatırırsam? Koşullu soru mükemmel!' },
        { text: '5 Euro ist zu teuer!', translation: '5 Euro çok pahalı!', correct: false, feedback: 'Aylık 5 Euro çok normal. "Das ist akzeptabel" de.' }
      ]},
      { speaker: 'npc', text: 'Welche Unterlagen haben Sie mitgebracht?', translation: 'Hangi belgeler getirdiniz?' },
      { speaker: 'user', options: [
        { text: 'Ich habe meinen Reisepass, die Meldebescheinigung und eine Gehaltsabrechnung dabei.', translation: 'Pasaportum, ikametgah belgeliğim ve maaş bordrom yanımda.', correct: true, feedback: '"Meldebescheinigung" = ikametgah belgesi. Almanya\'da banka için şart belgeler!' },
        { text: 'Nur meinen Pass. Was brauche ich noch?', translation: 'Sadece pasaportum. Başka ne lazım?', correct: true, feedback: '"Was brauche ich noch?" = başka ne lazım? Eksiği sormak çok akıllıca!' },
        { text: 'Nichts, ich brauche keine Unterlagen.', translation: 'Hiçbir şey, belgeye ihtiyacım yok.', correct: false, feedback: 'Banka her zaman belge ister! "Hier sind meine Dokumente" de.' }
      ]},
      { speaker: 'npc', text: 'Perfekt. Bitte füllen Sie dieses Formular aus. Möchten Sie auch eine EC-Karte?', translation: 'Mükemmel. Lütfen bu formu doldurun. Banka kartı da ister misiniz?' },
      { speaker: 'user', options: [
        { text: 'Ja bitte. Kann ich auch eine Kreditkarte beantragen?', translation: 'Evet lütfen. Kredi kartı da başvurusu yapabilir miyim?', correct: true, feedback: '"Beantragen" = başvurmak. Banka işlemlerinde çok kullanılan kelime!' },
        { text: 'Ja. Wie lange dauert es, bis die Karte kommt?', translation: 'Evet. Kartın gelmesi ne kadar sürer?', correct: true, feedback: '"Wie lange dauert es?" = ne kadar sürer? Pratik ve önemli!' },
        { text: 'Ich mag keine Formulare.', translation: 'Formları sevmiyorum.', correct: false, feedback: 'Mecburiyet var! "Natürlich, kein Problem" de.' }
      ]},
      { speaker: 'npc', text: 'Die EC-Karte kommt in 5-7 Werktagen. Haben Sie noch Fragen?', translation: 'EC kart 5-7 iş gününde gelir. Başka sorunuz var mı?' },
      { speaker: 'user', options: [
        { text: 'Ja. Wie kann ich Geld in die Türkei überweisen?', translation: 'Evet. Türkiye\'ye nasıl para gönderebilirim?', correct: true, feedback: '"Geld überweisen" = para göndermek. Yurt dışı transferi önemli bilgi!' },
        { text: 'Nein, danke. Alles klar. Schönen Tag noch!', translation: 'Hayır, teşekkürler. Her şey açık. Güzel günler!', correct: true, feedback: '"Alles klar" = her şey açık. "Schönen Tag" = güzel günler. Kibar kapanış!' },
        { text: 'Warum so lange?', translation: 'Neden bu kadar uzun?', correct: false, feedback: '5-7 gün normal. "Das ist in Ordnung" de.' }
      ]}
    ]
  },

  {
    id: 'gym',
    title: 'Spor Salonunda',
    icon: '💪',
    color: '#E63946',
    bg: '#FFF5F5',
    level: 'A2',
    situation: 'Bir spor salonuna üye olmak istiyorsun. Tesisleri gezmek, fiyatları öğrenmek ve üyelik başlatmak istiyorsun.',
    npcName: 'Fitnesstrainer Marco',
    npcEmoji: '🏋️',
    turns: [
      { speaker: 'npc', text: 'Hallo! Sind Sie das erste Mal hier?', translation: 'Merhaba! İlk kez mi burada?' },
      { speaker: 'user', options: [
        { text: 'Ja, ich interessiere mich für eine Mitgliedschaft. Kann ich mich umsehen?', translation: 'Evet, üyelikle ilgileniyorum. Etrafı gezebilir miyim?', correct: true, feedback: '"Ich interessiere mich für" = ilgileniyorum. "Mich umsehen" = etrafı görmek. Harika!' },
        { text: 'Ja. Was bieten Sie an?', translation: 'Evet. Ne sunuyorsunuz?', correct: true, feedback: '"Was bieten Sie an?" = ne sunuyorsunuz? Genel bilgi için iyi açılış!' },
        { text: 'Nein, ich komme oft hier.', translation: 'Hayır, sık sık buraya geliyorum.', correct: false, feedback: '"Sind Sie das erste Mal hier?" = ilk kez mi? İlk kez değilsen üyeliğin var demek!' }
      ]},
      { speaker: 'npc', text: 'Natürlich! Wir haben Gerätetraining, Kurse und einen Schwimmbad.', translation: 'Tabii! Alet antremaný, kurslar ve yüzme havuzumuz var.' },
      { speaker: 'user', options: [
        { text: 'Oh, ein Schwimmbad! Das ist toll. Ist der Eintritt inklusive?', translation: 'Oh, yüzme havuzu! Bu harika. Giriş dahil mi?', correct: true, feedback: '"Ist das inklusive?" = dahil mi? Üyelik detaylarını sormak önemli!' },
        { text: 'Welche Kurse gibt es? Yoga oder Pilates?', translation: 'Hangi kurslar var? Yoga veya Pilates?', correct: true, feedback: '"Welche Kurse gibt es?" = hangi kurslar var? Spesifik soru. Harika!' },
        { text: 'Ich schwimme nicht gern.', translation: 'Yüzmeyi sevmiyorum.', correct: false, feedback: 'Güzel ama "Was gibt es noch?" veya "Was kostet die Mitgliedschaft?" de.' }
      ]},
      { speaker: 'npc', text: 'Ja, alles inklusive. Kommen Sie, ich zeige Ihnen die Geräte.', translation: 'Evet, her şey dahil. Gelin, aletleri göstereyim.' },
      { speaker: 'user', options: [
        { text: 'Sehr gerne! Gibt es auch Personal Training?', translation: 'Çok memnuniyetle! Kişisel antrenör de var mı?', correct: true, feedback: '"Personal Training" = kişisel antrenör. Almanca\'da da aynı kelime!' },
        { text: 'Danke! Wie viele Mitglieder hat das Studio?', translation: 'Teşekkürler! Kaç üyeniz var?', correct: true, feedback: 'Kapasite önemli — kalabalık mı acaba?' },
        { text: 'Nein danke, ich kenne mich aus.', translation: 'Hayır teşekkürler, biliyorum.', correct: false, feedback: 'İlk kez geldiniz! "Ja gerne!" de.' }
      ]},
      { speaker: 'npc', text: 'Die Geräte sind modern. Jetzt zu den Preisen: Basis 29, Standard 45, Premium 65 Euro pro Monat.', translation: 'Aletler modern. Şimdi fiyatlara: Temel 29, Standart 45, Premium 65 Euro aylık.' },
      { speaker: 'user', options: [
        { text: 'Was ist der Unterschied zwischen Standard und Premium?', translation: 'Standart ve Premium arasındaki fark nedir?', correct: true, feedback: '"Der Unterschied" = fark. Bilinçli seçim yapıyorsun!' },
        { text: 'Gibt es einen Probemonat? Ich möchte es erst testen.', translation: 'Deneme ayı var mı? Önce test etmek istiyorum.', correct: true, feedback: '"Probemonat" = deneme ayı. Almanya\'da pek çok spor salonu sunar!' },
        { text: 'Alle sind zu teuer!', translation: 'Hepsi çok pahalı!', correct: false, feedback: 'Şehire göre normal fiyatlar. "Was ist im Premium inklusive?" de.' }
      ]},
      { speaker: 'npc', text: 'Premium hat zusätzlich Sauna, Solarien und unbegrenzte Kurse.', translation: 'Premium ayrıca sauna, solaryum ve sınırsız kurs içeriyor.' },
      { speaker: 'user', options: [
        { text: 'Ich nehme Standard. Wie lange ist die Mindestlaufzeit?', translation: 'Standart alıyorum. Minimum sözleşme süresi ne kadar?', correct: true, feedback: '"Mindestlaufzeit" = minimum süre. Sözleşme öncesi çok kritik soru!' },
        { text: 'Sauna klingt toll. Ich nehme Premium.', translation: 'Sauna harika geliyor. Premium alıyorum.', correct: true, feedback: 'Sauna Almanya\'da çok seviliyor! Karar verdin.' },
        { text: 'Sauna ist nicht gesund.', translation: 'Sauna sağlıklı değil.', correct: false, feedback: 'Aksine, sauna çok sağlıklı! "Ich nehme Standard" de.' }
      ]},
      { speaker: 'npc', text: 'Mindestlaufzeit ist 6 Monate. Danach monatlich kündbar.', translation: 'Minimum süre 6 ay. Sonrasında aylık iptal edilebilir.' },
      { speaker: 'user', options: [
        { text: 'Gut. Kann ich heute anfangen? Ich habe meine Sporttasche dabei.', translation: 'İyi. Bugün başlayabilir miyim? Spor çantam yanımda.', correct: true, feedback: '"Ich habe dabei" = yanımda var. Hazırlıklısın! Hevesli tutum.' },
        { text: 'Und wenn ich kündigen möchte — wie geht das?', translation: 'İptal etmek istersem — nasıl yapılır?', correct: true, feedback: '"Kündigen" = iptal etmek/feshetmek. Önceden öğrenmek akıllıca!' },
        { text: '6 Monate ist zu lang!', translation: '6 ay çok uzun!', correct: false, feedback: 'Almanya\'da standart süre. "Das ist in Ordnung" de.' }
      ]},
      { speaker: 'npc', text: 'Natürlich! Bitte füllen Sie diesen Anmeldebogen aus. Ein Passfoto brauchen wir auch.', translation: 'Tabii! Lütfen bu kayıt formunu doldurun. Bir de vesikalık fotoğraf lazım.' },
      { speaker: 'user', options: [
        { text: 'Kein Problem! Ich habe ein Foto auf dem Handy. Geht das auch digital?', translation: 'Sorun değil! Telefonda fotoğrafım var. Dijital de olur mu?', correct: true, feedback: '"Geht das auch digital?" = dijital de olur mu? Modern ve pratik soru!' },
        { text: 'Wo kann ich in der Nähe ein Passfoto machen?', translation: 'Buralarda vesikalık nerede çektirebilirim?', correct: true, feedback: '"In der Nähe" = yakın çevrede. Almanya\'da Fotoautomat her yerde var!' },
        { text: 'Ich habe kein Foto.', translation: 'Fotoğrafım yok.', correct: false, feedback: '"Wo kann ich ein Passfoto machen?" de ya da "Geht es ohne Foto?" de.' }
      ]}
    ]
  },

  {
    id: 'library',
    title: 'Kütüphanede',
    icon: '📚',
    color: '#6B4226',
    bg: '#FFF9F5',
    level: 'A1',
    situation: 'Alman şehir kütüphanesine gidiyorsun. Kart yaptırmak, kitap bulmak ve iade kurallarını öğrenmek istiyorsun.',
    npcName: 'Bibliothekarin Frau Hoffmann',
    npcEmoji: '📖',
    turns: [
      { speaker: 'npc', text: 'Guten Tag! Kann ich Ihnen helfen?', translation: 'İyi günler! Yardımcı olabilir miyim?' },
      { speaker: 'user', options: [
        { text: 'Ja bitte. Ich möchte einen Bibliotheksausweis beantragen.', translation: 'Evet lütfen. Kütüphane kartı başvurusu yapmak istiyorum.', correct: true, feedback: '"Bibliotheksausweis beantragen" = kütüphane kartı başvurusu. Resmi ve doğru!' },
        { text: 'Ich suche Bücher für Deutschlerner. Können Sie helfen?', translation: 'Almanca öğrenenler için kitap arıyorum. Yardımcı olabilir misiniz?', correct: true, feedback: 'Direkt amaçla girdin. "Für Deutschlerner" = Almanca öğrenenler için. Harika!' },
        { text: 'Wo sind die Bücher?', translation: 'Kitaplar nerede?', correct: false, feedback: 'Çok genel. "Ich möchte einen Ausweis" veya "Ich suche..." de.' }
      ]},
      { speaker: 'npc', text: 'Natürlich! Haben Sie einen deutschen Ausweis oder Reisepass?', translation: 'Tabii ki! Alman kimliğiniz ya da pasaportunuz var mı?' },
      { speaker: 'user', options: [
        { text: 'Ich habe meinen türkischen Reisepass und die Meldebescheinigung.', translation: 'Türk pasaportum ve ikametgah belgem var.', correct: true, feedback: '"Meldebescheinigung" = ikametgah belgesi. Almanya\'da kütüphane için yeterli!' },
        { text: 'Nur meinen Reisepass. Reicht das?', translation: 'Sadece pasaportum. Yeterli mi?', correct: true, feedback: '"Reicht das?" = yeterli mi? Önemli kontrol sorusu!' },
        { text: 'Ich habe keine Dokumente.', translation: 'Belgem yok.', correct: false, feedback: 'Pasaportun varsa getir. "Ich habe meinen Reisepass" de.' }
      ]},
      { speaker: 'npc', text: 'Reisepass reicht. Ist die Bibliothekskarte kostenlos — aber bitte füllen Sie dieses Formular aus.', translation: 'Pasaport yeterli. Kütüphane kartı ücretsiz — ama lütfen bu formu doldurun.' },
      { speaker: 'user', options: [
        { text: 'Oh, kostenlos! Das ist super. Ich fülle das Formular gerne aus.', translation: 'Oh, ücretsiz! Bu harika. Formu memnuniyetle doldururum.', correct: true, feedback: '"Ich fülle gerne aus" = memnuniyetle doldururum. İşbirlikçi tutum!' },
        { text: 'Kann ich das Formular auch online ausfüllen?', translation: 'Formu online da doldurabilir miyim?', correct: true, feedback: 'Modern soru! Almanya\'da dijitalleşme sürüyor.' },
        { text: 'Ich mag keine Formulare.', translation: 'Formları sevmiyorum.', correct: false, feedback: 'Kütüphane kartı için zorunlu. "Natürlich" de.' }
      ]},
      { speaker: 'npc', text: 'Sehr gut. Mit diesem Ausweis können Sie bis zu 10 Bücher ausleihen.', translation: 'Çok iyi. Bu kartla 10 kitaba kadar ödünç alabilirsiniz.' },
      { speaker: 'user', options: [
        { text: 'Wie lange darf ich die Bücher behalten?', translation: 'Kitapları ne kadar süre tutabilirim?', correct: true, feedback: '"Wie lange darf ich...?" = ne kadar süre ...yapabilirim? En önemli soru!' },
        { text: 'Kann ich auch DVDs oder CDs ausleihen?', translation: 'DVD ya da CD de ödünç alabilir miyim?', correct: true, feedback: '"Ausleihen" = ödünç almak. Almanya kütüphaneleri çok çeşitli!' },
        { text: '10 Bücher sind zu wenig.', translation: '10 kitap çok az.', correct: false, feedback: '10 kitap oldukça fazla! "Das ist sehr großzügig" de.' }
      ]},
      { speaker: 'npc', text: 'Vier Wochen. Sie können sie einmal verlängern — entweder hier oder online.', translation: 'Dört hafta. Bir kez uzatabilirsiniz — burada ya da online.' },
      { speaker: 'user', options: [
        { text: 'Online verlängern — das ist praktisch! Wie funktioniert das?', translation: 'Online uzatmak — çok pratik! Bu nasıl işliyor?', correct: true, feedback: '"Wie funktioniert das?" = nasıl işliyor? Sistemleri öğrenmek harika!' },
        { text: 'Und was passiert, wenn ich die Bücher zu spät zurückbringe?', translation: 'Kitapları geç getirirsem ne olur?', correct: true, feedback: '"Was passiert wenn...?" = ne olur eğer? Ceza sistemi önemli!' },
        { text: 'Vier Wochen reichen nicht.', translation: 'Dört hafta yetmez.', correct: false, feedback: 'Uzatabilirsin! "Danke, das ist gut" de.' }
      ]},
      { speaker: 'npc', text: 'Bei Verspätung zahlen Sie 50 Cent pro Tag und Buch. Möchten Sie gleich Bücher ausleihen?', translation: 'Gecikme durumunda kitap başına günde 50 cent ödersiniz. Hemen kitap almak ister misiniz?' },
      { speaker: 'user', options: [
        { text: 'Ja! Ich suche Bücher für Deutschlerner — Niveau A2. Können Sie mir etwas empfehlen?', translation: 'Evet! A2 seviyesinde Almanca öğrenenler için kitap arıyorum. Bir şey önerir misiniz?', correct: true, feedback: '"Niveau A2" = A2 seviyesi. Seviye belirtmek çok akıllıca!' },
        { text: 'Wo ist der Computerbereich? Ich möchte im Katalog suchen.', translation: 'Bilgisayar alanı nerede? Katalogda aramak istiyorum.', correct: true, feedback: '"Katalog" = katalog. Bağımsız arama yapıyorsun. Harika!' },
        { text: 'Nein, ich schaue mich erst um.', translation: 'Hayır, önce etrafı geziyorum.', correct: true, feedback: '"Ich schaue mich um" = etrafı geziyorum. Bağımsız keşif!' }
      ]},
      { speaker: 'npc', text: 'Für A2 empfehle ich "Deutsch als Fremdsprache A2" von Hueber. Sehr beliebt bei unseren Lernern.', translation: 'A2 için Hueber\'in "Deutsch als Fremdsprache A2"\'sini öneririm. Öğrencilerimiz arasında çok popüler.' },
      { speaker: 'user', options: [
        { text: 'Super! Und gibt es auch Hörbücher oder Lernkassetten?', translation: 'Harika! Sesli kitap ya da dil kasetleri de var mı?', correct: true, feedback: '"Hörbücher" = sesli kitaplar. Dil öğrenmek için mükemmel kaynak!' },
        { text: 'Wo finde ich das Buch? In welchem Regal?', translation: 'Kitabı nerede bulabilirim? Hangi rafta?', correct: true, feedback: '"In welchem Regal?" = hangi rafta? Pratik soru!' },
        { text: 'Ich kenne dieses Buch schon.', translation: 'Bu kitabı zaten biliyorum.', correct: false, feedback: '"Was empfehlen Sie noch?" (başka ne önerirsiniz?) de.' }
      ]}
    ]
  },

  {
    id: 'neighbor',
    title: 'Komşuyla Konuşma',
    icon: '🏘️',
    color: '#2D6A4F',
    bg: '#F0FFF4',
    level: 'A2',
    situation: 'Yeni taşındın. Apartman komşunla tanışıyor, apartman kurallarını öğreniyor ve yardım istiyorsun.',
    npcName: 'Nachbarin Frau Wagner',
    npcEmoji: '👩',
    turns: [
      { speaker: 'npc', text: 'Oh, Sie sind eingezogen! Herzlich willkommen! Ich bin Frau Wagner, Wohnung 3.', translation: 'Oh, taşındınız! Hoş geldiniz! Ben Bayan Wagner, 3 numaradan.' },
      { speaker: 'user', options: [
        { text: 'Vielen Dank! Ich bin Cem Yilmaz, Wohnung 5. Freut mich sehr!', translation: 'Çok teşekkürler! Ben Cem Yılmaz, 5 numaradan. Çok memnun oldum!', correct: true, feedback: 'İsim + oda numarası. Apartmanda standart tanışma!' },
        { text: 'Danke! Das Haus ist sehr schön. Wohnen Sie schon lange hier?', translation: 'Teşekkürler! Bina çok güzel. Uzun süredir burada mı yaşıyorsunuz?', correct: true, feedback: '"Wohnen Sie schon lange?" = uzun süredir mı yaşıyorsunuz? Sohbet açıcı!' },
        { text: 'Hallo.', translation: 'Merhaba.', correct: false, feedback: 'Daha sıcak ol! İsmini söyle ve "Freut mich!" de.' }
      ]},
      { speaker: 'npc', text: 'Ich wohne seit 15 Jahren hier. Aus welchem Land kommen Sie?', translation: '15 yıldır burada yaşıyorum. Hangi ülkeden geliyorsunuz?' },
      { speaker: 'user', options: [
        { text: 'Aus der Türkei. Ich bin vor drei Monaten nach Deutschland gekommen.', translation: 'Türkiye\'den. Üç ay önce Almanya\'ya geldim.', correct: true, feedback: '"Ich bin gekommen" = geldim (Perfekt). "Vor drei Monaten" = üç ay önce. Süper!' },
        { text: 'Aus der Türkei, aus Istanbul. Eine schöne Stadt, kennen Sie sie?', translation: 'Türkiye\'den, İstanbul\'dan. Güzel bir şehir, tanıyor musunuz?', correct: true, feedback: '"Kennen Sie sie?" = tanıyor musunuz? Karşılıklı ilgi gösteriyorsun!' },
        { text: 'Das ist privat.', translation: 'Bu kişisel.', correct: false, feedback: 'Komşuya söylemek sorun değil. "Aus der Türkei" de.' }
      ]},
      { speaker: 'npc', text: 'Wie schön! Übrigens, darf ich Ihnen ein paar Tipps über das Haus geben?', translation: 'Ne güzel! Bu arada, size ev hakkında birkaç ipucu versem olur mu?' },
      { speaker: 'user', options: [
        { text: 'Ja, sehr gerne! Das wäre sehr hilfreich.', translation: 'Evet, çok memnuniyetle! Bu çok yardımcı olur.', correct: true, feedback: '"Das wäre sehr hilfreich" = çok yardımcı olur. Koşullu kip!)' },
        { text: 'Natürlich, ich höre gerne zu.', translation: 'Tabii ki, dinlemekten memnunum.', correct: true, feedback: '"Ich höre gerne zu" = dinlemekten memnunum. Kibarca kabul ettin!' },
        { text: 'Nein danke, ich kenne alles.', translation: 'Hayır teşekkürler, her şeyi biliyorum.', correct: false, feedback: 'Yeni taşındın! "Ja, gerne!" de.' }
      ]},
      { speaker: 'npc', text: 'Die Mülltrennung ist sehr wichtig. Gelb für Plastik, Blau für Papier, Grün für Glas.', translation: 'Çöp ayrıştırması çok önemli. Sarı plastik için, mavi kağıt için, yeşil cam için.' },
      { speaker: 'user', options: [
        { text: 'Vielen Dank! Und was ist mit Bioabfall und Restmüll?', translation: 'Çok teşekkürler! Organik atık ve karma çöp ne olacak?', correct: true, feedback: '"Bioabfall" = organik atık. Almanya\'da çöp ayrıştırması çok kapsamlı!' },
        { text: 'Gelb Plastik, Blau Papier, Grün Glas — ich schreibe das auf!', translation: 'Sarı plastik, mavi kağıt, yeşil cam — bunu yazıyorum!', correct: true, feedback: 'Not almak harika! "Ich schreibe das auf" = bunu yazıyorum.' },
        { text: 'In der Türkei machen wir das nicht.', translation: 'Türkiye\'de bunu yapmıyoruz.', correct: false, feedback: 'Almanya\'da kural bu! "Ich versuche es" de.' }
      ]},
      { speaker: 'npc', text: 'Braun für Bioabfall, Grau für Restmüll. Und Ruhezeiten: 22-7 Uhr und Sonntags ganztägig.', translation: 'Kahverengi organik atık için, gri karma çöp için. Ve sessizlik saatleri: 22-7 arası ve pazar tüm gün.' },
      { speaker: 'user', options: [
        { text: 'Alles klar. Gibt es auch einen Keller oder Fahrradkeller?', translation: 'Tamam. Bodrum ya da bisiklet deposu var mı?', correct: true, feedback: '"Fahrradkeller" = bisiklet deposu. Almanya\'da bisiklet çok yaygın!' },
        { text: 'Verstanden. Ich bin sowieso leise. Ich arbeite früh morgens.', translation: 'Anladım. Zaten sessizim. Sabah erken çalışıyorum.', correct: true, feedback: '"Ich bin sowieso leise" = zaten sessizim. Komşunu rahatlatıyorsun!' },
        { text: 'Sonntags keine Ruhe? Das ist unmöglich.', translation: 'Pazar günleri sessizlik yok mu? Bu imkansız.', correct: false, feedback: 'Pazar günü TAM GÜN sessizlik var! "Alles klar, ich beachte das" de.' }
      ]},
      { speaker: 'npc', text: 'Ja, im Keller sind Fahrradstellplätze. Haben Sie Kinder? Wir haben einen schönen Spielplatz.', translation: 'Evet, bodrum katta bisiklet park yerleri var. Çocuğunuz var mı? Güzel bir oyun alanımız var.' },
      { speaker: 'user', options: [
        { text: 'Nein, (noch) keine Kinder. Aber der Spielplatz klingt schön für Besucher.', translation: 'Hayır, (henüz) çocuk yok. Ama oyun alanı misafirler için güzel geliyor.', correct: true, feedback: '"Noch keine" = henüz yok. "Klingt schön" = güzel geliyor. Doğal sohbet!' },
        { text: 'Ja, ich habe einen Sohn. Er ist 5 Jahre alt.', translation: 'Evet, bir oğlum var. 5 yaşında.', correct: true, feedback: '"Er ist 5 Jahre alt" = 5 yaşında. Komşular bunu çok sevdi!' },
        { text: 'Kinder sind laut.', translation: 'Çocuklar gürültülüdür.', correct: false, feedback: 'Konu dışı ve komşuyu rencide edebilir. "Nein, keine Kinder" de.' }
      ]},
      { speaker: 'npc', text: 'Falls Sie Fragen haben, klopfen Sie einfach! Ich helfe gerne.', translation: 'Sorularınız olursa kapıyı çalın! Seve seve yardım ederim.' },
      { speaker: 'user', options: [
        { text: 'Das ist sehr nett von Ihnen! Ich bringe Ihnen etwas Türkisches mit.', translation: 'Bu çok nazik sizden! Size Türkçe bir şey getireyim.', correct: true, feedback: '"Ich bringe etwas mit" = bir şey getireyim. Bu komşulara karşı çok sıcak bir jest!' },
        { text: 'Vielen Dank Frau Wagner! Ich freue mich, eine so nette Nachbarin zu haben.', translation: 'Çok teşekkürler Bayan Wagner! Bu kadar nazik bir komşum olduğuna sevindim.', correct: true, feedback: '"Eine nette Nachbarin" = nazik bir komşu. Muhteşem iltifat!' },
        { text: 'Okay, danke.', translation: 'Tamam, teşekkürler.', correct: false, feedback: 'Daha sıcak! "Das ist sehr freundlich!" de.' }
      ]}
    ]
  },

  {
    id: 'haircut',
    title: 'Kuaförde',
    icon: '✂️',
    color: '#9B5DE5',
    bg: '#FBF5FF',
    level: 'A1',
    situation: 'Alman bir kuaföre gidiyorsun. Saçını kestirmek, renk sormak ve memnuniyetini ifade etmek istiyorsun.',
    npcName: 'Friseurin Sandra',
    npcEmoji: '💈',
    turns: [
      { speaker: 'npc', text: 'Hallo! Haben Sie einen Termin?', translation: 'Merhaba! Randevunuz var mı?' },
      { speaker: 'user', options: [
        { text: 'Ja, ich habe einen Termin um 14 Uhr. Mein Name ist Yilmaz.', translation: 'Evet, saat 14\'te randevum var. Adım Yılmaz.', correct: true, feedback: 'Randevu saatini ve adını söyledin. Mükemmel!' },
        { text: 'Nein, aber haben Sie gerade Zeit? Ich brauche einen Haarschnitt.', translation: 'Hayır, ama şu an vaktiniz var mı? Saç kestirmem lazım.', correct: true, feedback: '"Ich brauche einen Haarschnitt" = saç kestirmem lazım. Direkt ve anlaşılır!' },
        { text: 'Ich möchte schön aussehen.', translation: 'Güzel görünmek istiyorum.', correct: false, feedback: '"Ich möchte einen Haarschnitt" veya "Haben Sie einen Termin frei?" de.' }
      ]},
      { speaker: 'npc', text: 'Ja, bitte nehmen Sie Platz. Was möchten Sie heute machen lassen?', translation: 'Evet, lütfen oturun. Bugün ne yaptırmak istiyorsunuz?' },
      { speaker: 'user', options: [
        { text: 'Ich möchte nur die Spitzen schneiden — nicht zu kurz.', translation: 'Sadece uçları kestirmek istiyorum — çok kısa değil.', correct: true, feedback: '"Nur die Spitzen" = sadece uçlar. "Nicht zu kurz" = çok kısa değil. Harika tarif!' },
        { text: 'Ich möchte eine neue Frisur. Können Sie mir etwas empfehlen?', translation: 'Yeni bir saç stili istiyorum. Bir şey önerebilir misiniz?', correct: true, feedback: '"Eine neue Frisur" = yeni bir saç stili. "Empfehlen" = önermek. Harika!' },
        { text: 'Alles schneiden, bitte.', translation: 'Hepsini kesin, lütfen.', correct: false, feedback: 'Çok kısa kalabilir! "Nur die Spitzen" veya "ungefähr... cm" de.' }
      ]},
      { speaker: 'npc', text: 'Wie viel soll ich abschneiden? Zwei Zentimeter?', translation: 'Ne kadar keseyim? İki santimetre?' },
      { speaker: 'user', options: [
        { text: 'Ja, ungefähr zwei Zentimeter. Aber bitte nicht mehr.', translation: 'Evet, yaklaşık iki santimetre. Ama lütfen daha fazla değil.', correct: true, feedback: '"Aber bitte nicht mehr" = ama lütfen daha fazla değil. Kendi isteğini koruyorsun!' },
        { text: 'Hmm, vielleicht drei? Ich möchte es etwas kürzer.', translation: 'Hmm, belki üç? Biraz daha kısa olmak istiyorum.', correct: true, feedback: '"Etwas kürzer" = biraz daha kısa. Düşünüp karar verdin!' },
        { text: 'Ich weiß nicht.', translation: 'Bilmiyorum.', correct: false, feedback: 'Karar ver! "Ungefähr zwei Zentimeter" de.' }
      ]},
      { speaker: 'npc', text: 'Alles klar. Möchten Sie auch die Farbe ändern? Wir haben schöne Highlights.', translation: 'Peki. Rengi de değiştirmek ister misiniz? Güzel röflerimiz var.' },
      { speaker: 'user', options: [
        { text: 'Nein danke, ich möchte nur schneiden. Keine Farbe heute.', translation: 'Hayır teşekkürler, sadece kestirmek istiyorum. Bugün renk yok.', correct: true, feedback: 'Net ve kararlı. "Nur schneiden" ile sadık kaldın!' },
        { text: 'Highlights klingen interessant! Was würde zu mir passen?', translation: 'Röfleler ilginç geliyor! Bana ne yakışır?', correct: true, feedback: '"Was würde zu mir passen?" = bana ne yakışır? Profesyonele sormak mantıklı!' },
        { text: 'Farbe ist nicht gesund.', translation: 'Boyama sağlıklı değil.', correct: false, feedback: '"Nein danke, nur schneiden" de.' }
      ]},
      { speaker: 'npc', text: 'Verstanden. Möchten Sie auch die Haare waschen?', translation: 'Anladım. Saçları yıkamamı da ister misiniz?' },
      { speaker: 'user', options: [
        { text: 'Ja, gerne. Ist das im Preis inklusive?', translation: 'Evet, memnuniyetle. Bu fiyata dahil mi?', correct: true, feedback: '"Im Preis inklusive?" = fiyata dahil mi? Almanya\'da bazen ek ücret!' },
        { text: 'Nein danke, ich habe heute Morgen geduscht.', translation: 'Hayır teşekkürler, bugün sabah duş aldım.', correct: true, feedback: 'Dürüst ve net. "Ich habe geduscht" = duş aldım (Perfekt)!' },
        { text: 'Ich wasche selbst.', translation: 'Kendim yıkarım.', correct: false, feedback: 'Kuaförde yıkamak için söyliyor! "Ja bitte" veya "Nein danke" de.' }
      ]},
      { speaker: 'npc', text: 'Es kostet drei Euro extra. (Nach dem Schneiden): So, fertig! Wie gefällt es Ihnen?', translation: '3 Euro ek ücret. (Kesimden sonra): İşte, bitti! Nasıl buldunuz?' },
      { speaker: 'user', options: [
        { text: 'Sehr schön! Genau so wollte ich es. Vielen Dank!', translation: 'Çok güzel! Tam istediğim gibi. Çok teşekkürler!', correct: true, feedback: '"Genau so wollte ich es" = tam istediğim gibi. En iyi iltifat!' },
        { text: 'Fast gut — können Sie links noch ein bisschen mehr nehmen?', translation: 'Neredeyse iyi — solunu biraz daha alabilir misiniz?', correct: true, feedback: '"Fast gut" = neredeyse iyi. Detayı düzeltmek çok doğal!' },
        { text: 'Es ist okay.', translation: 'İdare eder.', correct: false, feedback: '"Es ist schön!" veya "Sehr gut, danke!" de. Daha pozitif ol!' }
      ]},
      { speaker: 'npc', text: 'Das freut mich! Das macht 28 Euro bitte.', translation: 'Çok sevindim! 28 Euro lütfen.' },
      { speaker: 'user', options: [
        { text: 'Hier sind 30 Euro. Stimmt so — das ist für Sie.', translation: 'İşte 30 Euro. Üstü kalsın — bu sizin için.', correct: true, feedback: '"Das ist für Sie" = bu sizin için. Bahşiş vermenin nazik yolu!' },
        { text: 'Kann ich mit Karte zahlen?', translation: 'Kartla ödeyebilir miyim?', correct: true, feedback: 'Almanya\'da bazı kuaförler sadece nakit! Sormak akıllıca.' },
        { text: '28 Euro ist zu teuer!', translation: '28 Euro çok pahalı!', correct: false, feedback: 'Kuaför fiyatı için normal. "Hier, bitte" de.' }
      ]}
    ]
  },

  {
    id: 'pharmacy',
    title: 'Eczanede',
    icon: '💊',
    color: '#2A9D8F',
    bg: '#F0FFFC',
    level: 'A2',
    situation: 'Baş ağrısı, mide bulantısı ve ateşle eczaneye gidiyorsun. İlaç almak, dozaj öğrenmek ve sigorta kartını kullanmak istiyorsun.',
    npcName: 'Apothekerin Frau Braun',
    npcEmoji: '⚕️',
    turns: [
      { speaker: 'npc', text: 'Guten Tag! Kann ich Ihnen helfen?', translation: 'İyi günler! Yardımcı olabilir miyim?' },
      { speaker: 'user', options: [
        { text: 'Ja, ich fühle mich nicht gut. Ich habe Kopfschmerzen und Fieber.', translation: 'Evet, kendimi iyi hissetmiyorum. Baş ağrım ve ateşim var.', correct: true, feedback: '"Ich fühle mich nicht gut" = iyi hissetmiyorum. "Fieber" = ateş. Harika semptom tarifi!' },
        { text: 'Ich brauche etwas gegen Schmerzen.', translation: 'Ağrıya karşı bir şeye ihtiyacım var.', correct: true, feedback: '"Etwas gegen" = ...karşı bir şey. Eczanede çok kullanışlı kalıp!' },
        { text: 'Haben Sie Aspirin?', translation: 'Aspirin var mı?', correct: true, feedback: 'Direkt! Almanya\'da aspirin reçetesiz satılır.' }
      ]},
      { speaker: 'npc', text: 'Das tut mir leid. Haben Sie noch andere Beschwerden?', translation: 'Üzüldüm. Başka şikayetiniz var mı?' },
      { speaker: 'user', options: [
        { text: 'Ja, mir ist auch ein bisschen schlecht. Und ich bin sehr müde.', translation: 'Evet, biraz da midem bulanıyor. Ve çok yorgunum.', correct: true, feedback: '"Mir ist schlecht" = midem bulanıyor. "Müde" = yorgun. Detaylı tanım!' },
        { text: 'Nein, nur der Kopf. Seit heute Morgen.', translation: 'Hayır, sadece baş. Bugün sabahtan beri.', correct: true, feedback: '"Seit heute Morgen" = bugün sabahtan beri. Zamanı belirtmek çok önemli!' },
        { text: 'Ich weiß nicht genau.', translation: 'Tam bilmiyorum.', correct: false, feedback: 'Belirtilerini düşün. "Kopfschmerzen und Fieber" de en azından.' }
      ]},
      { speaker: 'npc', text: 'Haben Sie die Temperatur gemessen?', translation: 'Ateşinizi ölçtünüz mü?' },
      { speaker: 'user', options: [
        { text: 'Ja, heute Morgen hatte ich 38,5 Grad.', translation: 'Evet, bugün sabah 38,5 dereceydi.', correct: true, feedback: '"Ich hatte" = vardı (geçmiş). "Grad" = derece. Doğru Almanca!' },
        { text: 'Nein, aber ich fühle mich sehr heiß.', translation: 'Hayır, ama kendimi çok sıcak hissediyorum.', correct: true, feedback: '"Ich fühle mich heiß" = kendimi sıcak hissediyorum. Belirtiden söylüyor!' },
        { text: 'Fieber ist normal.', translation: 'Ateş normal.', correct: false, feedback: 'Hayır, değil! "Ungefähr 38 Grad" veya "Ich weiß nicht genau" de.' }
      ]},
      { speaker: 'npc', text: 'Ich empfehle Ibuprofen 400mg — das hilft gegen Kopfschmerzen und senkt das Fieber.', translation: 'İbuprofen 400mg öneririm — baş ağrısına karşı yardımcı olur ve ateşi düşürür.' },
      { speaker: 'user', options: [
        { text: 'Wie oft soll ich es nehmen? Und mit oder ohne Essen?', translation: 'Ne sıklıkla almalıyım? Yemekle mi yoksa yemeksiz mi?', correct: true, feedback: '"Wie oft?" = ne sıklıkla? "Mit oder ohne Essen?" = yemekle mi? Çok önemli sorular!' },
        { text: 'Gibt es eine Alternative? Ich nehme lieber Paracetamol.', translation: 'Alternatif var mı? Parasetamol almayı tercih ederim.', correct: true, feedback: '"Ich nehme lieber" = daha çok tercih ederim. Kendi tercihin var!' },
        { text: 'Ist das rezeptpflichtig?', translation: 'Reçeteli mi?', correct: true, feedback: '"Rezeptpflichtig" = reçeteli. Almanya\'da 400mg üzeri reçeteli olabilir!' }
      ]},
      { speaker: 'npc', text: 'Dreimal täglich nach dem Essen, nicht mehr als 3 Tabletten pro Tag. Viel Wasser trinken.', translation: 'Günde üç kez yemekten sonra, günde 3 tabletten fazla değil. Bol su için.' },
      { speaker: 'user', options: [
        { text: 'Wie lange soll ich es nehmen?', translation: 'Ne kadar süre almalıyım?', correct: true, feedback: '"Wie lange?" = ne kadar süre? İlaçta çok kritik!' },
        { text: 'Soll ich zum Arzt gehen, wenn es nicht besser wird?', translation: 'İyileşmezsem doktora gitmeli miyim?', correct: true, feedback: '"Wenn es nicht besser wird" = iyileşmezse. Koşullu öneri sormak akıllıca!' },
        { text: 'Wasser trinke ich nicht gern.', translation: 'Suyu pek sevmiyorum.', correct: false, feedback: 'İlaçla su içmek çok önemli. "Verstanden, danke" de.' }
      ]},
      { speaker: 'npc', text: 'Maximal 5 Tage. Wenn nicht besser — unbedingt zum Arzt. Haben Sie eine Krankenkassenkarte?', translation: 'En fazla 5 gün. İyileşmezse — mutlaka doktora. Sağlık sigorta kartınız var mı?' },
      { speaker: 'user', options: [
        { text: 'Ja, hier ist meine AOK-Karte.', translation: 'Evet, işte AOK kartım.', correct: true, feedback: '"AOK-Karte" = devlet sağlık sigortası kartı. Almanya\'da en yaygın sigorta!' },
        { text: 'Ich bin Privatpatient. Muss ich bar zahlen?', translation: 'Özel sigortayım. Nakit mi ödemem lazım?', correct: true, feedback: '"Privatpatient" = özel sigortalı. "Bar zahlen" = nakit ödemek. Doğru soru!' },
        { text: 'Ich habe keine Krankenversicherung.', translation: 'Sağlık sigortam yok.', correct: false, feedback: 'Almanya\'da sigortasız olmak zor. Eczane de sigortasız satabilir ama daha pahalı.' }
      ]},
      { speaker: 'npc', text: 'Danke. Mit Krankenkasse zahlen Sie nur 5 Euro Zuzahlung. Gute Besserung!', translation: 'Teşekkürler. Sigortayla sadece 5 Euro katkı payı ödersiniz. Geçmiş olsun!' },
      { speaker: 'user', options: [
        { text: 'Danke! Und kann ich auch ein Hustenmittel kaufen? Ich habe auch leichten Husten.', translation: 'Teşekkürler! Öksürük ilacı da alabilir miyim? Hafif öksürüğüm de var.', correct: true, feedback: '"Hustenmittel" = öksürük ilacı. Unutmuşsun ve şimdi soruyorsun. Doğal!' },
        { text: 'Vielen Dank für die Beratung! Auf Wiedersehen.', translation: 'Danışmanlık için çok teşekkürler! Hoşça kalın.', correct: true, feedback: '"Danke für die Beratung" = danışmanlık için teşekkürler. Eczacının bilgisi değerlidir!' },
        { text: '5 Euro ist zu teuer.', translation: '5 Euro çok pahalı.', correct: false, feedback: '5 Euro muazzam ucuz bir katkı payı! "Danke, alles klar" de.' }
      ]}
    ]
  },

  {
    id: 'weather_talk',
    title: 'Hava Hakkında Sohbet',
    icon: '🌤️',
    color: '#457B9D',
    bg: '#F0F8FF',
    level: 'A1',
    situation: 'Otobüs durağında beklerken yanındaki yaşlı bir beyefendiyle sohbet ediyorsun. Hava, şehir ve Almanya hakkında konuşuyorsunuz.',
    npcName: 'Herr Schmidt (Yanındaki kişi)',
    npcEmoji: '🧔',
    turns: [
      { speaker: 'npc', text: 'Ach, was für ein schlechtes Wetter! Regen schon seit einer Woche.', translation: 'Ah, ne kötü hava! Bir haftadır yağmur.' },
      { speaker: 'user', options: [
        { text: 'Ja, wirklich! In der Türkei ist das Wetter viel besser.', translation: 'Evet, gerçekten! Türkiye\'de hava çok daha iyi.', correct: true, feedback: 'Karşılaştırma yapıyorsun! "Viel besser" = çok daha iyi. Harika!' },
        { text: 'Ja, es regnet viel. Aber ich mag Regen — er ist ruhig.', translation: 'Evet, çok yağıyor. Ama yağmuru seviyorum — sakin.', correct: true, feedback: '"Ich mag" = seviyorum. "Ruhig" = sakin. Farklı bakış açısı!' },
        { text: 'Ja.', translation: 'Evet.', correct: false, feedback: 'Daha fazla söyle! "Ja, sehr nass!" veya "Ja, ich auch nicht!" de.' }
      ]},
      { speaker: 'npc', text: 'Sind Sie neu hier? Ich habe Sie noch nicht gesehen.', translation: 'Burada yeni misiniz? Sizi daha önce görmedim.' },
      { speaker: 'user', options: [
        { text: 'Ja, ich bin seit zwei Monaten hier. Ich lerne noch die Gegend kennen.', translation: 'Evet, iki aydır buradayım. Bölgeyi henüz öğreniyorum.', correct: true, feedback: '"Die Gegend kennenlernen" = bölgeyi tanımak. Çok doğal ifade!' },
        { text: 'Ja, ich bin Türke und wohne jetzt in Deutschland.', translation: 'Evet, Türküm ve şimdi Almanya\'da yaşıyorum.', correct: true, feedback: 'Kendini tanıtma fırsatı! Basit ve anlaşılır.' },
        { text: 'Ich bin nicht neu.', translation: 'Yeni değilim.', correct: false, feedback: 'Ama aslında yenisin! "Ja, ich bin neu hier" de.' }
      ]},
      { speaker: 'npc', text: 'Ach so! Wie gefällt Ihnen Deutschland?', translation: 'Öyle mi! Almanya nasıl geliyor size?' },
      { speaker: 'user', options: [
        { text: 'Gut, danke. Die Menschen sind freundlich und alles ist sehr ordentlich.', translation: 'İyi, teşekkürler. İnsanlar arkadaşça ve her şey çok düzenli.', correct: true, feedback: '"Ordentlich" = düzenli. Almanya için çok yerinde bir gözlem!' },
        { text: 'Es ist anders als ich dachte — aber ich gewöhne mich daran.', translation: 'Düşündüğümden farklı — ama alışıyorum.', correct: true, feedback: '"Ich gewöhne mich daran" = alışıyorum. Çok doğal ve samimi!' },
        { text: 'Das Wetter ist schlecht.', translation: 'Hava kötü.', correct: false, feedback: '"Deutschland gefällt mir gut" veya "Es ist schön aber kalt" de.' }
      ]},
      { speaker: 'npc', text: 'Das freut mich! Was vermissen Sie aus der Türkei?', translation: 'Ne güzel! Türkiye\'den ne özlüyorsunuz?' },
      { speaker: 'user', options: [
        { text: 'Das Essen natürlich! Und die Sonne. Das türkische Essen ist unvergleichlich.', translation: 'Tabii ki yemek! Ve güneş. Türk yemeği eşsiz.', correct: true, feedback: '"Unvergleichlich" = eşsiz. Güçlü kelime! Ve güneşi özlemek çok anlaşılır.' },
        { text: 'Meine Familie und Freunde. Aber ich telefoniere jeden Tag mit ihnen.', translation: 'Ailem ve arkadaşlarım. Ama her gün onlarla telefon görüşmesi yapıyorum.', correct: true, feedback: '"Ich telefoniere jeden Tag" = her gün telefon yapıyorum. Duygusal ve gerçek!' },
        { text: 'Ich vermisse nichts.', translation: 'Hiçbir şeyi özlemiyorum.', correct: false, feedback: 'Bunu söylersen garip görünür. "Ich vermisse das Essen" de.' }
      ]},
      { speaker: 'npc', text: 'Das verstehe ich gut. Ich war auch mal lange im Ausland. Es ist nicht immer einfach.', translation: 'Bunu iyi anlıyorum. Ben de bir zamanlar uzun süre yurt dışında kaldım. Her zaman kolay değil.' },
      { speaker: 'user', options: [
        { text: 'Ja, genau. Aber ich lerne jeden Tag etwas Neues über Deutschland.', translation: 'Evet, kesinlikle. Ama her gün Almanya hakkında yeni bir şey öğreniyorum.', correct: true, feedback: '"Jeden Tag etwas Neues" = her gün yeni bir şey. Pozitif tutum!' },
        { text: 'Wo waren Sie im Ausland? Das interessiert mich.', translation: 'Yurt dışında nerede kaldınız? Bu ilgimi çekiyor.', correct: true, feedback: '"Das interessiert mich" = bu ilgimi çekiyor. Merak gösteriyorsun. Harika!' },
        { text: 'Ja, Deutschland ist sehr schwierig.', translation: 'Evet, Almanya çok zor.', correct: false, feedback: '"Es ist eine neue Erfahrung" (yeni bir deneyim) de.' }
      ]},
      { speaker: 'npc', text: 'Ich war in Frankreich. Sprechen Sie auch Französisch?', translation: 'Fransa\'daydım. Fransızca da biliyor musunuz?' },
      { speaker: 'user', options: [
        { text: 'Nein, nur Türkisch, Englisch und jetzt lerne ich Deutsch.', translation: 'Hayır, sadece Türkçe, İngilizce ve şimdi Almanca öğreniyorum.', correct: true, feedback: 'Dil bilgilerini listeliyorsun. "Nur" = sadece. Güzel ifade!' },
        { text: 'Ein bisschen, in der Schule. Aber ich habe vieles vergessen.', translation: 'Biraz, okulda. Ama çoğunu unuttum.', correct: true, feedback: '"Ich habe vergessen" = unuttum (Perfekt). Dürüst ve doğal!' },
        { text: 'Warum?', translation: 'Neden?', correct: false, feedback: '"Nein, leider nicht" veya "Ein bisschen" de.' }
      ]},
      { speaker: 'npc', text: 'Ihr Deutsch ist schon sehr gut für zwei Monate! Da kommt der Bus. Schönen Tag noch!', translation: 'İki ay için Almanceniz zaten çok iyi! İşte otobüs geliyor. İyi günler!' },
      { speaker: 'user', options: [
        { text: 'Danke, das ist sehr nett! Ihnen auch einen schönen Tag, Herr...?', translation: 'Teşekkürler, çok nazik! Size de iyi günler, Bay...?', correct: true, feedback: 'Teşekkür ettin ve ismini sordun. Sosyal zeka! "Herr...?" ile sohbet kapıyı açık bıraktın.' },
        { text: 'Vielen Dank! Es war schön mit Ihnen zu reden. Auf Wiedersehen!', translation: 'Çok teşekkürler! Sizinle konuşmak güzeldi. Hoşça kalın!', correct: true, feedback: '"Es war schön zu reden" = konuşmak güzeldi. Sıcak ve kibar veda!' },
        { text: 'Ja, danke.', translation: 'Evet, teşekkürler.', correct: false, feedback: 'Daha sıcak! "Das freut mich sehr!" veya "Es war ein nettes Gespräch!" de.' }
      ]}
    ]
  },

  {
    id: 'post_office',
    title: 'Postanede',
    icon: '📮',
    color: '#FFBE0B',
    bg: '#FFFDF0',
    level: 'A1',
    situation: 'Türkiye\'ye paket ve mektup göndermek istiyorsun. Aynı zamanda para havalesi bilgisi almak istiyorsun.',
    npcName: 'Postmitarbeiter Klaus',
    npcEmoji: '📬',
    turns: [
      { speaker: 'npc', text: 'Guten Tag, bitte!', translation: 'İyi günler, buyurun!' },
      { speaker: 'user', options: [
        { text: 'Guten Tag! Ich möchte dieses Paket in die Türkei schicken.', translation: 'İyi günler! Bu paketi Türkiye\'ye göndermek istiyorum.', correct: true, feedback: '"Dieses Paket schicken" = bu paketi göndermek. İstasyonda en temel cümle!' },
        { text: 'Guten Tag! Was sind Ihre Öffnungszeiten?', translation: 'İyi günler! Çalışma saatleriniz neler?', correct: false, feedback: 'Zaten açıklar! "Ich möchte ein Paket schicken" de.' },
        { text: 'Ich suche Briefmarken.', translation: 'Pul arıyorum.', correct: true, feedback: '"Briefmarken" = pul. Mektup için şart!' }
      ]},
      { speaker: 'npc', text: 'Gerne. Legen Sie das Paket bitte auf die Waage.', translation: 'Tabii ki. Paketi lütfen teraziye koyun.' },
      { speaker: 'user', options: [
        { text: 'Natürlich. Und können Sie auch sagen, was die schnellste Option ist?', translation: 'Tabii ki. En hızlı seçeneğin ne olduğunu da söyleyebilir misiniz?', correct: true, feedback: '"Die schnellste Option" = en hızlı seçenek. Acelen varsa sormak mantıklı!' },
        { text: 'Hier bitte. Wie viel wiegt es?', translation: 'Buyurun. Ne kadar ağırlığında?', correct: true, feedback: '"Wie viel wiegt es?" = ne kadar ağırlığında? Paketi tartmasını bekleyebilirsin.' },
        { text: 'Ich weiß nicht wie das geht.', translation: 'Nasıl yapılacağını bilmiyorum.', correct: false, feedback: 'Terazi var, paketi üstüne koy! "Hier bitte" de.' }
      ]},
      { speaker: 'npc', text: 'Das Paket wiegt 2,3 kg. Standard oder Express? Standard: 7-10 Tage, 18 Euro. Express: 3-5 Tage, 32 Euro.', translation: 'Paket 2,3 kg. Standart mı Express mi? Standart: 7-10 gün, 18 Euro. Express: 3-5 gün, 32 Euro.' },
      { speaker: 'user', options: [
        { text: 'Standard bitte, ich habe keine Eile.', translation: 'Standart lütfen, acelem yok.', correct: true, feedback: '"Ich habe keine Eile" = acelem yok. Pratik ve net!' },
        { text: 'Express — es ist ein Geburtstagsgeschenk für nächste Woche.', translation: 'Express — gelecek hafta için doğum günü hediyesi.', correct: true, feedback: '"Geburtstagsgeschenk" = doğum günü hediyesi. Nedenini açıklaman çok doğal!' },
        { text: 'Was ist billiger?', translation: 'Hangisi daha ucuz?', correct: false, feedback: 'Zaten söyledi! Standard = 18€, Express = 32€. "Standard bitte" de.' }
      ]},
      { speaker: 'npc', text: 'Gut. Bitte schreiben Sie die Adresse auf diesen Aufkleber.', translation: 'İyi. Lütfen bu etiketin üstüne adresi yazın.' },
      { speaker: 'user', options: [
        { text: 'Natürlich. Soll ich auf Deutsch oder Englisch schreiben?', translation: 'Tabii ki. Almanca mı İngilizce mi yazmalıyım?', correct: true, feedback: 'Uluslararası gönderi için önemli soru! Genelde İngilizce önerilir.' },
        { text: 'Ich habe keinen Stift. Kann ich Ihren benutzen?', translation: 'Kalemim yok. Sizinkini kullanabilir miyim?', correct: true, feedback: '"Kann ich Ihren benutzen?" = sizinkini kullanabilir miyim? Günlük hayat sorusu!' },
        { text: 'Ich kann nicht auf Deutsch schreiben.', translation: 'Almanca yazamıyorum.', correct: false, feedback: '"Englisch ist auch okay?" de. Adres genelde Latin alfabesiyle yazılır.' }
      ]},
      { speaker: 'npc', text: 'Englisch oder Türkisch ist auch okay. Haben Sie auch etwas zum Verschicken per Brief?', translation: 'İngilizce veya Türkçe de tamam. Mektupla gönderecek bir şeyiniz de var mı?' },
      { speaker: 'user', options: [
        { text: 'Ja, ich habe zwei Briefe. Brauche ich Briefmarken?', translation: 'Evet, iki mektubum var. Pul lazım mı?', correct: true, feedback: '"Brauche ich Briefmarken?" = pul lazım mı? Basit ama doğru soru!' },
        { text: 'Nein, nur das Paket. Was ist die Trackingnummer?', translation: 'Hayır, sadece paket. Takip numarası ne?', correct: true, feedback: '"Trackingnummer" = kargo takip numarası. Online takip için şart!' },
        { text: 'Briefe schreibe ich nicht.', translation: 'Mektup yazmıyorum.', correct: false, feedback: '"Nein danke, nur das Paket" veya "Ja, ich habe Briefe" de.' }
      ]},
      { speaker: 'npc', text: 'Für einen Brief in die Türkei brauchen Sie eine 1,10 Euro Briefmarke.', translation: 'Türkiye\'ye mektup için 1,10 Euro pul lazım.' },
      { speaker: 'user', options: [
        { text: 'Dann nehme ich zwei Briefmarken bitte. Haben Sie die hier?', translation: 'O zaman iki pul alıyorum lütfen. Bunlar burada mı?', correct: true, feedback: '"Dann nehme ich" = o zaman alıyorum. Karar verdin!' },
        { text: 'Können Sie die Briefmarke direkt aufkleben?', translation: 'Pulu doğrudan yapıştırabilir misiniz?', correct: true, feedback: '"Aufkleben" = yapıştırmak. Hizmet istemek çok normal!' },
        { text: '1,10 Euro ist zu teuer für einen Brief!', translation: '1,10 Euro bir mektup için çok pahalı!', correct: false, feedback: 'Uluslararası gönderi için makul. "Dann zwei Briefmarken bitte" de.' }
      ]},
      { speaker: 'npc', text: 'Ja, hier. Also: Paket 18 Euro, zwei Briefmarken 2,20 Euro. Insgesamt 20,20 Euro.', translation: 'Evet, burada. Yani: Paket 18 Euro, iki pul 2,20 Euro. Toplam 20,20 Euro.' },
      { speaker: 'user', options: [
        { text: 'Hier sind 21 Euro. Stimmt so.', translation: 'İşte 21 Euro. Üstü kalsın.', correct: true, feedback: '"Stimmt so" = üstü kalsın. Küçük bahşiş çok normal!' },
        { text: 'Kann ich mit Karte zahlen?', translation: 'Kartla ödeyebilir miyim?', correct: true, feedback: 'Postanede kart kabul edilir. Sormak akıllıca!' },
        { text: 'Ich habe nur 20 Euro.', translation: 'Sadece 20 eurom var.', correct: false, feedback: '20 euro az! "Kann ich mit Karte zahlen?" de.' }
      ]}
    ]
  },

  {
    id: 'job_interview',
    title: 'İş Görüşmesi',
    icon: '👔',
    color: '#264653',
    bg: '#F5FFFE',
    level: 'A2',
    situation: 'Bir Alman şirketinde yazılımcı pozisyonu için iş görüşmesi. Kendini tanıtmak, güçlü yönlerini anlatmak ve sorular sormak istiyorsun.',
    npcName: 'Frau Becker (İK Müdürü)',
    npcEmoji: '👩‍💼',
    turns: [
      { speaker: 'npc', text: 'Guten Morgen Herr Yilmaz! Schön, dass Sie pünktlich sind. Kommen Sie herein, bitte nehmen Sie Platz.', translation: 'Günaydın Bay Yılmaz! Zamanında olduğunuz için güzel. Buyurun, lütfen oturun.' },
      { speaker: 'user', options: [
        { text: 'Guten Morgen Frau Becker! Vielen Dank für die Einladung zu diesem Gespräch.', translation: 'Günaydın Bayan Becker! Bu görüşmeye davet için çok teşekkürler.', correct: true, feedback: '"Danke für die Einladung" = davet için teşekkürler. Resmi ve profesyonel açılış!' },
        { text: 'Hallo! Das Büro ist sehr schön.', translation: 'Merhaba! Ofis çok güzel.', correct: false, feedback: 'İltifat iyi ama çok gayri resmi. "Guten Morgen Frau Becker" ile başla.' },
        { text: 'Guten Morgen. Ich bin nervös, aber ich bin bereit.', translation: 'Günaydın. Gerginim ama hazırım.', correct: false, feedback: 'Gerginliği gösterme! "Guten Morgen, danke für die Einladung" de.' }
      ]},
      { speaker: 'npc', text: 'Sehr gerne. Erzählen Sie mir kurz etwas über sich und Ihren beruflichen Hintergrund.', translation: 'Memnuniyetle. Kendiniz ve mesleki geçmişiniz hakkında kısaca anlatır mısınız?' },
      { speaker: 'user', options: [
        { text: 'Ich bin Softwareentwickler mit 5 Jahren Erfahrung. Ich habe in Istanbul bei einer IT-Firma gearbeitet.', translation: '5 yıl deneyimli yazılım geliştiricisiyim. İstanbul\'da bir IT firmasında çalıştım.', correct: true, feedback: '"5 Jahren Erfahrung" = 5 yıl deneyim. "Ich habe gearbeitet" = çalıştım (Perfekt). Mükemmel!' },
        { text: 'Ich heiße Cem, ich bin 28 Jahre alt und komme aus Istanbul.', translation: 'Adım Cem, 28 yaşındayım ve İstanbul\'dan geliyorum.', correct: false, feedback: 'Kişisel bilgiler değil, mesleki bilgi soruluyor. "Ich bin Entwickler..." de.' },
        { text: 'Ich habe viel Erfahrung und bin gut in meiner Arbeit.', translation: 'Çok deneyimim var ve işimde iyiyim.', correct: false, feedback: 'Çok genel. Spesifik ol: "Ich habe X Jahre Erfahrung in..." de.' }
      ]},
      { speaker: 'npc', text: 'Interessant. Warum haben Sie sich für unsere Firma entschieden?', translation: 'İlginç. Neden firmamızı seçtiniz?' },
      { speaker: 'user', options: [
        { text: 'Ihre Firma ist bekannt für innovative Technologien. Ich möchte in diesem Bereich wachsen.', translation: 'Firmanız yenilikçi teknolojilerle tanınmış. Bu alanda büyümek istiyorum.', correct: true, feedback: '"Wachsen" = büyümek/gelişmek. Motivasyonunu açıkça belirttin. Harika!' },
        { text: 'Weil ich in Deutschland bleiben möchte und hier arbeiten will.', translation: 'Çünkü Almanya\'da kalmak ve burada çalışmak istiyorum.', correct: false, feedback: 'Çok kişisel. "Weil Ihre Firma innovativ ist" gibi firma odaklı cevap ver.' },
        { text: 'Ich habe Ihr Stellenangebot online gefunden.', translation: 'İş ilanınızı online buldum.', correct: false, feedback: 'Bu nasıl bulduğun, neden seçtiğin değil. "Ihre Firma ist..." ile cevapla.' }
      ]},
      { speaker: 'npc', text: 'Was sind Ihre größten Stärken?', translation: 'En büyük güçlü yanlarınız neler?' },
      { speaker: 'user', options: [
        { text: 'Ich bin teamfähig, lösungsorientiert und lerne sehr schnell neue Technologien.', translation: 'Takım oyuncusuyum, çözüm odaklıyım ve yeni teknolojileri çok hızlı öğreniyorum.', correct: true, feedback: '"Lösungsorientiert" = çözüm odaklı. Almanya\'da iş görüşmelerinde çok değer verilen özellik!' },
        { text: 'Ich bin gut in Programmierung und spreche Türkisch.', translation: 'Programlamada iyiyim ve Türkçe konuşuyorum.', correct: false, feedback: 'Türkçe burada artı değil. "Ich bin teamfähig und zuverlässig" de.' },
        { text: 'Ich arbeite viel und schlafe wenig.', translation: 'Çok çalışıyorum ve az uyuyorum.', correct: false, feedback: 'Bu sağlıklı değil! "Ich bin zuverlässig und strukturiert" de.' }
      ]},
      { speaker: 'npc', text: 'Und Ihre größte Schwäche?', translation: 'En büyük zayıf yönünüz?' },
      { speaker: 'user', options: [
        { text: 'Ich bin manchmal zu perfektionistisch — ich arbeite daran, effizienter zu werden.', translation: 'Bazen çok mükemmeliyetçiyim — daha verimli olmak için üzerinde çalışıyorum.', correct: true, feedback: 'Klasik ama etkili cevap! "Ich arbeite daran" = üzerinde çalışıyorum. Öz farkındalık!' },
        { text: 'Mein Deutsch ist noch nicht perfekt, aber ich lerne täglich.', translation: 'Almancam henüz mükemmel değil ama her gün öğreniyorum.', correct: true, feedback: 'Dürüst ve pozitif! "Ich lerne täglich" = her gün öğreniyorum. Motivasyon gösteriyorsun.' },
        { text: 'Ich habe keine Schwächen.', translation: 'Hiçbir zayıf yönüm yok.', correct: false, feedback: 'Bu inanılmaz görünür! "Manchmal bin ich ungeduldig" gibi gerçek bir şey söyle.' }
      ]},
      { speaker: 'npc', text: 'Sehr ehrlich. Welche Programmiersprachen beherrschen Sie?', translation: 'Çok dürüst. Hangi programlama dillerini biliyorsunuz?' },
      { speaker: 'user', options: [
        { text: 'Ich beherrsche Python und JavaScript sehr gut. Java und C++ auf mittlerem Niveau.', translation: 'Python ve JavaScript\'i çok iyi biliyorum. Java ve C++ orta seviyede.', correct: true, feedback: '"Auf mittlerem Niveau" = orta seviyede. Dürüst seviye değerlendirmesi!' },
        { text: 'Ich lerne gerade noch mehr Sprachen. Was bevorzugen Sie in Ihrer Firma?', translation: 'Şu an daha fazla dil öğreniyorum. Firmanızda neyi tercih ediyorsunuz?', correct: true, feedback: '"Was bevorzugen Sie?" = neyi tercih edersiniz? Firmaya uyum sağlamak istiyorsun!' },
        { text: 'Alle Sprachen sind gleich einfach für mich.', translation: 'Benim için tüm diller aynı derecede kolay.', correct: false, feedback: 'İnanılmaz! Spesifik ol: "Ich bin stark in Python und JavaScript." de.' }
      ]},
      { speaker: 'npc', text: 'Gut. Haben Sie Fragen an uns?', translation: 'İyi. Bizim için sorularınız var mı?' },
      { speaker: 'user', options: [
        { text: 'Ja! Wie ist die Teamstruktur? Und gibt es Möglichkeiten zur Weiterbildung?', translation: 'Evet! Takım yapısı nasıl? Ve eğitim olanakları var mı?', correct: true, feedback: '"Weiterbildung" = mesleki gelişim/eğitim. Almanya\'da çok önemli! İki soru sordun. Harika!' },
        { text: 'Wann würde ich anfangen und wie hoch ist das Gehalt?', translation: 'Ne zaman başlardım ve maaş ne kadar?', correct: false, feedback: 'Maaş sorusu ilk görüşmede biraz erken. "Was sind die nächsten Schritte?" de önce.' },
        { text: 'Nein, alles klar.', translation: 'Hayır, her şey açık.', correct: false, feedback: 'Her zaman en az bir soru sor! "Wie ist das Team?" veya "Was sind die Hauptaufgaben?" de.' }
      ]},
      { speaker: 'npc', text: 'Das Team besteht aus 12 Entwicklern. Weiterbildung fördern wir sehr. Wir melden uns bis Ende der Woche.', translation: 'Takım 12 geliştiriciden oluşuyor. Eğitimi çok destekliyoruz. Hafta sonuna kadar haber vereceğiz.' },
      { speaker: 'user', options: [
        { text: 'Vielen Dank Frau Becker! Das Gespräch hat mir sehr gut gefallen. Auf Wiedersehen!', translation: 'Çok teşekkürler Bayan Becker! Görüşme çok hoşuma gitti. Hoşça kalın!', correct: true, feedback: '"Das Gespräch hat mir gefallen" = görüşme hoşuma gitti. Pozitif kapanış!' },
        { text: 'Danke! Ich freue mich sehr auf eine positive Antwort.', translation: 'Teşekkürler! Olumlu bir yanıtı sabırsızlıkla bekliyorum.', correct: true, feedback: '"Ich freue mich auf" = sabırsızlıkla bekliyorum. Motivasyonunu gösteriyorsun!' },
        { text: 'Okay, tschüss!', translation: 'Tamam, görüşürüz!', correct: false, feedback: '"Tschüss" çok gayri resmi! "Auf Wiedersehen, Frau Becker!" de.' }
      ]}
    ]
  },

  {
    id: 'language_exchange',
    title: 'Dil Değişimi Buluşması',
    icon: '🌍',
    color: '#F4A261',
    bg: '#FFFAF5',
    level: 'A2',
    situation: 'Dil değişimi için Alman partnerinle buluşuyorsun. Almanca pratik yapıp karşılığında Türkçe öğreteceksin.',
    npcName: 'Lena (Dil partnerin)',
    npcEmoji: '👩‍🦰',
    turns: [
      { speaker: 'npc', text: 'Hallo! Du musst Cem sein! Ich erkenne dich von deinem Profilbild.', translation: 'Merhaba! Sen Cem olmalısın! Profil fotoğrafından tanıyorum.' },
      { speaker: 'user', options: [
        { text: 'Ja, das bin ich! Und du bist Lena! Schön, dich endlich zu treffen!', translation: 'Evet, benim! Ve sen Lena\'sın! Seni sonunda tanımak güzel!', correct: true, feedback: '"Schön, dich zu treffen" = tanışmak güzel. "Endlich" = sonunda. Samimi!' },
        { text: 'Hallo Lena! Ich habe mich schon auf dieses Treffen gefreut.', translation: 'Merhaba Lena! Bu buluşmayı zaten sabırsızlıkla bekliyordum.', correct: true, feedback: '"Ich habe mich gefreut" = sevindim / sabırsızlıkla bekliyordum. Harika!' },
        { text: 'Ja, hallo.', translation: 'Evet, merhaba.', correct: false, feedback: 'Daha heyecanlı ol! "Schön, dich kennenzulernen!" de.' }
      ]},
      { speaker: 'npc', text: 'Was möchtest du trinken? Ich lade dich ein!', translation: 'Ne içmek istiyorsun? Ben ısmarlıyorum!' },
      { speaker: 'user', options: [
        { text: 'Oh, das ist nett! Einen Kaffee bitte. Aber das nächste Mal zahle ich!', translation: 'Oh, nazik! Bir kahve lütfen. Ama bir dahaki sefer ben öderim!', correct: true, feedback: '"Das nächste Mal zahle ich" = bir sonraki ben öderim. Kibarca kabul ettin!' },
        { text: 'Nein danke, ich zahle selbst.', translation: 'Hayır teşekkürler, kendim öderim.', correct: false, feedback: 'Teklifi reddetmek garip. "Danke! Einen Tee bitte" de.' },
        { text: 'Ich hätte gerne einen Tee, wenn das okay ist.', translation: 'Bir çay istiyorum, uygunsa.', correct: true, feedback: '"Ich hätte gerne" + "wenn das okay ist" = nazik ve kibar istek. Harika!' }
      ]},
      { speaker: 'npc', text: 'Wie lange lernst du schon Deutsch?', translation: 'Ne zamandan beri Almanca öğreniyorsun?' },
      { speaker: 'user', options: [
        { text: 'Seit sechs Monaten. Ich finde es schwer, aber sehr interessant.', translation: 'Altı aydır. Zor ama çok ilginç buluyorum.', correct: true, feedback: '"Seit sechs Monaten" = altı aydır. "Ich finde es" = buluyorum. Değerlendirme yaptın!' },
        { text: 'Erst drei Monate, aber ich übe jeden Tag. App, YouTube und jetzt du!', translation: 'Sadece üç ay, ama her gün pratik yapıyorum. Uygulama, YouTube ve şimdi sen!', correct: true, feedback: 'Öğrenme yöntemlerini saydın. Çok ilgi çekici ve samimi!' },
        { text: 'Ich lerne nicht viel.', translation: 'Çok öğrenmiyorum.', correct: false, feedback: 'Motivasyonsuz görünürsün. "Ich lerne fleißig" veya "Ich übe jeden Tag" de.' }
      ]},
      { speaker: 'npc', text: 'Wow, das ist kurz! Und ich lerne Türkisch seit einem Jahr — ich kann kaum etwas sagen!', translation: 'Vay be, bu kısa! Ben bir yıldır Türkçe öğreniyorum — neredeyse hiçbir şey söyleyemiyorum!' },
      { speaker: 'user', options: [
        { text: 'Das glaube ich nicht! Sag mal etwas auf Türkisch!', translation: 'İnanmıyorum! Biraz Türkçe söyle!', correct: true, feedback: '"Sag mal etwas" = bir şey söyle. Onu teşvik ediyorsun. Güzel!' },
        { text: 'Türkisch ist wirklich schwer — aber du schaffst das! Ich helfe dir!', translation: 'Türkçe gerçekten zor — ama başarırsın! Yardım ederim!', correct: true, feedback: '"Du schaffst das" = başarırsın. "Ich helfe dir" = yardım ederim. Motivasyon veriyorsun!' },
        { text: 'Türkisch ist leichter als Deutsch.', translation: 'Türkçe Almancadan kolay.', correct: false, feedback: 'Tartışmalı! "Türkisch ist auch schwer" de.' }
      ]},
      { speaker: 'npc', text: 'Okay, ich versuche: "Merhaba, ich heiße Lena." Stimmt das?', translation: 'Tamam deniyorum: "Merhaba, ich heiße Lena." Bu doğru mu?' },
      { speaker: 'user', options: [
        { text: 'Fast! "Merhaba, benim adım Lena" — das ist natürlicher. Sehr gut für den Anfang!', translation: 'Neredeyse! "Merhaba, benim adım Lena" — bu daha doğal. Başlangıç için çok iyi!', correct: true, feedback: '"Sehr gut für den Anfang" = başlangıç için çok iyi. Destekleyici öğretmen tutumu!' },
        { text: '"Merhaba" ist richtig! "Ich heiße" heißt auf Türkisch "Adım..."', translation: '"Merhaba" doğru! "Ich heiße" Türkçede "Adım..." demek', correct: true, feedback: '"Heißt auf Türkisch" = Türkçede ...demek. Mükemmel öğretim cümlesi!' },
        { text: 'Das war falsch.', translation: 'Bu yanlıştı.', correct: false, feedback: 'Daha yapıcı ol! "Fast richtig! Versuch es so..." de.' }
      ]},
      { speaker: 'npc', text: 'Danke! Du bist ein guter Lehrer. Jetzt du — was fällt dir auf Deutsch schwer?', translation: 'Teşekkürler! İyi bir öğretmensin. Şimdi sen — Almancada neyi zor buluyorsun?' },
      { speaker: 'user', options: [
        { text: 'Die Artikel! Der, die, das — ich vergesse sie immer. Hast du einen Tipp?', translation: 'Artikeller! Der, die, das — hep unutuyorum. Bir ipucun var mı?', correct: true, feedback: '"Hast du einen Tipp?" = ipucun var mı? Öğrenci olarak doğrudan yardım istiyorsun!' },
        { text: 'Die Wortstellung ist sehr kompliziert. Warum geht das Verb ans Ende?', translation: 'Kelime sırası çok karmaşık. Neden fiil sona gidiyor?', correct: true, feedback: '"Die Wortstellung" = kelime sırası. Almancada gerçekten zor bir konu!' },
        { text: 'Alles ist schwer.', translation: 'Her şey zor.', correct: false, feedback: 'Spesifik ol! "Die Artikel sind schwer" veya "Der Konjunktiv ist kompliziert" de.' }
      ]},
      { speaker: 'npc', text: 'Artikel! Ich auch! Mein Tipp: Lerne immer Nomen mit Artikel — "der Tisch", nie nur "Tisch".', translation: 'Artikeller! Ben de! İpucum: Her zaman ismi artikle birlikte öğren — "der Tisch", asla sadece "Tisch".' },
      { speaker: 'user', options: [
        { text: 'Das ist ein super Tipp! Ich schreibe das auf. Danke Lena!', translation: 'Bu süper bir ipucu! Yazıyorum. Teşekkürler Lena!', correct: true, feedback: '"Ich schreibe das auf" = bunu yazıyorum. Aktif öğrenme! Harika.' },
        { text: 'Ich mache das schon so — aber manchmal vergesse ich es trotzdem.', translation: 'Bunu zaten yapıyorum — ama bazen yine de unutuyorum.', correct: true, feedback: '"Trotzdem" = yine de. Gerçek ve samimi. Öğrenme zorluğunu kabul ediyorsun.' },
        { text: 'Das ist zu schwierig.', translation: 'Bu çok zor.', correct: false, feedback: 'Pes etme! "Ich versuche es" de.' }
      ]},
      { speaker: 'npc', text: 'Wir sollten das öfter machen! Nächste Woche wieder?', translation: 'Bunu daha sık yapmalıyız! Gelecek hafta yeniden?' },
      { speaker: 'user', options: [
        { text: 'Auf jeden Fall! Mittwochs bin ich immer frei. Passt dir das?', translation: 'Kesinlikle! Çarşamba günleri her zaman boşum. Sana uyar mı?', correct: true, feedback: '"Auf jeden Fall" = kesinlikle. "Passt dir das?" = sana uyar mı? Organizasyon mükemmel!' },
        { text: 'Ja! Und nächstes Mal bringe ich türkisches Baklava mit!', translation: 'Evet! Bir dahaki sefer Türk baklavası getiriyorum!', correct: true, feedback: 'Baklava her zaman açar kapıları! "Ich bringe... mit" = getiriyorum.' },
        { text: 'Vielleicht.', translation: 'Belki.', correct: false, feedback: 'Çok belirsiz! "Ja, sehr gerne! Wann passt es dir?" de.' }
      ]}
    ]
  },

  {
    id: 'complaint',
    title: 'Şikayet Etme',
    icon: '😤',
    color: '#C1121F',
    bg: '#FFF5F5',
    level: 'A2',
    situation: 'Otelde sorun yaşıyorsun. Klima bozuk, oda gürültülü ve banyoda sıcak su yok. Resepsiyona gidiyorsun.',
    npcName: 'Rezeptionist Thomas',
    npcEmoji: '🏨',
    turns: [
      { speaker: 'npc', text: 'Guten Abend! Wie kann ich helfen?', translation: 'İyi akşamlar! Nasıl yardımcı olabilirim?' },
      { speaker: 'user', options: [
        { text: 'Guten Abend. Ich habe mehrere Probleme mit meinem Zimmer 214.', translation: 'İyi akşamlar. 214 numaralı odamda birkaç sorun var.', correct: true, feedback: '"Mehrere Probleme" = birkaç sorun. Çoğulunu kullandın. Profesyonel başlangıç!' },
        { text: 'Entschuldigung, ich möchte mich beschweren.', translation: 'Özür dilerim, şikayet etmek istiyorum.', correct: true, feedback: '"Ich möchte mich beschweren" = şikayet etmek istiyorum. Resmi ve doğru kalıp!' },
        { text: 'Ihr Hotel ist schlecht!', translation: 'Oteliniz kötü!', correct: false, feedback: 'Çok sert başlangıç. "Ich habe ein Problem mit meinem Zimmer" de.' }
      ]},
      { speaker: 'npc', text: 'Das tut mir leid! Was ist das Problem?', translation: 'Üzüldüm! Sorun nedir?' },
      { speaker: 'user', options: [
        { text: 'Erstens: Die Klimaanlage funktioniert nicht. Es ist sehr heiß im Zimmer.', translation: 'Birincisi: Klima çalışmıyor. Odada çok sıcak.', correct: true, feedback: '"Erstens" = birincisi. Liste şeklinde şikayet çok etkili!' },
        { text: 'Das Zimmer ist laut, die Klimaanlage kaputt und kein warmes Wasser.', translation: 'Oda gürültülü, klima bozuk ve sıcak su yok.', correct: true, feedback: 'Tüm sorunları bir cümlede saydın. Verimli!' },
        { text: 'Alles ist falsch.', translation: 'Her şey yanlış.', correct: false, feedback: 'Spesifik ol! "Die Klimaanlage funktioniert nicht" gibi somut söyle.' }
      ]},
      { speaker: 'npc', text: 'Verstanden. Was noch?', translation: 'Anladım. Başka?' },
      { speaker: 'user', options: [
        { text: 'Zweitens: Die Nachbarn machen sehr viel Lärm bis nach Mitternacht.', translation: 'İkincisi: Komşular gece yarısına kadar çok gürültü yapıyor.', correct: true, feedback: '"Zweitens" = ikincisi. "Bis nach Mitternacht" = gece yarısından sonra. Net bilgi!' },
        { text: 'Und drittens: Im Bad gibt es kein warmes Wasser seit heute Morgen.', translation: 'Ve üçüncüsü: Banyo\'da bugün sabahtan beri sıcak su yok.', correct: true, feedback: '"Drittens" = üçüncüsü. "Seit heute Morgen" = bugün sabahtan beri. Mükemmel!' },
        { text: 'Das Essen war auch nicht gut.', translation: 'Yemek de iyi değildi.', correct: false, feedback: 'Oda problemleriyle başla, yemek ayrı konu. "Die Klimaanlage..." de.' }
      ]},
      { speaker: 'npc', text: 'Das sind tatsächlich ernste Probleme. Ich werde sofort Maßnahmen ergreifen.', translation: 'Bunlar gerçekten ciddi sorunlar. Hemen adım atacağım.' },
      { speaker: 'user', options: [
        { text: 'Danke. Was konkret werden Sie tun? Und bis wann?', translation: 'Teşekkürler. Konkret olarak ne yapacaksınız? Ve ne zamana kadar?', correct: true, feedback: '"Was konkret?" = somut olarak ne? "Bis wann?" = ne zamana kadar? Akıllı takip!' },
        { text: 'Ich warte auf eine schnelle Lösung. Ich kann so nicht schlafen.', translation: 'Hızlı bir çözüm bekliyorum. Bu şekilde uyuyamıyorum.', correct: true, feedback: '"Ich kann nicht schlafen" = uyuyamıyorum. Durumun ciddiyetini vurguladın!' },
        { text: 'Das ist Ihr Job.', translation: 'Bu sizin işiniz.', correct: false, feedback: 'Haklısın ama kaba. "Ich warte auf eine Lösung" de.' }
      ]},
      { speaker: 'npc', text: 'Ich schicke sofort den Techniker für Klimaanlage und Warmwasser. Für den Lärm spreche ich persönlich mit den Gästen.', translation: 'Klima ve sıcak su için hemen teknik servis gönderiyorum. Gürültü için misafirlerle şahsen konuşacağım.' },
      { speaker: 'user', options: [
        { text: 'Wann kommt der Techniker? Ich möchte im Zimmer sein, wenn er kommt.', translation: 'Teknisyen ne zaman gelecek? Geldiğinde odada olmak istiyorum.', correct: true, feedback: '"Ich möchte im Zimmer sein" = odada olmak istiyorum. Pratik ve mantıklı!' },
        { text: 'Gut. Und wenn das Problem nicht gelöst wird, möchte ich das Zimmer wechseln.', translation: 'Tamam. Sorun çözülmezse oda değiştirmek istiyorum.', correct: true, feedback: '"Wenn nicht gelöst" = çözülmezse. Alternatif talep etmek hakkın!' },
        { text: 'Bitte schnell!', translation: 'Lütfen hızlı!', correct: false, feedback: '"Wie lange dauert das ungefähr?" de. Daha somut sor.' }
      ]},
      { speaker: 'npc', text: 'Der Techniker kommt in 20 Minuten. Als Entschädigung bieten wir Ihnen morgen Frühstück kostenfrei an.', translation: 'Teknisyen 20 dakikada geliyor. Tazminat olarak yarın kahvaltıyı ücretsiz sunuyoruz.' },
      { speaker: 'user', options: [
        { text: 'Das ist nett, aber ich hätte lieber einen Zimmerrabatt.', translation: 'Bu nazik, ama oda indirimi tercih ederim.', correct: true, feedback: '"Ich hätte lieber" = daha çok tercih ederim. Kibarca alternatif istedin!' },
        { text: 'Danke. Das ist akzeptabel. Ich warte auf den Techniker.', translation: 'Teşekkürler. Bu kabul edilebilir. Teknisyeni bekliyorum.', correct: true, feedback: '"Das ist akzeptabel" = kabul edilebilir. Makul tutum!' },
        { text: 'Das ist nicht genug!', translation: 'Bu yeterli değil!', correct: false, feedback: 'Kahvaltı güzel bir jest. "Das ist nett, danke" de.' }
      ]},
      { speaker: 'npc', text: 'Selbstverständlich können wir auch 15% auf die Zimmerrechnung rabattieren. Tut mir nochmals leid!', translation: 'Tabii oda faturasından da %15 indirim yapabiliriz. Bir kez daha özür dilerim!' },
      { speaker: 'user', options: [
        { text: 'Das ist sehr kulant! Vielen Dank. Ich hoffe, die Probleme werden schnell gelöst.', translation: 'Bu çok anlayışlı! Çok teşekkürler. Sorunların hızlı çözüleceğini umuyorum.', correct: true, feedback: '"Kulant" = anlayışlı/esnek. Almanca\'da sık duyulan bir kelime!' },
        { text: 'Danke für Ihre Mühe. Ich schätze das sehr.', translation: 'Çabanız için teşekkürler. Bunu çok takdir ediyorum.', correct: true, feedback: '"Ich schätze das" = bunu değerliyorum/takdir ediyorum. Zarif kapanış!' },
        { text: 'Na gut, dann.', translation: 'Peki o zaman.', correct: false, feedback: '"Vielen Dank!" de. Daha pozitif kapan!' }
      ]}
    ]
  },

  {
    id: 'school_parent',
    title: 'Okul Veli Toplantısı',
    icon: '🏫',
    color: '#3A86FF',
    bg: '#F0F5FF',
    level: 'A2',
    situation: 'Çocuğunun öğretmeniyle veli toplantısında konuşuyorsun. Çocuğunun ilerlemesi, sorunları ve çözüm yolları hakkında konuşacaksınız.',
    npcName: 'Lehrerin Frau Klein',
    npcEmoji: '👩‍🏫',
    turns: [
      { speaker: 'npc', text: 'Guten Abend Herr Yilmaz! Schön, dass Sie gekommen sind.', translation: 'İyi akşamlar Bay Yılmaz! Geldiğiniz için güzel.' },
      { speaker: 'user', options: [
        { text: 'Guten Abend Frau Klein! Natürlich, das ist wichtig für meinen Sohn.', translation: 'İyi akşamlar Bayan Klein! Tabii ki, oğlum için önemli.', correct: true, feedback: '"Das ist wichtig" = önemli. Ebeveyn olarak katılımını vurguluyorsun!' },
        { text: 'Danke für die Einladung. Wie geht es Mehmet in der Schule?', translation: 'Davet için teşekkürler. Mehmet okulda nasıl?', correct: true, feedback: 'Doğrudan konuya girdin! Somut soru.' },
        { text: 'Ja, hallo.', translation: 'Evet, merhaba.', correct: false, feedback: '"Guten Abend Frau Klein! Freut mich, Sie zu treffen" de.' }
      ]},
      { speaker: 'npc', text: 'Mehmet ist ein intelligenter Junge. Er hat gute Noten in Mathematik und Sport.', translation: 'Mehmet zeki bir çocuk. Matematik ve sporda iyi notları var.' },
      { speaker: 'user', options: [
        { text: 'Das höre ich gerne! Und wie ist er in anderen Fächern?', translation: 'Bunu duymak güzel! Peki diğer derslerde nasıl?', correct: true, feedback: '"Das höre ich gerne" = bunu duymak güzel. Olumlu yorum ve devam sorusu!' },
        { text: 'Ja, er übt Mathe immer zuhause. Ich helfe ihm.', translation: 'Evet, evde her zaman matematik çalışıyor. Yardım ediyorum.', correct: true, feedback: 'Ev desteğini belirtmek öğretmeni çok memnun eder!' },
        { text: 'Er ist sehr klug, weiß ich.', translation: 'Çok zeki, biliyorum.', correct: false, feedback: 'Mütevazı ol! "Das freut mich sehr zu hören" de.' }
      ]},
      { speaker: 'npc', text: 'In Deutsch und Englisch hat er Schwierigkeiten. Er redet manchmal auch zu viel im Unterricht.', translation: 'Almanca ve İngilizce\'de zorluk çekiyor. Derste bazen de çok fazla konuşuyor.' },
      { speaker: 'user', options: [
        { text: 'Das überrascht mich ein wenig. Zu Hause ist er ruhig. Was genau ist das Problem?', translation: 'Bu beni biraz şaşırttı. Evde sakin. Sorun tam olarak ne?', correct: true, feedback: '"Das überrascht mich" = şaşırdım. Detay soruyorsun. Aktif ebeveyn!' },
        { text: 'Ich verstehe. Ich werde zu Hause mit ihm darüber sprechen.', translation: 'Anlıyorum. Evde onunla bu konuyu konuşacağım.', correct: true, feedback: '"Ich werde sprechen" = konuşacağım (gelecek zaman). Sorumluluk aldın!' },
        { text: 'Das liegt an der Schule!', translation: 'Bu okulun suçu!', correct: false, feedback: 'Savunmacı olmayın. "Wie kann ich helfen?" de.' }
      ]},
      { speaker: 'npc', text: 'Er versteht manchmal Anweisungen auf Deutsch nicht gut. Wir sprechen zu Hause welche Sprache?', translation: 'Almanca yönergeleri bazen iyi anlamıyor. Evde hangi dili konuşuyoruz?' },
      { speaker: 'user', options: [
        { text: 'Wir sprechen zu Hause Türkisch. Sollte ich mehr Deutsch mit ihm sprechen?', translation: 'Evde Türkçe konuşuyoruz. Onunla daha fazla Almanca konuşmalı mıyım?', correct: true, feedback: '"Sollte ich?" = ...yapmalı mıyım? Öğretmenden tavsiye istiyorsun. Mükemmel!' },
        { text: 'Türkisch und manchmal Englisch. Deutsch nur in der Schule.', translation: 'Türkçe ve bazen İngilizce. Almanca sadece okulda.', correct: true, feedback: 'Dürüst bilgi veriyorsun. Bu çok yardımcı!' },
        { text: 'Das ist egal welche Sprache.', translation: 'Hangi dil olduğu önemli değil.', correct: false, feedback: '"Wir sprechen Türkisch zu Hause" de ve çözüm sor.' }
      ]},
      { speaker: 'npc', text: 'Ja, auch zu Hause ein bisschen Deutsch wäre sehr hilfreich. Lesen Sie ihm abends vor?', translation: 'Evet, evde biraz Almanca da çok yardımcı olur. Akşamları ona yüksek sesle okur musunuz?' },
      { speaker: 'user', options: [
        { text: 'Noch nicht, aber ich werde damit anfangen. Können Sie Bücher empfehlen?', translation: 'Henüz değil, ama başlayacağım. Kitap önerebilir misiniz?', correct: true, feedback: '"Ich werde anfangen" = başlayacağım. Taahhüt veriyorsun ve pratik soru sordun!' },
        { text: 'Manchmal, aber nicht regelmäßig. Das ist eine gute Idee.', translation: 'Bazen, ama düzenli değil. Bu iyi bir fikir.', correct: true, feedback: '"Das ist eine gute Idee" = bu iyi bir fikir. Dürüst ve açık sözlü!' },
        { text: 'Er liest selbst.', translation: 'Kendisi okuyor.', correct: false, feedback: '"Manchmal lesen wir zusammen" veya "Ich werde damit anfangen" de.' }
      ]},
      { speaker: 'npc', text: 'Sehr gut! Gibt es auch schulische Aktivitäten, an denen Mehmet nicht teilnimmt?', translation: 'Çok iyi! Mehmet\'in katılmadığı okul aktiviteleri var mı?' },
      { speaker: 'user', options: [
        { text: 'Er möchte gerne in die Fußball-AG. Ist das möglich?', translation: 'Futbol kulübüne girmek istiyor. Bu mümkün mü?', correct: true, feedback: '"AG" = Arbeitsgemeinschaft = okul kulübü. "Ist das möglich?" = mümkün mü? Süper!' },
        { text: 'Er kommt immer pünktlich und nimmt an allem teil, soviel ich weiß.', translation: 'Bildiğim kadarıyla her zaman zamanında geliyor ve her şeye katılıyor.', correct: true, feedback: '"Soviel ich weiß" = bildiğim kadarıyla. Alçakgönüllü ve dürüst!' },
        { text: 'Er mag keine Aktivitäten.', translation: 'Aktiviteleri sevmiyor.', correct: false, feedback: 'Çocuğunun ilgilerini bilmek lazım. "Er mag Fußball sehr" de.' }
      ]},
      { speaker: 'npc', text: 'Ja, Fußball-AG ist möglich! Insgesamt macht Mehmet gute Fortschritte. Haben Sie noch Fragen?', translation: 'Evet, futbol kulübü mümkün! Genel olarak Mehmet iyi ilerleme kaydediyor. Sorularınız var mı?' },
      { speaker: 'user', options: [
        { text: 'Ja. Wann sind die nächsten Elterngespräche? Und kann ich auch zwischendurch kommen, wenn ich Fragen habe?', translation: 'Evet. Bir sonraki veli görüşmeleri ne zaman? Ve araya sorularım olursa gelebilir miyim?', correct: true, feedback: 'İki pratik soru! "Zwischendurch" = arada, zaman zaman. Aktif ebeveyn!' },
        { text: 'Nein, danke. Alles ist jetzt klar. Auf Wiedersehen Frau Klein!', translation: 'Hayır, teşekkürler. Artık her şey açık. Hoşça kalın Bayan Klein!', correct: true, feedback: '"Alles ist klar" = her şey açık. Kibar ve profesyonel kapanış!' },
        { text: 'Ich habe keine Fragen.', translation: 'Sorum yok.', correct: false, feedback: '"Haben Sie weitere Tipps?" de en azından.' }
      ]}
    ]
  },

  {
    id: 'emergency',
    title: 'Acil Durumda',
    icon: '🚨',
    color: '#D62828',
    bg: '#FFF5F5',
    level: 'A2',
    situation: 'Birisi düşüp yaralandı. 112\'yi arıyorsun ve ilk yardım talimatlarını takip ediyorsun.',
    npcName: 'Notruf 112',
    npcEmoji: '🚑',
    turns: [
      { speaker: 'npc', text: 'Notruf 112, was ist passiert?', translation: '112 Acil, ne oldu?' },
      { speaker: 'user', options: [
        { text: 'Hier ist ein Notfall! Ein älterer Mann ist gestürzt und liegt bewusstlos.', translation: 'Burada acil durum var! Yaşlı bir adam düştü ve bilinçsiz yatıyor.', correct: true, feedback: '"Bewusstlos" = bilinçsiz. Acil serviste en kritik kelime. Hızlı ve net!' },
        { text: 'Bitte schicken Sie schnell einen Krankenwagen!', translation: 'Lütfen hızlıca ambulans gönderin!', correct: true, feedback: '"Krankenwagen schicken" = ambulans göndermek. Direkt ve acil!' },
        { text: 'Ich brauche Hilfe, bitte kommen Sie!', translation: 'Yardıma ihtiyacım var, lütfen gelin!', correct: false, feedback: 'Ne olduğunu söyle! "Ein Mann ist gestürzt!" de.' }
      ]},
      { speaker: 'npc', text: 'Wo sind Sie genau?', translation: 'Tam olarak neredesiniz?' },
      { speaker: 'user', options: [
        { text: 'Hauptstraße 45 in Hamburg, vor dem Bäcker Schmidt. Bitte beeilen Sie sich!', translation: 'Hamburg, Hauptstraße 45, Schmidt fırınının önünde. Lütfen acele edin!', correct: true, feedback: 'Tam adres + mağaza referansı. Acil serviste adres hayati önem taşır!' },
        { text: 'Ich bin in der Stadtmitte, ich sehe ein großes rotes Gebäude. Ich weiß die genaue Adresse nicht.', translation: 'Şehir merkezindeyim, büyük kırmızı bir bina görüyorum. Tam adresi bilmiyorum.', correct: true, feedback: 'Bilmiyorsan görsel ipucu ver! Acil servis bunu kullanır.' },
        { text: 'Hier, auf der Straße.', translation: 'Burada, sokakta.', correct: false, feedback: 'Çok belirsiz! Sokak adını, yakın dükkan ya da binaları söyle.' }
      ]},
      { speaker: 'npc', text: 'Gut. Atmet die Person?', translation: 'İyi. Kişi nefes alıyor mu?' },
      { speaker: 'user', options: [
        { text: 'Ich überprüfe jetzt... Ja, er atmet, aber er ist bewusstlos und reagiert nicht auf meine Stimme.', translation: 'Şimdi kontrol ediyorum... Evet, nefes alıyor ama bilinçsiz ve sesime tepki vermiyor.', correct: true, feedback: '"Reagiert nicht auf meine Stimme" = sesime tepki vermiyor. Medikal açıdan kritik bilgi!' },
        { text: 'Ich weiß nicht wie ich das überprüfen soll!', translation: 'Bunu nasıl kontrol edeceğimi bilmiyorum!', correct: true, feedback: 'Dürüst! Acil servis sana adım adım yardım edecek.' },
        { text: 'Ich glaube ja.', translation: 'Sanırım evet.', correct: false, feedback: 'Kontrol et! "Ich überprüfe jetzt" de ve bak.' }
      ]},
      { speaker: 'npc', text: 'Gut. Bitte drehen Sie ihn in die stabile Seitenlage. Kennen Sie das?', translation: 'İyi. Lütfen kurtarma pozisyonuna alın. Bunu biliyor musunuz?' },
      { speaker: 'user', options: [
        { text: 'Ja, ich kenne die stabile Seitenlage. Ich mache das jetzt.', translation: 'Evet, kurtarma pozisyonunu biliyorum. Şimdi yapıyorum.', correct: true, feedback: '"Ich mache das jetzt" = şimdi yapıyorum. Aktif ve kararlı!' },
        { text: 'Nein! Können Sie mir erklären wie es geht?', translation: 'Hayır! Nasıl yapıldığını açıklayabilir misiniz?', correct: true, feedback: '"Können Sie erklären?" = açıklayabilir misiniz? Yardım istemek çok doğru!' },
        { text: 'Ich will ihn nicht berühren.', translation: 'Ona dokunmak istemiyorum.', correct: false, feedback: 'Acil durumda yardım etmek zorundasın. "Bitte erklären Sie mir" de.' }
      ]},
      { speaker: 'npc', text: 'Der Krankenwagen ist in 4 Minuten da. Bleiben Sie in der Leitung und beim Verletzten.', translation: 'Ambulans 4 dakikada orada. Hatta ve yaralının yanında kalın.' },
      { speaker: 'user', options: [
        { text: 'Verstanden. Ich bleibe hier. Er atmet regelmäßig.', translation: 'Anladım. Burada kalıyorum. Düzenli nefes alıyor.', correct: true, feedback: '"Regelmäßig atmen" = düzenli nefes almak. Durumu güncelliyorsun. Harika!' },
        { text: 'Okay. Es kommen immer mehr Menschen. Soll ich sie wegschicken?', translation: 'Tamam. Giderek daha fazla insan geliyor. Uzaklaştırayım mı?', correct: true, feedback: 'Kalabalık yönetimi! "Soll ich?" = ...yapmalı mıyım? Acil servisle koordinasyon.' },
        { text: 'Okay, ich gehe jetzt.', translation: 'Tamam, şimdi gidiyorum.', correct: false, feedback: 'Telefonu kapatma! Ambulans gelene kadar kal. "Ich bleibe hier" de.' }
      ]},
      { speaker: 'npc', text: 'Gut. Hat er Verletzungen — Blut oder Schwellungen?', translation: 'İyi. Yaralanması var mı — kan ya da şişlik?' },
      { speaker: 'user', options: [
        { text: 'Am Kopf ist eine kleine Wunde, er blutet leicht. Keine sichtbaren Schwellungen.', translation: 'Başında küçük bir yara var, hafif kanaması var. Görünür şişlik yok.', correct: true, feedback: '"Leicht bluten" = hafif kanama. "Keine sichtbaren Schwellungen" = görünür şişlik yok. Tıbbi gözlem!' },
        { text: 'Ich sehe Blut am Kopf. Was soll ich tun?', translation: 'Başında kan görüyorum. Ne yapmalıyım?', correct: true, feedback: 'Gördüğünü söylüyor ve yönerge istiyorsun. Doğru!' },
        { text: 'Ich sehe nichts.', translation: 'Hiçbir şey görmüyorum.', correct: false, feedback: 'Daha dikkatli bak. "Einen Moment... ich schaue genauer" de.' }
      ]},
      { speaker: 'npc', text: 'Bedecken Sie die Wunde wenn möglich. Der Krankenwagen ist gleich da!', translation: 'Mümkünse yaraya örtün. Ambulans neredeyse orada!' },
      { speaker: 'user', options: [
        { text: 'Ich benutze mein Taschentuch. Ich sehe den Krankenwagen kommen!', translation: 'Mendilimi kullanıyorum. Ambulansın geldiğini görüyorum!', correct: true, feedback: '"Ich sehe den Krankenwagen kommen" = ambulansı görüyorum. Canlı güncelleme!' },
        { text: 'Ich habe nichts dabei. Ein Mann gibt mir seine Jacke.', translation: 'Yanımda hiçbir şey yok. Bir adam bana ceketini veriyor.', correct: true, feedback: 'Çevredeki insanları kullanmak akıllıca. Gerçek senaryoya uygun!' },
        { text: 'Danke. Tschüss!', translation: 'Teşekkürler. Görüşürüz!', correct: false, feedback: 'Acil servisle telefonu kapatma! Ambulans gelince söyle.' }
      ]}
    ]
  }
];
