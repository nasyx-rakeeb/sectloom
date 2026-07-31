import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');

const TARGET_MANIFESTS = [
  'hero.json',
  'cta.json',
  'contact.json',
  'footer.json'
];

function run() {
  console.log('Starting data inventory...');
  
  const allFiles = fs.readdirSync(DATA_DIR);
  const jsonFiles = allFiles.filter(f => f.endsWith('.json'));
  
  const allCategories = new Set();
  
  // Extract all categories
  for (const file of jsonFiles) {
    const filePath = path.join(DATA_DIR, file);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(content);
      if (data.designs && Array.isArray(data.designs)) {
        for (const design of data.designs) {
          if (design.category) {
            allCategories.add(design.category);
          }
        }
      }
    } catch (e) {
      console.warn(`Could not parse ${file}: ${e.message}`);
    }
  }

  let markdownOutput = `# Data Inventory\n\n`;
  markdownOutput += `## Target Manifests Validation\n\n`;

  for (const target of TARGET_MANIFESTS) {
    const targetPath = path.join(DATA_DIR, target);
    markdownOutput += `### ${target}\n`;
    
    if (!fs.existsSync(targetPath)) {
      markdownOutput += `- ❌ File not found\n\n`;
      continue;
    }

    try {
      const content = fs.readFileSync(targetPath, 'utf-8');
      const data = JSON.parse(content);
      const designs = data.designs || [];
      
      let missingImages = 0;
      for (const design of designs) {
        if (design.local_image_path) {
          const imagePath = path.join(ROOT_DIR, design.local_image_path);
          if (!fs.existsSync(imagePath)) {
            missingImages++;
          }
        } else {
           missingImages++;
        }
      }
      
      markdownOutput += `- Record count: ${designs.length}\n`;
      if (missingImages > 0) {
        markdownOutput += `- ❌ Missing local images: ${missingImages}\n`;
      } else {
        markdownOutput += `- ✅ All local images verified\n`;
      }
    } catch (e) {
      markdownOutput += `- ❌ Error reading or parsing: ${e.message}\n`;
    }
    
    markdownOutput += '\n';
  }

  markdownOutput += `## All Categories Found\n\n`;
  for (const cat of Array.from(allCategories).sort()) {
    markdownOutput += `- ${cat}\n`;
  }

  const outPath = path.join(DOCS_DIR, 'data-inventory.md');
  fs.writeFileSync(outPath, markdownOutput, 'utf-8');
  console.log(`Inventory written to ${outPath}`);
}

run();
