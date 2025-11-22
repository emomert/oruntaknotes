import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-10 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold mb-3">
              {t("About Me", "Hakkımda")}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {t(
                "I write bilingual notes, ship small products, and document field trips with a camera. This space is where the drafts, projects, and photos live together.",
                "Çift dilli notlar yazıyor, küçük ürünler çıkarıyor ve gezileri kamerayla belgeliyorum. Taslaklar, projeler ve fotoğraflar bu alanda bir arada."
              )}
            </p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">
                {t("What you'll find here", "Burada neler bulacaksın")}
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>{t("Long-form notes in Turkish and English.", "Türkçe ve İngilizce uzun notlar.")}</li>
                <li>{t("Project breakdowns with markdown specs and assets.", "Markdown spesifikasyonları ve varlıklarıyla proje özetleri.")}</li>
                <li>{t("Photo stories grouped by occasion.", "Etkinliklere göre gruplanmış fotoğraf hikayeleri.")}</li>
              </ul>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">Markdown</Badge>
                <Badge variant="secondary">Bilingual</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">Field Notes</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">
                {t("Resume / CV", "CV / Özgeçmiş")}
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
                {t("Now", "Şu an")}
              </h2>
              <p className="text-muted-foreground">
                {t(
                  "Exploring ways to keep writing, projects, and photography tightly linked without losing momentum.",
                  "Yazı, proje ve fotoğraf akışını koparmadan nasıl sıkı tutabileceğimi araştırıyorum."
                )}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
