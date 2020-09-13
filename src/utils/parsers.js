import ini from 'ini';
import yaml from 'js-yaml';

const numParser = (obj) => {
  const keys = Object.keys(obj);
  const buildTree = keys.reduce((acc, key) => {
    const value = obj[key];
    if (typeof value === 'object') {
      acc[key] = numParser(value);
    } else {
      acc[key] = Number.isNaN(parseInt(value, 10)) ? value : parseInt(value, 10);
    }
    return acc;
  }, {});
  return buildTree;
};

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
