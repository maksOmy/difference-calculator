import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import gendiff from '../src/index.js';
import reader from '../src/utils/reader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const jsonFile1 = getFixturePath('after.json');
const jsonFile2 = getFixturePath('before.json');

const ymlFile1 = getFixturePath('after.yml');
const ymlFile2 = getFixturePath('before.yml');

const iniFile1 = getFixturePath('after.ini');
const iniFile2 = getFixturePath('before.ini');

test('stylishFormatDiff', () => {
  const expectedResult = reader('__fixtures__/stylishResult.txt');
  const expectedResultForIni = reader('__fixtures__/stylishResultForIni.txt');

  expect(gendiff(jsonFile1, jsonFile2)).toEqual(expectedResult);  
  expect(gendiff(ymlFile1, ymlFile2)).toEqual(expectedResult); 
  expect(gendiff(iniFile1, iniFile2)).toEqual(expectedResultForIni);
});

test('plainFormatDiff', () => {
  const expectedResult = reader('__fixtures__/plainResult.txt');
  const expectedResultForIni = reader('__fixtures__/plainResultForIni.txt');

  expect(gendiff(jsonFile1, jsonFile2, 'plain')).toEqual(expectedResult);
  expect(gendiff(ymlFile1, ymlFile2, 'plain')).toEqual(expectedResult); 
  expect(gendiff(iniFile1, iniFile2, 'plain')).toEqual(expectedResultForIni);
});

test('jsonFormatDiff', () => {
  const expectedResult = reader('__fixtures__/jsonResult.txt');
  const expectedResultForIni = reader('__fixtures__/jsonResultForIni.txt');

  expect(gendiff(jsonFile1, jsonFile2, 'json')).toEqual(expectedResult);
  expect(gendiff(ymlFile1, ymlFile2, 'json')).toEqual(expectedResult);
  expect(gendiff(iniFile1, iniFile2, 'json')).toEqual(expectedResultForIni);
});
