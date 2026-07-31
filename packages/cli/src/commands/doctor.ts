import { Command } from 'commander';
import path from 'node:path';
import pc from 'picocolors';
import { detectProject } from '../utils/project.js';
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

      if (project.isNextJs)
        logger.success(
          `Next.js detected (${project.nextVersion || 'unknown version'})`
        );
      else logger.error('Next.js not detected. Actionable: Install next.');

      if (project.isAppRouter) logger.success('App Router detected');
      else
        logger.warn(
          'App Router not detected. Sectloom components heavily rely on RSC and App Router.'
        );

      if (project.isTypeScript) logger.success('TypeScript detected');
      else
        logger.error(
          'TypeScript not detected. Actionable: Initialize TypeScript with `npx tsc --init`.'
        );

      if (project.tailwindVersion === 4)
        logger.success('Tailwind CSS v4 detected');
      else if (project.tailwindVersion === 3)
        logger.warn('Tailwind CSS v3 detected. Sectloom requires v4.');
      else logger.error('Tailwind CSS not detected.');

      if (project.globalCssPath)
        logger.success(`Global CSS found at ${project.globalCssPath}`);
      else logger.warn('Global CSS not found in standard paths.');

      logger.info(`Detected Package Manager: ${project.packageManager}`);

      const config = await getConfig(cwd);
      if (config) {
        logger.success('sectloom.json is present and valid.');
      } else {
        logger.warn(
          'sectloom.json is missing. Run `sectloom init` to create it.'
        );
      }
    } catch (err: any) {
      logger.error(err.message);
      process.exit(1);
    }
  });
