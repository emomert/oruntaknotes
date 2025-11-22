import type { Handler, HandlerEvent } from "@netlify/functions";
import { storage } from "../../server/storage";
import {
  insertBlogPostSchema,
  insertPhotoSchema,
  insertProjectSchema,
} from "@shared/schema";

type JsonResult = {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
};

const json = (statusCode: number, data: unknown): JsonResult => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});

const notFound = (message: string) => json(404, { error: message });
const serverError = (message: string) => json(500, { error: message });
const badRequest = (message: string) => json(400, { error: message });

const parsePath = (event: HandlerEvent): string[] => {
  const base = "/.netlify/functions/api";
  const path = event.path.startsWith(base)
    ? event.path.slice(base.length)
    : event.path;
  return path
    .replace(/^\/+/, "")
    .split("/")
    .filter(Boolean);
};

export const handler: Handler = async (event) => {
  try {
    const segments = parsePath(event);
    const [resource, slug] = segments;

    // Blog posts
    if (resource === "blog-posts") {
      if (event.httpMethod === "GET" && !slug) {
        const posts = await storage.getAllBlogPosts();
        return json(200, posts);
      }
      if (event.httpMethod === "GET" && slug) {
        const post = await storage.getBlogPostBySlug(slug);
        return post ? json(200, post) : notFound("Blog post not found");
      }
      if (event.httpMethod === "POST") {
        const body = event.body ? JSON.parse(event.body) : {};
        const validated = insertBlogPostSchema.parse(body);
        const post = await storage.createBlogPost(validated);
        return json(201, post);
      }
    }

    // Projects
    if (resource === "projects") {
      if (event.httpMethod === "GET" && !slug) {
        const projects = await storage.getAllProjects();
        return json(200, projects);
      }
      if (event.httpMethod === "GET" && slug) {
        const project = await storage.getProjectBySlug(slug);
        return project ? json(200, project) : notFound("Project not found");
      }
      if (event.httpMethod === "POST") {
        const body = event.body ? JSON.parse(event.body) : {};
        const validated = insertProjectSchema.parse(body);
        const project = await storage.createProject(validated);
        return json(201, project);
      }
    }

    // Photos
    if (resource === "photos") {
      if (event.httpMethod === "GET" && !slug) {
        const photos = await storage.getAllPhotos();
        return json(200, photos);
      }
      if (event.httpMethod === "GET" && slug) {
        const photo = await storage.getPhotoBySlug(slug);
        return photo ? json(200, photo) : notFound("Photo not found");
      }
      if (event.httpMethod === "POST") {
        const body = event.body ? JSON.parse(event.body) : {};
        const validated = insertPhotoSchema.parse(body);
        const photo = await storage.createPhoto(validated);
        return json(201, photo);
      }
    }

    // File upload not supported on Netlify Functions
    if (resource === "upload") {
      return badRequest("File uploads are not supported in this deployment.");
    }

    return notFound("Resource not found");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return serverError(message);
  }
};
