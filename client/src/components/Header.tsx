import { Link, useLocation } from "wouter";
import { Moon, Sun, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export function Header() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" data-testid="link-home">
            <span className="text-xl font-semibold tracking-tight hover-elevate active-elevate-2 px-2 py-1 rounded-md cursor-pointer transition-all duration-150">
              {t("Blog", "Blog")}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
            <Link href="/" data-testid="link-blog">
              <Button
                variant="ghost"
                className={`relative ${isActive("/") && location === "/" ? "bg-accent" : ""}`}
              >
                {t("Blog", "Blog")}
                {isActive("/") && location === "/" && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full transition-all duration-150" />
                )}
              </Button>
            </Link>
            <Link href="/projects" data-testid="link-projects">
              <Button
                variant="ghost"
                className={`relative ${isActive("/projects") ? "bg-accent" : ""}`}
              >
                {t("Projects", "Projeler")}
                {isActive("/projects") && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full transition-all duration-150" />
                )}
              </Button>
            </Link>
            <Link href="/photography" data-testid="link-photography">
              <Button
                variant="ghost"
                className={`relative ${isActive("/photography") ? "bg-accent" : ""}`}
              >
                {t("Photography", "Fotoğraf")}
                {isActive("/photography") && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full transition-all duration-150" />
                )}
              </Button>
            </Link>
          </nav>

          <nav className="md:hidden flex-1 flex justify-center" data-testid="nav-mobile">
            <div className="flex items-center gap-1">
              <Link href="/" data-testid="link-blog-mobile">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`relative ${isActive("/") && location === "/" ? "bg-accent" : ""}`}
                >
                  {t("Blog", "Blog")}
                  {isActive("/") && location === "/" && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full transition-all duration-150" />
                  )}
                </Button>
              </Link>
              <Link href="/projects" data-testid="link-projects-mobile">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`relative ${isActive("/projects") ? "bg-accent" : ""}`}
                >
                  {t("Projects", "Projeler")}
                  {isActive("/projects") && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full transition-all duration-150" />
                  )}
                </Button>
              </Link>
              <Link href="/photography" data-testid="link-photography-mobile">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`relative ${isActive("/photography") ? "bg-accent" : ""}`}
                >
                  {t("Photo", "Foto")}
                  {isActive("/photography") && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full transition-all duration-150" />
                  )}
                </Button>
              </Link>
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === "en" ? "tr" : "en")}
              aria-label={t("Toggle language", "Dili değiştir")}
              data-testid="button-language-toggle"
            >
              <Languages className="h-5 w-5" />
              <span className="sr-only">{language.toUpperCase()}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={t("Toggle theme", "Temayı değiştir")}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">{t("Toggle theme", "Temayı değiştir")}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
