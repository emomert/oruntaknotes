import fs from "fs";
import path from "path";
import matter from "gray-matter";
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

  getPhotoBySlug(slug: string): Promise<Photo | undefined>;
  getAllPhotos(): Promise<Photo[]>;
  createPhoto(photo: InsertPhoto): Promise<Photo>;

  getUploadedImageByFilename(filename: string): Promise<UploadedImage | undefined>;
  createUploadedImage(image: InsertUploadedImage): Promise<UploadedImage>;
}

type LoadedMarkdown = {
  content: string;
  meta: Record<string, unknown>;
};

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
    this.seedUploadedImages();
    this.seedBlogPosts();
    this.seedProjects();
    this.seedPhotos();
  }

  private seedUploadedImages() {
    const uploadsDir = path.resolve(process.cwd(), "uploads");
    let files: string[] = [];
    try {
      files = fs.readdirSync(uploadsDir);
    } catch {
      files = [];
    }

    files
      .filter((name) => !name.startsWith("."))
      .forEach((filename) => {
        this.seedUploadedImage({
          filename,
          url: `/uploads/${filename}`,
        });
      });
  }

  private seedBlogPosts() {
    const blogDir = path.resolve(process.cwd(), "content", "blog");
    let files: string[] = [];
    try {
      files = fs.readdirSync(blogDir);
    } catch {
      files = [];
    }

    const enFiles = files.filter((f) => f.endsWith(".en.md"));

    enFiles.forEach((file) => {
      const slug = file.replace(/\.en\.md$/, "");
      const enPath = path.join("content", "blog", file);
      const trPath = path.join("content", "blog", `${slug}.tr.md`);
      const hasTr = fs.existsSync(path.resolve(process.cwd(), trPath));

      const en = this.loadMarkdownWithMeta(enPath);
      const tr = this.loadMarkdownWithMeta(hasTr ? trPath : enPath);

      const readTime = this.estimateReadTime(en.content || tr.content);
      const publishedAt = this.parseDate(en.meta.publishedAt ?? tr.meta.publishedAt);
      const tags = this.parseTags(en.meta.tags ?? en.meta.tagsEn);
      const tagsTr = this.parseTags(tr.meta.tags ?? tr.meta.tagsTr ?? en.meta.tagsTr ?? tags);

      const record: BlogPost = {
        id: randomUUID(),
        slug,
        titleEn: String(en.meta.title ?? slug),
        titleTr: String(tr.meta.title ?? en.meta.title ?? slug),
        contentEn: en.content,
        contentTr: tr.content,
        excerptEn: String(en.meta.excerpt ?? ""),
        excerptTr: String(tr.meta.excerpt ?? en.meta.excerpt ?? ""),
        readTimeMinutes: readTime,
        tags,
        tagsTr,
        publishedAt,
      };

      this.blogPosts.set(record.id, record);
    });
  }

  private seedProjects() {
    const projDir = path.resolve(process.cwd(), "content", "projects");
    let files: string[] = [];
    try {
      files = fs.readdirSync(projDir);
    } catch {
      files = [];
    }

    const enFiles = files.filter((f) => f.endsWith(".en.md"));

    enFiles.forEach((file) => {
      const slug = file.replace(/\.en\.md$/, "");
      const enPath = path.join("content", "projects", file);
      const trPath = path.join("content", "projects", `${slug}.tr.md`);
      const hasTr = fs.existsSync(path.resolve(process.cwd(), trPath));

      const en = this.loadMarkdownWithMeta(enPath);
      const tr = this.loadMarkdownWithMeta(hasTr ? trPath : enPath);

      const publishedAt = this.parseDate(en.meta.publishedAt ?? tr.meta.publishedAt);
      const thumbnailUrl = String(
        en.meta.thumbnailUrl ??
          tr.meta.thumbnailUrl ??
          "/uploads/atlas-notes-thumb.svg",
      );
      const projectUrl = (en.meta.projectUrl ?? tr.meta.projectUrl) ?? null;

      const record: Project = {
        id: randomUUID(),
        slug,
        titleEn: String(en.meta.title ?? slug),
        titleTr: String(tr.meta.title ?? en.meta.title ?? slug),
        descriptionEn: String(en.meta.description ?? ""),
        descriptionTr: String(tr.meta.description ?? ""),
        contentEn: en.content,
        contentTr: tr.content,
        thumbnailUrl,
        projectUrl: projectUrl ? String(projectUrl) : null,
        publishedAt,
      };

      this.projects.set(record.id, record);
    });
  }

  private seedPhotos() {
    const photoDir = path.resolve(process.cwd(), "content", "photos");
    let files: string[] = [];
    try {
      files = fs.readdirSync(photoDir);
    } catch {
      files = [];
    }

    const enFiles = files.filter((f) => f.endsWith(".en.md"));

    enFiles.forEach((file) => {
      const slug = file.replace(/\.en\.md$/, "");
      const enPath = path.join("content", "photos", file);
      const trPath = path.join("content", "photos", `${slug}.tr.md`);
      const hasTr = fs.existsSync(path.resolve(process.cwd(), trPath));

      const en = this.loadMarkdownWithMeta(enPath);
      const tr = this.loadMarkdownWithMeta(hasTr ? trPath : enPath);

      const imageUrl = String(
        en.meta.imageUrl ??
          tr.meta.imageUrl ??
          this.extractFirstImage(en.content) ??
          this.extractFirstImage(tr.content) ??
          "/uploads/winter-bosphorus.jpg",
      );
      const publishedAt = this.parseDate(en.meta.publishedAt ?? tr.meta.publishedAt ?? en.meta.date ?? tr.meta.date);
      const takenAt = this.parseDate(
        en.meta.takenAt ??
        tr.meta.takenAt ??
        en.meta.date ??
        tr.meta.date ??
        publishedAt
      );
      const captionEn = String(en.meta.caption ?? "");
      const captionTr = String(tr.meta.caption ?? en.meta.caption ?? "");

      const record: Photo = {
        id: randomUUID(),
        slug,
        titleEn: String(en.meta.title ?? slug),
        titleTr: String(tr.meta.title ?? en.meta.title ?? slug),
        captionEn,
        captionTr,
        imageUrl,
        contentEn: en.content,
        contentTr: tr.content,
        takenAt,
      };

      this.photos.set(record.id, record);
    });
  }

  private seedUploadedImage(image: InsertUploadedImage) {
    const id = randomUUID();
    const record: UploadedImage = { ...image, id, uploadedAt: new Date() };
    this.uploadedImages.set(id, record);
  }

  private loadMarkdownWithMeta(relativePath: string): LoadedMarkdown {
    try {
      const fullPath = path.resolve(process.cwd(), relativePath);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { content, data } = matter(raw.replace(/\r\n/g, "\n"));
      return { content: content.trim(), meta: data as Record<string, unknown> };
    } catch (error) {
      const message = (error as Error).message;
      return {
        content: `# Missing content\n\nContent file "${relativePath}" could not be loaded. (${message})`,
        meta: {},
      };
    }
  }

  private extractFirstImage(content: string): string | null {
    const match = content.match(/!\[[^\]]*]\(([^)]+)\)/);
    return match ? match[1] : null;
  }

  private parseDate(value: unknown): Date {
    if (value instanceof Date) return value;
    if (typeof value === "string" && value.trim().length > 0) {
      const parsed = new Date(value);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed;
      }
    }
    return new Date();
  }

  private parseTags(value: unknown): string[] {
    if (Array.isArray(value)) {
      return value.map((v) => String(v)).filter(Boolean);
    }
    if (typeof value === "string") {
      return value
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v.length > 0);
    }
    return [];
  }

  private estimateReadTime(content: string): string {
    const words = content.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return String(minutes);
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
    );
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find((post) => post.slug === slug);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const readTime = insertPost.readTimeMinutes
      ? String(insertPost.readTimeMinutes)
      : this.estimateReadTime(insertPost.contentEn);
    const post: BlogPost = {
      ...insertPost,
      readTimeMinutes: readTime,
      tags: insertPost.tags ?? [],
      tagsTr: (insertPost as any).tagsTr ?? [],
      id,
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
    );
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    return Array.from(this.projects.values()).find((project) => project.slug === slug);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async getAllPhotos(): Promise<Photo[]> {
    return Array.from(this.photos.values()).sort(
      (a, b) => b.takenAt.getTime() - a.takenAt.getTime(),
    );
  }

  async getPhotoBySlug(slug: string): Promise<Photo | undefined> {
    return Array.from(this.photos.values()).find((photo) => photo.slug === slug);
  }

  async createPhoto(insertPhoto: InsertPhoto): Promise<Photo> {
    const id = randomUUID();
    const photo: Photo = { ...insertPhoto, id };
    this.photos.set(id, photo);
    return photo;
  }

  async getUploadedImageByFilename(filename: string): Promise<UploadedImage | undefined> {
    return Array.from(this.uploadedImages.values()).find(
      (image) => image.filename === filename,
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
