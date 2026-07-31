import { z } from 'zod';
import fs from 'node:fs/promises';
import path from 'node:path';

export const ConfigSchema = z.object({
  $schema: z.string().optional(),
  style: z.string().default('default'),
  tailwind: z.object({
    css: z.string(),
    config: z.string().optional(), // Tailwind v4 doesn't have a config file usually, but we keep it optional
    baseColor: z.string().default('slate'),
  }),
  aliases: z.object({
    components: z.string(),
    utils: z.string().optional(),
  }),
  registry: z.string().default('https://sectloom.vercel.app/registry'),
  components: z
    .record(
      z.string(),
      z.object({
        version: z.string(),
        checksum: z.string(),
      })
    )
    .default({}),
});

export type Config = z.infer<typeof ConfigSchema>;

export async function getConfig(cwd: string): Promise<Config | null> {
  const configPath = path.join(cwd, 'sectloom.json');
  try {
    const content = await fs.readFile(configPath, 'utf-8');
    return ConfigSchema.parse(JSON.parse(content));
  } catch (error: any) {
    if (error.code === 'ENOENT') return null;
    throw new Error(`Failed to read sectloom.json: ${error.message}`);
  }
}

export async function writeConfig(cwd: string, config: Config) {
  const configPath = path.join(cwd, 'sectloom.json');
  // Sort the components alphabetically before writing to ensure deterministic diffs
  if (config.components) {
    const sortedComponents: Record<string, any> = {};
    Object.keys(config.components)
      .sort()
      .forEach((key) => {
        sortedComponents[key] = config.components[key];
      });
    config.components = sortedComponents;
  }
  await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');
}
