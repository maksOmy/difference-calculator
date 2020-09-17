import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFile = (fileName) => fs.readFileSync(fileName, 'utf-8');

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const jsonFilePath1 = getFixturePath('after.json');
const jsonFilePath2 = getFixturePath('before.json');

const ymlFilePath1 = getFixturePath('after.yml');
const ymlFilePath2 = getFixturePath('before.yml');

const iniFilePath1 = getFixturePath('after.ini');
const iniFilePath2 = getFixturePath('before.ini');

const stylishExpected = readFile('__fixtures__/stylishResult.txt');
const plainExpected = readFile('__fixtures__/plainResult.txt');
const jsonExpected = readFile('__fixtures__/jsonResult.txt');

test.each([
  ['json', jsonExpected],
  ['plain', plainExpected],
  ['stylish', stylishExpected],
])('allFormatDiff %#', (format, expected) => {
  expect(genDiff(jsonFilePath1, jsonFilePath2, format)).toEqual(expected);
  expect(genDiff(ymlFilePath1, ymlFilePath2, format)).toEqual(expected);
  expect(genDiff(iniFilePath1, iniFilePath2, format)).toEqual(expected);
});
