#!/usr/bin/env babel-node
import gendiff from '../src/index';

const { Command } = require('commander');

const program = new Command();
program
  .version('1.0.0', '-v, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')

  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2));
  });

program.parse(process.argv);
