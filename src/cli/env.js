import { env } from 'process';

export const parseEnv = () => {
  for (let value in env) {
    if (value.includes("RSS_")) {
      console.log(`${value}=${env[value]}`);
    }
  };
};

parseEnv();