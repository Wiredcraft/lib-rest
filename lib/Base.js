'use strict'

const purest = require('purest');
const request = require('request');
const Promise = require('bluebird');

const Env = require('./Env');

/**
 * Common HTTP request.
 *
 * Bear in mind that this class (also the instances) is stateless, and so should all the inherited
 * classes.
 */
module.exports = class Base {

  constructor(options) {
    if (typeof options !== 'object') {
      options = { baseUrl: options };
    }
    if (typeof options.baseUrl !== 'string' || options.baseUrl.length === 0) {
      throw new Error('A base URL is required');
    }
    this.baseUrl = options.baseUrl.replace(/(\/+)$/, '');

    // The environment.
    this.env = options.env || new Env();

    // The lib.
    this.purest = purest({ request: this.request.bind(this), promise: Promise });

    // Doesn't really matter.
    this.provider = 'api';

    // The defaults.
    this.defaults = Object.assign({
      json: true,
      timeout: parseInt(options.timeout, 10) || 10000,
      headers: {}
    }, options.defaults || {});

    // Base config.
    this.config = {
      '{endpoint}': {
        __path: {
          alias: '__default'
        }
      }
    };
  }

  /**
   * Simple wrap to allow runtime modifications.
   */
  request() {
    if (typeof this.preRequest === 'function') {
      this.preRequest.apply(this, arguments);
    }
    return request.apply(this, arguments);
  }

  /**
   * Build on first use.
   */
  get api() {
    if (this._api != null) {
      return this._api;
    }
    this._api = this.purest({
      // Only the Chain API.
      api: 'chain',
      config: {
        [this.provider]: {
          [this.baseUrl]: this.config
        }
      },
      provider: this.provider,
      defaults: this.defaults
    });
    return this._api;
  }

  /**
   * Shortcut.
   */
  query(alias) {
    return this.api.query(alias);
  }

};
