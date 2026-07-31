import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import fs from "node:fs/promises";
import path from "node:path";
import mime from "mime-types";

const s3 = new S3Client({
  region: "auto",
  endpoint: "https://299be2ee234d9ec5c613c538e6571712.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: "9a1b775b1d29fbf6d685a25d4a067b96",
    secretAccessKey: "063c3f626db480f5d3005f0a0f0c9af57c2fee78218358f0f10aee3f857ad895",
  },
});

const BUCKET_NAME = "sectloom-registry";
const DATA_DIR = path.resolve(import.meta.dirname, "data/images");

async function* walk(dir) {
  for await (const d of await fs.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}

async function run() {
  const files = [];
  for await (const file of walk(DATA_DIR)) {
    if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.svg') || file.endsWith('.jpeg')) {
      files.push(file);
    }
  }

  console.log(`Checking ${files.length} images for missing files in R2...`);
  
  let uploadedCount = 0;
  
  const CONCURRENCY = 20;
  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const chunk = files.slice(i, i + CONCURRENCY);
    await Promise.all(chunk.map(async (file) => {
      const relativePath = path.relative(DATA_DIR, file);
      const key = `images/${relativePath}`;
      
      try {
        await s3.send(new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: key }));
        // If it succeeds, it exists.
      } catch (err) {
        // If it fails, it's missing (404) or another error. We upload it.
        try {
          const content = await fs.readFile(file);
          const mimeType = mime.lookup(file) || "application/octet-stream";
          await s3.send(new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: content,
            ContentType: mimeType,
            CacheControl: "public, max-age=31536000, immutable"
          }));
          uploadedCount++;
          console.log(`Re-uploaded missing file: ${key}`);
        } catch (uploadErr) {
          console.error(`Failed to re-upload ${key}: ${uploadErr.message}`);
        }
      }
    }));
  }
  console.log(`Successfully re-uploaded ${uploadedCount} missing files.`);
}

run().catch(console.error);
