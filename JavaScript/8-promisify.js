'use strict';

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
  const fileName = '8-promisify.js';
  const data = await read(fileName, 'utf8');
  console.log(`File "${fileName}" size: ${data.length}`);
  try {
    const data = await read('unknown.file', 'utf8');
    console.log(`File size: ${data.length}`);
  } catch (error) {
    console.error(error.message);
  }
};

main();
