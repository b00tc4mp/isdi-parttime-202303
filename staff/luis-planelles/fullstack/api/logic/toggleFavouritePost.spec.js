require('dotenv').config();

const { expect } = require('chai');
const toggleFavouritePost = require('./toggleFavouritePost');
const { cleanUp, populate, generate } = require('./helpers/tests');
const { MongoClient, ObjectId } = require('mongodb');
const context = require('./context');

describe('toggleFavouritePost', () => {
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

  let user, post, otherPost;

  beforeEach(() => {
    user = generate.user();

    post = generate.post();
    otherPost = generate.post();

    return cleanUp().then(() => populate([user], [post, otherPost]));
  });

  it('succeeds on existing user and no favourite post', () => {
    return toggleFavouritePost(user._id.toString(), post._id.toString())
      .then(() => context.users.findOne())
      .then((user) => {
        expect(user.favourites).to.deep.equal([post._id.toString()]);
        expect(user.favourites.length).to.equal(1);
      });
  });

  it('succeeds on existing user and favourite post', () => {
    return context.users
      .updateOne(
        { _id: user._id },
        { $set: { favourites: [post._id.toString()] } }
      )
      .then(() => toggleFavouritePost(user._id.toString(), post._id.toString()))
      .then(() => context.users.findOne())
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
      .then(() => context.users.findOne())
      .then((user) => {
        expect(user.favourites).to.deep.equal([
          post._id.toString(),
          otherPost._id.toString(),
        ]);
        expect(user.favourites.length).to.equal(2);
      });
  });

  it('succeeds on existing user and multiple favourite with favorite posts', () => {
    return context.users
      .updateOne(
        { _id: user._id },
        { $set: { favourites: [otherPost._id.toString()] } }
      )
      .then(() => toggleFavouritePost(user._id.toString(), post._id.toString()))
      .then(() =>
        toggleFavouritePost(user._id.toString(), otherPost._id.toString())
      )
      .then(() => context.users.findOne())
      .then((user) => {
        expect(user.favourites).to.deep.equal([post._id.toString()]);
        expect(user.favourites.length).to.equal(1);
      });
  });

  it('fails when user not match', () => {
    return toggleFavouritePost(anyId, anyId).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${anyId} not exists`);
    });
  });

  it('fails when post not match', () => {
    return context.users
      .findOne()
      .then((user) => toggleFavouritePost(user._id.toString(), anyId))
      .catch((error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`post with id ${anyId} not exists`);
      });
  });

  // it('fails on empty user id', () =>
  //   expect(() => toggleFavouritePost('', post.id, () => {})).to.throw(
  //     Error,
  //     'user id is empty'
  //   ));

  // it('fails on empty post id', () =>
  //   expect(() => toggleFavouritePost(anyId, '', () => {})).to.throw(
  //     Error,
  //     'post id is empty'
  //   ));

  after(() => {
    cleanUp().then(() => client.close());
    console.log('close');
  });
});
