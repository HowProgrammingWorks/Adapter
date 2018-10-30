'use strict';

const arrayToQueueAdapter = () => {
  const arr = [];
  arr.enqueue = data => arr.push(data);
  arr.dequeue = () => this.pop();
  arr.count = () => this.length;
};

// Usage

const queue = arrayToQueueAdapter();
queue.enqueue('uno');
queue.enqueue('due');
queue.enqueue('tre');
while (queue.count()) {
  console.log(queue.dequeue());
}
