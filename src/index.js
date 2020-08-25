import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const gendiff = (filepath1, filepath2) => {
  const firstFile = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const secondFile = JSON.parse(fs.readFileSync(path.resolve(filepath2)));

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
    if (firstFileKeys.includes(item) || !secondFileKeys.includes(item)) return { key: item, type: 'delete' };

    return item;
  });

  const diff = result.map((item) => {
    if (item.type === 'equal') return `   ${item.key}: ${firstFile[item.key]}\n`;
    if (item.type === 'delete') return `- ${item.key}: ${firstFile[item.key]}\n`;
    if (item.type === 'modified') return `- ${item.key}: ${firstFile[item.key]}\n + ${item.key}: ${secondFile[item.key]}\n`;
    if (item.type === 'add') return `+ ${item.key}: ${secondFile[item.key]}\n`;

    return item;
  });

  return `{\n${_.join(diff, ' ')}}`;
};

export default gendiff;
