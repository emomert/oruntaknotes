import {
  type BlogPost,
  type InsertBlogPost,
  type Project,
  type InsertProject,
  type Photo,
  type InsertPhoto,
  type UploadedImage,
  type InsertUploadedImage,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;

  getAllProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;

  getAllPhotos(): Promise<Photo[]>;
  createPhoto(photo: InsertPhoto): Promise<Photo>;

  getUploadedImageByFilename(filename: string): Promise<UploadedImage | undefined>;
  createUploadedImage(image: InsertUploadedImage): Promise<UploadedImage>;
}

export class MemStorage implements IStorage {
  private blogPosts: Map<string, BlogPost>;
  private projects: Map<string, Project>;
  private photos: Map<string, Photo>;
  private uploadedImages: Map<string, UploadedImage>;

  constructor() {
    this.blogPosts = new Map();
    this.projects = new Map();
    this.photos = new Map();
    this.uploadedImages = new Map();
    this.seedData();
  }

  private seedData() {
    const samplePost: BlogPost = {
      id: randomUUID(),
      slug: "welcome-to-my-blog",
      titleEn: "Welcome to My Blog",
      titleTr: "Bloguma Hoş Geldiniz",
      contentEn: `# Welcome!

This is a sample blog post to demonstrate the markdown rendering capabilities.

## Features

- **Wiki-style links**: You can link to other posts using [[another-post]] syntax
- **Image embedding**: Upload images using ![[image.jpg]] syntax
- **Code blocks**: Share code snippets with syntax highlighting

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`

> This is a blockquote. Use it for highlighting important information.

## Getting Started

Start writing your content in markdown and see it beautifully rendered!`,
      contentTr: `# Hoş Geldiniz!

Bu, markdown render yeteneklerini göstermek için örnek bir blog yazısıdır.

## Özellikler

- **Wiki tarzı bağlantılar**: [[another-post]] sözdizimini kullanarak diğer yazılara bağlantı verebilirsiniz
- **Görsel yerleştirme**: ![[image.jpg]] sözdizimini kullanarak görseller yükleyebilirsiniz
- **Kod blokları**: Sözdizimi vurgulama ile kod parçacıkları paylaşabilirsiniz

\`\`\`javascript
function selamla(isim) {
  console.log(\`Merhaba, \${isim}!\`);
}
\`\`\`

> Bu bir alıntıdır. Önemli bilgileri vurgulamak için kullanın.

## Başlarken

İçeriğinizi markdown ile yazmaya başlayın ve güzelce işlenmiş halini görün!`,
      excerptEn: "A warm welcome to my personal blog where I share thoughts, stories, and ideas.",
      excerptTr: "Düşüncelerimi, hikayelerimi ve fikirlerimi paylaştığım kişisel bloguma sıcak bir karşılama.",
      readTimeMinutes: "3",
      publishedAt: new Date("2025-01-15"),
    };

    this.blogPosts.set(samplePost.id, samplePost);

    const sampleProject: Project = {
      id: randomUUID(),
      slug: "sample-project",
      titleEn: "Sample Project",
      titleTr: "Örnek Proje",
      descriptionEn: "A showcase of what's possible with this platform",
      descriptionTr: "Bu platformla neler yapılabileceğinin bir gösterimi",
      contentEn: `## About This Project

This is a sample project to demonstrate the project showcase functionality.

### Technologies Used

- React
- TypeScript
- Tailwind CSS

### Features

- Responsive design
- Fast performance
- Beautiful animations`,
      contentTr: `## Proje Hakkında

Bu, proje vitrin işlevselliğini göstermek için örnek bir projedir.

### Kullanılan Teknolojiler

- React
- TypeScript
- Tailwind CSS

### Özellikler

- Duyarlı tasarım
- Hızlı performans
- Güzel animasyonlar`,
      thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
      projectUrl: null,
      publishedAt: new Date("2025-01-10"),
    };

    this.projects.set(sampleProject.id, sampleProject);
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
    );
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find((post) => post.slug === slug);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = { ...insertPost, id };
    this.blogPosts.set(id, post);
    return post;
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
    );
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    return Array.from(this.projects.values()).find(
      (project) => project.slug === slug
    );
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async getAllPhotos(): Promise<Photo[]> {
    return Array.from(this.photos.values()).sort(
      (a, b) => b.takenAt.getTime() - a.takenAt.getTime()
    );
  }

  async createPhoto(insertPhoto: InsertPhoto): Promise<Photo> {
    const id = randomUUID();
    const photo: Photo = { ...insertPhoto, id };
    this.photos.set(id, photo);
    return photo;
  }

  async getUploadedImageByFilename(filename: string): Promise<UploadedImage | undefined> {
    return Array.from(this.uploadedImages.values()).find(
      (image) => image.filename === filename
    );
  }

  async createUploadedImage(insertImage: InsertUploadedImage): Promise<UploadedImage> {
    const id = randomUUID();
    const image: UploadedImage = {
      ...insertImage,
      id,
      uploadedAt: new Date(),
    };
    this.uploadedImages.set(id, image);
    return image;
  }
}

export const storage = new MemStorage();
