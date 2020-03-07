#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';
import { version } from '../../package.json';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format));
  })
  .option('-f, --format [type]', 'output format', 'tree')
  .parse(process.argv);
