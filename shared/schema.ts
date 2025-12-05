import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Blog Posts
export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  titleEn: text("title_en").notNull(),
  titleTr: text("title_tr").notNull(),
  contentEn: text("content_en").notNull(),
  contentTr: text("content_tr").notNull(),
  excerptEn: text("excerpt_en").notNull(),
  excerptTr: text("excerpt_tr").notNull(),
  readTimeMinutes: text("read_time_minutes").notNull(),
  tags: text("tags").array().notNull().default(sql`ARRAY[]::text[]`),
  tagsTr: text("tags_tr").array().notNull().default(sql`ARRAY[]::text[]`),
  isDraft: boolean("is_draft").notNull().default(false),
  publishedAt: timestamp("published_at").notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts)
  .omit({
    id: true,
    readTimeMinutes: true,
    tagsTr: true,
  })
  .extend({
    readTimeMinutes: z.string().optional(),
    tags: z.array(z.string()).default([]),
    tagsTr: z.array(z.string()).default([]),
    isDraft: z.boolean().optional().default(false),
  });

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// Projects
export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  titleEn: text("title_en").notNull(),
  titleTr: text("title_tr").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionTr: text("description_tr").notNull(),
  contentEn: text("content_en").notNull(),
  contentTr: text("content_tr").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  projectUrl: text("project_url"),
  publishedAt: timestamp("published_at").notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Photos
export const photos = pgTable("photos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  titleEn: text("title_en").notNull(),
  titleTr: text("title_tr").notNull(),
  captionEn: text("caption_en"),
  captionTr: text("caption_tr"),
  imageUrl: text("image_url").notNull(),
  contentEn: text("content_en").notNull(),
  contentTr: text("content_tr").notNull(),
  takenAt: timestamp("taken_at").notNull(),
});

export const insertPhotoSchema = createInsertSchema(photos).omit({
  id: true,
});

export type InsertPhoto = z.infer<typeof insertPhotoSchema>;
export type Photo = typeof photos.$inferSelect;

// Uploaded Images (for markdown content)
export const uploadedImages = pgTable("uploaded_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename").notNull().unique(),
  url: text("url").notNull(),
  uploadedAt: timestamp("uploaded_at").notNull(),
});

export const insertUploadedImageSchema = createInsertSchema(uploadedImages).omit({
  id: true,
  uploadedAt: true,
});

export type InsertUploadedImage = z.infer<typeof insertUploadedImageSchema>;
export type UploadedImage = typeof uploadedImages.$inferSelect;
