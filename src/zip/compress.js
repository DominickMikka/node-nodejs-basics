import { createGzip } from 'zlib';
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join} from 'path';

export const compress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pathToSourceFile = join(__dirname, 'files', 'fileToCompress.txt');
  const pathToDestFile = join(__dirname, 'files', 'archive.gz');
  const sourceFile = createReadStream(pathToSourceFile);
  const destFile = createWriteStream(pathToDestFile);
  const gzip = createGzip();

  pipeline(sourceFile, gzip, destFile,  (err) => {
    if (err) {
      console.log(err);
      process.exitCode = 1;
    }
  });
};

compress();