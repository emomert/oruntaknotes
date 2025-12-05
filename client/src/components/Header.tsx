import { Link, useLocation } from "wouter";
import { Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
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
      <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-10">
        <div className="max-w-2xl mx-auto flex flex-wrap md:flex-nowrap h-auto md:h-16 items-center justify-between gap-2 sm:gap-4 py-3 md:py-0">
          <Link href="/" data-testid="link-home">
            <span className="text-xl md:text-2xl font-semibold tracking-tight hover-elevate active-elevate-2 px-2 py-1 rounded-md cursor-pointer transition-all duration-150 max-w-[50vw] truncate">
              {t("Mert Oruntak", "Mert Oruntak")}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
            <Link href="/blog" data-testid="link-blog">
              <Button
                variant="ghost"
                className={`relative px-4 py-2 text-base font-semibold ${isActive("/blog") ? "bg-accent" : ""}`}
              >
                {t("Blog", "Blog")}
                {isActive("/blog") && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full transition-all duration-150" />
                )}
              </Button>
            </Link>
            <Link href="/about" data-testid="link-about">
              <Button
                variant="ghost"
                className={`relative px-4 py-2 text-base font-semibold ${isActive("/about") ? "bg-accent" : ""}`}
              >
                {t("About", "Hakkımda")}
                {isActive("/about") && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full transition-all duration-150" />
                )}
              </Button>
            </Link>
            <Link href="/projects" data-testid="link-projects">
              <Button
                variant="ghost"
                className={`relative px-4 py-2 text-base font-semibold ${isActive("/projects") ? "bg-accent" : ""}`}
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
                className={`relative px-4 py-2 text-base font-semibold ${isActive("/photography") ? "bg-accent" : ""}`}
              >
                {t("Photography", "Fotoğraf")}
                {isActive("/photography") && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full transition-all duration-150" />
                )}
              </Button>
            </Link>
          </nav>

          <nav className="md:hidden flex-1 flex justify-start" data-testid="nav-mobile">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" aria-label={t("Open menu", "Menüyü aç")}>
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="pt-14 px-4 pb-6 w-72 sm:w-80" aria-label="Mobile menu">
                <div className="space-y-3">
                  <Link href="/blog" data-testid="link-blog-mobile">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base"
                      aria-current={isActive("/blog") ? "page" : undefined}
                    >
                      {t("Blog", "Blog")}
                    </Button>
                  </Link>
                  <Link href="/about" data-testid="link-about-mobile">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base"
                      aria-current={isActive("/about") ? "page" : undefined}
                    >
                      {t("About", "Hakkımda")}
                    </Button>
                  </Link>
                  <Link href="/projects" data-testid="link-projects-mobile">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base"
                      aria-current={isActive("/projects") ? "page" : undefined}
                    >
                      {t("Projects", "Projeler")}
                    </Button>
                  </Link>
                  <Link href="/photography" data-testid="link-photography-mobile">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base"
                      aria-current={isActive("/photography") ? "page" : undefined}
                    >
                      {t("Photo", "Fotoğraflar")}
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "tr" : "en")}
              aria-label={t("Toggle language", "Dili değiştir")}
              data-testid="button-language-toggle"
            >
              <span className="text-sm font-semibold tracking-wide">{language === "tr" ? "EN" : "TR"}</span>
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
