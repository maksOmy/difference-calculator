import dataParser from './utils/parsers.js';
import addKeysType from './utils/addKeysType.js';
import stylishFormat from './formaters/stylishFormat.js';
import plainFormat from './formaters/plainFormat.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const firstFile = dataParser(filepath1);
  const secondFile = dataParser(filepath2);

  const keysWithType = addKeysType(firstFile, secondFile);
  return format === 'plain' ? plainFormat(keysWithType) : stylishFormat(keysWithType);
};

export default gendiff;
