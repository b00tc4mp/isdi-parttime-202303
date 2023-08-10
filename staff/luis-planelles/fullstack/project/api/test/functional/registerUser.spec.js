require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');

const registerUser = require('../../logic/registerUser');
const { cleanUp, generate } = require('../helpers');
const { User } = require('../../data/models');

describe('registerUser', () => {
  before(() => mongoose.connect(process.env.MONGODB_URL));

  let user;

  beforeEach(() => {
    user = generate.user();

    return cleanUp();
  });

  it('succeeds on new user', () => {
    return User.findOne()
      .then((users) => {
        expect(users).to.be.null;
      })
      .then(() => registerUser(user.name, user.email, user.password))
      .then(() => User.findOne())
      .then((foundUser) => {
        expect(foundUser).to.exist;
        expect(foundUser.name).to.equal(user.name);
        expect(foundUser.email).to.equal(user.email);
        expect(foundUser.password).to.equal(user.password);
        expect(foundUser.avatar).to.be.null;
      })
      .then(() => User.find())
      .then((users) => {
        expect(users).to.have.length(1);
      });
  });

  after(() => cleanUp().then(() => mongoose.disconnect()));
});
