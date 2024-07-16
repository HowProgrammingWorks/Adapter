'use strict';

const arrayToQueueAdapter = () => {
  const array = [];
  array.enqueue = (data) => array.push(data);
  array.dequeue = () => array.pop();
  array.count = () => array.length;
  return array;
};

// Usage

const queue = arrayToQueueAdapter();
queue.enqueue('uno');
queue.enqueue('due');
queue.enqueue('tre');
while (queue.count()) {
  console.log(queue.dequeue());
}
