require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');

const cleanUp = require('../helpers/cleanUp');

describe('API routes', () => {
  before(() => mongoose.connect(process.env.MONGODB_URL));

  const baseURL = `http://localhost:${process.env.PORT}`;

  beforeEach(() => cleanUp());

  it('should return a successful response for Hello API GET /', async () => {
    const res = await fetch(baseURL + '/');
    const resBody = await res.text();

    expect(res.status).to.equal(200);
    expect(resBody).to.equal('Hello, Space Monkey.v1!');
  });

  it('should return a successful response for register user', async () => {
    let userJSON = {
      name: 'JohnDoe',
      email: 'johnDoe@email.com',
      password: 'Tes7@@@@',
    };

    const res = await fetch(baseURL + '/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userJSON),
    });

    expect(res.status).to.equal(201);
  });
  after(() => cleanUp().then(() => mongoose.disconnect()));
});
