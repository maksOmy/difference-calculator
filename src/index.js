import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import dataParser from './parsers.js';
import getFormatDiff from './formatters/index.js';

const readFile = (filePath) => fs.readFileSync(filePath).toString();

const buildDiff = (file1Values, file2Values) => {
  const keys = _.union(_.keys(file1Values), _.keys(file2Values)).sort();
  const tree = keys.map((key) => {
    const oldValue = file1Values[key];
    const newValue = file2Values[key];
    if (!_.has(file1Values, key)) return { name: key, value: newValue, type: 'added' };
    if (!_.has(file2Values, key)) return { name: key, value: oldValue, type: 'deleted' };
    if (oldValue === newValue) return { name: key, value: oldValue, type: 'unmodified' };
    if (_.isObject(oldValue) && _.isObject(newValue)) {
      const children = buildDiff(oldValue, newValue);
      return { name: key, type: 'nested', children };
    }
    return {
      name: key,
      type: 'modified',
      oldValue,
      newValue,
    };
  });
  return tree;
};

const getFileType = (fileName) => {
  const extNameFile = path.extname(fileName);
  return extNameFile.slice(1, extNameFile.length);
};

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const fileformat1 = getFileType(filepath1);
  const readFile1 = readFile(filepath1);
  const fileValues1 = dataParser(readFile1, fileformat1);

  const fileformat2 = getFileType(filepath2);
  const readFile2 = readFile(filepath2);
  const fileValues2 = dataParser(readFile2, fileformat2);

  const diff = buildDiff(fileValues1, fileValues2);
  const formatDiff = getFormatDiff(diff, format);

  return formatDiff;
};

export default gendiff;
