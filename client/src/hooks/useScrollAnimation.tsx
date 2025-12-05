import { useEffect, useState } from "react";

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
}

export function FadeIn({
    children,
    className = "",
    delay = 0,
    duration = 600,
    direction = "up",
}: FadeInProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    const getTransform = () => {
        if (!isVisible) {
            switch (direction) {
                case "up":
                    return "translateY(30px)";
                case "down":
                    return "translateY(-30px)";
                case "left":
                    return "translateX(30px)";
                case "right":
                    return "translateX(-30px)";
                default:
                    return "none";
            }
        }
        return "translateY(0) translateX(0)";
    };

    return (
        <div
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
                transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
            }}
        >
            {children}
        </div>
    );
}

// Keep the scroll animate for below-the-fold content
interface ScrollAnimateProps {
    children: React.ReactNode;
    className?: string;
    animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right";
    delay?: number;
    duration?: number;
}

export function ScrollAnimate({
    children,
    className = "",
    animation = "fade-up",
    delay = 0,
    duration = 600,
}: ScrollAnimateProps) {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Add delay before showing
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                    observer.unobserve(ref);
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        observer.observe(ref);

        return () => {
            observer.unobserve(ref);
        };
    }, [ref, delay]);

    const getHiddenStyles = () => {
        switch (animation) {
            case "fade-up":
                return { opacity: 0, transform: "translateY(40px)" };
            case "fade-in":
                return { opacity: 0 };
            case "slide-left":
                return { opacity: 0, transform: "translateX(-40px)" };
            case "slide-right":
                return { opacity: 0, transform: "translateX(40px)" };
            default:
                return { opacity: 0 };
        }
    };

    const visibleStyles = {
        opacity: 1,
        transform: "translateY(0) translateX(0)",
    };

    return (
        <div
            ref={setRef}
            className={className}
            style={{
                ...(isVisible ? visibleStyles : getHiddenStyles()),
                transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
            }}
        >
            {children}
        </div>
    );
}
