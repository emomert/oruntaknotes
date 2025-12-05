import { useState, useEffect } from "react";

interface ReadingProgressProps {
    /**
     * Optional target element selector. If not provided, tracks document scroll.
     */
    target?: string;
}

export function ReadingProgress({ target }: ReadingProgressProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            let element: Element | null = null;
            let scrollTop = 0;
            let scrollHeight = 0;
            let clientHeight = 0;

            if (target) {
                element = document.querySelector(target);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const elementTop = window.scrollY + rect.top;
                    const elementHeight = element.scrollHeight;
                    scrollTop = window.scrollY - elementTop;
                    scrollHeight = elementHeight;
                    clientHeight = window.innerHeight;
                }
            } else {
                scrollTop = window.scrollY;
                scrollHeight = document.documentElement.scrollHeight;
                clientHeight = window.innerHeight;
            }

            const maxScroll = scrollHeight - clientHeight;
            const currentProgress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

            // Clamp between 0 and 100
            setProgress(Math.min(100, Math.max(0, currentProgress)));
        };

        // Initial calculation
        updateProgress();

        // Add scroll listener
        window.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", updateProgress, { passive: true });

        return () => {
            window.removeEventListener("scroll", updateProgress);
            window.removeEventListener("resize", updateProgress);
        };
    }, [target]);

    // Don't render if no progress
    if (progress <= 0) return null;

    return (
        <div
            className="reading-progress-container"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Reading progress"
        >
            <div
                className="reading-progress-bar"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
