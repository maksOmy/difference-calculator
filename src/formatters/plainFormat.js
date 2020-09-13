const getPathToKey = (tree, neededKey) => {
  const iter = (data, path) => {
    const formattedTree = data
      .map((node) => {
        const { name, children, type } = node;
        const pathToKey = path.length !== 0 ? `${path}.${name}` : `${path}${name}`;
        if (type === 'nested') {
          return iter(children, pathToKey);
        }
        return pathToKey;
      });
    const allPath = formattedTree.flat();
    const pathToKey = allPath.filter((key) => key.endsWith(neededKey));

    return pathToKey.join();
  };

  return iter(tree, '');
};

const formatValue = (value) => (typeof value === 'object' ? '[complex value]' : value);

const plainFormat = (tree) => {
  const iter = (data) => {
    const formattedTree = data
      .map((node) => {
        const {
          name, type, value, beforeValue, afterValue, children,
        } = node;

        if (getPathToKey(tree, name) === '') {
          return iter(children);
        }

        switch (type) {
          case 'deleted':
            return `Property ${getPathToKey(tree, name)} was removed`;
          case 'added':
            return `Property ${getPathToKey(tree, name)} was added with value: ${formatValue(value)}`;
          case 'modified':
            return `Property ${getPathToKey(tree, name)} was updated. From ${formatValue(beforeValue)} to ${formatValue(afterValue)}`;
          case 'unmodified':
            return `Property ${getPathToKey(tree, name)} was unmodified with value: ${formatValue(value)}`;
          case 'nested':
            return `Property ${getPathToKey(tree, name)}: ${iter(children)}`;
          default:
            return 'invalid type';
        }
      });
    return `${formattedTree.join('\n')}`;
  };
  return iter(tree);
};

export default plainFormat;
