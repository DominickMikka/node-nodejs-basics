import { readdir, stat } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join} from 'path';

export const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pathToFolder = join(__dirname, 'files');
  let arrFiles = [];

  try {
    const files = await readdir(pathToFolder, {withFileTypes: true});

    for (const file of files) {
      const pathToFile = join(pathToFolder, file.name);
      const stats = await stat(pathToFile);
      if (stats.isFile()) {
        arrFiles.push(file.name);
      }
    }
    console.log(arrFiles);
  } catch(err) {
    throw new Error('FS operation failed');
  }
};

list();