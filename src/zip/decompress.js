import { createUnzip } from 'zlib';
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join} from 'path';

export const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pathToSourceFile = join(__dirname, 'files', 'archive.gz');
  const pathToDestFile = join(__dirname, 'files', 'fileToCompress.txt');
  const sourceFile = createReadStream(pathToSourceFile);
  const destFile = createWriteStream(pathToDestFile);
  const gzip = createUnzip();

  pipeline(sourceFile, gzip, destFile,  (err) => {
    if (err) {
      console.log(err);
      process.exitCode = 1;
    }
  });
};

decompress();