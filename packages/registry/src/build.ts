import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { format } from 'prettier';
import { registryComponents } from './metadata.js';
import { RegistryItemSchema, type RegistryItem } from '@sectloom/contracts';
import type { ComponentSourceMeta } from './metadata.js';

// Helper for deep stable sorting of objects
function sortKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(sortKeys);
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj)
      .sort()
      .reduce((result: any, key) => {
        result[key] = sortKeys(obj[key]);
        return result;
      }, {});
  }
  return obj;
}

function hashContent(content: string): string {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

function isPathInside(rootDir: string, candidatePath: string): boolean {
  const relative = path.relative(rootDir, candidatePath);
  return (
    relative === '' ||
    (!path.isAbsolute(relative) &&
      relative !== '..' &&
      !relative.startsWith(`..${path.sep}`))
  );
}

async function writeJson(filePath: string, value: unknown): Promise<void> {
  const json = await format(JSON.stringify(value), { parser: 'json' });
  const temporaryPath = `${filePath}.${process.pid}.tmp`;
  await fs.writeFile(temporaryPath, json, 'utf8');
  await fs.rename(temporaryPath, filePath);
}

export interface BuildRegistryOptions {
  rootDir?: string;
  componentsDir?: string;
  publicDir?: string;
  components?: ComponentSourceMeta[];
}

export async function buildRegistry(
  options: BuildRegistryOptions = {}
): Promise<string[]> {
  const rootDir =
    options.rootDir ??
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
  const componentsDir =
    options.componentsDir ?? path.join(rootDir, 'packages/components/src');
  const publicDir =
    options.publicDir ?? path.join(rootDir, 'packages/registry/public');
  const components = [...(options.components ?? registryComponents)].sort(
    (a, b) => a.name.localeCompare(b.name)
  );

  await fs.mkdir(publicDir, { recursive: true });

  // Images are hosted on Cloudflare R2, no need to copy them locally

  const index: any[] = [];
  const processedNames = new Set<string>();

  for (const meta of components) {
    if (processedNames.has(meta.name)) {
      throw new Error(`Duplicate component name detected: ${meta.name}`);
    }
    processedNames.add(meta.name);

    console.log(`Processing ${meta.name}...`);

    const files = await Promise.all(
      meta.files.map(async (f) => {
        const filePath = path.resolve(componentsDir, f.path);

        // Prevent path traversal
        if (!isPathInside(componentsDir, filePath)) {
          throw new Error(`Unsafe file path: ${f.path}`);
        }

        const content = await fs.readFile(filePath, 'utf-8');
        return {
          path: f.target,
          content,
          type: 'registry:section' as const,
          checksum: hashContent(content),
        };
      })
    );

    // Create Design Profile object based on meta
    const designProfile = {
      style: 'Modern', // Defaulting based on visual
      theme: 'Dark',
      complexity: 'Medium',
      tags: [meta.designProfile],
    } as any;

    const item: RegistryItem = {
      name: meta.name,
      type: 'registry:section',
      category: meta.category,
      title: meta.title,
      description: meta.description,
      dependencies: meta.dependencies,
      registryDependencies: meta.registryDependencies,
      files,
      designProfiles: [designProfile],
      sourceReferenceMetadata: meta.sourceReferenceMetadata,
      propsDocumentation: meta.propsDocumentation,
      requires: meta.requires,
      previewAssets: [
        {
          type: 'image',
          url: meta.previewAsset,
        },
      ],
      version: meta.version,
    };

    // Calculate item checksum by hashing its deterministic JSON (without the checksum field itself)
    const sortedItem = sortKeys(item);
    const itemJson = JSON.stringify(sortedItem);
    const itemChecksum = hashContent(itemJson);
    const itemWithChecksum = sortKeys({
      ...sortedItem,
      checksum: itemChecksum,
    });

    // Validate
    const validated = RegistryItemSchema.parse(itemWithChecksum);

    // Write individual item JSON
    const outputPath = path.join(publicDir, `${meta.name}.json`);
    await writeJson(outputPath, sortKeys(validated));

    // Add shallow representation to index
    index.push({
      name: meta.name,
      type: 'registry:section',
      category: meta.category,
      title: meta.title,
      description: meta.description,
      dependencies: meta.dependencies,
      registryDependencies: meta.registryDependencies,
      version: meta.version,
      checksum: itemChecksum,
      previewAssets: [
        {
          type: 'image',
          url: meta.previewAsset,
        },
      ],
    });
  }

  // Write index JSON deterministically
  const sortedIndex = sortKeys(index);
  const indexPath = path.join(publicDir, 'index.json');
  await writeJson(indexPath, sortedIndex);

  const expectedFiles = new Set([
    'index.json',
    ...components.map((component) => `${component.name}.json`),
  ]);
  const generatedFiles = await fs.readdir(publicDir);
  await Promise.all(
    generatedFiles
      .filter((file) => file.endsWith('.json') && !expectedFiles.has(file))
      .map((file) => fs.unlink(path.join(publicDir, file)))
  );

  console.log(`Registry built successfully: ${index.length} components.`);
  return [...expectedFiles].sort();
}

const isMainModule =
  process.argv[1] !== undefined &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMainModule) {
  buildRegistry().catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
}
