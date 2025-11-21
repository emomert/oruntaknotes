# Design Guidelines: Bilingual Personal Blog & Portfolio

## Design Approach

**Reference-Based Approach**: Drawing inspiration from Medium (reading experience), Notion (minimalist clarity), and Unsplash (photography presentation). The design prioritizes content readability with clean, distraction-free layouts that let blog posts, projects, and photography shine.

**Core Principle**: Elegant minimalism—every element serves a purpose. No decorative flourishes.

## Typography

**Font Stack**:
- Headings: Inter (weights: 600, 700) - clean, modern sans-serif
- Body: Georgia or Charter (weights: 400, 500) - serif for enhanced readability
- Code/Technical: JetBrains Mono (weight: 400)

**Hierarchy**:
- H1: 48px desktop / 36px mobile, semibold
- H2: 36px desktop / 28px mobile, semibold
- H3: 24px desktop / 20px mobile, semibold
- Body: 18px / 1.7 line-height for optimal reading
- UI elements: 14-16px Inter

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 8, 12, and 16 for consistent rhythm.

**Content Widths**:
- Blog posts: max-w-2xl (optimal 680px reading width)
- Projects/Photography grids: max-w-7xl
- Global container: px-4 md:px-8 lg:px-12

**Grid Patterns**:
- Blog list: Single column with post cards
- Projects: 2-column grid (mobile: 1 column, desktop: 2 columns)
- Photography: Masonry-style grid (1/2/3 columns responsive)

## Navigation & Structure

**Header** (sticky, backdrop blur):
- Left: Logo/Name (links to homepage)
- Center: Navigation links (Blog • Projects • Photography)
- Right: Language toggle (EN/TR icon) + Theme switcher (sun/moon icon)
- Height: 64px, minimal border-bottom

**Section Navigation**: Clear active state with underline indicator showing current section

**Footer** (minimal):
- Social links (if applicable)
- Copyright notice
- Single line, centered, py-8

## Component Library

**Blog Post Cards**:
- Title (H3), excerpt (2-3 lines), read time, date
- Minimal border, hover: subtle shadow lift
- Spacing: gap-8 between cards

**Project Cards**:
- Thumbnail image (16:9 ratio)
- Title overlay on hover with blurred background
- Brief description below image
- CTA: "View Project" link

**Photography Grid**:
- Full-bleed images in masonry layout
- Lightbox on click for full-size viewing
- Minimal caption on hover (blurred overlay)

**Markdown Content Styling**:
- Internal links [[wiki-style]]: Distinct styling (underline + subtle background)
- Images: Full width within content column, rounded corners (8px)
- Code blocks: Syntax highlighting, rounded background
- Blockquotes: Left border accent, italic text

**Theme Switcher**:
- Toggle icon button (no text)
- Smooth transition (200ms) on theme change
- Persists preference

**Language Toggle**:
- Flag icons or EN/TR text toggle
- Instant switch, no page reload

## Animation Strategy

**Minimal, purposeful animations**:
- Page transitions: 150ms fade
- Card hover: 200ms shadow/transform
- Theme switch: 200ms for background/text
- Navigation active state: 150ms underline slide
- Image loads: Subtle fade-in (300ms)

**NO animations on**:
- Initial page load (performance)
- Scroll-triggered effects (keep it fast)
- Text/typography (readability priority)

## Images

**Hero Section**: NOT applicable - homepage goes straight to blog post list. No hero image.

**Image Usage**:
- Project thumbnails: 16:9 ratio, high quality
- Photography gallery: Original aspect ratios preserved
- Blog post images: Inline within content, max-w-full
- All images: Lazy loading, optimized formats (WebP with fallbacks)

## Responsive Behavior

**Breakpoints**:
- Mobile: < 768px (single column everything)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: > 1024px (full layouts)

**Mobile Optimizations**:
- Hamburger menu for navigation on mobile
- Stack header elements vertically if needed
- Reduce font sizes by 20-30%
- Increase touch target sizes (min 44px)
- Photography grid: 1 column on mobile, 2 on tablet, 3 on desktop

## Content-First Design

- Blog homepage: Immediately shows latest posts, no hero section
- Reading experience: Distraction-free, generous margins
- Clear visual hierarchy guides eye through content
- White/negative space as a design element, not emptiness

**Quality Mandate**: This is a personal brand showcase. Every section should feel polished and professional while maintaining the minimalist aesthetic. Less is more, but what exists should be exceptional.