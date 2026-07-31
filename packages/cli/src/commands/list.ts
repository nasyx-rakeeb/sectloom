import { Command } from 'commander';
import path from 'node:path';
import pc from 'picocolors';
import { fetchRegistryIndex } from '../utils/registry.js';
import { getConfig } from '../utils/config.js';
import { logger } from '../utils/logger.js';

export const list = new Command('list')
  .description('List available components')
  .option('-c, --cwd <cwd>', 'The working directory', process.cwd())
  .action(async (options) => {
    try {
      const cwd = path.resolve(options.cwd);
      const config = await getConfig(cwd);
      const registryUrl = config?.registry || 'https://sectloom.vercel.app/registry';

      const items = await fetchRegistryIndex(registryUrl);

      logger.text('');
      logger.text(pc.bold('Available Components:'));
      items.forEach((item) => {
        const isInstalled = config?.components?.[item.name];
        const status = isInstalled ? pc.green(' (installed)') : '';
        logger.text(`  ${pc.blue(item.name)}${status}`);
        logger.text(`  - ${item.description || item.title}`);
        logger.text('');
      });
    } catch (err: any) {
      logger.error(err.message);
      process.exit(1);
    }
  });
