import stylishFormat from './stylishFormat.js';
import formatToJson from './formatToJson.js';
import plainFormat from './plainFormat.js';
import gendiff from '../index.js';

const getFormatDiff = (filePath1, filePath2, format = 'stylish') => {
  const diff = gendiff(filePath1, filePath2);

  switch (format) {
    case 'plain':
      return plainFormat(diff);
    case 'json':
      return formatToJson(diff);
    default:
      return stylishFormat(diff);
  }
};

export default getFormatDiff;
