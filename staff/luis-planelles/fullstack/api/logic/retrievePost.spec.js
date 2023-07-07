require('dotenv').config();

const { expect } = require('chai');
const retrievePost = require('./retrievePost');
const { cleanUp, populate, generate } = require('./helpers/tests');
const { ObjectId, MongoClient } = require('mongodb');
const sinon = require('sinon');
const context = require('./context');

describe('retrievePost', () => {
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

  let user, post;

  beforeEach(() => {
    user = generate.user();
    post = generate.post();

    return cleanUp().then(() => populate([user], [post]));
  });

  it('succeeds on existing user and post', () => {
    const date = new Date();
    const fakeDate = sinon.useFakeTimers(date.getTime());

    return retrievePost(user._id.toString(), post._id.toString()).then(
      (retrievedPost) => {
        expect(retrievedPost._id.toString()).to.equal(post._id.toString());
        expect(retrievedPost.text).to.equal(post.text);
        expect(retrievedPost.date.toISOString()).to.equal(
          post.date.toISOString()
        );
        expect(retrievedPost.image).to.equal(post.image);

        fakeDate.restore();
      }
    );
  });

  it('fails when user not exists', () => {
    return retrievePost(anyId, post._id.toString()).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${anyId} not exists`);
    });
  });

  it('fails when post not exists', () => {
    return retrievePost(user._id.toString(), anyId).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`post with id ${anyId} not exists`);
    });
  });

  it('fails on empty user id', () =>
    expect(() => retrievePost('', anyId)).to.throw(Error, 'user id is empty'));

  it('fails on empty post id', () =>
    expect(() => retrievePost(anyId, '')).to.throw(Error, 'post id is empty'));

  after(() =>
    cleanUp()
      .then(() => client.close())
      .then(console.log('close'))
  );
});
