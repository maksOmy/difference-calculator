import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFile = (fileName) => fs.readFileSync(fileName, 'utf-8');

const getFixturePath = (filename, fileType) => path.join(__dirname, '..', '__fixtures__', `${filename}.${fileType}`);

let stylishExpected;
let plainExpected;
let jsonExpected;

beforeAll(() => {
  stylishExpected = readFile('__fixtures__/stylishResult.txt');
  plainExpected = readFile('__fixtures__/plainResult.txt');
  jsonExpected = readFile('__fixtures__/jsonResult.txt');
});

test.each([
  'json',
  'yml',
  'ini',
])('allFormatDiff %#', (type) => {
  const filePath1 = getFixturePath('after', type);
  const filePath2 = getFixturePath('before', type);

  expect(genDiff(filePath1, filePath2, 'stylish')).toEqual(stylishExpected);
  expect(genDiff(filePath1, filePath2, 'plain')).toEqual(plainExpected);
  expect(genDiff(filePath1, filePath2, 'json')).toEqual(jsonExpected);
});
