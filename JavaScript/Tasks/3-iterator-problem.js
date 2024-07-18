'use strict';

// Task: In usage section we have 3 blocks of code (in iife wrappers)
// with async iterators generated from single `Timer` instance.
// The prombem is: first and second blocks does not iterate,
// just last one works as of now. Fix this to allow all blocks iterate
// in parallel.

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

  (async () => {
    console.log('Section 1 start');
    for await (const step of timer) {
      console.log({ section: 1, step });
    }
  })();

  (async () => {
    console.log('Section 2 start');
    const iter = timer[Symbol.asyncIterator]();
    do {
      const { value, done } = await iter.next();
      console.log({ section: 2, step: value, done });
    } while (true);
  })();

  (async () => {
    console.log('Section 3 start');
    const iter = timer[Symbol.asyncIterator]();
    do {
      const { value, done } = await iter.next();
      console.log({ section: 3, step: value, done });
    } while (true);
  })();
};

main();
