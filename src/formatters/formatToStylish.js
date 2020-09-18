import _ from 'lodash';

const addIndent = (indent) => `${' '.repeat(indent)}`;

const stringify = (values, space) => {
  if (_.isObject(values)) {
    const depth = 2;
    const formattedObj = Object.entries(values)
      .map(([key, value]) => (`${addIndent(space * depth)}${key}: ${stringify(value, space + depth)}\n`));
    return `{\n${formattedObj.join('\n')}${addIndent(space + depth)}}`;
  }
  return values;
};

const formatToStylish = (tree) => {
  const iter = (data, depth) => {
    const indent = 2;
    const spaceCount = indent * depth;

    const formattedTree = data
      .map((node) => {
        const {
          name, type, value, oldValue, newValue, children,
        } = node;
        const increaseSpaceCount = _.isObject(value) && depth === 1
          ? spaceCount + indent
          : spaceCount;

        switch (type) {
          case 'deleted':
            return `${addIndent(spaceCount)}- ${name}: ${stringify(value, increaseSpaceCount)}`;
          case 'added':
            return `${addIndent(spaceCount)}+ ${name}: ${stringify(value, increaseSpaceCount)}`;
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
