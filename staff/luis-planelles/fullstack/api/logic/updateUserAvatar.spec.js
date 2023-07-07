require('dotenv').config();

const { expect } = require('chai');
const { cleanUp, populate, generate } = require('./helpers/tests');
const { MongoClient, ObjectId } = require('mongodb');
const context = require('./context');
const updateUserAvatar = require('./updateUserAvatar.js');

describe('updateUserAvatar', () => {
  let client;

  before(() => {
    client = new MongoClient(process.env.MONGODB_URL);

    return client.connect().then((connection) => {
      const db = connection.db();

      context.users = db.collection('users');
      context.posts = db.collection('posts');
    });
  });

  const anyId = new ObjectId().toString();

  let user, newAvatar;

  beforeEach(() => {
    user = generate.user();
    post = generate.post();

    newAvatar = `new-avatar-${Math.random()}url.com`;

    return cleanUp().then(() => populate([user], [post]));
  });

  it('succeeds on existing user and correct new avatar', () => {
    return updateUserAvatar(user._id.toString(), newAvatar)
      .then(() => context.users.findOne())
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

  after(() => cleanUp().then(() => client.close()));
});
