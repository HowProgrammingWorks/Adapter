'use strict';

const MOCK_DATASET = [
  { name: 'Rome', population: 2761632, country: 10, type: 1 },
  { name: 'Milan', population: 1371498, country: 10, type: 1 },
  { name: 'Naples', population: 914758, country: 10, type: 1 },
  { name: 'Turin', population: 848885, country: 10, type: 1 },
  { name: 'Palermo', population: 630828, country: 10, type: 1 },
  { name: 'Genoa', population: 560688, country: 10, type: 1 },
  { name: 'Bologna', population: 392203, country: 10, type: 1 },
  { name: 'Florence', population: 367150, country: 10, type: 1 },
  { name: 'Bari', population: 316140, country: 10, type: 1 },
  { name: 'Catania', population: 298324, country: 10, type: 1 },
];

const MOCK_TIMEOUT = 1000;

class Query {
  constructor(table) {
    this.options = { table, fields: ['*'], where: {} };
  }

  where(conditions) {
    Object.assign(this.options.where, conditions);
    return this;
  }

  order(field) {
    this.options.order = field;
    return this;
  }

  limit(count) {
    this.options.limit = count;
    return this;
  }

  then(resolve) {
    const { table, fields, where, limit, order } = this.options;
    const cond = Object.entries(where).map((e) => e.join('=')).join(' AND ');
    const sql = `SELECT ${fields} FROM ${table} WHERE ${cond}`;
    const opt = `ORDER BY ${order} LIMIT ${limit}`;
    const query = sql + ' ' + opt;
    return new Promise((fulfill) => {
      setTimeout(() => {
        const result = { query, dataset: MOCK_DATASET };
        fulfill(resolve(result));
      }, MOCK_TIMEOUT);
    });
  }
}

// Usage

(async () => {

  const cities = await new Query('cities')
    .where({ country: 10, type: 1 })
    .order('population')
    .limit(10)
    .then((result) => {
      const projection = new Map();
      for (const record of result.dataset) {
        const { name, population } = record;
        projection.set(name, population);
      }
      return projection;
    });

  console.log(cities);

})();
