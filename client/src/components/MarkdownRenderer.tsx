import { useMemo, useCallback, useState } from "react";
import { useLocation } from "wouter";

interface MarkdownRendererProps {
  content: string;
  className?: string;
  enableFrames?: boolean;
}

export function MarkdownRenderer({ content, className = "", enableFrames = true }: MarkdownRendererProps) {
  const [, setLocation] = useLocation();
  const [lightbox, setLightbox] = useState<{ src: string; alt?: string } | null>(null);

  const processedContent = useMemo(() => {
    let processed = content;
    processed = processed.replace(/\r\n/g, "\n");

    processed = processed.replace(/!\[\[([^\]]+)\]\]/g, (_, filename) => {
      return `![${filename}](/api/images/${encodeURIComponent(filename)})`;
    });

    processed = processed.replace(/\[\[([^\]]+)\]\]/g, (_, linkText) => {
      const slug = linkText.toLowerCase().replace(/\s+/g, "-");
      return `<a href="/blog/${slug}" class="wiki-link text-primary underline decoration-primary/30 hover:decoration-primary bg-primary/5 px-1 rounded transition-all duration-150" data-wiki-slug="${slug}">${linkText}</a>`;
    });

    const sections = processed.split(/(```[\s\S]*?```)/g);
    let html = "";

    for (const section of sections) {
      if (section.startsWith("```")) {
        const codeMatch = section.match(/```(\w+)?\n([\s\S]*?)```/);
        if (codeMatch) {
          const [, lang, code] = codeMatch;
          html += `<pre class="bg-muted p-4 rounded-md overflow-x-auto my-4"><code class="text-sm">${escapeHtml(code.trim())}</code></pre>`;
        }
      } else {
        let sectionHtml = section;

        sectionHtml = sectionHtml.replace(/^### (.+)$/gm, '<h3 class="text-lg md:text-xl font-semibold mt-6 mb-3 leading-snug">$1</h3>');
        sectionHtml = sectionHtml.replace(/^## (.+)$/gm, '<h2 class="text-xl md:text-2xl font-semibold mt-8 mb-4 leading-tight">$1</h2>');
        sectionHtml = sectionHtml.replace(/^# (.+)$/gm, '<h1 class="text-2xl md:text-3xl font-semibold mt-10 mb-5 leading-tight">$1</h1>');

        sectionHtml = sectionHtml.replace(
          /!\[([^\]]*)\]\(([^)]+)\)/g,
          (_match, alt, src) =>
            enableFrames
              ? `<figure class="md-photo-frame" data-img-src="${src}" data-img-alt="${alt || ""}">
              <div class="md-photo-frame-inner">
                <img src="${src}" alt="${alt || ""}" loading="lazy" />
              </div>
              ${alt ? `<figcaption>${alt}</figcaption>` : ""}
            </figure>`
              : `<img src="${src}" alt="${alt || ""}" class="my-6 w-full" loading="lazy" />`,
        );

        sectionHtml = sectionHtml.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline hover:text-primary/80 transition-colors duration-150" target="_blank" rel="noopener noreferrer">$1</a>');

        sectionHtml = sectionHtml.replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm">$1</code>');

        sectionHtml = sectionHtml.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold">$1</strong>');
        sectionHtml = sectionHtml.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');

        sectionHtml = sectionHtml.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">$1</blockquote>');

        sectionHtml = sectionHtml.replace(/^\- (.+)$/gm, '<li class="ml-4">$1</li>');
        sectionHtml = sectionHtml.replace(/(<li class="ml-4">[\s\S]+<\/li>)/g, '<ul class="list-disc my-4 space-y-2">$1</ul>');

        sectionHtml = sectionHtml.replace(/^\d+\. (.+)$/gm, '<li class="ml-4">$1</li>');
        sectionHtml = sectionHtml.replace(/(<li class="ml-4">[\s\S]+<\/li>)/g, '<ol class="list-decimal my-4 space-y-2">$1</ol>');

        sectionHtml = sectionHtml.replace(/\n\n/g, '</p><p class="mb-4 leading-[1.7]">');

        html += sectionHtml;
      }
    }

    html = `<div class="prose-content"><p class="mb-4 leading-[1.7]">${html}</p></div>`;

    return html;
  }, [content]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    
    if (target.tagName === "A" && target.classList.contains("wiki-link")) {
      e.preventDefault();
      const slug = target.getAttribute('data-wiki-slug');
      if (slug) {
        setLocation(`/blog/${slug}`);
      }
    }
  }, [setLocation]);

  return (
    <>
      <div
        className={`prose max-w-none w-full mx-auto font-sans text-[15px] leading-[1.7] md:text-base prose-headings:leading-tight prose-headings:tracking-tight ${className}`}
        dangerouslySetInnerHTML={{ __html: processedContent }}
        onClick={(e) => {
          handleClick(e);
          const target = e.target as HTMLElement;
          const figure = target.closest(".md-photo-frame") as HTMLElement | null;
          if (figure) {
            const src = figure.getAttribute("data-img-src") || "";
            const alt = figure.getAttribute("data-img-alt") || undefined;
            if (src) {
              setLightbox({ src, alt });
            }
          }
        }}
      />
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md-lightbox-backdrop"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox.src}
            alt={lightbox.alt || ""}
            className="max-w-full max-h-full object-contain shadow-2xl md-lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            aria-label="Close"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          {lightbox.alt && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded">
              {lightbox.alt}
            </div>
          )}
        </div>
      )}
    </>
  );
}

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
