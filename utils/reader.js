import path from 'path';
import fs from 'fs';

const reader = (file) => {
  const filePath = path.resolve(file);
  const readFile = fs.readFileSync(filePath);
  return readFile;
};
export default reader;
