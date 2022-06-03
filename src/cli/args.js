import { argv } from 'process';

export const parseArgs = () => {
  let args = [];

  for (let i = 0; i < argv.length; i++) {
    if (argv[i].includes('--')) {
      let str = `${argv[i].slice(2, argv[i].length)} is ${argv[i+1]}`;
      args.push(str);
    }
  }
  
  console.log(args.join(', '));
};

parseArgs();