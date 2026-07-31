import type { MetadataRoute } from "next";
import fs from "fs/promises";
import path from "path";

async function getRegistryIndex(): Promise<any[]> {
  const registryPath = path.join(process.cwd(), "../../packages/registry/public/index.json");
  const data = await fs.readFile(registryPath, "utf-8");
  return JSON.parse(data);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://sectloom.dev";
  const registry = await getRegistryIndex();

  const componentRoutes = registry.map((comp) => ({
    url: `${baseUrl}/components/${comp.category}/${comp.name}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/components`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...componentRoutes,
  ];
}
