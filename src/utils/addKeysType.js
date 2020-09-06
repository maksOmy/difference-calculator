import _ from 'lodash';

const buildNode = (name, value, type) => ({
  name,
  value,
  type,
});

const addKeysType = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after)).sort();
  const tree = keys.map((key) => {
    const beforeValue = before[key];
    const afterValue = after[key];
    if (!_.has(before, key)) {
      return buildNode(key, afterValue, 'add');
    }
    if (!_.has(after, key)) {
      return buildNode(key, beforeValue, 'delete');
    }
    if (beforeValue === afterValue) {
      return buildNode(key, beforeValue, 'unmodified');
    }
    if (typeof beforeValue === 'object' && typeof afterValue === 'object') {
      const children = addKeysType(beforeValue, afterValue);
      return {
        name: key,
        type: 'nested',
        children,
      };
    }
    return {
      name: key,
      type: 'modified',
      beforeValue,
      afterValue,
    };
  });
  return tree;
};
export default addKeysType;
