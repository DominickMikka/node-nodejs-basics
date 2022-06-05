import { mkdir, access, copyFile, readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join, extname} from 'path';

export const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  let pathToSourceFolder = join(__dirname, 'files');
  let pathToDestFolder = join(__dirname, 'files_copy');

  const checkSourceFolderExists = async () => {
    try {
      await access(pathToSourceFolder);
      await createFolder();
    } catch(err) {
      if (!err.code || err.code === "ENOENT") {
        throw new Error('FS operation failed');
      }
    }
  }

  const createFolder = async (pathToSource, pathToDest) => {

    if (pathToSource) {
      pathToSourceFolder = pathToSource;
    }

    if (pathToDest) {
      pathToDestFolder = pathToDest;
    }

    try {
      await access(pathToDestFolder);
      throw new Error('FS operation failed');
    } catch(err) {

      if (err.code !== "ENOENT") {
        throw err;
      }

      await mkdir(pathToDestFolder, {recursive: true});
      await copyFiles(pathToSourceFolder, pathToDestFolder);

    }
  }

  const copyFiles = async (pathToSourceFolder, pathToDestFolder) => {
    const files = await readdir(pathToSourceFolder, {withFileTypes: true});

    for (const file of files) {
      const pathToSourceCurrentFile = join(pathToSourceFolder, file.name);
      const pathToDestCurrentFile = join(pathToDestFolder, file.name);

      if (extname(file.name) === '') {
        await createFolder(join(pathToSourceFolder, file.name), join(pathToDestFolder, file.name));
      } else {
        await copyFile(pathToSourceCurrentFile, pathToDestCurrentFile);
      }
    }
  }

  await checkSourceFolderExists();
};

copy();