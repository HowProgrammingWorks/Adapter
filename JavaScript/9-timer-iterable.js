'use strict';

const { setTimeout } = require('node:timers/promises');

class Timer {
  #counter = 0;
  #resolve = null;

  constructor(delay) {
    setInterval(() => {
      this.#counter++;
      if (this.#resolve) {
        this.#resolve({
          value: this.#counter,
          done: false,
        });
      }
    }, delay);
  }

  [Symbol.asyncIterator]() {
    const next = () => new Promise((resolve) => {
      this.#resolve = resolve;
    });
    const iterator = { next };
    return iterator;
  }
}

// Usage

const main = async () => {
  const timer = new Timer(1000);

  {
    console.log('start 1');
    for await (const step of timer) {
      console.log({ for: 1, step });
    }
  }

  {
    console.log('start 2');
    const iter = timer[Symbol.asyncIterator]();
    do {
      console.log({ for: 2, iter });
      const { value, done } = await iter.next();
      console.log({ for: 2, step: value });
    } while (true);
  }

  {
    console.log('start 3');
    const iter = timer[Symbol.asyncIterator]();
    do {
      console.log({ for: 3, iter });
      const { value, done } = await iter.next();
      const a = await iter.next();
      console.log({ for: 3, step: value });
    } while (true);
  }
};

main();
