require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const deletePost = require('./deletePost');
const { cleanUp, populate, generate } = require('./helpers/tests');
const { Post } = require('../data/models');

describe('deletePost', () => {
  before(() => {
    return mongoose.connect(process.env.MONGODB_URL);
  });

  const anyId = new ObjectId();

  let user, post, postNoAuthor;

  beforeEach(() => {
    user = generate.user();
    post = generate.post(user._id, anyId);
    postNoAuthor = generate.post(anyId);

    return cleanUp().then(() => populate([user], [post, postNoAuthor]));
  });

  it('succeeds on existing user and post', () => {
    return cleanUp()
      .then(() => populate([user], [post]))
      .then(() => deletePost(user._id.toString(), post._id.toString()))
      .then(() => Post.findOne())
      .then((foundPost) => {
        expect(foundPost).to.be.null;
      });
  });

  it('fails when user not exists', () => {
    return deletePost(anyId.toString(), post._id.toString()).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${anyId} not exists`);
    });
  });

  it('fails when post not exists', () => {
    return deletePost(user._id.toString(), anyId.toString()).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`post with id ${anyId} not exists`);
    });
  });

  it('fails when user inst author and post exists', () => {
    return deletePost(user._id.toString(), postNoAuthor._id.toString()).catch(
      (error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(
          `post with id ${postNoAuthor._id.toString()} not belong to user with id ${user._id.toString()}`
        );
      }
    );
  });

  it('fails on empty user id', () =>
    expect(() => deletePost('', post._id.toString())).to.throw(
      Error,
      'user id is empty'
    ));

  it('fails on empty post id', () =>
    expect(() => deletePost(user._id.toString(), '')).to.throw(
      Error,
      'post id is empty'
    ));

  after(() => cleanUp().then(() => mongoose.disconnect()));
});
