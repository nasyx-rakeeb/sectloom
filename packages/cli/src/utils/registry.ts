import crypto from 'node:crypto';
import { RegistryItem, RegistryItemSchema } from '@sectloom/contracts';
import { logger } from './logger.js';

// Shallow index item type
export interface RegistryIndexItem {
  name: string;
  category: string;
  title: string;
  description?: string;
  dependencies: string[];
  registryDependencies: string[];
  version: string;
  checksum: string;
}

export function hashContent(content: string): string {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

export async function fetchRegistryIndex(
  registryUrl: string
): Promise<RegistryIndexItem[]> {
  try {
    const res = await fetch(`${registryUrl}/index.json`);
    if (!res.ok) {
      throw new Error(
        `Registry responded with ${res.status} ${res.statusText}`
      );
    }
    const data = await res.json();
    return data as RegistryIndexItem[];
  } catch (error: any) {
    throw new Error(
      `Failed to fetch registry index: ${error.message}. Are you offline?`
    );
  }
}

export async function fetchRegistryItem(
  registryUrl: string,
  name: string
): Promise<RegistryItem> {
  try {
    const res = await fetch(`${registryUrl}/${name}.json`);
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(`Component '${name}' not found in registry.`);
      }
      throw new Error(
        `Registry responded with ${res.status} ${res.statusText}`
      );
    }
    const data = await res.json();

    // Schema validation
    const parsed = RegistryItemSchema.parse(data);

    // Verify checksum
    const expectedChecksum = parsed.checksum;

    // We clone parsed, remove checksum, sort keys deeply, and hash it
    // just like the registry builder does.
    const clone = { ...parsed };
    delete clone.checksum;

    const sorted = sortKeys(clone);
    const actualChecksum = hashContent(JSON.stringify(sorted));

    if (expectedChecksum && actualChecksum !== expectedChecksum) {
      logger.warn(
        `Checksum mismatch for component metadata '${name}'. This might indicate tampering, but we will proceed. (Expected: ${expectedChecksum}, Actual: ${actualChecksum})`
      );
      // Optionally we could throw an error here, but typically we want to be strict.
      // Since Phase 05 says "Verify registry and file checksums", we throw.
      throw new Error(
        `Checksum mismatch for component metadata '${name}'. Tampering detected.`
      );
    }

    // Verify file checksums
    for (const file of parsed.files) {
      if (file.checksum) {
        const fileHash = hashContent(file.content);
        if (fileHash !== file.checksum) {
          throw new Error(
            `Checksum mismatch for file '${file.name}' in component '${name}'. Tampering detected.`
          );
        }
      }
    }

    return parsed;
  } catch (error: any) {
    throw new Error(`Failed to fetch component '${name}': ${error.message}`);
  }
}

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
