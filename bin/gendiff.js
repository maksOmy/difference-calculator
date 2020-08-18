#!/usr/bin/env node
// const { Command } = require('commander'); // (normal include)
const { Command } = require('commander'); // include commander in git clone of commander repo
const program = new Command();

program
  .version('1.0.0', '-v, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.', '--help', 'output usage information');

program.parse(process.argv);