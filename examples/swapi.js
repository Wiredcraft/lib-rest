'use strict';

const { Rest } = require('lib-rest');

class Swapi extends Rest {
  constructor(options) {
    super(options);
  }

  getFilms(id) {
    return this
      .get(`films/${id}`);    // return a Promise<[res, body]>
  }

  getPeople(id) {
    return this
      .get(`people/${id}`);   // return a Promise<[res, body]>
  }
}

/* using the class just created */

const swapi = new Swapi({
  baseUrl: 'http://swapi.co',
  rootPath: '/api'
});

const assert = require('assert');

swapi.getFilms(1)
  .get(1)         // bluebird utility to get the `body` only
  .then(res => {
    assert.equal(res.title, 'A New Hope');
    assert.equal(res.director, 'George Lucas');
  });

swapi.getPeople(3)
  .get(1)         // bluebird utility to get the `body` only
  .then(res => {
    assert.equal(res.name, 'R2-D2');
    assert.equal(res.gender, 'n/a');
  });
