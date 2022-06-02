import { writeFile, access } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join} from 'path';

export const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pathToFile = join(__dirname, 'files', 'fresh.txt');

  try {
    await access(pathToFile);
    console.log(new Error('FS operation failed'));
  } catch(err) {
    await writeFile(pathToFile, 'I am fresh and young');
  }
};

create();