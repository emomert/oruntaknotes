import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-8 mt-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <p className="text-center text-sm text-muted-foreground" data-testid="text-copyright">
          © {currentYear} {t("All rights reserved", "Tüm hakları saklıdır")}
        </p>
      </div>
    </footer>
  );
}
