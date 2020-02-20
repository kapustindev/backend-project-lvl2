#!/usr/bin/env node
import program from 'commander';

program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
        firstPath = firstConfig;
        secondPath = secondConfig;
    })
    .option('-f --format [type]', 'output format')
    .parse(process.argv);