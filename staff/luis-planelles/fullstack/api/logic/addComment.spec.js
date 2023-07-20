require('dotenv').config();

const sinon = require('sinon');
const { expect } = require('chai');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const addComment = require('./addComment');
const { cleanUp, populate, generate } = require('./helpers/tests');
const { Post } = require('../data/models');

describe('addComment', () => {
  let fakeDate, date;

  before(() => {
    date = new Date();
    fakeDate = sinon.useFakeTimers(date.getTime());

    return mongoose.connect(process.env.MONGODB_URL);
  });

  const anyId = new ObjectId();

  let user, post, text;

  beforeEach(() => {
    user = generate.user();
    post = generate.post(user._id);

    text = `text-${Math.random()}`;

    return cleanUp().then(() => populate([user], [post]));
  });

  it('succeeds on existing user and post', () => {
    return addComment(user._id.toString(), post._id.toString(), text)
      .then(() => Post.findById(post._id.toString()))
      .then((foundPost) => {
        expect(foundPost.comments[0].author.toString()).to.equal(
          user._id.toString()
        );
        expect(foundPost.comments[0].text).to.equal(text);
        expect(foundPost.comments[0].date.toString()).to.equal(date.toString());
      });
  });

  it('fails when user not exists', () => {
    return addComment(anyId.toString(), post._id.toString(), text).catch(
      (error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`user with id ${anyId} not exists`);
      }
    );
  });

  it('fails when post not exists', () => {
    return addComment(user._id.toString(), anyId.toString(), text).catch(
      (error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`post with id ${anyId} not exists`);
      }
    );
  });

  it('fails on empty user id', () =>
    expect(() => addComment('', post._id.toString())).to.throw(
      Error,
      'user id is empty'
    ));

  it('fails on empty post id', () =>
    expect(() => addComment(user._id.toString(), '')).to.throw(
      Error,
      'post id is empty'
    ));

  it('fails on empty text', () =>
    expect(() =>
      addComment(user._id.toString(), post._id.toString(), '')
    ).to.throw(Error, 'text is empty'));

  after(() => {
    fakeDate.restore();
    return cleanUp().then(() => mongoose.disconnect());
  });
});
