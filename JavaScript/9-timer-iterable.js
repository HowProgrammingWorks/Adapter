'use strict';

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
  for await (const step of timer) {
    console.log({ step });
  }
};

main();
