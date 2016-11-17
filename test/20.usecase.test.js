'use strict';

require('should');
const nock = require('nock');
const request = require('request');

const Env = require('../lib/Env');

const Lorem = require('./fixture/Lorem');
const mock = require('./fixture/mock');
const host = 'http://localhost/api';

describe('Common REST CRUD', () => {

  const env = new Env();
  const lorem = new Lorem({
    baseUrl: host,
    env: env
  });

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

  it('can post', () => {
    env.set('X-MOCK-LOREM', 200);
    return lorem.post({ name: 'Dolor' }).spread((res, body) => {
      res.should.be.Object();
      res.should.have.property('statusCode', 200);
      body.should.be.Object();
      body.should.have.property('id', '45aa0c6a-ca94-41db-ba15-b8e4c3b98646');
      body.should.have.property('name', 'Dolor');
    });
  });

  it('can post', () => {
    env.set('X-MOCK-LOREM', 409);
    return lorem.post({ name: 'Dolor' }).then(() => {
      throw new Error('expected an error');
    }, (err) => {
      err.should.be.Error();
      err.should.have.property('statusCode', 409);
      err.should.have.property('code', 40900);
    });
  });

  it('can post', () => {
    env.set('X-MOCK-LOREM', 500);
    return lorem.post({ name: 'Dolor' }).then(() => {
      throw new Error('expected an error');
    }, (err) => {
      err.should.be.Error();
      err.should.have.property('statusCode', 500);
    });
  });

  it('can get', () => {
    env.set('X-MOCK-LOREM', 200);
    return lorem.get('a9ba2379-ae7a-4cbf-b3a8-284d7aa54a6e').spread((res, body) => {
      res.should.be.Object();
      res.should.have.property('statusCode', 200);
      body.should.be.Object();
      body.should.have.property('id', 'a9ba2379-ae7a-4cbf-b3a8-284d7aa54a6e');
      body.should.have.property('name', 'Ipsum');
    });
  });

  it('can get', () => {
    env.set('X-MOCK-LOREM', 404);
    return lorem.get('a9ba2379-ae7a-4cbf-b3a8-284d7aa54a6e').then(() => {
      throw new Error('expected an error');
    }, (err) => {
      err.should.be.Error();
      err.should.have.property('statusCode', 404);
      err.should.have.property('code', 40400);
    });
  });

  it('can get', () => {
    env.set('X-MOCK-LOREM', 500);
    return lorem.get('a9ba2379-ae7a-4cbf-b3a8-284d7aa54a6e').then(() => {
      throw new Error('expected an error');
    }, (err) => {
      err.should.be.Error();
      err.should.have.property('statusCode', 500);
    });
  });

  it('can put', () => {
    env.set('X-MOCK-LOREM', 200);
    return lorem.put('a9ba2379-ae7a-4cbf-b3a8-284d7aa54a6e', { name: 'Dolor' }).spread((res, body) => {
      res.should.be.Object();
      res.should.have.property('statusCode', 200);
      body.should.be.Object();
      body.should.have.property('id', 'a9ba2379-ae7a-4cbf-b3a8-284d7aa54a6e');
      body.should.have.property('name', 'Dolor');
    });
  });

  it('can put', () => {
    env.set('X-MOCK-LOREM', 404);
    return lorem.put('a9ba2379-ae7a-4cbf-b3a8-284d7aa54a6e', { name: 'Dolor' }).then(() => {
      throw new Error('expected an error');
    }, (err) => {
      err.should.be.Error();
      err.should.have.property('statusCode', 404);
      err.should.have.property('code', 40400);
    });
  });

  it('can put', () => {
    env.set('X-MOCK-LOREM', 500);
    return lorem.put('a9ba2379-ae7a-4cbf-b3a8-284d7aa54a6e', { name: 'Dolor' }).then(() => {
      throw new Error('expected an error');
    }, (err) => {
      err.should.be.Error();
      err.should.have.property('statusCode', 500);
    });
  });

  it('can delete', () => {
    env.set('X-MOCK-LOREM', 204);
    return lorem.delete('a9ba2379-ae7a-4cbf-b3a8-284d7aa54a6e').spread((res, body) => {
      res.should.be.Object();
      res.should.have.property('statusCode', 204);
    });
  });

  it('can delete', () => {
    env.set('X-MOCK-LOREM', 404);
    return lorem.delete('a9ba2379-ae7a-4cbf-b3a8-284d7aa54a6e').then(() => {
      throw new Error('expected an error');
    }, (err) => {
      err.should.be.Error();
      err.should.have.property('statusCode', 404);
      err.should.have.property('code', 40400);
    });
  });

  it('can delete', () => {
    env.set('X-MOCK-LOREM', 500);
    return lorem.delete('a9ba2379-ae7a-4cbf-b3a8-284d7aa54a6e').then(() => {
      throw new Error('expected an error');
    }, (err) => {
      err.should.be.Error();
      err.should.have.property('statusCode', 500);
    });
  });

  it('can post to a child path', () => {
    env.set('X-MOCK-LOREM', 200);
    return lorem.post('a9ba2379-ae7a-4cbf-b3a8-284d7aa54a6e/child', { name: 'Child' }).spread((res, body) => {
      res.should.be.Object();
      res.should.have.property('statusCode', 200);
      body.should.be.Object();
      body.should.have.property('id', '1');
      body.should.have.property('name', 'Child');
    });
  });

  it('can post to a child path', () => {
    env.set('X-MOCK-LOREM', 409);
    return lorem.post('a9ba2379-ae7a-4cbf-b3a8-284d7aa54a6e/child', { name: 'Child' }).then(() => {
      throw new Error('expected an error');
    }, (err) => {
      err.should.be.Error();
      err.should.have.property('statusCode', 409);
      err.should.have.property('code', 40900);
    });
  });

  it('can post to a child path', () => {
    env.set('X-MOCK-LOREM', 500);
    return lorem.post('a9ba2379-ae7a-4cbf-b3a8-284d7aa54a6e/child', { name: 'Child' }).then(() => {
      throw new Error('expected an error');
    }, (err) => {
      err.should.be.Error();
      err.should.have.property('statusCode', 500);
    });
  });

  it('can get with a query string', () => {
    env.set('X-MOCK-LOREM', 200);
    return lorem.get({ name: 'Ipsum' }).spread((res, body) => {
      res.should.be.Object();
      res.should.have.property('statusCode', 200);
      body.should.be.Object();
      body.should.have.property('id', 'a9ba2379-ae7a-4cbf-b3a8-284d7aa54a6e');
      body.should.have.property('name', 'Ipsum');
    });
  });

  it('can get with a query string', () => {
    env.set('X-MOCK-LOREM', 404);
    return lorem.get({ name: 'Ipsum' }).then(() => {
      throw new Error('expected an error');
    }, (err) => {
      err.should.be.Error();
      err.should.have.property('statusCode', 404);
      err.should.have.property('code', 40400);
    });
  });

  it('can get with a query string', () => {
    env.set('X-MOCK-LOREM', 500);
    return lorem.get({ name: 'Ipsum' }).then(() => {
      throw new Error('expected an error');
    }, (err) => {
      err.should.be.Error();
      err.should.have.property('statusCode', 500);
    });
  });

  it('can get with a query string', () => {
    env.set('X-MOCK-LOREM', 200);
    return lorem.get({ name: 'Ipsum' }).spread((res, body) => {
      res.should.be.Object();
      res.should.have.property('statusCode', 200);
      body.should.be.Object();
      body.should.have.property('id', 'a9ba2379-ae7a-4cbf-b3a8-284d7aa54a6e');
      body.should.have.property('name', 'Ipsum');
    });
  });

  it('can get with a query string', () => {
    env.set('X-MOCK-LOREM', 404);
    return lorem.get({ name: 'Ipsum' }).then(() => {
      throw new Error('expected an error');
    }, (err) => {
      err.should.be.Error();
      err.should.have.property('statusCode', 404);
      err.should.have.property('code', 40400);
    });
  });

  it('can get with a query string', () => {
    env.set('X-MOCK-LOREM', 500);
    return lorem.get({ name: 'Ipsum' }).then(() => {
      throw new Error('expected an error');
    }, (err) => {
      err.should.be.Error();
      err.should.have.property('statusCode', 500);
    });
  });

});
