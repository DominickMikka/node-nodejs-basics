import { Transform } from 'stream';

export const transform = async () => {
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk.toString().split('').reverse().join('') + '\n');
      callback();
    }
  });

  process.stdout.write('Please, write string (if you want to exit use Ctrl+C):\n');
  process.stdin.pipe(transformStream).pipe(process.stdout);
};

transform();