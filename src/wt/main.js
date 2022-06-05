import { Worker } from 'worker_threads';
import { cpus } from 'os';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export const performCalculations = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const pathToWorker = join(__dirname, 'worker.js');
    const countCpu = cpus();
    const workerResults = [];

    for (let i = 0; i < countCpu.length; i++) {
      workerResults.push(
        new Promise((resolve) => {
          const worker = new Worker(pathToWorker, { workerData: 10 + i });

          worker.on('message', (message) => {
            resolve({ status: 'resolved', data: message })
          });

          worker.on('error', (err) => {
            resolve({ status: 'error', data: null })
          });
        
        })
      );
    }

    const result = await Promise.all(workerResults);

    console.log(result);
};

await performCalculations();