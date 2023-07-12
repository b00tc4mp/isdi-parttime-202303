require('dotenv').config();

const {
  errors: { ContentError },
} = require('com');

const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const { expect } = require('chai');
const retrieveUser = require('./retrieveUser.js');
const { cleanUp, generate, populate } = require('./helpers/tests');

describe('retrieveUser', () => {
  before(() => {
    return mongoose.connect(process.env.MONGODB_URL);
  });

  const anyId = new ObjectId();

  let user;

  beforeEach(() => {
    user = generate.user();

    return cleanUp().then(() => populate([user], []));
  });

  it('succeeds on existing user and correct id', () => {
    return retrieveUser(user._id.toString()).then((retrievedUser) => {
      expect(retrievedUser).to.exist;
      expect(retrievedUser.name).to.equal(user.name);
      expect(retrievedUser.email).to.equal(user.email);
      expect(retrievedUser.avatar).to.be.null;
    });
  });

  it('fails on existing user and incorrect id', () => {
    return retrieveUser(anyId.toString()).catch((error) => {
      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.equal('user not exists');
    });
  });

  it('fails on empty id', () => {
    expect(() => retrieveUser('')).to.throw(Error, 'user id is empty');
  });

  after(() => cleanUp().then(() => mongoose.disconnect()));
});
