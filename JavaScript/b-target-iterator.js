'use strict';

class TargetIterator {
  #target = null;

  constructor(target) {
    this.#target = target;
  }

  [Symbol.asyncIterator]() {
    const next = () => new Promise((resolve) => {
      const listener = (event) => {
        this.#target.removeEventListener('step', listener);
        resolve({
          value: event.detail,
          done: false,
        });
      };
      this.#target.addEventListener('step', listener);
    });
    const iterator = { next };
    return iterator;
  }
}

// Usage

const main = async () => {
  const target = new EventTarget();
  const iterator = new TargetIterator(target);

  let counter = 0;
  setInterval(() => {
    counter++;
    const data = { detail: { counter } };
    const event = new CustomEvent('step', data);
    target.dispatchEvent(event);
  }, 1000);

  for await (const step of iterator) {
    console.log(step);
  }
};

main();
