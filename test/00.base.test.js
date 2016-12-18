'use strict';

require('should');
const nock = require('nock');
const request = require('request');

const Base = require('../lib/Base');

const mock = require('./fixture/mock');
const host = 'http://localhost/api';

describe('The Base class', () => {

  before(() => {
    nock.cleanAll();
    mock(host);
  });

  after(() => {
    nock.cleanAll();
  });

  it('confirms the mock is there', (done) => {
    request.get(host, (err, res, body) => {
      if (err) {
        return done(err);
      }
      res.should.have.property('statusCode', 200);
      done();
    });
  });

  it('should require base URL', () => {
    (() => {
      new Base();
    }).should.throw(/base URL/);
  });

  it('should require base URL', () => {
    (() => {
      new Base('');
    }).should.throw(/base URL/);
  });

  it('should require base URL', () => {
    (() => {
      new Base({ baseUrl: '' });
    }).should.throw(/base URL/);
  });

  it('should work with a base URL', () => {
    const base = new Base(host);
    return base.api.get().request().spread((res, body) => {
      res.should.be.Object();
      res.should.have.property('statusCode', 200);
    });
  });

  it('should work with a base URL', () => {
    const base = new Base(host + '/');
    return base.api.get().request().spread((res, body) => {
      res.should.be.Object();
      res.should.have.property('statusCode', 200);
    });
  });

  it('should work with a base URL', (done) => {
    const base = new Base(host);
    return base.rawApi.get().request((err, res, body) => {
      if (err) {
        return done(err);
      }
      res.should.be.Object();
      res.should.have.property('statusCode', 200);
      done();
    });
  });

  it('should work with a base URL', (done) => {
    const base = new Base(host + '/');
    return base.rawApi.get().request((err, res, body) => {
      if (err) {
        return done(err);
      }
      res.should.be.Object();
      res.should.have.property('statusCode', 200);
      done();
    });
  });

});
