---
title: Twitter Deprem Veri Analizi
description: 2023 Türkiye depremleri sırasında Twitter yasağının etkisi.
thumbnailUrl: /uploads/twitter-analysis1.png
projectUrl: https://github.com/emomert/Twitter_Veri_Analizi_Deprem
publishedAt: 2023-02-18
---
## Genel Bakış
**Twitter Veri Analizi: 6 Şubat Depremi ve Erişim Kısıtlaması**, 6 Şubat 2023 Kahramanmaraş depremleri sırasında sosyal medyanın hayati rolünü ve uygulanan erişim engelinin etkisini veri bilimi ile ortaya koyan bir çalışmadır. Bu proje, Python kütüphaneleri kullanılarak oluşturulan zaman serisi verileriyle, arama kurtarma faaliyetlerinin en yoğun olduğu saatlerde Twitter'a getirilen bant daraltma (bandwidth throttling) uygulamasının etkileşim sayılarını nasıl düşürdüğünü somutlaştırmaktadır.

## Teknoloji Yığını (Tech Stack)
- **Veri Toplama (Scraping):** Twitter API limitlerine takılmadan geçmişe dönük veri çekebilmek için `snscrape` kütüphanesi kullanıldı.
- **Veri İşleme:** Ham verilerin temizlenmesi, zaman damgalarının düzenlenmesi ve 15'er dakikalık periyotlara ayrılması için **Python** ve **Pandas** kullanıldı.
- **Görselleştirme:** Veri setini anlamlı grafiklere dökmek ve kırılma noktalarını vurgulamak için **Matplotlib** ve **Seaborn** kütüphaneleri tercih edildi.
- **Versiyon Kontrolü:** Proje kaynak kodları ve notebook dosyaları GitHub üzerinde `emomert/Twitter_Veri_Analizi_Deprem` reposunda barındırılmaktadır.

## Metodoloji ve Veri Temizliği
Projede, depremin gerçekleştiği andan itibaren **"deprem"** anahtar kelimesini içeren tweetler filtrelenerek çekilmiştir. Tüm tweetleri indirmek çok uzun süreceği için, hacmi en iyi temsil eden bu kelime üzerine yoğunlaşılmıştır.

Veri setinde 8 Şubat gece yarısı ile sabah saatleri arasında Twitter'ın global sunucularından kaynaklı veri boşlukları (0 değerler) tespit edilmiş ve analizin sapmaması adına bu aralıklar ortalama hesabından çıkarılarak veri temizliği yapılmıştır.

![Netblocks Verisi](/uploads/twitter-analysis2.jpeg)

## Analiz ve Bulgular
Analiz sonuçları, NetBlocks verileriyle de örtüşen çarpıcı bir tabloyu ortaya koymaktadır. 8 Şubat günü saat 16:00 sularında başlayan kısıtlama ile birlikte:
- Tweet atılma oranlarında, bir önceki güne kıyasla **%36'lık bir düşüş** gözlemlenmiştir.
- 12 saat süren bu kısıtlama boyunca insanlar VPN kullanmaya mecbur bırakılmış, bu da enkaz altındaki konum paylaşımlarına erişimi zorlaştırmıştır.
- Eldeki veriler global verilerdir; bölgesel bazda bakıldığında (lokasyon verisi eksikliği nedeniyle tam ölçülemese de) düşüşün çok daha dramatik olduğu tahmin edilmektedir.

![Kısıtlama Aralığı Grafiği](/uploads/twitter-analysis3.png)

## Toplumsal Etki
Deprem bölgesinde Twitter, bir sosyal medya uygulamasından öte bir "arama-kurtarma telsizi" görevi görmekteydi. Yapılan analizler ve o dönem sahadan alınan geri bildirimler (Örn: Fatih Altaylı & Oğuzhan Uğur yayını), kısıtlamanın koordinasyonu %70 oranında sekteye uğrattığını göstermektedir. Bu proje, "saniyenin" bile önemli olduğu bir afette iletişimin kesilmesinin veri tabanlı kanıtıdır.

/uploads/twitter-analysis-video.mp4

## Projeyi İnceleyin
Bu çalışmanın tüm kodlarına, veri setinin işleniş biçimine ve grafiklerin oluşturulma aşamalarına GitHub üzerinden ulaşabilirsiniz.

[GitHub Reposu: emomert/Twitter_Veri_Analizi_Deprem](https://github.com/emomert/Twitter_Veri_Analizi_Deprem)

