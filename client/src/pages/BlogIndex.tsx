import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Calendar, Clock, Search, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEO } from "@/components/SEO";
import { calculateReadingTime } from "@/lib/readingTime";
import type { BlogPost } from "@shared/schema";

export default function BlogIndex() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(5); // Start with 5 posts
  const POSTS_PER_PAGE = 5;

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  // Extract all unique tags from posts
  const allTags = useMemo(() => {
    if (!posts) return [];
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      const tags = language === "tr" ? post.tagsTr ?? post.tags : post.tags;
      tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [posts, language]);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    if (!posts) return [];

    return posts.filter((post) => {
      const title = language === "tr" ? post.titleTr : post.titleEn;
      const excerpt = language === "tr" ? post.excerptTr : post.excerptEn;
      const tags = language === "tr" ? post.tagsTr ?? post.tags : post.tags;

      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === "" ||
        title.toLowerCase().includes(searchLower) ||
        excerpt.toLowerCase().includes(searchLower) ||
        tags?.some(tag => tag.toLowerCase().includes(searchLower));

      // Tag filter
      const matchesTag = selectedTag === null || tags?.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag, language]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTag(null);
    setVisibleCount(5); // Reset visible count when clearing filters
  };

  const hasActiveFilters = searchQuery !== "" || selectedTag !== null;

  // Get only visible posts
  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < filteredPosts.length;
  const remainingCount = filteredPosts.length - visibleCount;

  const loadMore = () => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  };

  return (
    <>
      <SEO
        titleEn="Blog"
        titleTr="Blog"
        descriptionEn="All posts about life, economics, and everything that inspires me."
        descriptionTr="Hayat, iktisat ve ilham aldığım her konuda yazdığım yazılar."
        url="/blog"
      />
      <div className="min-h-screen">
        <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-10 py-12">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {t("All Posts", "Tüm Yazılar")}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t("You can find my writings below — mostly about life, occasionally about economics, and generally about anything that inspires me.", "Çoğunlukla hayat, ara sıra iktisat ve genel olarak ise her konuda yazdığım yazılara aşağıdan ulaşabilirsin.")}
            </p>

            {/* Search and Filter Section */}
            <div className="mb-8 space-y-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t("Search posts...", "Yazı ara...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={t("Clear search", "Aramayı temizle")}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Tag Filters */}
              {allTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${selectedTag === tag
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                        }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}

              {/* Active filters indicator */}
              {hasActiveFilters && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>
                    {filteredPosts.length} {t("results", "sonuç")}
                    {selectedTag && ` ${t("in", "-")} "${selectedTag}"`}
                  </span>
                  <button
                    onClick={clearFilters}
                    className="text-primary hover:text-primary/80 transition-colors underline"
                  >
                    {t("Clear all", "Tümünü temizle")}
                  </button>
                </div>
              )}
            </div>

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

            {!isLoading && filteredPosts.length === 0 && (
              <div className="text-center py-16" data-testid="text-no-posts">
                <p className="text-muted-foreground text-base mb-4">
                  {hasActiveFilters
                    ? t("No posts found matching your search.", "Aramanızla eşleşen yazı bulunamadı.")
                    : t("No posts yet", "Henüz yazı yok")
                  }
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-primary hover:text-primary/80 transition-colors underline text-sm"
                  >
                    {t("Clear filters", "Filtreleri temizle")}
                  </button>
                )}
              </div>
            )}

            {!isLoading && filteredPosts.length > 0 && (
              <div className="space-y-8">
                {visiblePosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="p-6 md:p-7 hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 border">
                      <h2 className="text-xl md:text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {language === "tr" ? post.titleTr : post.titleEn}
                      </h2>
                      <p className="text-muted-foreground mb-3 leading-relaxed text-sm md:text-base line-clamp-2">
                        {language === "tr" ? post.excerptTr : post.excerptEn}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(post.publishedAt).toLocaleDateString(
                              language === "tr" ? "tr-TR" : "en-US",
                              { year: "numeric", month: "long", day: "numeric" },
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          <span>
                            {calculateReadingTime(language === "tr" ? post.contentTr : post.contentEn)} {t("min read", "dk okuma")}
                          </span>
                        </div>
                        {(() => {
                          const tags =
                            language === "tr" ? post.tagsTr ?? post.tags : post.tags;
                          if (!tags || tags.length === 0) return null;
                          return (
                            <div className="flex gap-2 flex-wrap">
                              {tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className={`text-xs font-medium px-2 py-1 rounded-full ${selectedTag === tag
                                    ? "bg-primary/20 text-primary"
                                    : "bg-muted text-foreground/80"
                                    }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    </Card>
                  </Link>
                ))}

                {/* Load More Button */}
                {hasMorePosts && (
                  <div className="flex justify-center pt-4">
                    <button
                      onClick={loadMore}
                      className="px-6 py-2.5 bg-muted hover:bg-muted/80 text-foreground font-medium rounded-lg transition-colors"
                    >
                      {t(`Load more (${remainingCount} remaining)`, `Daha fazla yükle (${remainingCount} kaldı)`)}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
