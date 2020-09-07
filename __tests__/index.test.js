import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import gendiff from '../src/index.js';
import reader from '../src/utils/reader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff', () => {
  const expectedResult = reader('__fixtures__/expectResult.txt');
  const expectedResultForIni = reader('__fixtures__/expectResultForIni.txt');

  const jsonFile1 = getFixturePath('after.json');
  const jsonFile2 = getFixturePath('before.json');
  expect(gendiff(jsonFile1, jsonFile2)).toEqual(expectedResult);
  
  const ymlFile1 = getFixturePath('after.yml');
  const ymlFile2 = getFixturePath('before.yml');
  expect(gendiff(ymlFile1, ymlFile2)).toEqual(expectedResult);

  const iniFile1 = getFixturePath('after.ini');
  const iniFile2 = getFixturePath('before.ini');
  expect(gendiff(iniFile1, iniFile2)).toEqual(expectedResultForIni);
});
