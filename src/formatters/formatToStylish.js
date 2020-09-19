import _ from 'lodash';

const indent = 2;

const addIndent = (spaceCount) => ' '.repeat(spaceCount);

const stringify = (values, space) => {
  if (_.isObject(values)) {
    const formattedObj = Object.entries(values)
      .map(([key, value]) => (`${addIndent(space * indent)}${key}: ${stringify(value, space + indent)}\n`));
    return `{\n${formattedObj.join('\n')}${addIndent(space + indent)}}`;
  }
  return values;
};

const formatToStylish = (tree) => {
  const iter = (data, depth) => {
    const spaceCount = indent * depth;
    const formattedTree = data
      .map((node) => {
        const {
          name, type, value, oldValue, newValue, children,
        } = node;
        const increaseIndent = _.isObject(value) && depth === 1 ? spaceCount + indent : spaceCount;
        switch (type) {
          case 'deleted':
            return `${addIndent(spaceCount)}- ${name}: ${stringify(value, increaseIndent)}`;
          case 'added':
            return `${addIndent(spaceCount)}+ ${name}: ${stringify(value, increaseIndent)}`;
          case 'modified':
            return `${addIndent(spaceCount)}- ${name}: ${stringify(oldValue, spaceCount)}\n${addIndent(spaceCount)}+ ${name}: ${stringify(newValue, spaceCount)}`;
          case 'unmodified':
            return `${addIndent(spaceCount)}  ${name}: ${stringify(value, spaceCount)}`;
          case 'nested':
            return `${addIndent(spaceCount)}  ${name}: ${iter(children, depth + 2)}`;
          default:
            throw new Error(`unexpected type: ${type}`);
        }
      });
    return `{\n${formattedTree.join('\n')}\n${addIndent(spaceCount - indent)}}`;
  };
  return iter(tree, 1);
};

export default formatToStylish;
