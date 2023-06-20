const { expect } = require('chai');
const request = require('supertest');
const { cleanUp } = require('./helpers/test');
const api = require('../index');

describe('API endpoints tests', () => {
  it('should return a successful response for GET /', (done) => {
    request(api)
      .get('/')
      .expect(200)
      .end((error, res) => {
        if (error) {
          done(error);

          return;
        }

        expect(res.text).to.equal('Hello, API!');

        done();
      });
  });

  after(cleanUp);
});
