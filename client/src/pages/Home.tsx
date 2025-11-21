import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Calendar, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import type { BlogPost } from "@shared/schema";

export default function Home() {
  const { language, t } = useLanguage();
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-semibold mb-2" data-testid="text-page-title">
            {t("Latest Posts", "Son Yazılar")}
          </h1>
          <p className="text-muted-foreground mb-12">
            {t(
              "Thoughts, stories, and ideas",
              "Düşünceler, hikayeler ve fikirler"
            )}
          </p>

          {isLoading && (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6 md:p-8">
                  <Skeleton className="h-8 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && posts && posts.length === 0 && (
            <div className="text-center py-16" data-testid="text-no-posts">
              <p className="text-muted-foreground text-lg">
                {t("No posts yet", "Henüz yazı yok")}
              </p>
            </div>
          )}

          {!isLoading && posts && posts.length > 0 && (
            <div className="space-y-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card
                    className="p-6 md:p-8 hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 border"
                    data-testid={`card-post-${post.slug}`}
                  >
                    <h2 className="text-2xl md:text-3xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {language === "tr" ? post.titleTr : post.titleEn}
                    </h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                      {language === "tr" ? post.excerptTr : post.excerptEn}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                          {post.readTimeMinutes}{" "}
                          {t("min read", "dk okuma")}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
