import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Photo } from "@shared/schema";

export default function Photography() {
  const { language, t } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const { data: photos, isLoading } = useQuery<Photo[]>({
    queryKey: ["/api/photos"],
  });

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-semibold mb-2" data-testid="text-page-title">
            {t("Photography", "Fotoğrafçılık")}
          </h1>
          <p className="text-muted-foreground mb-12">
            {t("Moments captured through the lens", "Objektiften yakalanan anlar")}
          </p>

          {isLoading && (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="w-full h-64 rounded-lg" />
              ))}
            </div>
          )}

          {!isLoading && photos && photos.length === 0 && (
            <div className="text-center py-16" data-testid="text-no-photos">
              <p className="text-muted-foreground text-lg">
                {t("No photos yet", "Henüz fotoğraf yok")}
              </p>
            </div>
          )}

          {!isLoading && photos && photos.length > 0 && (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative group break-inside-avoid cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                  data-testid={`photo-${photo.id}`}
                >
                  <img
                    src={photo.imageUrl}
                    alt={
                      language === "tr"
                        ? photo.captionTr || ""
                        : photo.captionEn || ""
                    }
                    className="w-full rounded-lg hover-elevate transition-all duration-200"
                  />
                  {(photo.captionEn || photo.captionTr) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-end p-4">
                      <p className="text-white text-sm">
                        {language === "tr" ? photo.captionTr : photo.captionEn}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
          data-testid="lightbox"
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors"
            onClick={() => setSelectedPhoto(null)}
            data-testid="button-close-lightbox"
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={selectedPhoto.imageUrl}
            alt={
              language === "tr"
                ? selectedPhoto.captionTr || ""
                : selectedPhoto.captionEn || ""
            }
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {(selectedPhoto.captionEn || selectedPhoto.captionTr) && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-lg max-w-2xl">
              <p className="text-center">
                {language === "tr"
                  ? selectedPhoto.captionTr
                  : selectedPhoto.captionEn}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
