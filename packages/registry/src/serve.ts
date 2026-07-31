import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(import.meta.dirname, '../public');

const mimeTypes: Record<string, string> = {
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.txt': 'text/plain',
};

const server = http.createServer(async (req, res) => {
  console.log(`[${req.method}] ${req.url}`);

  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.end('Method Not Allowed');
    return;
  }

  try {
    let urlPath = req.url || '/';
    // Strip query strings
    const queryIndex = urlPath.indexOf('?');
    if (queryIndex !== -1) {
      urlPath = urlPath.substring(0, queryIndex);
    }

    // In our registry, the base URL is http://localhost:3000/registry.
    // If the request starts with /registry, we map it to the public folder.
    // E.g. /registry/index.json -> public/index.json
    let reqPath = urlPath;
    if (urlPath.startsWith('/registry')) {
      reqPath = urlPath.replace('/registry', '');
    }

    // Default to index.json if requesting the root
    if (reqPath === '/' || reqPath === '') {
      reqPath = '/index.json';
    }

    const filePath = path.join(PUBLIC_DIR, reqPath);

    // Prevent path traversal
    if (!filePath.startsWith(PUBLIC_DIR)) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }

    const stat = await fs.stat(filePath);
    if (!stat.isFile()) {
      throw new Error('Not a file');
    }

    const ext = path.extname(filePath);
    const mimeType = mimeTypes[ext] || 'application/octet-stream';

    const content = await fs.readFile(filePath);

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.statusCode = 200;
    res.end(content);
  } catch (err: any) {
    if (err.code === 'ENOENT' || err.message === 'Not a file') {
      res.statusCode = 404;
      res.end('Not Found');
    } else {
      console.error(err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }
});

server.listen(PORT, () => {
  console.log(`Registry server listening at http://localhost:${PORT}/registry`);
});
