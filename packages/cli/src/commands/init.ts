import { Command } from 'commander';
import * as p from '@clack/prompts';
import path from 'node:path';
import pc from 'picocolors';
import { detectProject, getCompatibilityErrors } from '../utils/project.js';
import { getConfig, writeConfig, type Config } from '../utils/config.js';
import { logger } from '../utils/logger.js';

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

      let componentsAlias = project.componentsAlias || '@/components';

      if (!options.yes) {
        const inputComponents = await p.text({
          message: 'What is your components alias?',
          initialValue: componentsAlias,
        });
        if (p.isCancel(inputComponents)) return p.cancel();
        componentsAlias = inputComponents as string;
      }

      const config: Config = {
        $schema: 'https://sectloom.vercel.app/schema.json',
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
