import crypto from 'node:crypto';
import { z } from 'zod';
import { type RegistryItem, RegistryItemSchema } from '@sectloom/contracts';

const COMPONENT_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const RegistryIndexItemSchema = z.object({
  name: z.string().regex(COMPONENT_NAME),
  category: z.string(),
  title: z.string(),
  description: z.string().optional(),
  dependencies: z.array(z.string()).default([]),
  registryDependencies: z.array(z.string()).default([]),
  version: z.string(),
  checksum: z.string().min(1),
});

export type RegistryIndexItem = z.infer<typeof RegistryIndexItemSchema>;

export function hashContent(content: string): string {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

export function validateComponentName(name: string): void {
  if (!COMPONENT_NAME.test(name)) {
    throw new Error(`Invalid component name '${name}'.`);
  }
}

function createRegistryUrl(registryUrl: string, file: string): URL {
  const base = new URL(
    registryUrl.endsWith('/') ? registryUrl : `${registryUrl}/`
  );
  if (base.protocol !== 'https:' && base.protocol !== 'http:') {
    throw new Error('Registry URL must use HTTP or HTTPS.');
  }
  return new URL(file, base);
}

export function verifyRegistryItem(item: RegistryItem): RegistryItem {
  if (!item.checksum) {
    throw new Error(`Component '${item.name}' is missing its checksum.`);
  }

  const clone = { ...item };
  delete clone.checksum;
  const actualChecksum = hashContent(JSON.stringify(sortKeys(clone)));
  if (actualChecksum !== item.checksum) {
    throw new Error(
      `Checksum mismatch for component metadata '${item.name}'. Tampering detected.`
    );
  }

  for (const file of item.files) {
    if (file.content && !file.checksum) {
      throw new Error(`File '${file.path}' is missing its checksum.`);
    }
    if (file.content && hashContent(file.content) !== file.checksum) {
      throw new Error(
        `Checksum mismatch for file '${file.path}' in component '${item.name}'. Tampering detected.`
      );
    }
  }

  return item;
}

export async function fetchRegistryIndex(
  registryUrl: string
): Promise<RegistryIndexItem[]> {
  try {
    const response = await fetch(createRegistryUrl(registryUrl, 'index.json'));
    if (!response.ok) {
      throw new Error(
        `Registry responded with ${response.status} ${response.statusText}`
      );
    }
    return z.array(RegistryIndexItemSchema).parse(await response.json());
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch registry index: ${message}`);
  }
}

export async function fetchRegistryItem(
  registryUrl: string,
  name: string
): Promise<RegistryItem> {
  try {
    validateComponentName(name);
    const response = await fetch(
      createRegistryUrl(registryUrl, `${name}.json`)
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Component '${name}' not found in registry.`);
      }
      throw new Error(
        `Registry responded with ${response.status} ${response.statusText}`
      );
    }

    const item = RegistryItemSchema.parse(await response.json());
    if (item.name !== name) {
      throw new Error(
        `Registry returned component '${item.name}' when '${name}' was requested.`
      );
    }
    return verifyRegistryItem(item);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch component '${name}': ${message}`);
  }
}

function sortKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(sortKeys);
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj)
      .sort()
      .reduce<Record<string, unknown>>((result, key) => {
        result[key] = sortKeys((obj as Record<string, unknown>)[key]);
        return result;
      }, {});
  }
  return obj;
}
