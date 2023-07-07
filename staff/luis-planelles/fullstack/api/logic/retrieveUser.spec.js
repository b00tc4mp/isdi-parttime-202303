require('dotenv').config();

const { expect } = require('chai'),
  retrieveUser = require('./retrieveUser.js'),
  { MongoClient, ObjectId } = require('mongodb'),
  { cleanUp, generate, populate } = require('./helpers/tests');
const context = require('./context');

describe('retrieveUser', () => {
  let client;

  before(() => {
    client = new MongoClient(process.env.MONGODB_URL);

    return client
      .connect()
      .then((connection) => {
        const db = connection.db();

        context.users = db.collection('users');
        context.posts = db.collection('posts');
      })
      .then(console.log('open'));
  });

  const anyId = new ObjectId().toString();

  let user;

  beforeEach(() => {
    user = generate.user();
    post = generate.post();

    return cleanUp().then(() => populate([user], [post]));
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
    return retrieveUser(anyId).catch((error) => {
      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.equal('user not exists');
    });
  });

  it('fails on empty id', () =>
    expect(() => retrieveUser('', () => {})).to.throw(
      Error,
      'user id is empty'
    ));

  after(() =>
    cleanUp()
      .then(() => client.close())
      .then(console.log('close'))
  );
});
