import dataParser from './utils/parsers.js';
import addTypeToKeys from './utils/addTypeToKeys.js';
import stylishFormat from './formaters/stylishFormat.js';
import plainFormat from './formaters/plainFormat.js';
import jsonFormat from './formaters/jsonFormat.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const firstFile = dataParser(filepath1);
  const secondFile = dataParser(filepath2);

  const keysWithType = addTypeToKeys(firstFile, secondFile);

  if (format === 'json') {
    return jsonFormat(keysWithType);
  }
  return format === 'plain' ? plainFormat(keysWithType) : stylishFormat(keysWithType);
};

export default gendiff;
