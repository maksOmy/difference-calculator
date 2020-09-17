import ini from 'ini';
import yaml from 'js-yaml';
import _ from 'lodash';

const numParser = (obj) => {
  const buildTree = _.mapValues(obj, (value) => {
    const parseNum = Number.isNaN(parseInt(value, 10)) ? value : parseInt(value, 10);
    return _.isObject(value) ? numParser(value) : parseNum;
  });
  return buildTree;
};

const dataParser = (data, format) => {
  switch (format) {
    case 'yml':
      return yaml.safeLoad(data);
    case 'ini': {
      const parsedData = ini.parse(data);
      return numParser(parsedData);
    }
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`unexpected type: ${format}`);
  }
};
export default dataParser;
