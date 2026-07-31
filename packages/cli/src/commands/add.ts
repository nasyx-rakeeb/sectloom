import { Command } from 'commander';
import * as p from '@clack/prompts';
import fs from 'node:fs/promises';
import path from 'node:path';
import pc from 'picocolors';
import { fetchRegistryItem } from '../utils/registry.js';
import { getConfig, writeConfig } from '../utils/config.js';
import { detectProject, installDependencies } from '../utils/project.js';
import { logger } from '../utils/logger.js';

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

      // Resolve destination
      // Using config.aliases.components but resolving it physically.
      // Usually aliases look like "@/components", we translate it to src/components or components.
      // For a robust implementation, we check if src/components exists.
      const hasSrc = await fs
        .stat(path.join(cwd, 'src'))
        .then((s) => s.isDirectory())
        .catch(() => false);

      // We will place components into `componentsBase/sectloom/[file.name]` or similar based on `file.name`.
      // Actually `file.name` in the registry output from Phase 04 is `components/sectloom/hero-efficiency.tsx`.
      // We should strip the `components/` prefix if we are resolving against componentsBase, or just resolve from root?
      // Wait, in Phase 04: target is `components/sectloom/hero-efficiency.tsx`.
      // If `hasSrc` is true, we should probably put it in `src/components/sectloom/...`
      // Let's just resolve relative to cwd + target, but handle `src` properly.

      const filesToWrite: { absolutePath: string; content: string }[] = [];

      for (const file of item.files) {
        let relativeTarget = file.name;
        if (hasSrc && !relativeTarget.startsWith('src/')) {
          // simple heuristic: if it starts with 'components/', prepend 'src/'
          if (relativeTarget.startsWith('components/')) {
            relativeTarget = 'src/' + relativeTarget;
          }
        }
        const absolutePath = path.resolve(cwd, relativeTarget);

        // Prevent path traversal
        if (!absolutePath.startsWith(cwd)) {
          throw new Error(`Unsafe target path detected: ${relativeTarget}`);
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

      // Check overwrites
      for (const file of filesToWrite) {
        const exists = await fs
          .stat(file.absolutePath)
          .then(() => true)
          .catch(() => false);
        if (exists) {
          if (!options.yes) {
            const proceed = await p.confirm({
              message: `File ${file.absolutePath} already exists. Overwrite?`,
              initialValue: false,
            });
            if (p.isCancel(proceed) || !proceed) {
              p.cancel('Installation aborted.');
              process.exit(0);
            }
          }
        }
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
    } catch (err: any) {
      logger.error(err.message);
      process.exit(1);
    }
  });
