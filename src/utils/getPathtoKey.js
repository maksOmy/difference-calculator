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

export default getPathToKey;
