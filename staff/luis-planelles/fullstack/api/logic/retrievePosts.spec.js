require('dotenv').config();

const { expect } = require('chai');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const retrievePosts = require('./retrievePosts');
const { cleanUp, populate, generate } = require('./helpers/tests');

describe('retrievePosts', () => {
  describe('on existing users and posts', () => {
    before(() => {
      mongoose.connect(process.env.MONGODB_URL);
    });

    let user,
      posts = [],
      users = [];

    beforeEach(() => {
      for (let i = 0; i < 3; i++) {
        user = generate.user();

        users[i] = user;

        for (let j = 0; j < 3; j++) {
          const anyId = new ObjectId();
          const post = generate.post(user._id);

          posts.push(post);
        }
      }

      return cleanUp().then(() => populate(users, posts));
    });

    it('succeeds', () => {
      return retrievePosts(user._id.toString()).then((retrievedPosts) => {
        expect(retrievedPosts.length).to.equal(9);
        // expect(retrievedPosts).to.deep.equal(posts.reverse());
      });
    });

    it('fail on not match id and existing user', () => {
      return retrievePosts(anyId.toString()).catch((error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(
          `user with id ${anyId.toString()} not exists`
        );
      });
    });

    it('fails on empty id', () =>
      expect(() => retrievePosts('')).to.throw(Error, 'user id is empty'));

    describe('on existing users but not posts', () => {
      let user;

      beforeEach(() => {
        user = generate.user();

        return cleanUp().then(() => populate([user], []));
      });

      it('it returns empty array when user havent posts', () => {
        return retrievePosts(user._id.toString()).then((retrievedPosts) => {
          expect(retrievedPosts.length).to.equal(0);
          expect(retrievedPosts).to.deep.equal([]);
        });
      });
    });
  });
  after(() => cleanUp().then(() => mongoose.disconnect()));
});
