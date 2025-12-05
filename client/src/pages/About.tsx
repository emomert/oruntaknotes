import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Twitter, Music } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function About() {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        titleEn="About"
        titleTr="Hakkımda"
        descriptionEn="Hello, I'm Mert Oruntak. Economics graduate, graphic designer, and amateur photographer."
        descriptionTr="Merhaba, ben Mert Oruntak. İktisat mezunu, grafik tasarımcı ve amatör fotoğrafçı."
        url="/about"
      />
      <div className="min-h-screen">
        <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-10 py-12">
          <div className="max-w-2xl mx-auto space-y-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold mb-3">
                {t("About Me", "Hakkımda")}
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {t(
                  "Hello, I’m Mert Oruntak. I graduated from Boğaziçi University with a degree in Economics in 2025. Alongside my economics education, I have been working as a graphic designer at an international company for over four years. Apart from that, I enjoy taking photographs and pursuing my own dreams. On this website, you can find many things about my life and my work. Feel free to read the blog posts I’ve shared or take a look at the photos I’ve taken.",
                  "Merhaba, ben Mert Oruntak. Boğaziçi Üniversitesi İktisat bölümünden 2025 yılında mezun oldum. İktisat eğitimimin yanı sıra 4 seneden uzun bir süredir uluslararası bir şirkette grafik tasarımcı olarak çalışmaktayım. Bunların haricinde fotoğraf çekmeyi ve kendi hayallerimin peşinde koşmayı severim. Bu sitede hayatım ve çalışmalırım hakkında bir çok içerik bulabilirsin. İstersen paylaştığım blog postlarını oku, istersen de çektiğim fotoğraflara göz at."
                )}
              </p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">
                  {t("What you'll find in this site?", "Bu sitede neler bulacaksın?")}
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>{t("Blog posts in Turkish and English.", "Türkçe ve İngilizce kaleme aldığım blog postları.")}</li>
                  <li>{t("The projects I have completed so far and the ones I am currently working on.", "Bugüne kadar tamamladığım ve devam etmekte olduğum projeler.")}</li>
                  <li>{t("The photos I have taken as an amateur photographer.", "Amatör bir fotoğrafçı olarak çektiğim fotoğraflar.")}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">
                  {t("Social Media", "Sosyal Medya")}
                </h2>
                <p className="text-muted-foreground">
                  {t(
                    "You can follow me on these platforms.",
                    "Beni bu platformlardan takip edebilirsin."
                  )}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" asChild>
                    <a href="https://x.com/mert_oruntak" target="_blank" rel="noreferrer noopener">
                      <Twitter className="mr-2 h-4 w-4" />
                      X (Twitter)
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://github.com/emomert" target="_blank" rel="noreferrer noopener">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://open.spotify.com/user/emomert?si=adef422396274886" target="_blank" rel="noreferrer noopener">
                      <Music className="mr-2 h-4 w-4" />
                      Spotify
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">
                  {t("CV / Resume", "CV / Özgeçmiş")}
                </h2>
                <p className="text-muted-foreground">
                  {t(
                    "You can open or download my CV as a PDF file.",
                    "CV'imi PDF dosyası olarak açıp indirebilirsin."
                  )}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <a href="/cv.pdf" target="_blank" rel="noreferrer noopener">
                      {t("Open CV", "CV'yi aç")}
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/cv.pdf" download>
                      {t("Download PDF", "PDF indir")}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-3">
                <h2 className="text-lg font-semibold">
                  {t("What am I doing right now?", "Şu anda ne yapıyorum?")}
                </h2>
                <p className="text-muted-foreground">
                  {t(
                    "As a recent graduate, I am currently job searching and working on various personal-scale projects during this period.",
                    "Yeni bir mezun olarak iş aramakta ve bu süre zarfında kişisel çaplı çeşitli projeler ile uğraşmaktayım."
                  )}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
