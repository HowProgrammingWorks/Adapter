'use strict';

const arrayToQueueAdapter = arr => ({
  enqueue(data) {
    arr.push(data);
  },

  dequeue() {
    return arr.pop();
  },

  get count() {
    return arr.length;
  }
});

// Usage

const queue = arrayToQueueAdapter([]);
queue.enqueue('uno');
queue.enqueue('due');
queue.enqueue('tre');
while (queue.count) {
  console.log(queue.dequeue());
}
