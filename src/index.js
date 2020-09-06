import dataParser from './utils/parsers.js';
import addKeysType from './utils/addKeysType.js';
import stylishFormat from './formaters/stylishFormat.js';

const gendiff = (filepath1, filepath2) => {
  const firstFile = dataParser(filepath1);
  const secondFile = dataParser(filepath2);

  const keysWithType = addKeysType(firstFile, secondFile);
  return stylishFormat(keysWithType);
};

export default gendiff;
