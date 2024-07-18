'use strict';

// Task: implement cancellation by passing `AbortSignal` as an option
// to the promisified function (last argument, replacing the callback).
// Hint: Create `AbortController` or `AbortSignal` in the usage section.

const promisify = (fn) => (...args) => {
  const promise = new Promise((resolve, reject) => {
    const callback = (err, data) => {
      if (err) reject(err);
      else resolve(data);
    };
    fn(...args, callback);
  });
  return promise;
};

// Usage

const fs = require('node:fs');
const read = promisify(fs.readFile);

const main = async () => {
  const fileName = '1-promisify.js';
  const data = await read(fileName, 'utf8');
  console.log(`File "${fileName}" size: ${data.length}`);
};

main();
