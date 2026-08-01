import { Command } from 'commander';
import * as p from '@clack/prompts';
import fs from 'node:fs/promises';
import path from 'node:path';
import pc from 'picocolors';
import { detectProject } from '../utils/project.js';
import { getConfig, writeConfig, Config } from '../utils/config.js';
import { logger } from '../utils/logger.js';

const DEFAULT_CSS_VARS = `
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-ring: var(--ring);
  --radius-lg: 0.5rem;
  --radius-full: 9999px;
  --container-md: 48rem;
  --container-lg: 64rem;
  --container-xl: 80rem;
}

@layer base {
  :root {
    --background: #ffffff;
    --foreground: #020817;
    --primary: #0f172a;
    --primary-foreground: #f8fafc;
    --secondary: #f1f5f9;
    --secondary-foreground: #0f172a;
    --muted: #f1f5f9;
    --muted-foreground: #64748b;
    --border: #e2e8f0;
    --ring: #94a3b8;
  }
  .dark {
    --background: #020817;
    --foreground: #f8fafc;
    --primary: #f8fafc;
    --primary-foreground: #0f172a;
    --secondary: #1e293b;
    --secondary-foreground: #f8fafc;
    --muted: #1e293b;
    --muted-foreground: #94a3b8;
    --border: #1e293b;
    --ring: #334155;
  }
}
`;

export const init = new Command('init')
  .description('Initialize Sectloom in your project')
  .option('-c, --cwd <cwd>', 'The working directory', process.cwd())
  .option('-y, --yes', 'Skip prompts and use defaults', false)
  .action(async (options) => {
    try {
      const cwd = path.resolve(options.cwd);

      if (!options.yes) {
        p.intro(pc.bgBlue(pc.white(' Sectloom Init ')));
      }

      const existingConfig = await getConfig(cwd);
      if (existingConfig && !options.yes) {
        const proceed = await p.confirm({
          message: 'sectloom.json already exists. Overwrite configuration?',
          initialValue: false,
        });
        if (p.isCancel(proceed) || !proceed) {
          p.cancel('Operation cancelled.');
          process.exit(0);
        }
      }

      const project = await detectProject(cwd);

      if (!project.isNextJs || !project.isAppRouter || !project.isTypeScript) {
        logger.error(
          'Sectloom currently requires Next.js App Router with TypeScript.'
        );
        process.exit(1);
      }
      if (project.tailwindVersion !== 4) {
        logger.warn(
          'Sectloom requires Tailwind CSS v4. Your setup might be incompatible.'
        );
      }

      let globalCssPath = project.globalCssPath;
      let componentsAlias = project.componentsAlias || '@/components';

      if (!options.yes) {
        const inputCss = await p.text({
          message: 'Where is your global CSS file?',
          initialValue: globalCssPath || 'app/globals.css',
        });
        if (p.isCancel(inputCss)) return p.cancel();
        globalCssPath = inputCss as string;

        const inputComponents = await p.text({
          message: 'What is your components alias?',
          initialValue: componentsAlias,
        });
        if (p.isCancel(inputComponents)) return p.cancel();
        componentsAlias = inputComponents as string;
      }

      if (!globalCssPath) {
        logger.error('Global CSS path is required.');
        process.exit(1);
      }

      const absoluteCssPath = path.resolve(cwd, globalCssPath);
      if (!absoluteCssPath.startsWith(cwd)) {
        logger.error('Path traversal detected in CSS path.');
        process.exit(1);
      }

      let cssContent = '';
      try {
        cssContent = await fs.readFile(absoluteCssPath, 'utf-8');
      } catch {
        // Will create if it doesn't exist
      }

      if (!cssContent.includes('--color-primary:')) {
        if (!options.yes) {
          const inject = await p.confirm({
            message: `Would you like to inject missing semantic CSS variables into ${globalCssPath}?`,
            initialValue: true,
          });
          if (!p.isCancel(inject) && inject) {
            cssContent += `\n${DEFAULT_CSS_VARS}`;
            await fs.writeFile(absoluteCssPath, cssContent, 'utf-8');
            logger.success('Injected semantic tokens into global CSS.');
          }
        } else {
          cssContent += `\n${DEFAULT_CSS_VARS}`;
          await fs.writeFile(absoluteCssPath, cssContent, 'utf-8');
          logger.success('Injected semantic tokens into global CSS.');
        }
      }

      const config: Config = {
        $schema: 'https://sectloom.vercel.app/schema.json',
        style: 'default',
        tailwind: {
          css: globalCssPath,
          baseColor: 'slate',
        },
        aliases: {
          components: componentsAlias,
          utils: '@/lib/utils',
        },
        registry:
          existingConfig?.registry || 'https://sectloom.vercel.app/registry',
        components: existingConfig?.components || {},
      };

      await writeConfig(cwd, config);

      if (!options.yes) {
        p.outro(pc.green('Sectloom initialized successfully.'));
      } else {
        logger.success('Sectloom initialized successfully.');
      }
    } catch (err: any) {
      logger.error(err.message);
      process.exit(1);
    }
  });
