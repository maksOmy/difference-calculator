import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const reader = (file) => {
  const filePath = path.resolve(__dirname, file);
  const readFile = fs.readFileSync(filePath, 'utf-8');
  return readFile;
};
export default reader;

console.log(reader('after.json'));