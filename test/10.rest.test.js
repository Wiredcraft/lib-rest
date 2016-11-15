'use strict';

require('should');
const nock = require('nock');
const request = require('request');

const Rest = require('../lib/Rest');

const mock = require('./fixture/mock');
const host = 'http://localhost/api';

describe('The Rest class', () => {

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
      new Rest();
    }).should.throw(/base URL/);
  });

  it('should require a root path', () => {
    (() => {
      new Rest(host);
    }).should.throw(/root path/);
  });

  it('should require a root path', () => {
    (() => {
      new Rest({ baseUrl: host });
    }).should.throw(/root path/);
  });

  it('should work with a root path', () => {
    const base = new Rest({ baseUrl: host, rootPath: 'ping' });
    return base.api.get().request().spread((res, body) => {
      res.should.be.Object();
      res.should.have.property('statusCode', 200);
    });
  });

  it('should work with a root path', () => {
    const base = new Rest({ baseUrl: host, rootPath: '/ping' });
    return base.api.get().request().spread((res, body) => {
      res.should.be.Object();
      res.should.have.property('statusCode', 200);
    });
  });

  it('should work with a root path', () => {
    const base = new Rest({ baseUrl: host, rootPath: 'ping/' });
    return base.api.get().request().spread((res, body) => {
      res.should.be.Object();
      res.should.have.property('statusCode', 200);
    });
  });

  it('should work with a root path', () => {
    const base = new Rest({ baseUrl: host, rootPath: '/ping/' });
    return base.api.get().request().spread((res, body) => {
      res.should.be.Object();
      res.should.have.property('statusCode', 200);
    });
  });

  it('should work with a root path', () => {
    const base = new Rest({ baseUrl: host, rootPath: 'ping/pong' });
    return base.api.get().request().spread((res, body) => {
      res.should.be.Object();
      res.should.have.property('statusCode', 200);
    });
  });

  it('should work with a root path', () => {
    const base = new Rest({ baseUrl: host, rootPath: '/ping/pong' });
    return base.api.get().request().spread((res, body) => {
      res.should.be.Object();
      res.should.have.property('statusCode', 200);
    });
  });

  it('should work with a root path', () => {
    const base = new Rest({ baseUrl: host, rootPath: 'ping/pong/' });
    return base.api.get().request().spread((res, body) => {
      res.should.be.Object();
      res.should.have.property('statusCode', 200);
    });
  });

  it('should work with a root path', () => {
    const base = new Rest({ baseUrl: host, rootPath: '/ping/pong/' });
    return base.api.get().request().spread((res, body) => {
      res.should.be.Object();
      res.should.have.property('statusCode', 200);
    });
  });

});
