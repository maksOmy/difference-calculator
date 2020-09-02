const addKeysType = (keys, firstFile, secondFile, firstFileKeys, secondFileKeys) => {
  const iter = (acc, keyIndex) => {
    const item = keys[keyIndex];
    if (keyIndex === keys.length) {
      return acc;
    }
    if (firstFile[item] === secondFile[item]) {
      acc.push({ key: item, type: 'equal' });
      return iter(acc, keyIndex + 1);
    }
    if (firstFileKeys.includes(item) && secondFileKeys.includes(item)) {
      acc.push({ key: item, type: 'modified' });
      return iter(acc, keyIndex + 1);
    }
    if (!firstFileKeys.includes(item) || secondFileKeys.includes(item)) {
      acc.push({ key: item, type: 'add' });
      return iter(acc, keyIndex + 1);
    }
    acc.push({ key: item, type: 'delete' });
    return iter(acc, keyIndex + 1);
  };
  return iter([], 0);
};
export default addKeysType;
