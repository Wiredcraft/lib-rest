'use strict';

const Base = require('./Base');
const errorHandler = require('./errorHandler');

/**
 * Common REST CRUD.
 */
module.exports = class Rest extends Base {

  constructor(options) {
    super(options);
    if (options.rootPath != null) {
      this.rootPath = options.rootPath.replace(/\/$/, '');
    }
    if (this.rootPath == null) {
      throw new Error('A root path is required');
    }
    this.config[`${this.rootPath}/{endpoint}`] = {
      __path: {
        alias: this.rootPath
      }
    };
    this.errHandler = options.errorHandler || errorHandler();
  }

  post(json) {
    return this.query(this.rootPath).post().json(json).request().spread(this.errHandler);
  }

  get(key) {
    return this.query(this.rootPath).get(key).request().spread(this.errHandler);
  }

  put(key, json) {
    return this.query(this.rootPath).put(key).json(json).request().spread(this.errHandler);
  }

  delete(key) {
    return this.query(this.rootPath).delete(key).request().spread(this.errHandler);
  }

};
