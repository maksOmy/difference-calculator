import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import getFormatDiff from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFileValues = (fileName) => fs.readFileSync(fileName, 'utf-8');

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const jsonFilePath1 = getFixturePath('after.json');
const jsonFilePath2 = getFixturePath('before.json');

const ymlFilePath1 = getFixturePath('after.yml');
const ymlFilePath2 = getFixturePath('before.yml');

const iniFilePath1 = getFixturePath('after.ini');
const iniFilePath2 = getFixturePath('before.ini');

const stylishExpected = getFileValues('__fixtures__/stylishResult.txt');
const plainExpected = getFileValues('__fixtures__/plainResult.txt');
const jsonExpected = getFileValues('__fixtures__/jsonResult.txt');
const expectForAllFormats = [stylishExpected, plainExpected, jsonExpected];

test.each([
  [jsonFilePath1, jsonFilePath2, expectForAllFormats],
  [ymlFilePath1, ymlFilePath2, expectForAllFormats],
  [iniFilePath1, iniFilePath2, expectForAllFormats],
])('allFormatDiff %#', (a, b, expected) => {
  expect(getFormatDiff(a, b)).toEqual(expected[0]);
  expect(getFormatDiff(a, b, 'plain')).toEqual(expected[1]);
  expect(getFormatDiff(a, b, 'json')).toEqual(expected[2]);
});
