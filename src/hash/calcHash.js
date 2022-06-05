import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createHash } from 'crypto';

export const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pathToFile = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

  try {
    const content = await readFile(pathToFile, 'utf-8');
    const hash = createHash('sha256');
    hash.update(content);
    console.log(hash.digest('hex'));
  } catch(err) {
    console.log(err);
  }
};

calculateHash();