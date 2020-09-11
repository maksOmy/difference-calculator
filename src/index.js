import path from 'path';
import dataParser from './utils/parsers.js';
import addTypeToKeys from './utils/addTypeToKeys.js';
import stylishFormat from './formaters/stylishFormat.js';
import plainFormat from './formaters/plainFormat.js';
import jsonFormat from './formaters/jsonFormat.js';
import reader from './utils/reader.js';

const getExtName = (fileName) => {
  const extNameFile = path.extname(fileName);
  return extNameFile.slice(1, extNameFile.length);
};

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const formatFile1 = getExtName(filepath1);
  const formatFile2 = getExtName(filepath2);

  const readFile1 = reader(filepath1);
  const readFile2 = reader(filepath2);

  const firstFileValue = dataParser(readFile1, formatFile1);
  const secondFileValue = dataParser(readFile2, formatFile2);

  const keysWithType = addTypeToKeys(firstFileValue, secondFileValue);

  if (format === 'json') {
    return jsonFormat(keysWithType);
  }
  return format === 'plain' ? plainFormat(keysWithType) : stylishFormat(keysWithType);
};

export default gendiff;
