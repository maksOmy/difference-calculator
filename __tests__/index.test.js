import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFile = (fileName) => fs.readFileSync(fileName, 'utf-8');

const getFixturePath = (filename, fileType) => path.join(__dirname, '..', '__fixtures__', `${filename}.${fileType}`);

const stylishExpected = readFile('__fixtures__/stylishResult.txt');
const plainExpected = readFile('__fixtures__/plainResult.txt');
const jsonExpected = readFile('__fixtures__/jsonResult.txt');

test.each([
  ['json'],
  ['yml'],
  ['ini'],
])('allFormatDiff %#', (type) => {
  expect(genDiff(getFixturePath('after', type), getFixturePath('before', type), 'stylish')).toEqual(stylishExpected);
  expect(genDiff(getFixturePath('after', type), getFixturePath('before', type), 'plain')).toEqual(plainExpected);
  expect(genDiff(getFixturePath('after', type), getFixturePath('before', type), 'json')).toEqual(jsonExpected);
});
