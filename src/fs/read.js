import { access, readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join} from 'path';

export const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pathToFile = join(__dirname, 'files', 'fileToRead.txt');

  try {
    const content = await readFile(pathToFile, 'utf-8');
    console.log(content);
  } catch(err) {
    throw new Error('FS operation failed');
  }
};

read();