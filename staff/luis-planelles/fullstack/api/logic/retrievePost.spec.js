require('dotenv').config();

const { expect } = require('chai');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const sinon = require('sinon');

const retrievePost = require('./retrievePost');
const { cleanUp, populate, generate } = require('./helpers/tests');

describe('retrievePost', () => {
  let date, fakeDate;

  before(() => {
    date = new Date();
    fakeDate = sinon.useFakeTimers(date.getTime());

    return mongoose.connect(process.env.MONGODB_URL);
  });

  const anyId = new ObjectId();

  let user, post;

  beforeEach(() => {
    user = generate.user();
    post = generate.post(user._id);

    return cleanUp().then(() => populate([user], [post]));
  });

  it('succeeds on existing user and post', () => {
    return retrievePost(user._id.toString(), post._id.toString()).then(
      (retrievedPost) => {
        expect(retrievedPost.text).to.equal(post.text);
        expect(retrievedPost.image).to.equal(post.image);
        expect(retrievedPost.id).to.be.undefined;
        expect(retrievedPost.likes).to.be.undefined;
        expect(retrievedPost.date).to.be.undefined;
        expect(retrievedPost.author).to.be.undefined;
        expect(retrievePost.__v).to.be.undefined;

        fakeDate.restore();
      }
    );
  });

  it('fails when user not exists', () => {
    return retrievePost(anyId.toString(), post._id.toString()).catch(
      (error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`user with id ${anyId} not exists`);
      }
    );
  });

  it('fails when post not exists', () => {
    return retrievePost(user._id.toString(), anyId.toString()).catch(
      (error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(
          `post with id ${anyId.toString()} not exists`
        );
      }
    );
  });

  it('fails on empty user id', () =>
    expect(() => retrievePost('', anyId.toString())).to.throw(
      Error,
      'user id is empty'
    ));

  it('fails on empty post id', () =>
    expect(() => retrievePost(anyId.toString(), '')).to.throw(
      Error,
      'post id is empty'
    ));

  after(() => {
    fakeDate.restore();
    return cleanUp().then(() => mongoose.disconnect());
  });
});
