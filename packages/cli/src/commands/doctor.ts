import { Command } from 'commander';
import path from 'node:path';
import pc from 'picocolors';
import { detectProject, getCompatibilityErrors } from '../utils/project.js';
import { getConfig } from '../utils/config.js';
import { logger } from '../utils/logger.js';

export const doctor = new Command('doctor')
  .description('Check project environment for Sectloom compatibility')
  .option('-c, --cwd <cwd>', 'The working directory', process.cwd())
  .action(async (options) => {
    try {
      const cwd = path.resolve(options.cwd);
      logger.text(pc.bold('Sectloom Environment Check\n'));

      const project = await detectProject(cwd);
      const errors = getCompatibilityErrors(project);

      if (project.isNextJs && project.nextMajor !== null)
        logger.success(`Next.js detected (${project.nextVersion})`);
      else logger.error('Next.js 14+ with a recognizable version is required.');

      if (project.isAppRouter) logger.success('App Router detected');
      else logger.error('App Router not detected.');

      if (project.isTypeScript) logger.success('TypeScript detected');
      else logger.error('TypeScript not detected.');

      if (project.tailwindMajor === 4)
        logger.success(`Tailwind CSS v4 detected (${project.tailwindVersion})`);
      else logger.error('Tailwind CSS v4 not detected.');

      logger.info(`Detected Package Manager: ${project.packageManager}`);

      const config = await getConfig(cwd);
      if (config) logger.success('sectloom.json is present and valid.');
      else logger.warn('sectloom.json is missing. Run `sectloom init`.');

      if (errors.length > 0) {
        errors.forEach((error) => logger.error(error));
        process.exitCode = 1;
      }
    } catch (err: unknown) {
      logger.error(err instanceof Error ? err.message : String(err));
      process.exitCode = 1;
    }
  });
