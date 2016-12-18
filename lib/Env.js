'use strict';

const dotProp = require('dot-prop');

/**
 * Minimal configuration class, compatible with most of the config modules out there like `express`,
 * `zero-config` etc.
 */
module.exports = class Env {

  constructor(options) {
    if (options == null) {
      options = {};
    }
    this.settings = Object.assign({}, options);
  }

  get(key) {
    return dotProp.get(this.settings, key);
  }

  set(key, val) {
    return dotProp.set(this.settings, key, val);
  }

};
