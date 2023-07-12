require('dotenv').config();

const { expect } = require('chai');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const updateUserAvatar = require('./updateUserAvatar.js');
const { cleanUp, populate, generate } = require('./helpers/tests');
const { User } = require('../data/models');

describe('updateUserAvatar', () => {
  before(() => {
    mongoose.connect(process.env.MONGODB_URL);
  });

  const anyId = new ObjectId().toString();

  let user, newAvatar;

  beforeEach(() => {
    user = generate.user();

    newAvatar = `new-avatar-${Math.random()}url.com`;

    return cleanUp().then(() => populate([user], []));
  });

  it('succeeds on existing user and correct new avatar', () => {
    return updateUserAvatar(user._id.toString(), newAvatar)
      .then(() => User.findOne())
      .then((user) => {
        expect(user.avatar).to.equal(newAvatar);
      });
  });

  it('fails on non-existing user', () => {
    return updateUserAvatar(anyId, newAvatar).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${anyId} not exists`);
    });
  });

  it('fails on empty id', () =>
    expect(() => updateUserAvatar('', newAvatar)).to.throw(
      Error,
      'userId is empty'
    ));

  it('fails on empty avatar', () =>
    expect(() => updateUserAvatar(anyId, '')).to.throw(
      Error,
      'avatar is empty'
    ));

  it('throws an error for non-string avatar', () => {
    expect(() => updateUserAvatar(anyId, undefined)).to.throw(
      Error,
      'avatar is not a string'
    );
    expect(() => updateUserAvatar(anyId, 1)).to.throw(
      Error,
      'avatar is not a string'
    );
    expect(() => updateUserAvatar(anyId, true)).to.throw(
      Error,
      'avatar is not a string'
    );
    expect(() => updateUserAvatar(anyId, {})).to.throw(
      Error,
      'avatar is not a string'
    );
    expect(() => updateUserAvatar(anyId, [])).to.throw(
      Error,
      'avatar is not a string'
    );
  });

  after(() => cleanUp().then(() => mongoose.disconnect()));
});
