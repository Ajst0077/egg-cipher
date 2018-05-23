'use strict';

const mock = require('egg-mock');

describe('test/cipher.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/cipher-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, cipher')
      .expect(200);
  });
});
