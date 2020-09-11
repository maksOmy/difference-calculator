const numParser = (obj) => {
  const keys = Object.keys(obj);
  const buildTree = keys.reduce((acc, key) => {
    const value = obj[key];
    if (typeof value === 'object') {
      acc[key] = numParser(value);
    } else {
      acc[key] = Number.isNaN(parseInt(value, 10)) ? value : parseInt(value, 10);
    }
    return acc;
  }, {});
  return buildTree;
};

export default numParser;
