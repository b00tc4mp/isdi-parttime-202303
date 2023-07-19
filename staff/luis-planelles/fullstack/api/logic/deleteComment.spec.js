require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const deleteComment = require('./deleteComment');
const { cleanUp, populate, generate } = require('./helpers/tests');
const { Post } = require('../data/models');

describe('deleteComment', () => {
  before(() => mongoose.connect(process.env.MONGODB_URL));

  const anyId = new ObjectId();

  let user,
    post,
    comment,
    noMatchComment,
    postNoAuthor,
    postNoMatchComment,
    noMatchAuthorComment,
    postNoMatchAuthorComment;

  beforeEach(() => {
    user = generate.user();
    comment = generate.comment(user._id);
    post = generate.post(user._id, comment);

    noMatchComment = generate.comment(user._id);
    noMatchAuthorComment = generate.comment(anyId);

    postNoAuthor = generate.post(anyId, comment);
    postNoMatchComment = generate.post(user._id, noMatchComment);
    postNoMatchAuthorComment = generate.post(user._id, noMatchAuthorComment);

    return cleanUp().then(() =>
      populate(
        [user],
        [post, postNoAuthor, postNoMatchComment, postNoMatchAuthorComment]
      )
    );
  });

  it('succeeds on existing user, post and comment', () => {
    return Post.findById(post._id.toString())
      .then((foundPost) => {
        expect(foundPost.comments[0].author.toString()).to.equal(
          post.comments[0].author.toString()
        );
        expect(foundPost.comments[0].text).to.equal(post.comments[0].text);
        expect(foundPost.comments[0].date.toString()).to.equal(
          post.comments[0].date.toString()
        );
      })
      .then(() =>
        deleteComment(
          user._id.toString(),
          post._id.toString(),
          comment._id.toString()
        )
      )
      .then(() => Post.findById(post._id.toString()))
      .then((foundPost) => {
        expect(foundPost.comments).to.deep.equal([]);
      });
  });

  it('fails when user not exists', () => {
    return deleteComment(
      anyId.toString(),
      post._id.toString(),
      comment._id.toString()
    ).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${anyId} not exists`);
    });
  });

  it('fails when post not exists', () => {
    return deleteComment(
      user._id.toString(),
      anyId.toString(),
      comment._id.toString()
    ).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`post with id ${anyId} not exists`);
    });
  });

  it('fails when comment not exists', () => {
    return deleteComment(
      user._id.toString(),
      postNoMatchComment._id.toString(),
      comment._id.toString()
    ).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(
        `comment with id ${comment._id.toString()} not exists in post with id ${postNoMatchComment._id.toString()}`
      );
    });
  });

  it('fails when comment not belong to user', () => {
    return deleteComment(
      user._id.toString(),
      postNoMatchAuthorComment._id.toString(),
      noMatchAuthorComment._id.toString()
    ).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(
        `comment with id ${noMatchAuthorComment._id.toString()} does not belong to user with id ${user._id.toString()}`
      );
    });
  });

  it('fails on empty user id', () =>
    expect(() => deleteComment('', post._id.toString())).to.throw(
      Error,
      'user id is empty'
    ));

  it('fails on empty post id', () =>
    expect(() => deleteComment(user._id.toString(), '')).to.throw(
      Error,
      'post id is empty'
    ));

  it('fails on empty comment id', () =>
    expect(() =>
      deleteComment(user._id.toString(), post._id.toString(), '')
    ).to.throw(Error, 'comment id is empty'));

  after(() => cleanUp().then(() => mongoose.disconnect()));
});
