#!/usr/bin/env node
// const { Command } = require('commander'); // (normal include)
const { Command } = require('commander'); // include commander in git clone of commander repo
const program = new Command();

program 
  .version('1.0.0', '-v, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h --help', 'output usage information')
  .arguments('<filepath1> <filepath1>')
  .description('Compares two configuration files and shows a difference.')
  
program.parse(process.argv);