import dataParser from '../utils/parsers.js';
import addKeysType from '../utils/addKeysType.js';
import stylishFormat from '../utils/formater.js';

const gendiff = (filepath1, filepath2) => {
  const firstFile = dataParser(filepath1);
  const secondFile = dataParser(filepath2);

  const result = addKeysType(firstFile, secondFile);
  return stylishFormat(result);
};

export default gendiff;
