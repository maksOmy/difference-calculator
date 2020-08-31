import path from 'path';
import ini from 'ini';
import yaml from 'js-yaml';
import reader from './reader.js';

const dataParser = (data) => {
  const format = path.extname(data);
  const readFile = reader(data);

  let parse;

  if (format === '.json') {
    parse = JSON.parse(readFile);
  }
  if (format === '.yml') {
    parse = yaml.safeLoad(readFile);
  }
  if (format === '.ini') {
    parse = ini.parse(readFile);
  }
  return parse;
};
export default dataParser;
