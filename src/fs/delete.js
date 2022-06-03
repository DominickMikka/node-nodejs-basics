import { access, unlink } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join} from 'path';

export const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pathToFile = join(__dirname, 'files', 'fileToRemove.txt');

  try {
    await access(pathToFile);
    await unlink(pathToFile);
  } catch(err) {
    throw new Error('FS operation failed');
  }
};

remove();