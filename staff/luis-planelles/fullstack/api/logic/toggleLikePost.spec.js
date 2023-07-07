require('dotenv').config();

const { expect } = require('chai');
const toggleLikePost = require('./toggleLikePost');
const { cleanUp, populate, generate } = require('./helpers/tests');
const { MongoClient, ObjectId } = require('mongodb');
const context = require('./context');

describe('toggleLikePost', () => {
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

  let user, otherUser, post;

  beforeEach(() => {
    user = generate.user();
    otherUser = generate.user();

    post = generate.post();

    return cleanUp().then(() => populate([user, otherUser], [post]));
  });

  it('succeeds on existing and no liked post', () => {
    return toggleLikePost(user._id.toString(), post._id.toString())
      .then(() => context.posts.findOne())
      .then((post) => {
        expect(post.likes).to.deep.equal([user._id.toString()]);
        expect(post.likes.length).to.equal(1);
      });
  });

  it('succeeds on existing and liked post', () => {
    return context.posts
      .updateOne({ _id: post._id }, { $set: { likes: [user._id.toString()] } })
      .then(() => toggleLikePost(user._id.toString(), post._id.toString()))
      .then(() => context.posts.findOne())
      .then((post) => {
        expect(post.likes).to.deep.equal([]);
        expect(post.likes.length).to.equal(0);
      });
  });

  it('succeeds on existing post and multiple likes with no liked user', () => {
    return toggleLikePost(user._id.toString(), post._id.toString())
      .then(() => toggleLikePost(otherUser._id.toString(), post._id.toString()))
      .then(() => context.posts.findOne())
      .then((post) => {
        expect(post.likes).to.deep.equal([
          user._id.toString(),
          otherUser._id.toString(),
        ]);
        expect(post.likes.length).to.equal(2);
      });
  });

  it('succeeds on existing post and multiple likes with liked user', () => {
    return context.posts
      .updateOne(
        { _id: post._id },
        { $set: { likes: [otherUser._id.toString()] } }
      )
      .then(() => toggleLikePost(user._id.toString(), post._id.toString()))
      .then(() => toggleLikePost(otherUser._id.toString(), post._id.toString()))
      .then(() => context.posts.findOne())
      .then((post) => {
        expect(post.likes).to.deep.equal([user._id.toString()]);
        expect(post.likes.length).to.equal(1);
      });
  });

  it('fails when user not match', () => {
    return toggleLikePost(anyId, anyId).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${anyId} not exists`);
    });
  });

  it('fails when post not match', () => {
    return context.users
      .findOne()
      .then((user) => toggleLikePost(user._id.toString(), anyId))
      .catch((error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`post with id ${anyId} not exists`);
      });
  });

  // it('fails on empty user id', () =>
  //   expect(() => toggleLikePost('', post.id, () => {})).to.throw(
  //     Error,
  //     'user id is empty'
  //   ));

  // it('fails on empty post id', () =>
  //   expect(() => toggleLikePost(anyId, '', () => {})).to.throw(
  //     Error,
  //     'post id is empty'
  //   ));

  after(() =>
    cleanUp()
      .then(() => client.close())
      .then(console.log('close'))
  );
});
