import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import dataParser from './parsers.js';

const getFileValues = (filePath) => {
  const readFile = fs.readFileSync(filePath, 'utf-8');
  return readFile;
};

const addTypeToKeys = (file1Values, file2Values) => {
  const keys = _.union(Object.keys(file1Values), Object.keys(file2Values)).sort();
  const tree = keys.map((key) => {
    const beforeValue = file1Values[key];
    const afterValue = file2Values[key];
    if (!_.has(file1Values, key)) {
      return { name: key, value: afterValue, type: 'added' };
    }
    if (!_.has(file2Values, key)) {
      return { name: key, value: beforeValue, type: 'deleted' };
    }
    if (beforeValue === afterValue) {
      return { name: key, value: beforeValue, type: 'unmodified' };
    }
    if (_.isObject(beforeValue) && _.isObject(afterValue)) {
      const children = addTypeToKeys(beforeValue, afterValue);
      return { name: key, type: 'nested', children };
    }
    return {
      name: key,
      type: 'modified',
      beforeValue,
      afterValue,
    };
  });
  return tree;
};

const getFileType = (fileName) => {
  const extNameFile = path.extname(fileName);
  return extNameFile.slice(1, extNameFile.length);
};

const gendiff = (filepath1, filepath2) => {
  const fileformat1 = getFileType(filepath1);
  const fileformat2 = getFileType(filepath2);

  const readFile1 = getFileValues(filepath1);
  const readFile2 = getFileValues(filepath2);

  const fileValues1 = dataParser(readFile1, fileformat1);
  const fileValues2 = dataParser(readFile2, fileformat2);

  const keysWithType = addTypeToKeys(fileValues1, fileValues2);

  return keysWithType;
};

export default gendiff;
