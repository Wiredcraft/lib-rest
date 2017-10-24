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
    // Default config is already set.
    if (this.rootPath === '') {
      return;
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
    const query = this.rootPath === '' ? this.api : this.query(this.rootPath);
    return query.post(key).json(json).request().spread(this.errHandler);
  }

  get(key, qs) {
    if (qs == null && typeof key === 'object') {
      qs = key;
      key = '';
    }
    const query = this.rootPath === '' ? this.api : this.query(this.rootPath);
    return query.get(key).qs(qs).request().spread(this.errHandler);
  }

  put(key, json) {
    const query = this.rootPath === '' ? this.api : this.query(this.rootPath);
    return query.put(key).json(json).request().spread(this.errHandler);
  }

  patch(key, json) {
    const query = this.rootPath === '' ? this.api : this.query(this.rootPath);
    return query.patch(key).json(json).request().spread(this.errHandler);
  }

  delete(key) {
    const query = this.rootPath === '' ? this.api : this.query(this.rootPath);
    return query.delete(key).request().spread(this.errHandler);
  }

};
