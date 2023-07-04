require('dotenv').config();

const { expect } = require('chai'),
  retrieveUser = require('./retrieveUser.js'),
  { MongoClient } = require('mongodb'),
  { cleanUp, generate, populate } = require('./helpers/tests');
const context = require('./context.js');

describe('retrieveUser', () => {
  let client;

  before(() => {
    client = new MongoClient(process.env.MONGODB_URL);

    return client.connect().then((connection) => {
      const db = connection.db();

      context.users = db.collection('users');
      context.posts = db.collection('posts');
    });
  });

  let user;

  beforeEach(() => {
    user = generate.user();

    return cleanUp();
  });

  it('succeeds on existing user and correct id', () => {
    return populate([user], [])
      .then(() => context.users.findOne({ email: user.email }))
      .then((foundUser) => {
        const userIdString = foundUser._id.toString();
        return retrieveUser(userIdString);
      })
      .then((retrievedUser) => {
        expect(retrievedUser).to.exist;
        expect(retrievedUser.name).to.equal(user.name);
        expect(retrievedUser.email).to.equal(user.email);
        expect(retrievedUser.avatar).to.be.null;
      });
  });

  it('fails on existing user and incorrect id', () => {
    return populate([user], [])
      .then(() => context.users.findOne({ email: user.email }))
      .then((foundUser) => {
        const userIdString = foundUser._id.toString();
        const unmatchId = userIdString.replace(userIdString.charAt(0), '0');
        return retrieveUser(unmatchId);
      })
      .catch((error) => {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal('user not found');
      });
  });

  it('fails on empty id', () =>
    expect(() => retrieveUser('', () => {})).to.throw(
      Error,
      'user id is empty'
    ));

  after(() => cleanUp().then(() => client.close()));
});
