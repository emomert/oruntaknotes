import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Project } from "@shared/schema";

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:slug");
  const { language, t } = useLanguage();
  const slug = params?.slug;

  const { data: project, isLoading } = useQuery<Project>({
    queryKey: ["/api/projects", slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 py-12">
          <div className="max-w-2xl mx-auto">
            <Skeleton className="h-10 w-32 mb-8" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="w-full aspect-video mb-8" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-semibold mb-4" data-testid="text-not-found">
              {t("Project not found", "Proje bulunamadı")}
            </h1>
            <Link href="/projects">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("Back to projects", "Projelere dön")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const title = language === "tr" ? project.titleTr : project.titleEn;
  const description = language === "tr" ? project.descriptionTr : project.descriptionEn;
  const content = language === "tr" ? project.contentTr : project.contentEn;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-2xl mx-auto">
          <Link href="/projects">
            <Button variant="ghost" className="mb-8 -ml-4" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("All projects", "Tüm projeler")}
            </Button>
          </Link>

          <article>
            <h1
              className="text-3xl md:text-5xl font-semibold mb-4 leading-tight"
              data-testid="text-project-title"
            >
              {title}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">{description}</p>

            {project.projectUrl && (
              <div className="mb-8">
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-project-url"
                >
                  <Button>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t("Visit Project", "Projeyi Ziyaret Et")}
                  </Button>
                </a>
              </div>
            )}

            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={project.thumbnailUrl}
                alt={title}
                className="w-full"
                data-testid="img-project-thumbnail"
              />
            </div>

            <div className="border-t pt-8" data-testid="content-project">
              <MarkdownRenderer content={content} />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
