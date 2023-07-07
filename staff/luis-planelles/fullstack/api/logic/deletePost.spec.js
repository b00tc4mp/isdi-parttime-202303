require('dotenv').config();

const { expect } = require('chai');
const deletePost = require('./deletePost');
const { cleanUp, populate, generate } = require('./helpers/tests');
const { MongoClient, ObjectId } = require('mongodb');
const context = require('./context');

describe('deletePost', () => {
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

    return cleanUp()
      .then(() => populate([user], [post]))
      .then(() =>
        context.posts.updateOne(
          { _id: post._id },
          { $set: { author: user._id } }
        )
      );
  });

  it('succeeds on existing user and post', () => {
    return deletePost(user._id.toString(), post._id.toString())
      .then(() => context.posts.findOne())
      .then((post) => {
        expect(post).to.null;
      });
  });

  it('fails when user not exists', () => {
    return deletePost(anyId, post._id.toString()).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${anyId} not exists`);
    });
  });

  it('fails when post not exists', () => {
    return deletePost(user._id.toString(), anyId).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`post with id ${anyId} not exists`);
    });
  });

  it('fails when user inst author and post exists', () => {
    return context.posts
      .updateOne({ _id: post._id }, { $set: { author: anyId } })
      .then(() => deletePost(user._id.toString(), post._id.toString()))
      .catch((error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(
          `post with id ${post._id.toString()} not belong to user with id ${user._id.toString()}`
        );
      });
  });

  it('fails on empty user id', () =>
    expect(() => deletePost('', post._id.toString(), () => {})).to.throw(
      Error,
      'user id is empty'
    ));

  it('fails on empty post id', () =>
    expect(() => deletePost(anyId, '', () => {})).to.throw(
      Error,
      'post id is empty'
    ));

  after(() =>
    cleanUp()
      .then(() => client.close())
      .then(console.log('close'))
  );
});
