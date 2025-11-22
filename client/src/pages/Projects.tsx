import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Project } from "@shared/schema";

export default function Projects() {
  const { language, t } = useLanguage();
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-10 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2" data-testid="text-page-title">
            {t("Projects", "Projeler")}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t(
              "Things I've built and worked on",
              "Oluşturduğum ve üzerinde çalıştığım şeyler"
            )}
          </p>

          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <Skeleton className="w-full aspect-video rounded-t-md" />
                  <CardContent className="p-6">
                    <Skeleton className="h-7 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && projects && projects.length === 0 && (
            <div className="text-center py-16" data-testid="text-no-projects">
              <p className="text-muted-foreground text-base">
                {t("No projects yet", "Henüz proje yok")}
              </p>
            </div>
          )}

          {!isLoading && projects && projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="overflow-hidden hover-elevate transition-all duration-200"
                  data-testid={`card-project-${project.slug}`}
                >
                  <Link href={`/projects/${project.slug}`}>
                    <div className="relative aspect-video bg-muted overflow-hidden group cursor-pointer">
                      <img
                        src={project.thumbnailUrl}
                        alt={language === "tr" ? project.titleTr : project.titleEn}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-6">
                        <p className="text-white font-medium">
                          {t("View Project", "Projeyi Görüntüle")}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <CardContent className="p-6">
                    <Link href={`/projects/${project.slug}`}>
                      <h2 className="text-lg md:text-xl font-semibold mb-2 hover:text-primary transition-colors cursor-pointer">
                        {language === "tr" ? project.titleTr : project.titleEn}
                      </h2>
                    </Link>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {language === "tr"
                        ? project.descriptionTr
                        : project.descriptionEn}
                    </p>
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-project-url-${project.slug}`}
                      >
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {t("Visit Site", "Siteyi Ziyaret Et")}
                        </Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

