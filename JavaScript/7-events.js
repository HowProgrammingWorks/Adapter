'use strict';

const { EventEmitter } = require('events');

class AdaptiveEmitter extends EventEmitter {
  constructor() {
    super();
    this.transformations = {};
  }

  transform(from, to, fn) {
    this.transformations[from] = { to, fn };
  }

  emit(name, ...args) {
    const transform = this.transformations[name];
    if (transform) {
      super.emit(transform.to, ...transform.fn(...args));
    }
    super.emit(name, ...args);
  }
}

// Usage

const ae = new AdaptiveEmitter();
ae.transform('timer', 'timeout', date => [date.toLocaleString()]);

ae.on('timeout', date => {
  console.dir({ date });
});

setTimeout(() => {
  const date = new Date();
  console.log('new Date():', date);
  ae.emit('timer', date);
}, 1000);
