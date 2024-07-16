'use strict';

const arrayToQueueAdapter = (array) => ({
  enqueue(data) {
    array.push(data);
  },

  dequeue() {
    return array.pop();
  },

  get count() {
    return array.length;
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
