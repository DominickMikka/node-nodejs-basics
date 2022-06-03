import { access, rename as renameFile} from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join} from 'path';

export const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pathToFile = join(__dirname, 'files', 'wrongFilename.txt');
  const pathToNewFile = join(__dirname, 'files', 'properFilename.md');

  const checkSourceFile = async () => {
    try {
      await access(pathToFile);
      await checkDestFile();
    } catch(err) {
      if (err.code !== "ENOENT") {
        throw err;
      }

      throw new Error('FS operation failed');
    }
  }

  const checkDestFile = async () => {
    try {
      let newFile = await access(pathToNewFile);
      if (newFile === undefined) {
        throw new Error('FS operation failed');
      }
    } catch(err) {
      if (err.code === "ENOENT") {
        await renameFile(pathToFile, pathToNewFile);
      } else {
        throw err;
      } 
    }
  }

  await checkSourceFile();
};

rename();