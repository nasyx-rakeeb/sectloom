import { Command } from 'commander';
import fs from 'node:fs/promises';
import path from 'node:path';
import pc from 'picocolors';
import * as Diff from 'diff';
import { fetchRegistryItem } from '../utils/registry.js';
import { getConfig } from '../utils/config.js';
import { logger } from '../utils/logger.js';

export const diff = new Command('diff')
  .description('Show changes between installed component and registry version')
  .argument('<name>', 'The name of the component to diff')
  .option('-c, --cwd <cwd>', 'The working directory', process.cwd())
  .action(async (name, options) => {
    try {
      const cwd = path.resolve(options.cwd);
      const config = await getConfig(cwd);

      if (!config) {
        logger.error('sectloom.json not found.');
        process.exit(1);
      }
      if (!config.components[name]) {
        logger.error(`Component ${name} is not installed.`);
        process.exit(1);
      }

      const item = await fetchRegistryItem(config.registry, name);
      const hasSrc = await fs
        .stat(path.join(cwd, 'src'))
        .then((s) => s.isDirectory())
        .catch(() => false);
      let diffFound = false;

      for (const file of item.files) {
        let relativeTarget = file.path;
        if (hasSrc && relativeTarget.startsWith('components/')) {
          relativeTarget = 'src/' + relativeTarget;
        }
        const absolutePath = path.resolve(cwd, relativeTarget);

        let localContent = '';
        try {
          localContent = await fs.readFile(absolutePath, 'utf-8');
        } catch {
          logger.warn(`File ${relativeTarget} is missing locally.`);
          diffFound = true;
          continue;
        }

        if (!file.content) {
          logger.warn(
            `Skipping diff for ${file.path}: No content in registry.`
          );
          continue;
        }

        if (localContent !== file.content) {
          diffFound = true;
          logger.text(pc.bold(`\nDiff for ${relativeTarget}:`));
          const patch = Diff.createPatch(
            relativeTarget,
            file.content,
            localContent,
            'Registry',
            'Local'
          );

          patch.split('\n').forEach((line) => {
            if (line.startsWith('+') && !line.startsWith('+++'))
              logger.text(pc.green(line));
            else if (line.startsWith('-') && !line.startsWith('---'))
              logger.text(pc.red(line));
            else logger.text(line);
          });
        }
      }

      if (!diffFound) {
        logger.success(`No changes found for component ${name}.`);
      }
    } catch (err: any) {
      logger.error(err.message);
      process.exit(1);
    }
  });
