'use strict';

const fs = require('node:fs');
const stream = require('node:stream');
const { Console } = require('node:console');
const PATH = process.cwd();

const shortenPath = new stream.Transform({
  transform(chunk, encoding, callback) {
    const line = String(chunk)
      .replaceAll(PATH, '')
      .replaceAll('\n', ' ')
      .replaceAll('     ', ' ')
      .trim();
    callback(null, line);
  },
});

const TIME_START = 11;
const TIME_END = 19;

const getTimestamp = () => {
  const time = new Date().toISOString();
  return time.substring(TIME_START, TIME_END);
};

const addTimestamp = new stream.Transform({
  transform(chunk, encoding, callback) {
    const line = getTimestamp() + ' ' + String(chunk);
    callback(null, line);
  },
});

const [date] = new Date().toISOString().split('T');
const log = fs.createWriteStream(`./${date}.log`);
const stdout = stream.compose(addTimestamp, log);
const stderr = stream.compose(shortenPath, stdout);

const console = new Console({ stdout, stderr });

try {
  console.log('Logging examle');
  console.table(Object.entries(log));
  const data = {};
  data.collUnknownMethod();
} catch (error) {
  console.error(error);
}
