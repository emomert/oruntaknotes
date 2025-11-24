import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Photo } from "@shared/schema";

export default function Photography() {
  const { language, t } = useLanguage();
  const { data: photos, isLoading } = useQuery<Photo[]>({
    queryKey: ["/api/photos"],
  });

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-10 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold mb-2" data-testid="text-page-title">
                {t("Photography", "Fotoğrafçılık")}
              </h1>
              <p className="text-muted-foreground">
                {t("Collections from different occasions", "Farklı anlardan oluşan koleksiyonlar")}
              </p>
            </div>
          </div>

          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <Skeleton className="w-full aspect-[4/3]" />
                  <CardContent className="p-6 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && photos && photos.length === 0 && (
            <div className="text-center py-16" data-testid="text-no-photos">
              <p className="text-muted-foreground text-base">
                {t("No photos yet", "Henüz fotoğraf yok")}
              </p>
            </div>
          )}

          {!isLoading && photos && photos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {photos.map((photo) => {
                const title = language === "tr" ? photo.titleTr : photo.titleEn;
                const caption = language === "tr" ? photo.captionTr : photo.captionEn;
                const date = new Date(photo.takenAt).toLocaleDateString(
                  language === "tr" ? "tr-TR" : "en-US",
                  { year: "numeric", month: "long", day: "numeric" },
                );

                return (
                  <Link key={photo.slug} href={`/photography/${photo.slug}`}>
                    <Card className="overflow-hidden hover-elevate transition-all duration-200 cursor-pointer">
                      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                        <img
                          src={photo.imageUrl}
                          alt={caption ?? ""}
                          className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/5 to-transparent dark:from-black/50 pointer-events-none" />
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/5 to-transparent dark:from-black/50 pointer-events-none" />
                      </div>
                      <CardContent className="p-6 space-y-3">
                        <h2 className="text-lg font-semibold leading-tight">{title}</h2>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{date}</span>
                        </div>
                        {caption && (
                          <p className="text-base leading-relaxed">
                            {caption}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
