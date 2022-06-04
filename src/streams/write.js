import { open } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pathToFile = join(__dirname, 'files', 'fileToWrite.txt');

  const file = await open(pathToFile, 'w');
  const stream = file.createWriteStream();
  process.stdout.write('Please, write some text (if you want to exit use Ctrl+C):\n');

  process.stdin.on('data', data => {
    stream.write(data);
  });
};

write();