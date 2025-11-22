import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { useLanguage } from "@/contexts/LanguageContext";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const { language, t } = useLanguage();
  const slug = params?.slug;

  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: ["/api/blog-posts", slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-12 py-12">
          <div className="max-w-2xl mx-auto">
            <Skeleton className="h-10 w-32 mb-8" />
            <Skeleton className="h-12 w-full mb-4" />
            <div className="flex gap-4 mb-8">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-24" />
            </div>
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

  if (!post) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-12 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-semibold mb-4" data-testid="text-not-found">
              {t("Post not found", "Yazı bulunamadı")}
            </h1>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("Back to home", "Ana sayfaya dön")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const title = language === "tr" ? post.titleTr : post.titleEn;
  const content = language === "tr" ? post.contentTr : post.contentEn;
  const tags = language === "tr" ? post.tagsTr ?? post.tags : post.tags;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-10 py-12">
        <div className="max-w-2xl mx-auto">

          <article>
            <h1
              className="text-2xl md:text-3xl font-semibold mb-4 leading-tight"
              data-testid="text-post-title"
            >
              {title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString(
                    language === "tr" ? "tr-TR" : "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>
                  {post.readTimeMinutes} {t("min read", "dk okuma")}
                </span>
              </div>
              {tags && tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  {tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div data-testid="content-post">
              <MarkdownRenderer content={content} enableFrames={false} />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
