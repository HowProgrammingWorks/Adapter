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

  // Call from try/catch block
  try {
    const data = await read('unknown.file', 'utf8');
    console.log(`File size: ${data.length}`);
  } catch (error) {
    console.error(error.message);
  }

  // Set default value in promise.catch block
  const content = await read('unknown.file').catch((error) => {
    console.error(error.message);
    return null;
  });
  // Warning: note that you need additional if-statement
  if (content) {
    console.log({ content });
    console.log(`File size: ${content.size}`);
  }
};

main();
