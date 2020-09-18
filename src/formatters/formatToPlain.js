import _ from 'lodash';

const formatValue = (value) => (_.isObject(value) ? '[complex value]' : value);

const formatToPlain = (tree) => {
  const iter = (data, path = '') => {
    const formattedTree = data
      .map((node) => {
        const {
          name, type, value, oldValue, newValue, children,
        } = node;

        const pathToKey = `${path}${name}`;

        switch (type) {
          case 'deleted':
            return `Property ${pathToKey} was removed`;
          case 'added':
            return `Property ${pathToKey} was added with value: ${formatValue(value)}`;
          case 'modified':
            return `Property ${pathToKey} was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
          case 'unmodified':
            return `Property ${pathToKey} was unmodified with value: ${formatValue(value)}`;
          case 'nested':
            return iter(children, `${pathToKey}.`);
          default:
            throw new Error(`unexpected type: ${type}`);
        }
      });
    return `${formattedTree.join('\n')}`;
  };
  return iter(tree);
};

export default formatToPlain;
