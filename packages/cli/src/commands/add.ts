import { Command } from 'commander';
import * as p from '@clack/prompts';
import fs from 'node:fs/promises';
import path from 'node:path';
import pc from 'picocolors';
import { fetchRegistryItem } from '../utils/registry.js';
import { getConfig, writeConfig } from '../utils/config.js';
import {
  assertValidDependencySpecifier,
  detectProject,
  installDependencies,
  resolveComponentsDirectory,
} from '../utils/project.js';
import { logger } from '../utils/logger.js';
import { resolveInside } from '../utils/path.js';

export const add = new Command('add')
  .description('Add a component to your project')
  .argument('<name>', 'The name of the component to add')
  .option('-c, --cwd <cwd>', 'The working directory', process.cwd())
  .option('-y, --yes', 'Skip prompts and use defaults', false)
  .option(
    '-d, --dry-run',
    'Show what would happen without making changes',
    false
  )
  .action(async (name, options) => {
    try {
      const cwd = path.resolve(options.cwd);
      const config = await getConfig(cwd);

      if (!config) {
        logger.error('sectloom.json not found. Run `sectloom init` first.');
        process.exit(1);
      }

      if (!options.yes && !options.dryRun) {
        p.intro(pc.bgBlue(pc.white(` Sectloom Add : ${name} `)));
      }

      const spinner = p.spinner();
      if (!options.yes && !options.dryRun)
        spinner.start(`Fetching metadata for ${name}...`);

      const item = await fetchRegistryItem(config.registry, name);

      if (!options.yes && !options.dryRun)
        spinner.stop(`Found component: ${item.title}`);

      item.dependencies.forEach(assertValidDependencySpecifier);
      const componentsDir = await resolveComponentsDirectory(
        cwd,
        config.aliases.components
      );
      const filesToWrite: { absolutePath: string; content: string }[] = [];

      for (const file of item.files) {
        const componentPrefix = 'components/';
        const absolutePath = file.path.startsWith(componentPrefix)
          ? resolveInside(
              componentsDir,
              file.path.slice(componentPrefix.length),
              `component target '${file.path}'`
            )
          : resolveInside(cwd, file.path, `registry target '${file.path}'`);

        if (!file.content) {
          throw new Error(
            `File ${file.path} is missing content in the registry.`
          );
        }
        filesToWrite.push({ absolutePath, content: file.content });
      }

      if (options.dryRun) {
        logger.info(`Dry run: adding ${name}`);
        logger.info(`Dependencies: ${item.dependencies.join(', ')}`);
        filesToWrite.forEach((f) =>
          logger.info(`Would write: ${f.absolutePath}`)
        );
        return;
      }

      // Dependencies
      if (item.dependencies.length > 0) {
        if (!options.yes) {
          const install = await p.confirm({
            message: `Install dependencies: ${pc.blue(item.dependencies.join(', '))}?`,
            initialValue: true,
          });
          if (p.isCancel(install)) return p.cancel();
          if (install) {
            const project = await detectProject(cwd);
            spinner.start('Installing dependencies...');
            installDependencies(cwd, project.packageManager, item.dependencies);
            spinner.stop('Dependencies installed.');
          }
        } else {
          const project = await detectProject(cwd);
          installDependencies(cwd, project.packageManager, item.dependencies);
          logger.success('Dependencies installed.');
        }
      }

      // Write files
      for (const file of filesToWrite) {
        await fs.mkdir(path.dirname(file.absolutePath), { recursive: true });
        await fs.writeFile(file.absolutePath, file.content, 'utf-8');
      }

      // Update config
      config.components[name] = {
        version: item.version,
        checksum: item.checksum || '',
      };
      await writeConfig(cwd, config);

      if (!options.yes) {
        p.outro(pc.green(`Component ${name} added successfully.`));
      } else {
        logger.success(`Component ${name} added successfully.`);
      }
    } catch (err: unknown) {
      logger.error(err instanceof Error ? err.message : String(err));
      process.exitCode = 1;
    }
  });
