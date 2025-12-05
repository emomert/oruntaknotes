import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Calendar, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEO } from "@/components/SEO";
import { calculateReadingTime } from "@/lib/readingTime";
import type { BlogPost } from "@shared/schema";

export default function Home() {
  const { language, t } = useLanguage();
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const latestPosts = posts ? posts.slice(0, 3) : [];

  return (
    <>
      <SEO
        titleEn="Mert Oruntak"
        titleTr="Mert Oruntak"
        descriptionEn="Field notes, product experiments, and bilingual drafts."
        descriptionTr="Saha notları, ürün denemeleri ve çift dilli taslaklar."
        url="/"
      />
      <div className="min-h-screen">
        <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-10 py-12">
          <div className="max-w-2xl mx-auto space-y-10">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-semibold" data-testid="text-page-title">
                {t("Mert Oruntak", "Mert Oruntak")}
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">
                {t(
                  "Field notes, product experiments, and bilingual drafts. Here are the latest three—find the rest in the Blog.",
                  "Saha notları, ürün denemeleri ve çift dilli taslaklar. Son üç yazı burada, diğerleri Blog'da."
                )}
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-lg md:text-xl font-semibold">{t("Latest Posts", "Son Yazılar")}</h2>

              {isLoading && (
                <div className="space-y-8">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-6 md:p-7">
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

              {!isLoading && latestPosts && latestPosts.length === 0 && (
                <div className="text-center py-16" data-testid="text-no-posts">
                  <p className="text-muted-foreground text-base">
                    {t("No posts yet", "Henüz yazı yok")}
                  </p>
                </div>
              )}

              {!isLoading && latestPosts && latestPosts.length > 0 && (
                <div className="space-y-8">
                  {latestPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <Card
                        className="p-6 md:p-7 hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 border"
                        data-testid={`card-post-${post.slug}`}
                      >
                        <h2 className="text-xl md:text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {language === "tr" ? post.titleTr : post.titleEn}
                        </h2>
                        <p className="text-muted-foreground mb-3 leading-relaxed text-sm md:text-base line-clamp-2">
                          {language === "tr" ? post.excerptTr : post.excerptEn}
                        </p>
                        {(() => {
                          const tags =
                            language === "tr"
                              ? post.tagsTr ?? post.tags
                              : post.tags;
                          if (!tags || tags.length === 0) return null;
                          return (
                            <div className="flex gap-2 flex-wrap mb-4">
                              {tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs font-medium bg-muted px-2 py-1 rounded-full text-foreground/80"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          );
                        })()}
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
                              {calculateReadingTime(language === "tr" ? post.contentTr : post.contentEn)}{" "}
                              {t("min read", "dk okuma")}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}

              <div>
                <Link href="/blog">
                  <Button variant="outline" size="sm">
                    {t("View all posts", "Tüm yazıları gör")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
