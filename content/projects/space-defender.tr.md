---
title: Space Defender FPS Oyunu
description: ThreeJS ile tasarladığım basit, rekabetçi bir FPS oyunu.
thumbnailUrl: /uploads/space-defender1.png
projectUrl: https://space-invaders-fps.netlify.app/
publishedAt: 2025-11-22
---
## Genel Bakış
Space Defender, tamamen vanilla web teknolojileri ve Three.js ile oluşturulmuş, tarayıcı tabanlı, dalga hayatta kalma (wave-survival) türünde bir FPS oyunudur. Uzayda asılı duran dairesel bir platformda neon ışıklı dronlarla savaşır; cephane, dayanıklılık (stamina) ve konumlandırmayı dengeleyerek yerel liderlik tablosunda tırmanmaya çalışırsınız. Her şey istemci tarafında çalışır—kurulum veya eklenti gerekmez—ve sisli aydınlatma, dönen yıldız alanı ve tamamen prosedürel bir silah modeli sayesinde sinematik bir his verir.

## Teknoloji 
- **Rendering**: 3D sahne, özel mesh'ler, yayılımcı (emissive) materyaller, yumuşak gölgeler ve 3 bin parçacıklı yıldız alanı için Three.js r128.
- **Ses**: Web Audio API, karanlık bir ambiyans döngüsü (filtreler, LFO'lar, sıralı arpejler) ve katmanlı plazma atış ses efektleri (SFX) üretir.
- **UI/UX**: HUD, duraklatma/oyun bitti ekranları, vinyet tehlike işareti, şarjör değiştirme ve dayanıklılık geri bildirimleri için Vanilla HTML/CSS katmanları.
- **Veri**: `localStorage` aracılığıyla yüksek skorların yerel kalıcılığı; `/.netlify/functions/save-score` adresine yapılan bir Netlify Function POST işlemi ile isteğe bağlı bulut kaydı.
- **Girdi**: FPS bakış açısı için Pointer Lock API; hareket ve ateş etme için klavye/fare.

## Oynanış Döngüsü
Bilgilendirme ve liderlik tablosunu görmek için `index.html` dosyasından başlayın, ardından `game.html` dosyasına geçiş yapın. İmleci kilitlemek için tıklayın, WASD ile hareket edin, Shift ile koşun ve sol fare tuşu ile ateş edin. Her düşman öldürme işlemi 100 taban puan artı mesafe bonusu kazandırır. Her sekiz öldürme dalgayı ilerletir, doğma aralıklarını sıkılaştırır ve düşman hızını artırır. Eğer yenilirseniz, koşunuzu yerel olarak (ve mümkünse Netlify'a) kaydedebilir ve hemen yeniden başlatabilirsiniz.

## Sistemler ve Mekanikler
- **Oyuncu**: Yenilenme özellikli dayanıklılık (stamina) sınırlı koşu, yerçekimi ve zıplama yönetimi ve sizi arenada tutmak için sınır sabitleme. Kalkan toplamaları, oyun bitmeden önce tek vuruşluk bir tampon sağlar.
- **Silah**: Kameraya bağlı prosedürel bir bilim kurgu tüfeği; 15 mermilik şarjörler, yeniden doldurma zamanlaması ve hızlı bir namlu ağzı parlaması katmanı içerir; cephane durumu HUD'a yansıtılır.
- **Düşmanlar**: Performansı korumak için sınırlandırılmış üç davranışa (standart, hızlı hücumcular ve süzülen şamandıralar) sahip havuzlanmış küreler. Oyuncuya kilitlenirler, oyuncuya dönerler ve saldırganlıklarını dalga başına ölçeklendirirler.
- **Güçlendirmeler**: Kalkan küreleri kabaca her 15 saniyede bir doğar, yayılımcı bir parıltıyla havada asılı kalıp döner ve eğer görmezden gelinirse ~10 saniye sonra sona erer.
- **UI/HUD**: Nişangah, cephane/hazırlık durumu, dayanıklılık çubuğu, kalkan rozeti, dalga/skor göstergeleri, en yakın düşman mesafesine endeksli tehlike çubuğu, artı kayıt akışına sahip duraklatma ve oyun bitti katmanları.

![In Game Screenshot](/uploads/space-defender2.png)

## Görsel ve İşitsel Stil
İkiz nokta ışıkları ve yönsel bir güneş ile karanlık, sisli bir sahne tonu belirlerken, yıldız alanı arenayı canlı tutmak için hafifçe süzülür. Silah, metalik ve camsı materyalleri camgöbeği (cyan) yayılımcı ışıklarla harmanlar. Ses, arka planda anlık hayatta kalmaya odaklanmayı sağlayan, ara sıra arpejli gerilimlerin eşlik ettiği, nabız gibi atan bir bilim kurgu uğultusu olarak yer alır.

## Projeyi Çalıştırma
`index.html` dosyasını modern bir masaüstü tarayıcıda (Chrome, Edge, Brave, Firefox) açın veya sorunsuz bir pointer lock (imleç kilidi) deneyimi için klasörü yerel olarak sunun (`npx serve` veya `python -m http.server`). “Start Game” butonuna tıklayın, imleç kilidi istemini kabul edin ve oynayın. Skorlar varsayılan olarak yerel kaydedilir; bulut kaydı, Netlify uç noktası (endpoint) mevcut olduğunda çalışır.