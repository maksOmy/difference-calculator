import ini from 'ini';
import yaml from 'js-yaml';
import _ from 'lodash';

const parseNum = (obj) => {
  const buildTree = _.mapValues(obj, (value) => {
    const numParse = Number.isNaN(parseFloat(value)) ? value : parseFloat(value);
    return _.isObject(value) ? parseNum(value) : numParse;
  });
  return buildTree;
};

const parse = (data, format) => {
  switch (format) {
    case 'yml':
      return yaml.safeLoad(data);
    case 'ini': {
      const parsedData = ini.parse(data);
      return parseNum(parsedData);
    }
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`unexpected type: ${format}`);
  }
};
export default parse;
