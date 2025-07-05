'use strict';

// Task: implement a cancelable promisify function with AbortController.
// Allow passing new argument `AbortSignal` after the last argument
// to the original function replacing the callback. The promisify should check
// the existence of AbortSignal and apply logic to implement it on top of calling original function
// There is no need to propagate AbortSignal to original function.
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
