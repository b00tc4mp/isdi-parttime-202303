require('dotenv').config();

const { expect } = require('chai');

describe('API routes', () => {
  const baseURL = `http://localhost:${process.env.PORT}`;

  it('should return a successful response for Hello API GET /', async () => {
    const res = await fetch(baseURL + '/');
    const resBody = await res.text();

    expect(res.status).to.equal(200);
    expect(resBody).to.equal('Hello, Space Monkey.v1!');
  });
});
