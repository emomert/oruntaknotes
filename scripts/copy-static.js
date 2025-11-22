import fs from "fs";
import path from "path";

const root = process.cwd();
const uploadsSrc = path.join(root, "uploads");
const uploadsDest = path.join(root, "dist", "public", "uploads");

copyDir(uploadsSrc, uploadsDest);

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
