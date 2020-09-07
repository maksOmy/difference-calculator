const formatObj = (obj, space) => {
  const increaseSpace = 4;
  const formattedObj = Object.entries(obj)
    .map(([key, value]) => (`${' '.repeat(space + increaseSpace)}${key}: ${value}\n`));
  return `{\n${formattedObj.join('\n')}${' '.repeat(space)}}`;
};

const formatValue = (value, space) => (typeof value === 'object' ? formatObj(value, space) : value);

const stylishFormat = (tree) => {
  const iter = (data, depth) => {
    const indent = 2;
    const space = depth === 1 ? depth * indent : depth * indent + indent;
    const formattedTree = data
      .map((node) => {
        const {
          name, type, value, beforeValue, afterValue, children,
        } = node;
        switch (type) {
          case 'delete':
            return `${' '.repeat(space)}- ${name}: ${formatValue(value, space + indent)}`;
          case 'add':
            return `${' '.repeat(space)}+ ${name}: ${formatValue(value, space + indent)}`;
          case 'modified':
            return `${' '.repeat(space)}- ${name}: ${formatValue(beforeValue, space + indent)}\n${' '.repeat(space)}+ ${name}: ${formatValue(afterValue, space + indent)}`;
          case 'unmodified':
            return `${' '.repeat(space)}  ${name}: ${value}`;
          case 'nested':
            return `${' '.repeat(space)}  ${name}: ${iter(children, depth + 1)}`;
          default:
            return 'invalid type';
        }
      });
    return `{\n${formattedTree.join('\n')}\n${' '.repeat(space - indent)}}`;
  };
  return iter(tree, 1);
};

export default stylishFormat;
