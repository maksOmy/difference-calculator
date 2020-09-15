import formatToStylish from './formatToStylish.js';
import formatToPlain from './formatToPlain.js';

const formatToJson = (tree) => JSON.stringify(tree);

const getFormatDiff = (diff, format) => {
  switch (format) {
    case 'plain':
      return formatToPlain(diff);
    case 'json':
      return formatToJson(diff);
    case 'stylish':
      return formatToStylish(diff);
    default:
      throw new Error(`unexpected format: ${format}`);
  }
};

export default getFormatDiff;
