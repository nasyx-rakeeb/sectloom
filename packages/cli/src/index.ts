import { Command } from 'commander';
import { init } from './commands/init.js';
import { add } from './commands/add.js';
import { list } from './commands/list.js';
import { diff } from './commands/diff.js';
import { doctor } from './commands/doctor.js';
import { getCliVersion } from './utils/version.js';

const program = new Command();

program
  .name('sectloom')
  .description('Sectloom CLI for installing React components')
  .version(getCliVersion());

program.addCommand(init);
program.addCommand(add);
program.addCommand(list);
program.addCommand(diff);
program.addCommand(doctor);

program.parse(process.argv);
