'use strict';

// Task: implement ability to use Timer in multiple places
// In usage section we have 3 sections with async iterators
// generated from single timer, just last sections iterates
// as of now. Fix this to allow all sections to iterate

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
