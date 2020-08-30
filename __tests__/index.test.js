import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
// import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff', () => {
  const expectedResult = '{\n   host: hexlet.io\n - timeout: 50\n + timeout: 20\n - proxy: 123.234.53.22\n - follow: false\n + verbose: true\n}';
  const file1 = getFixturePath('after.json');
  const file2 = getFixturePath('before.json');
  expect(gendiff(file1, file2)).toEqual(expectedResult);
});
