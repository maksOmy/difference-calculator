import ini from 'ini';
import yaml from 'js-yaml';
import numParser from './numParser.js';

const dataParser = (data, format) => {
  if (format === 'json') {
    return JSON.parse(data);
  }
  if (format === 'yml') {
    return yaml.safeLoad(data);
  }
  if (format === 'ini') {
    const parseDataIni = ini.parse(data);
    return numParser(parseDataIni);
  }
  return 'undefined format';
};
export default dataParser;
