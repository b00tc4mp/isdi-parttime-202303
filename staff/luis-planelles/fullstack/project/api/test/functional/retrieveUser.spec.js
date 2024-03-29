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

  it('should raise ContentError if user id is empty', async () => {
    const emptyId = '';

    try {
      await retrieveUser(emptyId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id is empty');
    }
  });

  it('should raise TypeError if user id is not a string', async () => {
    const noStringId = 11;

    try {
      await retrieveUser(noStringId);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('user id is not a string');
    }
  });

  it('should raise ContentError if user id does not have 24 characters', async () => {
    const shortId = 'abc123';

    try {
      await retrieveUser(shortId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id does not have 24 characters');
    }
  });

  it('should raise ContentError if user id is not hexagecimal', async () => {
    const nonHexId = 'invalidValue123456789012';

    try {
      await retrieveUser(nonHexId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id is not hexagecimal');
    }
  });

  after(() => cleanUp().then(() => mongoose.disconnect()));
});
