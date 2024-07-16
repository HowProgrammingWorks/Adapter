'use strict';

class ArrayToQueueAdapter {
  #array = null;

  constructor(array) {
    if (!Array.isArray(array)) {
      throw new Error('Array instance expected');
    }
    this.#array = array;
  }

  enqueue(data) {
    this.#array.push(data);
  }

  dequeue() {
    return this.#array.pop();
  }

  get count() {
    return this.#array.length;
  }
}

// Usage

const queue = new ArrayToQueueAdapter([]);
queue.enqueue('uno');
queue.enqueue('due');
queue.enqueue('tre');
while (queue.count) {
  console.log(queue.dequeue());
}
