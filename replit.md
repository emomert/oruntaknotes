# Bilingual Personal Blog & Portfolio

## Overview

This is a bilingual (English/Turkish) personal blog and portfolio website featuring blog posts, projects, and photography sections. The application follows a minimalist design philosophy inspired by Medium, Notion, and Unsplash, prioritizing content readability and elegant presentation. Built with React, Express, and PostgreSQL (via Drizzle ORM), it provides a full-stack solution for personal content management with bilingual support throughout.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query for server state management and data fetching

**UI Component System**
- shadcn/ui components built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- CSS variables for theming support (light/dark mode)
- Component aliases configured for clean imports (`@/components`, `@/lib`, etc.)

**State Management**
- Context API for global state:
  - `ThemeContext`: Manages light/dark theme switching with localStorage persistence
  - `LanguageContext`: Handles English/Turkish language switching with localStorage persistence
- TanStack Query for asynchronous server state with automatic caching

**Content Rendering**
- Custom `MarkdownRenderer` component for parsing and rendering markdown content
- Support for wiki-style links (`[[Page Title]]`) for internal navigation
- Image handling with special syntax (`![[filename]]`) for uploaded assets
- Syntax highlighting for code blocks

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for the REST API
- Separate entry points for development (`index-dev.ts`) and production (`index-prod.ts`)
- Development mode integrates Vite middleware for SSR and HMR

**API Design**
- RESTful endpoints for blog posts, projects, and photos
- CRUD operations with validation via Zod schemas
- File upload support using Multer middleware
- Static file serving from `/uploads` directory

**Routing Structure**
```
GET  /api/blog-posts          - List all blog posts
GET  /api/blog-posts/:slug    - Get single blog post by slug
POST /api/blog-posts          - Create new blog post
GET  /api/projects            - List all projects
GET  /api/projects/:slug      - Get single project by slug
POST /api/projects            - Create new project
GET  /api/photos              - List all photos
POST /api/photos              - Upload new photo
```

**File Upload Strategy**
- Multer configured with disk storage in `uploads/` directory
- File size limit: 10MB
- Filename sanitization and unique suffix generation to prevent conflicts
- Support for image uploads used in photography gallery and project thumbnails

### Data Storage Solutions

**Database**
- PostgreSQL via Neon Database (serverless PostgreSQL)
- Drizzle ORM for type-safe database queries and schema management
- Schema migrations managed through `drizzle-kit`

**Schema Design**

*Blog Posts Table*
- UUID primary key
- Unique slug for URL routing
- Bilingual fields: `titleEn`, `titleTr`, `contentEn`, `contentTr`, `excerptEn`, `excerptTr`
- `readTimeMinutes` for estimated reading time
- `publishedAt` timestamp

*Projects Table*
- UUID primary key
- Unique slug for URL routing
- Bilingual fields: `titleEn`, `titleTr`, `descriptionEn`, `descriptionTr`, `contentEn`, `contentTr`
- `thumbnailUrl` for project preview image
- Optional `projectUrl` for external links
- `publishedAt` timestamp

*Photos Table*
- UUID primary key
- `imageUrl` for photo file path
- Bilingual optional captions: `captionEn`, `captionTr`
- `uploadedAt` timestamp

*Uploaded Images Table*
- Tracks uploaded files with filename and upload timestamp
- Used for image reference in markdown content

**In-Memory Storage Fallback**
- `MemStorage` class provides in-memory implementation of `IStorage` interface
- Used for development/testing when database is not available
- Includes seed data for demonstration purposes

### Design System

**Typography**
- Headings: Inter font (600-700 weight)
- Body text: Georgia/Charter serif for enhanced readability
- Code/Technical: JetBrains Mono
- Responsive font sizes (desktop/mobile breakpoints)

**Layout Principles**
- Content-width constraints: `max-w-2xl` (680px) for blog posts, `max-w-7xl` for grids
- Consistent spacing using Tailwind's 4px increment system
- Responsive grid patterns: single column (mobile) to 2-3 columns (desktop)

**Theme System**
- CSS custom properties for color tokens
- Automatic dark mode class application
- Shadcn/ui "new-york" style variant
- Neutral base color palette

## External Dependencies

**UI Framework & Components**
- `@radix-ui/*`: Headless UI primitives (30+ components including Dialog, Dropdown, Tooltip, etc.)
- `tailwindcss`: Utility-first CSS framework
- `class-variance-authority`: Type-safe component variants
- `lucide-react`: Icon library

**Database & ORM**
- `@neondatabase/serverless`: Serverless PostgreSQL client
- `drizzle-orm`: TypeScript ORM for SQL databases
- `drizzle-zod`: Zod schema generation from Drizzle schemas
- `drizzle-kit`: CLI for schema migrations

**Server Infrastructure**
- `express`: Web application framework
- `multer`: File upload middleware
- `vite`: Frontend build tool and dev server
- `esbuild`: JavaScript bundler for production builds

**State & Data Management**
- `@tanstack/react-query`: Async state management and caching
- `wouter`: Lightweight routing library
- `react-hook-form`: Form state management
- `@hookform/resolvers`: Validation resolver for Zod schemas

**Development Tools**
- `@replit/vite-plugin-*`: Replit-specific development plugins (error overlay, dev banner, cartographer)
- `typescript`: Type checking and compilation
- `tsx`: TypeScript execution for development server

**Utilities**
- `date-fns`: Date manipulation and formatting
- `nanoid`: Unique ID generation
- `zod`: Runtime type validation and schema definition
- `clsx` & `tailwind-merge`: Conditional className utilities