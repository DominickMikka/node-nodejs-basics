import { env } from 'process';

export const parseEnv = () => {
  let varEnv = [];

  for (let value in env) {
    if (value.includes("RSS_")) {
      varEnv.push(`${value}=${env[value]}`);
    }
  };

  console.log(varEnv.join('; '));
};

parseEnv();