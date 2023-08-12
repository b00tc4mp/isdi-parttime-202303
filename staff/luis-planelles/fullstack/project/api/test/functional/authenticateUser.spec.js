require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');

const { authenticateUser } = require('../../logic');
const { cleanUp, populate, generate } = require('../helpers');
const { User } = require('../../data/models');

describe('authenticateUser', () => {
  before(() => mongoose.connect(process.env.MONGODB_URL));

  let user;

  beforeEach(() => {
    user = generate.user();

    return cleanUp();
  });

  it('succeeds on existing user', () => {
    return populate([user], [])
      .then(() => authenticateUser(user.email, user.password))
      .then(() => User.findOne())
      .then((foundUser) => {
        expect(foundUser).to.exist;
        expect(foundUser.name).to.equal(user.name);
        expect(foundUser.email).to.equal(user.email);
        expect(foundUser.password).to.equal(user.password);
        expect(foundUser.avatar).to.be.null;
      });
  });
});
