import { sep } from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp} from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import './files/c.js';

const random = Math.random();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export let unknownObject;

if (random > 0.5) {
    unknownObject = import('./files/a.json', { assert: { type: "json" } });
} else {
    unknownObject = import('./files/b.json', { assert: { type: "json" } });
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

export const createMyServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});