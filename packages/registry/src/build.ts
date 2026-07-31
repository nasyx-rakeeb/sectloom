import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { registryComponents } from './metadata.js';
import { RegistryItemSchema, RegistryItem } from '@sectloom/contracts';

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

async function buildRegistry() {
  const rootDir = path.resolve(import.meta.dirname, '../../..');
  const componentsDir = path.join(rootDir, 'packages/components/src');
  const publicDir = path.join(rootDir, 'packages/registry/public');

  await fs.mkdir(publicDir, { recursive: true });

  // Copy images from data/images to public/images for previews
  const dataImagesDir = path.join(rootDir, 'data/images');
  const publicImagesDir = path.join(publicDir, 'images');
  await fs.cp(dataImagesDir, publicImagesDir, { recursive: true, force: true }).catch(() => {
    console.warn('Warning: Could not copy images from data/images');
  });

  const index: any[] = [];
  const processedNames = new Set<string>();

  for (const meta of registryComponents) {
    if (processedNames.has(meta.name)) {
      throw new Error(`Duplicate component name detected: ${meta.name}`);
    }
    processedNames.add(meta.name);

    console.log(`Processing ${meta.name}...`);

    const files = await Promise.all(
      meta.files.map(async (f) => {
        const filePath = path.join(componentsDir, f.path);

        // Prevent path traversal
        if (!filePath.startsWith(componentsDir)) {
          throw new Error(`Unsafe file path: ${f.path}`);
        }

        const content = await fs.readFile(filePath, 'utf-8');
        return {
          name: f.target,
          content,
          type: 'registry:section' as const,
          checksum: hashContent(content),
        };
      })
    );

    // Create Design Profile object based on meta
    const designProfile = {
      style: 'Modern', // Defaulting based on visual
      theme: 'System',
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
      requiredTokens: meta.requiredTokens,
      designProfiles: [designProfile],
      sourceReferenceMetadata: meta.sourceReferenceMetadata,
      propsDocumentation: meta.propsDocumentation,
      supportedNextJsRange: meta.supportedNextJsRange,
      previewAssets: [
        {
          type: 'image',
          url: meta.previewAsset,
        },
      ],
      version: '0.1.0',
    };

    // Calculate item checksum by hashing its deterministic JSON (without the checksum field itself)
    const sortedItem = sortKeys(item);
    const itemJson = JSON.stringify(sortedItem);
    const itemChecksum = hashContent(itemJson);
    sortedItem.checksum = itemChecksum;

    // Validate
    const validated = RegistryItemSchema.parse(sortedItem);

    // Write individual item JSON
    const outputPath = path.join(publicDir, `${meta.name}.json`);
    await fs.writeFile(outputPath, JSON.stringify(validated, null, 2), 'utf-8');

    // Add shallow representation to index
    index.push({
      name: meta.name,
      type: 'registry:section',
      category: meta.category,
      title: meta.title,
      description: meta.description,
      dependencies: meta.dependencies,
      registryDependencies: meta.registryDependencies,
      version: '0.1.0',
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
  await fs.writeFile(indexPath, JSON.stringify(sortedIndex, null, 2), 'utf-8');

  console.log(`Registry built successfully: ${index.length} components.`);
}

buildRegistry().catch((err) => {
  console.error(err);
  process.exit(1);
});
