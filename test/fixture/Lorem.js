'use strict'

const lib = require('../../');
const Rest = lib.Rest;

module.exports = class Lorem extends Rest {

  get rootPath() {
    return 'lorems';
  }

  preRequest(options) {
    const mockLorem = this.env.get('X-MOCK-LOREM');
    if (mockLorem) {
      options.headers['X-MOCK-LOREM'] = mockLorem;
    }
  }

};
