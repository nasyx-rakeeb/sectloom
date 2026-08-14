import fs from 'node:fs';

export function getCliVersion(): string {
  const candidates = [
    new URL('../package.json', import.meta.url),
    new URL('../../package.json', import.meta.url),
  ];

  for (const candidate of candidates) {
    try {
      const manifest = JSON.parse(fs.readFileSync(candidate, 'utf8')) as {
        version?: string;
      };
      if (manifest.version) return manifest.version;
    } catch {
      // Try the source-tree or bundled-layout alternative.
    }
  }

  throw new Error('Unable to read the Sectloom package version.');
}
