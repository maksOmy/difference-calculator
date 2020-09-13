#!/usr/bin/env node
import commander from 'commander';
import getFormatDiff from '../src/formatters/index.js';

const { program } = commander.program;

program
  .version('1.0.0', '-v, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish', getFormatDiff)
  .helpOption('-h --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')

  .action((filepath1, filepath2) => {    
      console.log(getFormatDiff(filepath1, filepath2, commander.format));    
  });

commander.parse(process.argv);
