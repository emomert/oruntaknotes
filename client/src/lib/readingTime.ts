/**
 * Calculate estimated reading time for text content
 * @param content - The text content (markdown or plain text)
 * @param wordsPerMinute - Reading speed (default: 200 wpm, average adult reading speed)
 * @returns Estimated reading time in minutes (minimum 1)
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
    if (!content || content.trim() === "") {
        return 1;
    }

    // Remove markdown syntax for more accurate word count
    let text = content
        // Remove code blocks
        .replace(/```[\s\S]*?```/g, "")
        // Remove inline code
        .replace(/`[^`]+`/g, "")
        // Remove images
        .replace(/!\[.*?\]\(.*?\)/g, "")
        // Remove links but keep link text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        // Remove wiki-style links
        .replace(/\[\[([^\]]+)\]\]/g, "$1")
        // Remove HTML tags
        .replace(/<[^>]+>/g, "")
        // Remove markdown headers
        .replace(/^#+\s*/gm, "")
        // Remove emphasis markers
        .replace(/[*_~]+/g, "")
        // Remove blockquote markers
        .replace(/^>\s*/gm, "")
        // Remove list markers
        .replace(/^[-*+]\s*/gm, "")
        .replace(/^\d+\.\s*/gm, "");

    // Count words (split by whitespace)
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;

    // Calculate reading time
    const minutes = Math.ceil(wordCount / wordsPerMinute);

    // Return at least 1 minute
    return Math.max(1, minutes);
}

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @param language - Language code ('en' or 'tr')
 * @returns Formatted string like "5 min read" or "5 dk okuma"
 */
export function formatReadingTime(minutes: number, language: "en" | "tr" = "en"): string {
    if (language === "tr") {
        return `${minutes} dk okuma`;
    }
    return `${minutes} min read`;
}
