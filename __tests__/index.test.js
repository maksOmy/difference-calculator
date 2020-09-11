import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const reader = (fileName) => {
  const filePath = path.resolve(fileName);
  const readFile = fs.readFileSync(filePath, 'utf-8');
  return readFile;
};

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const jsonFilePath1 = getFixturePath('after.json');
const jsonFilePath2 = getFixturePath('before.json');

const ymlFilePath1 = getFixturePath('after.yml');
const ymlFilePath2 = getFixturePath('before.yml');

const iniFilePath1 = getFixturePath('after.ini');
const iniFilePath2 = getFixturePath('before.ini');

const stylishExpected = reader('__fixtures__/stylishResult.txt');
const plainExpected = reader('__fixtures__/plainResult.txt');
const jsonExpected = reader('__fixtures__/jsonResult.txt');

test.each([
  [jsonFilePath1, jsonFilePath2, stylishExpected],
  [ymlFilePath1, ymlFilePath2, stylishExpected],
  [iniFilePath1, iniFilePath2, stylishExpected],
])('stylishFormatDiff %#', (a, b, expected) => {
  expect(gendiff(a, b)).toEqual(expected);
});

test.each([
  [jsonFilePath1, jsonFilePath2, plainExpected],
  [ymlFilePath1, ymlFilePath2, plainExpected],
  [iniFilePath1, iniFilePath2, plainExpected],
])('plainFormatDiff %#', (a, b, expected) => {
  expect(gendiff(a, b, 'plain')).toEqual(expected);
});

test.each([
  [jsonFilePath1, jsonFilePath2, jsonExpected],
  [ymlFilePath1, ymlFilePath2, jsonExpected],
  [iniFilePath1, iniFilePath2, jsonExpected],
])('jsonFormatDiff %#', (a, b, expected) => {
  expect(gendiff(a, b, 'json')).toEqual(expected);
});
