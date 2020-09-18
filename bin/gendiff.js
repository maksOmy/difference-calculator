#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../src/index.js';

commander
  .version('1.0.0', '-v, --version', 'output the version number')
  .option('-f, --format [type: stylish, plain, json]', 'output format', 'stylish')
  .helpOption('-h --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')

  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, commander.format));
  });

commander.parse(process.argv);
