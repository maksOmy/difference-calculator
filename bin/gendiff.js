#!/usr/bin/env node
import commander from 'commander';
import gendiff from '../src/index.js';

const { program } = commander.program;

program
  .version('1.0.0', '-v, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish', gendiff)
  .helpOption('-h --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')

  .action((filepath1, filepath2) => {
    if (commander.format === 'plain') {
      console.log(gendiff(filepath1, filepath2, 'plain'));
    } else {
      console.log(gendiff(filepath1, filepath2));
    }
  });

commander.parse(process.argv);
