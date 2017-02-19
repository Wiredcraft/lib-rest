'use strict';

const Base = require('./Base');

/**
 * Common REST CRUD.
 */
module.exports = class Rest extends Base {

  constructor(options) {
    super(options);
    // A root path is required, can be from options or the class/instance.
    if (typeof options.rootPath === 'string') {
      this.rootPath = options.rootPath.replace(/^(\/+)|(\/+)$/g, '');
    }
    if (this.rootPath == null) {
      throw new Error('A root path is required');
    }
    // Config of the path for Purest.
    this.config[`${this.rootPath}/{endpoint}`] = {
      __path: {
        alias: this.rootPath
      }
    };
  }

  post(key, json) {
    if (json == null && typeof key === 'object') {
      json = key;
      key = '';
    }
    return this.query(this.rootPath).post(key).json(json).request().spread(this.errHandler);
  }

  get(key, qs) {
    if (qs == null && typeof key === 'object') {
      qs = key;
      key = '';
    }
    return this.query(this.rootPath).get(key).qs(qs).request().spread(this.errHandler);
  }

  put(key, json) {
    return this.query(this.rootPath).put(key).json(json).request().spread(this.errHandler);
  }

  patch(key, json) {
    return this.query(this.rootPath).patch(key).json(json).request().spread(this.errHandler);
  }

  delete(key) {
    return this.query(this.rootPath).delete(key).request().spread(this.errHandler);
  }

};
