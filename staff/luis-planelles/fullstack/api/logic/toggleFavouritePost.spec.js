require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const toggleFavouritePost = require('./toggleFavouritePost');
const { cleanUp, populate, generate } = require('./helpers/tests');
const { User } = require('../data/models');

describe('toggleFavouritePost', () => {
  before(() => {
    return mongoose.connect(process.env.MONGODB_URL);
  });

  const anyId = new ObjectId();

  let user, post, otherPost;

  beforeEach(() => {
    user = generate.user();

    post = generate.post(user._id);
    otherPost = generate.post(anyId);

    return cleanUp().then(() => populate([user], [post, otherPost]));
  });

  it('succeeds on existing user and no favourite post', () => {
    return toggleFavouritePost(user._id.toString(), post._id.toString())
      .then(() => User.findOne())
      .then((user) => {
        expect(user.favourites).to.deep.equal([post._id]);
        expect(user.favourites.length).to.equal(1);
      });
  });

  it('succeeds on existing user and favourite post', () => {
    return User.updateOne(
      { _id: user._id },
      { $set: { favourites: [post._id] } }
    )
      .then(() => toggleFavouritePost(user._id.toString(), post._id.toString()))
      .then(() => User.findOne())
      .then((user) => {
        expect(user.favourites).to.deep.equal([]);
        expect(user.favourites.length).to.equal(0);
      });
  });

  it('succeeds on existing user and multiple favourite with no favorite posts', () => {
    return toggleFavouritePost(user._id.toString(), post._id.toString())
      .then(() =>
        toggleFavouritePost(user._id.toString(), otherPost._id.toString())
      )
      .then(() => User.findOne())
      .then((user) => {
        expect(user.favourites).to.deep.equal([post._id, otherPost._id]);
        expect(user.favourites.length).to.equal(2);
      });
  });

  it('succeeds on existing user and multiple favourite with favorite posts', () => {
    return User.updateOne(
      { _id: user._id },
      { $set: { favourites: [otherPost._id] } }
    )
      .then(() => toggleFavouritePost(user._id.toString(), post._id.toString()))
      .then(() =>
        toggleFavouritePost(user._id.toString(), otherPost._id.toString())
      )
      .then(() => User.findOne())
      .then((user) => {
        expect(user.favourites).to.deep.equal([post._id]);
        expect(user.favourites.length).to.equal(1);
      });
  });

  it('fails when user not match', () => {
    return toggleFavouritePost(anyId.toString(), post._id.toString()).catch(
      (error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`user with id ${anyId} not exists`);
      }
    );
  });

  it('fails when post not match', () => {
    return User.findOne()
      .then((user) =>
        toggleFavouritePost(user._id.toString(), anyId.toString())
      )
      .catch((error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`post with id ${anyId} not exists`);
      });
  });

  it('fails on empty user id', () =>
    expect(() => toggleFavouritePost('', post._id.toString())).to.throw(
      Error,
      'user id is empty'
    ));

  it('fails on empty post id', () =>
    expect(() => toggleFavouritePost(anyId.toString(), '')).to.throw(
      Error,
      'post id is empty'
    ));

  after(() => cleanUp().then(() => mongoose.disconnect()));
});
