import _ from 'lodash';

const indent = 2;

const addIndent = (spaceCount) => ' '.repeat(spaceCount);

const stringify = (values, space, depth) => {
  if (!_.isObject(values)) {
    return values;
  }
  const increaseIndent = depth === 1 ? space * (depth + 3) : space * depth * space;
  const formattedObj = Object.entries(values)
    .map(([key, value]) => (`${addIndent(increaseIndent)}${key}: ${stringify(value, increaseIndent)}\n`));

  return `{\n${formattedObj.join('\n')}${addIndent(space * depth + space)}}`;
};

const formatToStylish = (tree) => {  
  const iter = (data, depth) => {
    const spaceCount = indent * depth;
    const formattedTree = data
      .map((node) => {
        const {
          name, type, value, oldValue, newValue, children,
        } = node;        
        switch (type) {
          case 'deleted':
            return `${addIndent(spaceCount)}- ${name}: ${stringify(value, indent, depth)}`;
          case 'added':
            return `${addIndent(spaceCount)}+ ${name}: ${stringify(value, indent, depth)}`;
          case 'modified':
            return `${addIndent(spaceCount)}- ${name}: ${stringify(oldValue, indent, depth)}\n${addIndent(spaceCount)}+ ${name}: ${stringify(newValue, indent, depth)}`;
          case 'unmodified':
            return `${addIndent(spaceCount)}  ${name}: ${stringify(value, indent, depth)}`;
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
