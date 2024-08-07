'use strict';

// Interface adapter: fs to Map

class HashMap {
  constructor(fs, path) {
    this.fs = fs;
    this.path = path;
    fs.mkdirSync(path);
  }

  set(key, value) {
    const name = this.path + key;
    const data = JSON.stringify(value);
    this.fs.writeFileSync(name, data, 'utf8');
  }

  get(key) {
    const name = this.path + key;
    const data = this.fs.readFileSync(name, 'utf8');
    return JSON.parse(data);
  }

  has(key) {
    return this.fs.existsSync(this.path + key);
  }

  delete(key) {
    this.fs.unlinkSync(this.path + key);
  }

  get size() {
    return this.keys().length;
  }

  keys() {
    return this.fs.readdirSync(this.path);
  }

  clear() {
    this.keys().forEach((file) => {
      this.delete(file);
    });
  }
}

// Usage

const fs = require('node:fs');
const dict = new HashMap(fs, './data/');
dict.set('name', 'Marcus');
dict.set('born', '121-04-26');
dict.set('city', 'Roma');
dict.set('position', 'Emperor');
dict.delete('city');
console.dir({
  name: dict.get('name'),
  size: dict.size,
  has: {
    name: dict.has('name'),
    city: dict.has('city'),
  },
  keys: dict.keys(),
});

//dict.clear();
