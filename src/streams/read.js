import { open } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pathToFile = join(__dirname, 'files', 'fileToRead.txt');

  const file = await open(pathToFile, 'r');
  const stream = file.createReadStream();

  stream.on('data', (chunk) => {
    process.stdout.write(chunk.toString());
  });
};

read();