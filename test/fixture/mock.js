'use strict';

var nock = require('nock');

module.exports = mock;

const sampleLorem = {
  id: 'a9ba2379-ae7a-4cbf-b3a8-284d7aa54a6e',
  name: 'Ipsum',
  createdAt: '2016-03-04T05:06:07.123Z',
  updatedAt: '2016-03-04T05:06:07.123Z'
};

const sampleLoremNew = {
  id: '45aa0c6a-ca94-41db-ba15-b8e4c3b98646',
  name: 'Dolor',
  createdAt: '2016-03-04T05:06:07.123Z',
  updatedAt: '2016-03-04T05:06:07.123Z'
};

const sampleChildNew = {
  id: '1',
  name: 'Child'
};

function mock(host, options) {

  return nock(host, options)

  // Ping.
  .get('')
    .reply(200)

  .get('/')
    .reply(200)

  .get('/ping')
    .reply(200)

  .get('/ping/pong')
    .reply(200)

  .get('/ping/')
    .reply(200)

  .get('/ping/pong/')
    .reply(200)

  // POST.
  .post('/lorems/', { name: 'Dolor' })
    .matchHeader('X-MOCK-LOREM', '200')
    .reply(200, sampleLoremNew)

  .post('/lorems/', { name: 'Dolor' })
    .matchHeader('X-MOCK-LOREM', '409')
    .reply(409, { 'error': { 'statusCode': 409, 'code': 40900, 'message': '...' } })

  .post('/lorems/', { name: 'Dolor' })
    .matchHeader('X-MOCK-LOREM', '500')
    .reply(500)

  // GET.
  .get(`/lorems/${sampleLorem.id}`)
    .matchHeader('X-MOCK-LOREM', '200')
    .reply(200, sampleLorem)

  .get(`/lorems/${sampleLorem.id}`)
    .matchHeader('X-MOCK-LOREM', '404')
    .reply(404, { 'error': { 'statusCode': 404, 'code': 40400, 'message': '...' } })

  .get(`/lorems/${sampleLorem.id}`)
    .matchHeader('X-MOCK-LOREM', '500')
    .reply(500)

  // PUT.
  .put(`/lorems/${sampleLorem.id}`, { name: 'Dolor' })
    .matchHeader('X-MOCK-LOREM', '200')
    .reply(200, Object.assign({}, sampleLorem, { name: 'Dolor' }))

  .put(`/lorems/${sampleLorem.id}`, { name: 'Dolor' })
    .matchHeader('X-MOCK-LOREM', '404')
    .reply(404, { 'error': { 'statusCode': 404, 'code': 40400, 'message': '...' } })

  .put(`/lorems/${sampleLorem.id}`, { name: 'Dolor' })
    .matchHeader('X-MOCK-LOREM', '500')
    .reply(500)

  // PATCH.
  .patch(`/lorems/${sampleLorem.id}`, { name: 'Dolor' })
    .matchHeader('X-MOCK-LOREM', '200')
    .reply(200, Object.assign({}, sampleLorem, { name: 'Dolor' }))

  .patch(`/lorems/${sampleLorem.id}`, { name: 'Dolor' })
    .matchHeader('X-MOCK-LOREM', '404')
    .reply(404, { 'error': { 'statusCode': 404, 'code': 40400, 'message': '...' } })

  .patch(`/lorems/${sampleLorem.id}`, { name: 'Dolor' })
    .matchHeader('X-MOCK-LOREM', '500')
    .reply(500)

  // DELETE.
  .delete(`/lorems/${sampleLorem.id}`)
    .matchHeader('X-MOCK-LOREM', '204')
    .reply(204)

  .delete(`/lorems/${sampleLorem.id}`)
    .matchHeader('X-MOCK-LOREM', '404')
    .reply(404, { 'error': { 'statusCode': 404, 'code': 40400, 'message': '...' } })

  .delete(`/lorems/${sampleLorem.id}`)
    .matchHeader('X-MOCK-LOREM', '500')
    .reply(500)

  // POST to a child.
  .post(`/lorems/${sampleLorem.id}/child`, { name: 'Child' })
    .matchHeader('X-MOCK-LOREM', '200')
    .reply(200, sampleChildNew)

  .post(`/lorems/${sampleLorem.id}/child`, { name: 'Child' })
    .matchHeader('X-MOCK-LOREM', '409')
    .reply(409, { 'error': { 'statusCode': 409, 'code': 40900, 'message': '...' } })

  .post(`/lorems/${sampleLorem.id}/child`, { name: 'Child' })
    .matchHeader('X-MOCK-LOREM', '500')
    .reply(500)

  // GET with query string.
  .get('/lorems/')
    .matchHeader('X-MOCK-LOREM', '200')
    .query({ name: 'Ipsum' })
    .reply(200, sampleLorem)

  .get('/lorems/')
    .matchHeader('X-MOCK-LOREM', '404')
    .query({ name: 'Ipsum' })
    .reply(404, { 'error': { 'statusCode': 404, 'code': 40400, 'message': '...' } })

  .get('/lorems/')
    .matchHeader('X-MOCK-LOREM', '500')
    .query({ name: 'Ipsum' })
    .reply(500)

  .persist();

};
