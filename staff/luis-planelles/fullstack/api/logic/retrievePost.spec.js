require('dotenv').config();

const { expect } = require('chai');
const retrievePost = require('./retrievePost');
const { cleanUp, populate, generate } = require('./helpers/tests');
const sinon = require('sinon');
const { ObjectId, MongoClient } = require('mongodb');

describe('retrievePost', () => {
  let client;

  before(() => {
    client = new MongoClient(process.env.MONGODB_URL);

    return client.connect().then((connection) => {
      const db = connection.db();

      context.users = db.collection('users');
      context.posts = db.collection('posts');
    });
  });

  let user, post, anyId;

  beforeEach(() => {
    user = generate.user();

    anyId = new ObjectId().toString();

    return cleanUp();
  });

  it('succeeds on existing user and post', () => {
    return context.users
      .insertOne(user)
      .then(() => {
        post = generate.post(user._id);

        cleanUp();

        return populate([user], [post]);
      })
      .then(() => retrievePost(user._id.toString(), post._id.toString()))
      .then((retrievedPost) => {
        expect(retrievedPost.id).to.equal(post.id);
        expect(retrievedPost.author.toString()).to.equal(user._id.toString());
        expect(retrievedPost.text).to.equal(post.text);
        expect(retrievedPost.image).to.equal(post.image);
      });
  });

  it('fails when user not exists', () => {
    return populate([user], [post])
      .then(() => retrievePost(anyId, post._id.toString()))
      .catch((error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`user with id ${anyId} not exists`);
      });
  });

  it('fails when post not exists', () => {
    return populate([user], [post])
      .then(() => retrievePost(user._id.toString(), anyId))
      .catch((error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`post with id ${anyId} not exists`);
      });
  });

  it('fails on empty user id', () =>
    expect(() => retrievePost('', anyId)).to.throw(Error, 'user id is empty'));

  it('fails on empty post id', () =>
    expect(() => retrievePost(anyId, '')).to.throw(Error, 'post id is empty'));

  after(() => cleanUp().then(() => client.close()));
});
