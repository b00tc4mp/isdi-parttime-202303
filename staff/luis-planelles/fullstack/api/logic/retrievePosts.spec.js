require('dotenv').config();

const { expect } = require('chai');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const retrievePosts = require('./retrievePosts');
const { cleanUp, populate, generate } = require('./helpers/tests');
const { Post } = require('../data/models');

describe('retrievePosts', () => {
  describe('on existing users and posts', () => {
    before(() => {
      return mongoose.connect(process.env.MONGODB_URL);
    });

    const anyId = new ObjectId().toString();

    let user,
      posts = [],
      users = [];

    beforeEach(() => {
      for (let i = 0; i < 3; i++) {
        user = generate.user();

        users[i] = user;

        for (let j = 0; j < 3; j++) {
          const post = generate.post(user._id);

          posts.push(post);
        }
      }

      return cleanUp().then(() => populate(users, posts));
    });

    it('succeeds', () => {
      let postsExpect = [];

      return Post.find()
        .sort('-date')
        .lean()
        .then((posts) => {
          posts.forEach((post) => {
            post.id = post._id.toString();
            delete post._id;
            delete post.__v;

            post.favourites = user.favourites.some(
              (favourites) => favourites.toString() === post.id
            );

            const author = users.find(
              (user) => user._id.toString() === post.author._id.toString()
            );

            const { _id, name, email, avatar } = author;

            post.author = {
              id: _id.toString(),
              name,
              email,
              avatar,
            };

            postsExpect.push(post);
          });
        })
        .then(() => retrievePosts(user._id.toString()))
        .then((retrievedPosts) => {
          expect(retrievedPosts.length).to.equal(9);
          expect(retrievedPosts).to.deep.equal(postsExpect);
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
