import _ from 'lodash';
import dataParser from '../utils/parsers.js';
import addKeysType from '../utils/addKeysType.js';

const gendiff = (filepath1, filepath2) => {
  const firstFile = dataParser(filepath1);
  const secondFile = dataParser(filepath2);

  const allKeys = [];
  const firstFileKeys = Object.keys(firstFile);
  const secondFileKeys = Object.keys(secondFile);

  allKeys.push(firstFileKeys);
  allKeys.push(secondFileKeys);
  const uniqueAllKeys = _.uniq(allKeys.flat());

  const result = addKeysType(uniqueAllKeys, firstFile, secondFile, firstFileKeys, secondFileKeys);

  const diff = result.map((item) => {
    if (item.type === 'equal') return `   ${item.key}: ${firstFile[item.key]}\n`;
    if (item.type === 'modified') return `- ${item.key}: ${firstFile[item.key]}\n + ${item.key}: ${secondFile[item.key]}\n`;
    if (item.type === 'add') return `+ ${item.key}: ${secondFile[item.key]}\n`;

    return `- ${item.key}: ${firstFile[item.key]}\n`;
  });
  console.log(diff);
  return `{\n${_.join(diff, ' ')}}`;
};

export default gendiff;
