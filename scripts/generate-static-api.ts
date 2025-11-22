import fs from "fs";
import path from "path";
import { storage } from "../server/storage";

function writeJson(filePath: string, data: unknown) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const serialized = JSON.stringify(
    data,
    (_, value) => (value instanceof Date ? value.toISOString() : value),
    2,
  );
  fs.writeFileSync(filePath, serialized, "utf8");
}

async function main() {
  const base = path.resolve(process.cwd(), "dist/public/api");

  const blogPosts = await storage.getAllBlogPosts();
  writeJson(path.join(base, "blog-posts.json"), blogPosts);
  for (const post of blogPosts) {
    writeJson(path.join(base, "blog-posts", `${post.slug}.json`), post);
  }

  const projects = await storage.getAllProjects();
  writeJson(path.join(base, "projects.json"), projects);
  for (const project of projects) {
    writeJson(path.join(base, "projects", `${project.slug}.json`), project);
  }

  const photos = await storage.getAllPhotos();
  writeJson(path.join(base, "photos.json"), photos);
  for (const photo of photos) {
    writeJson(path.join(base, "photos", `${photo.slug}.json`), photo);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
