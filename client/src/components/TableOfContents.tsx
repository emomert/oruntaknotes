import { useState, useEffect, useMemo } from "react";
import { ChevronDown, ChevronUp, List } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    content: string;
    variant?: "mobile" | "desktop";
}

export function TableOfContents({ content, variant = "mobile" }: TableOfContentsProps) {
    const { t } = useLanguage();
    const [activeId, setActiveId] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);

    // Extract headings from markdown content
    const headings = useMemo(() => {
        const items: TocItem[] = [];
        // Match ##, ###, #### headings (we skip # as it's typically the title)
        const headingRegex = /^(#{2,4})\s+(.+)$/gm;
        let match;

        while ((match = headingRegex.exec(content)) !== null) {
            const level = match[1].length;
            const text = match[2].trim();
            // Create a slug from the heading text
            const id = text
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-");

            items.push({ id, text, level });
        }

        return items;
    }, [content]);

    // Track active heading based on scroll position
    useEffect(() => {
        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-80px 0% -80% 0%",
                threshold: 0,
            }
        );

        // Observe all heading elements
        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headings]);

    // Don't render if there are no headings or less than 2
    if (headings.length < 2) return null;

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Account for fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
            setActiveId(id);
            setIsOpen(false); // Close mobile menu after clicking
        }
    };

    // Mobile TOC - Collapsible
    if (variant === "mobile") {
        return (
            <div className="toc-mobile xl:hidden mb-6">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="toc-mobile-toggle w-full flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
                    aria-expanded={isOpen}
                >
                    <span className="flex items-center gap-2 font-medium text-sm">
                        <List className="h-4 w-4" />
                        {t("Table of Contents", "İçindekiler")}
                    </span>
                    {isOpen ? (
                        <ChevronUp className="h-4 w-4" />
                    ) : (
                        <ChevronDown className="h-4 w-4" />
                    )}
                </button>

                {isOpen && (
                    <nav className="toc-mobile-nav mt-2 p-3 rounded-lg border bg-card" aria-label="Table of contents">
                        <ul className="space-y-1">
                            {headings.map(({ id, text, level }) => (
                                <li key={id}>
                                    <button
                                        onClick={() => handleClick(id)}
                                        className={`toc-link block w-full text-left py-1.5 px-2 rounded text-sm transition-colors ${activeId === id
                                                ? "toc-link-active bg-primary/10 text-primary font-medium"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                            }`}
                                        style={{ paddingLeft: `${(level - 2) * 12 + 8}px` }}
                                    >
                                        {text}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        );
    }

    // Desktop TOC - Sticky Sidebar
    return (
        <aside className="toc-desktop" aria-label="Table of contents">
            <div className="toc-sidebar sticky top-24">
                <h4 className="toc-title font-semibold text-sm mb-3 text-foreground">
                    {t("On this page", "Bu sayfada")}
                </h4>
                <nav>
                    <ul className="space-y-1 border-l-2 border-muted">
                        {headings.map(({ id, text, level }) => (
                            <li key={id}>
                                <button
                                    onClick={() => handleClick(id)}
                                    className={`toc-link block w-full text-left py-1 text-sm transition-colors ${activeId === id
                                            ? "toc-link-active text-primary font-medium border-l-2 border-primary -ml-[2px] pl-3"
                                            : "text-muted-foreground hover:text-foreground pl-3"
                                        }`}
                                    style={{ paddingLeft: `${(level - 2) * 8 + 12}px` }}
                                >
                                    {text}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
