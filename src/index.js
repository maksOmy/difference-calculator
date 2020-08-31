import _ from 'lodash';
import dataParser from '../utils/parsers.js';

const gendiff = (filepath1, filepath2) => {
  const firstFile = dataParser(filepath1);
  const secondFile = dataParser(filepath2);

  const allKeys = [];
  const firstFileKeys = Object.keys(firstFile);
  const secondFileKeys = Object.keys(secondFile);

  allKeys.push(firstFileKeys);
  allKeys.push(secondFileKeys);
  const uniqueAllKeys = _.uniq(allKeys.flat());

  const result = uniqueAllKeys.map((item) => {
    if (firstFile[item] === secondFile[item]) return { key: item, type: 'equal' };
    if (firstFileKeys.includes(item) && secondFileKeys.includes(item)) return { key: item, type: 'modified' };
    if (!firstFileKeys.includes(item) || secondFileKeys.includes(item)) return { key: item, type: 'add' };

    return { key: item, type: 'delete' };
  });

  const diff = result.map((item) => {
    if (item.type === 'equal') return `   ${item.key}: ${firstFile[item.key]}\n`;
    if (item.type === 'modified') return `- ${item.key}: ${firstFile[item.key]}\n + ${item.key}: ${secondFile[item.key]}\n`;
    if (item.type === 'add') return `+ ${item.key}: ${secondFile[item.key]}\n`;

    return `- ${item.key}: ${firstFile[item.key]}\n`;
  });

  return `{\n${_.join(diff, ' ')}}`;
};

export default gendiff;
