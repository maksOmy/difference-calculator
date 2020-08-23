#!/usr/bin/env node
import gendiff from '../src/index.js';
import { Command } from 'commander';
// include commander in git clone of commander repo
const program = new Command();

program 
  .version('1.0.0', '-v, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .action(gendiff(filepath1, filepath2))

program.parse(process.argv);