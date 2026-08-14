import { Command } from 'commander';
import * as p from '@clack/prompts';
import fs from 'node:fs/promises';
import path from 'node:path';
import pc from 'picocolors';
import { detectProject, getCompatibilityErrors } from '../utils/project.js';
import { getConfig, writeConfig, type Config } from '../utils/config.js';
import { logger } from '../utils/logger.js';
import { resolveInside } from '../utils/path.js';
import {
  appendTokenStylesheet,
  hasSectloomTokens,
  loadTokenStylesheet,
} from '../utils/tokens.js';

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
          return;
        }
      }

      const project = await detectProject(cwd);
      const compatibilityErrors = getCompatibilityErrors(project);
      if (compatibilityErrors.length > 0) {
        throw new Error(compatibilityErrors.join(' '));
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

      if (!globalCssPath) throw new Error('Global CSS path is required.');

      const absoluteCssPath = resolveInside(
        cwd,
        globalCssPath,
        'global CSS path'
      );
      let cssContent = await fs
        .readFile(absoluteCssPath, 'utf8')
        .catch(() => '');

      if (!hasSectloomTokens(cssContent)) {
        let inject = options.yes;
        if (!options.yes) {
          const response = await p.confirm({
            message: `Would you like to inject missing semantic CSS variables into ${globalCssPath}?`,
            initialValue: true,
          });
          if (p.isCancel(response)) return p.cancel();
          inject = response;
        }

        if (inject) {
          cssContent = appendTokenStylesheet(
            cssContent,
            await loadTokenStylesheet()
          );
          await fs.mkdir(path.dirname(absoluteCssPath), { recursive: true });
          await fs.writeFile(absoluteCssPath, cssContent, 'utf8');
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
          utils: project.utilsAlias || '@/lib/utils',
        },
        registry:
          existingConfig?.registry || 'https://sectloom.vercel.app/registry',
        components: existingConfig?.components || {},
      };

      await writeConfig(cwd, config);

      if (!options.yes) p.outro(pc.green('Sectloom initialized successfully.'));
      else logger.success('Sectloom initialized successfully.');
    } catch (err: unknown) {
      logger.error(err instanceof Error ? err.message : String(err));
      process.exitCode = 1;
    }
  });
