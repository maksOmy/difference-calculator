import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const gendiff = (filepath1, filepath2) => {
  const firstFile = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'frontend-project-lvl2', filepath1)));
  const secondFile = JSON.parse(fs.readFileSync(path.resolve('frontend-project-lvl2', filepath2)));

  const firstFileKeys = Object.keys(firstFile);
  const secondFileKeys = Object.keys(secondFile);

  const filterValue = firstFileKeys.filter((key) => firstFile[key] === secondFile[key]);
  const neutralDiff = filterValue.reduce((acc, item) => {
    const changingItem = `  ${item}`;
    acc[changingItem] = firstFile[item];

    return acc;
  }, {});

  const filterKey = firstFileKeys.filter((key) => !secondFileKeys.includes(key) || firstFile[key] !== secondFile[key]);
  const minusDiff = filterKey.reduce((acc, item) => {
    const changingItem = `- ${item}`;
    acc[changingItem] = firstFile[item];

    return acc;
  }, {});

  const addData = secondFileKeys.filter((key) => !firstFileKeys.includes(key) || firstFile[key] !== secondFile[key]);
  const addDiff = addData.reduce((acc, item) => {
    const changingItem = `+ ${item}`;
    acc[changingItem] = secondFile[item];

    return acc;
  }, {});  
  
  return {...neutralDiff, ...minusDiff, ...addDiff};
};
console.log(gendiff('../files/after.json', '../files/before.json'))
export default gendiff;