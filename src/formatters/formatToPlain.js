import _ from 'lodash';

const formatValue = (value) => (_.isObject(value) ? '[complex value]' : value);

const formatToPlain = (tree) => {
  const iter = (data, path = '') => {
    const formattedTree = data
      .map((node) => {
        const pathToKey = `${path}${node.name}`;

        switch (node.type) {
          case 'deleted':
            return `Property ${pathToKey} was removed`;
          case 'added':
            return `Property ${pathToKey} was added with value: ${formatValue(node.value)}`;
          case 'modified':
            return `Property ${pathToKey} was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
          case 'unmodified':
            return null;
          case 'nested':
            return iter(node.children, `${pathToKey}.`);
          default:
            throw new Error(`unexpected type: ${node.type}`);
        }
      });
    const formattedTreeWithoutNull = formattedTree.filter((str) => str !== null);
    return formattedTreeWithoutNull.join('\n');
  };
  return iter(tree);
};

export default formatToPlain;
