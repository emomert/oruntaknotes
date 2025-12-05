import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

interface SEOProps {
    title?: string;
    titleEn?: string;
    titleTr?: string;
    description?: string;
    descriptionEn?: string;
    descriptionTr?: string;
    image?: string;
    url?: string;
    type?: "website" | "article";
    publishedAt?: string | Date;
    tags?: string[];
}

export function SEO({
    title,
    titleEn,
    titleTr,
    description,
    descriptionEn,
    descriptionTr,
    image,
    url,
    type = "website",
    publishedAt,
    tags,
}: SEOProps) {
    const { language } = useLanguage();

    const siteName = "Mert Oruntak";
    const siteUrl = "https://mertoruntak.com"; // Update with your actual domain

    // Determine the final title and description based on language
    const finalTitle = title || (language === "tr" ? titleTr : titleEn) || siteName;
    const fullTitle = finalTitle === siteName ? siteName : `${finalTitle} | ${siteName}`;

    const finalDescription = description ||
        (language === "tr" ? descriptionTr : descriptionEn) ||
        (language === "tr"
            ? "Saha notları, ürün denemeleri ve çift dilli taslaklar."
            : "Field notes, product experiments, and bilingual drafts.");

    const finalUrl = url ? `${siteUrl}${url}` : siteUrl;
    const finalImage = image || `${siteUrl}/og-image.png`;

    // Convert Date to ISO string if needed
    const publishedAtString = publishedAt instanceof Date
        ? publishedAt.toISOString()
        : publishedAt;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={finalDescription} />
            <link rel="canonical" href={finalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={finalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content={language === "tr" ? "tr_TR" : "en_US"} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={finalUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage} />
            <meta name="twitter:creator" content="@mert_oruntak" />

            {/* Article specific */}
            {type === "article" && publishedAtString && (
                <meta property="article:published_time" content={publishedAtString} />
            )}
            {type === "article" && tags && tags.map((tag, index) => (
                <meta key={index} property="article:tag" content={tag} />
            ))}

            {/* Language */}
            <html lang={language} />
        </Helmet>
    );
}
