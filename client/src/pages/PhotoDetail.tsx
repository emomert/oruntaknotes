import { Link, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Photo } from "@shared/schema";

export default function PhotoDetail() {
  const [, params] = useRoute("/photography/:slug");
  const { language, t } = useLanguage();
  const slug = params?.slug;

  const { data: photo, isLoading } = useQuery<Photo>({
    queryKey: ["/api/photos", slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-12 py-12">
          <div className="max-w-2xl mx-auto space-y-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="w-full aspect-[3/2] rounded-lg" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-12 py-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h1 className="text-2xl font-semibold">{t("Photo not found", "Fotoğraf bulunamadı")}</h1>
            <Link href="/photography">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("Back to photography", "Fotoğrafa geri dön")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const caption = language === "tr" ? photo.captionTr : photo.captionEn;
  const content = language === "tr" ? photo.contentTr : photo.contentEn;
  const date = new Date(photo.takenAt).toLocaleDateString(
    language === "tr" ? "tr-TR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-10 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
            {caption && <p className="text-base leading-relaxed italic text-muted-foreground">{caption}</p>}
            <div className="border-t pt-6">
              <MarkdownRenderer content={content} enableFrames />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
