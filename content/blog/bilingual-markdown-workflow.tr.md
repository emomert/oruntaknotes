---
title: Çift Dilli Markdown Akışı
excerpt: Markdown odaklı akış ile Türkçe ve İngilizce taslakları nasıl eşli tutuyorum.
readTimeMinutes: "6"
publishedAt: 2025-01-12
tagsTr:
  - markdown
  - çift-dil
tagsEn:
  - markdown
  - bilingual
---
# Çift Dilli Markdown Akışı

Türkçe ve İngilizce taslakları yanyana tutuyorum; böylece anlam kaybı olmuyor. Her dil kendi dosyasında, ama slug aynı kalıyor.

## Klasör düzeni

- `content/blog/<slug>.en.md`
- `content/blog/<slug>.tr.md`
- Ortak görseller `uploads/` içindedir.

## Neden wiki bağları

Taslak yazarken yazılar arasında Obsidian tarzı bağlantılarla gezinmeyi seviyorum. Bu sayfadan [[shipping-in-public]] veya [[field-notes-from-cappadocia]] bağlantılarını tıklayarak deneyebilirsin.

## Görsel gömme

Görseller yükleme klasöründen veya image API üzerinden gelebilir. Bu eskiz wiki görsel sözdizimiyle ekleniyor, yani `/api/images/:filename` üzerinden servis ediliyor:

![[journey-sketch.svg]]

Aynı görseli düz bir yol ile de gösterebiliriz:

![Yolculuk eskizi](/uploads/journey-sketch.svg)

SVG dışında bir format görmek için PNG küçük görseli de ekliyorum:

![Learning map board PNG](/uploads/learning-map-board.png)

## Örnek kod bloğu

```bash
npm install
npx tsx server/index-dev.ts
open http://localhost:5000
```

## Yayınlama adımları

1. İngilizce taslağı yaz.
2. Türkçeye aynala.
3. Özet ve okuma süresini (string) ekle.
4. Görselleri `uploads/` içine bırak.
5. Kısa slug kullan (`bilingual-markdown-workflow`).
