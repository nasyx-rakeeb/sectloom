import fs from 'node:fs/promises';

export const SECTLOOM_TOKENS_MARKER = '/* sectloom:tokens */';

export function hasSectloomTokens(css: string): boolean {
  return css.includes(SECTLOOM_TOKENS_MARKER);
}

export function appendTokenStylesheet(css: string, tokens: string): string {
  if (hasSectloomTokens(css)) return css;
  const prefix = css.length > 0 && !css.endsWith('\n') ? '\n' : '';
  return `${css}${prefix}\n${tokens.trim()}\n`;
}

export async function loadTokenStylesheet(assetUrl?: URL): Promise<string> {
  if (assetUrl) return fs.readFile(assetUrl, 'utf8');

  const candidates = [
    new URL('./tokens.css', import.meta.url),
    new URL('../../../tokens/tokens.css', import.meta.url),
  ];
  for (const candidate of candidates) {
    try {
      return await fs.readFile(candidate, 'utf8');
    } catch {
      // Try the source-tree or bundled-layout alternative.
    }
  }
  throw new Error('Unable to load the Sectloom token stylesheet.');
}
