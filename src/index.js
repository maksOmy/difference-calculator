import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parse from './parsers.js';
import getFormatDiff from './formatters/index.js';

const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const buildDiff = (oldValues, newValues) => {
  const keys = _.union(_.keys(oldValues), _.keys(newValues)).sort();
  const tree = keys.map((key) => {
    const oldValue = oldValues[key];
    const newValue = newValues[key];
    if (!_.has(oldValues, key)) {
      return { name: key, value: newValue, type: 'added' };
    }
    if (!_.has(newValues, key)) {
      return { name: key, value: oldValue, type: 'deleted' };
    }
    if (oldValue === newValue) {
      return { name: key, value: oldValue, type: 'unmodified' };
    }
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

const gendiff = (filepath1, filepath2, format) => {
  const fileformat1 = getFileType(filepath1);
  const readedFile1 = readFile(filepath1);
  const fileValues1 = parse(readedFile1, fileformat1);

  const fileformat2 = getFileType(filepath2);
  const readedFile2 = readFile(filepath2);
  const fileValues2 = parse(readedFile2, fileformat2);

  const diffBuild = buildDiff(fileValues1, fileValues2);
  const diff = getFormatDiff(diffBuild, format);

  return diff;
};

export default gendiff;
