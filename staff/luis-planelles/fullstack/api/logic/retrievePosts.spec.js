require('dotenv').config();

const { expect } = require('chai');
const retrievePosts = require('./retrievePosts');
const { cleanUp, populate, generate } = require('./helpers/tests');
const { ObjectId, MongoClient } = require('mongodb');
const context = require('./context');

describe('retrievePosts', () => {
  let client;

  before(() => {
    client = new MongoClient(process.env.MONGODB_URL);

    return client.connect().then((connection) => {
      const db = connection.db();

      context.users = db.collection('users');
      context.posts = db.collection('posts');
    });
  });

  describe('on existing users and posts', () => {
    let posts = [],
      users = [];

    const anyId = new ObjectId().toString();

    beforeEach(() => {
      for (let i = 0; i < 3; i++) {
        const user = generate.user();
        user._id = new ObjectId();

        users[i] = user;

        for (let j = 0; j < 3; j++) {
          const post = generate.post(user._id.toString());

          posts.push(post);
        }
      }

      return cleanUp().then(() => populate(users, posts));
    });

    it('succeeds', () => {
      return context.users
        .findOne()
        .then((foundUser) => retrievePosts(foundUser._id.toString()))
        .then((retrievedPosts) => {
          expect(retrievedPosts.length).to.equal(9);
          // expect(retrievedPosts).to.deep.equal(posts.reverse());
        });
    });

    it('fail on not match id and existing user', () => {
      return retrievePosts(anyId).catch((error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`user with id ${anyId} not exists`);
      });
    });

    it('fails on empty id', () =>
      expect(() => retrievePosts('')).to.throw(Error, 'user id is empty'));

    describe('on existing users but not posts', () => {
      let users = [];

      beforeEach(() => {
        for (let i = 0; i < 3; i++) {
          const user = generate.user();
          user._id = new ObjectId();

          users[i] = user;
        }

        return cleanUp().then(() => populate(users, []));
      });

      it('it returns empty array when user havent posts', () => {
        return context.users
          .findOne()
          .then((foundUser) => retrievePosts(foundUser._id.toString()))
          .then((retrievedPosts) => {
            expect(retrievedPosts.length).to.equal(0);
            expect(retrievedPosts).to.deep.equal([]);
          });
      });
    });
  });

  after(() => cleanUp().then(() => client.close()));
});
