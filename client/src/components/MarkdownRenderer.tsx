import { useMemo, useCallback, useState, useEffect } from "react";
import { useLocation } from "wouter";
import exifr from "exifr";
import { Camera, Aperture, Timer, Zap, Maximize2, X } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
  enableFrames?: boolean;
}

export function MarkdownRenderer({ content, className = "", enableFrames = true }: MarkdownRendererProps) {
  const [, setLocation] = useLocation();
  const [lightbox, setLightbox] = useState<{ src: string; alt?: string; exif?: any } | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [showExif, setShowExif] = useState(false);

  const closeLightbox = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setLightbox(null);
      setIsClosing(false);
      setShowExif(false);
    }, 200); // Match animation duration
  }, []);

  useEffect(() => {
    if (lightbox?.src && !lightbox.exif) {
      exifr.parse(lightbox.src).then((exif) => {
        if (exif) {
          setLightbox((prev) => (prev ? { ...prev, exif } : null));
        }
      }).catch(() => {
        // Ignore errors or no EXIF data
      });
    }
  }, [lightbox?.src]);

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

    processed = convertEmbeds(processed);

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

        sectionHtml = sectionHtml.replace(/^\- (.+)$/gm, '<li class="ul-li">$1</li>');
        sectionHtml = sectionHtml.replace(/((?:<li class="ul-li">.*?<\/li>\n*)+)/g, '<ul class="list-disc list-outside pl-6 my-4 space-y-2">$1</ul>');

        sectionHtml = sectionHtml.replace(/^\d+\. (.+)$/gm, '<li class="ol-li">$1</li>');
        sectionHtml = sectionHtml.replace(/((?:<li class="ol-li">.*?<\/li>\n*)+)/g, '<ol class="list-decimal list-outside pl-6 my-4 space-y-2">$1</ol>');

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
          className={`fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md-lightbox-backdrop ${isClosing ? 'closing' : ''}`}
          onClick={closeLightbox}
        >
          <div className="relative flex justify-center items-center">
            <img
              src={lightbox.src}
              alt={lightbox.alt || ""}
              className={`max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] object-contain shadow-2xl md-lightbox-image peer ${isClosing ? 'closing' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setShowExif(!showExif);
              }}
            />
            <button
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors z-10"
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
            >
              <X className="w-5 h-5" />
            </button>

            {/* EXIF Data Overlay */}
            {lightbox.exif && (
              <div
                className={`absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-black/60 backdrop-blur-sm text-white p-4 rounded-lg text-sm transition-opacity duration-300 ${showExif ? 'opacity-100' : 'opacity-0 md:peer-hover:opacity-100 md:hover:opacity-100'} cursor-pointer md:cursor-default max-w-[46vw] sm:max-w-xs md:max-w-sm`}
                onClick={(e) => {
                  e.stopPropagation();
                  const target = e.currentTarget;
                  target.classList.toggle('opacity-100');
                }}
              >
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 auto-rows-auto">
                  {lightbox.exif.Model && (
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-muted-foreground" />
                      <span>{lightbox.exif.Model}</span>
                    </div>
                  )}
                  {lightbox.exif.FNumber && (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 flex items-center justify-center font-serif italic text-muted-foreground">f</div>
                      <span>f/{lightbox.exif.FNumber}</span>
                    </div>
                  )}
                  {lightbox.exif.ExposureTime && (
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-muted-foreground" />
                      <span>1/{Math.round(1 / lightbox.exif.ExposureTime)}s</span>
                    </div>
                  )}
                  {lightbox.exif.ISO && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-muted-foreground border border-muted-foreground px-0.5 rounded">ISO</span>
                      <span>{lightbox.exif.ISO}</span>
                    </div>
                  )}
                  {lightbox.exif.FocalLength && (
                    <div className="flex items-center gap-2">
                      <Maximize2 className="w-4 h-4 text-muted-foreground" />
                      <span>{Math.round(lightbox.exif.FocalLength)}mm</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {lightbox.alt && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-6 bg-black/70 text-white px-4 py-2 rounded text-center max-w-[90vw] md:max-w-[70vw] lg:max-w-3xl pointer-events-none">
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

function convertEmbeds(text: string): string {
  return text.replace(/^(https?:\/\/[^\s]+|\/uploads\/[^\s]+)\s*$/gm, (full, url) => {
    const youtubeId = getYouTubeId(url);
    if (youtubeId) {
      return `<div class="md-embed md-embed-video"><iframe src="https://www.youtube.com/embed/${youtubeId}" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe></div>`;
    }

    const twitterSrc = getTwitterEmbed(url);
    if (twitterSrc) {
      return `<div class="md-embed md-embed-twitter"><iframe src="${twitterSrc}" title="Twitter post" loading="lazy" allowtransparency="true"></iframe></div>`;
    }

    const spotify = getSpotifyEmbed(url);
    if (spotify) {
      return `<div class="md-embed md-embed-spotify"><iframe src="${spotify.src}" title="Spotify embed" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" height="${spotify.height}"></iframe></div>`;
    }

    const videoEmbed = getVideoEmbed(url);
    if (videoEmbed) {
      return `<div class="md-embed md-embed-video"><video src="${videoEmbed}" controls playsinline preload="metadata"></video></div>`;
    }

    return full;
  });
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/i);
  return match ? match[1] : null;
}

function getTwitterEmbed(url: string): string | null {
  const isStatus = /^https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/[^/]+\/status\/\d+(?:\?[^\s]*)?$/i;
  if (!isStatus.test(url)) return null;
  return `https://twitframe.com/show?url=${encodeURIComponent(url)}`;
}

function getSpotifyEmbed(url: string): { src: string; height: number } | null {
  const match = url.match(/^https?:\/\/open\.spotify\.com\/(track|album|playlist|episode|show)\/([A-Za-z0-9]+)(?:\?[^\s]*)?/i);
  if (!match) return null;
  const [, type, id] = match;
  const height = type === "track" ? 152 : 352;
  return {
    src: `https://open.spotify.com/embed/${type}/${id}`,
    height,
  };
}

function getVideoEmbed(url: string): string | null {
  const match = url.match(/\.(mp4|webm|ogg|mov|m4v)(\?[^\s]*)?$/i);
  if (!match) return null;
  return url;
}
