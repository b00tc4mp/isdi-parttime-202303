require('dotenv').config();

const {
  errors: { ContentError, ExistenceError },
} = require('com');

const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const { expect } = require('chai');
const retrieveUser = require('../../logic/retrieveUser');
const { cleanUp, generate, populate } = require('../helpers');

describe('retrieveUser', () => {
  before(() => mongoose.connect(process.env.MONGODB_URL));

  const anyId = new ObjectId();

  let user;

  beforeEach(() => {
    user = generate.user();

    return cleanUp().then(() => populate([user]));
  });

  it('succeeds on existing user and correct id', () => {
    return retrieveUser(user._id.toString()).then((retrievedUser) => {
      expect(retrievedUser).to.exist;
      expect(retrievedUser.name).to.equal(user.name);
      expect(retrievedUser.email).to.equal(user.email);
      expect(retrievedUser.avatar).to.be.null;
      expect(retrievedUser.password).to.be.undefined;
      expect(retrievedUser.favourites).to.be.undefined;
    });
  });

  it('fails on existing user and incorrect id', () => {
    return retrieveUser(anyId.toString()).catch((error) => {
      expect(error).to.be.an.instanceOf(ExistenceError);
      expect(error.message).to.equal('user not exists');
    });
  });

  it('fails on empty id', () => {
    expect(() => retrieveUser('')).to.throw(ContentError, 'user id is empty');
  });

  after(() => cleanUp().then(() => mongoose.disconnect()));
});
