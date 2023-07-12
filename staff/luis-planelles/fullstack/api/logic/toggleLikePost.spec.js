require('dotenv').config();

const { expect } = require('chai');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const toggleLikePost = require('./toggleLikePost');
const { cleanUp, populate, generate } = require('./helpers/tests');
const { Post } = require('../data/models');

describe('toggleLikePost', () => {
  before(() => {
    mongoose.connect(process.env.MONGODB_URL);
  });

  const anyId = new ObjectId();

  let user, otherUser, post;

  beforeEach(() => {
    user = generate.user();
    otherUser = generate.user();

    post = generate.post(user._id);

    return cleanUp().then(() => populate([user, otherUser], [post]));
  });

  it('succeeds on existing and no liked post', () => {
    return toggleLikePost(user._id.toString(), post._id.toString())
      .then(() => Post.findOne())
      .then((post) => {
        expect(post.likes).to.deep.equal([user._id]);
        expect(post.likes.length).to.equal(1);
      });
  });

  it('succeeds on existing and liked post', () => {
    return Post.updateOne({ _id: post._id }, { $set: { likes: [user._id] } })
      .then(() => toggleLikePost(user._id.toString(), post._id.toString()))
      .then(() => Post.findOne())
      .then((post) => {
        expect(post.likes).to.deep.equal([]);
        expect(post.likes.length).to.equal(0);
      });
  });

  it('succeeds on existing post and multiple likes with no liked user', () => {
    return toggleLikePost(user._id.toString(), post._id.toString())
      .then(() => toggleLikePost(otherUser._id.toString(), post._id.toString()))
      .then(() => Post.findOne())
      .then((post) => {
        expect(post.likes).to.deep.equal([user._id, otherUser._id]);
        expect(post.likes.length).to.equal(2);
      });
  });

  it('succeeds on existing post and multiple likes with liked user', () => {
    return Post.updateOne({ _id: post._id }, { $set: { likes: [otherUser] } })
      .then(() => toggleLikePost(user._id.toString(), post._id.toString()))
      .then(() => toggleLikePost(otherUser._id.toString(), post._id.toString()))
      .then(() => Post.findOne())
      .then((post) => {
        expect(post.likes).to.deep.equal([user._id]);
        expect(post.likes.length).to.equal(1);
      });
  });

  it('fails when user not match', () => {
    return toggleLikePost(anyId.toString(), post._id.toString()).catch(
      (error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`user with id ${anyId} not exists`);
      }
    );
  });

  it('fails when post not match', () => {
    return toggleLikePost(user._id.toString(), anyId.toString()).catch(
      (error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`post with id ${anyId} not exists`);
      }
    );
  });

  it('fails on empty user id', () =>
    expect(() => toggleLikePost('', post._id.toString())).to.throw(
      Error,
      'user id is empty'
    ));

  it('fails on empty post id', () =>
    expect(() => toggleLikePost(user._id.toString(), '')).to.throw(
      Error,
      'post id is empty'
    ));

  after(() => cleanUp().then(() => mongoose.disconnect()));
});
