require('dotenv').config();

const { readFile } = require('fs');
const { expect } = require('chai');
const retrievePosts = require('./retrievePosts');
const { cleanUp, populate, generate } = require('./helpers/test');

describe('retrievePosts', () => {
  beforeEach(cleanUp);

  describe('on existing users and posts', () => {
    const users = new Array(5),
      posts = [];

    beforeEach((done) => {
      for (let i = 0; i < users.length; i++) {
        const user = generate.user();

        users[i] = user;

        for (let j = 0; j < 2; j++) {
          const post = generate.post(user.id, user.name, null);

          posts.push(post);
        }
      }

      populate(users, posts, done);
    });

    it('succeeds', (done) => {
      const user = users[0];

      posts.forEach((post) => {
        const userAuthor = users.find((user) => user.id === post.author);

        post.favourites = user.favourites.includes(post.id);
        post.date = new Date(post.date);

        post.author = {
          id: userAuthor.id,
          name: userAuthor.name,
          avatar: userAuthor.avatar,
        };
      });

      retrievePosts(user.id, (error, retrievedPosts) => {
        expect(error).to.be.null;

        expect(retrievedPosts).to.deep.equal(posts.reverse());

        done();
      });
    });

    it('fail on not match id and existing user', (done) => {
      const user = users[0];

      user.id += '-wrong';

      retrievePosts(user.id, (error, retrievedPosts) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`user with id ${user.id} not found`);

        expect(retrievedPosts).to.be.undefined;

        done();
      });
    });

    it('fails on empty id', () =>
      expect(() => retrievePosts('', () => {})).to.throw(
        Error,
        'user id is empty'
      ));

    it('fails on empty callback', () => {
      const user = users[0];
      expect(() => retrievePosts(user.id)).to.throw(
        Error,
        'callback is not a function'
      );
    });
  });

  describe('on existing users but not posts', () => {
    const users = new Array(5);

    beforeEach((done) => {
      for (let i = 0; i < users.length; i++) {
        const user = generate.user();

        users[i] = user;
      }

      populate(users, [], done);
    });

    it('it returns empty array when user havent posts', (done) => {
      const user = users[0];

      retrievePosts(user.id, (error, retrievedPosts) => {
        expect(error).to.be.null;

        expect(retrievedPosts).to.deep.equal([]);

        done();
      });
    });
  });

  describe('on non existing users but posts', () => {
    const posts = new Array(5);
    const user = generate.user();

    beforeEach((done) => {
      for (let i = 0; i < posts.length; i++) {
        posts[i] = generate.post(user.id);
      }

      populate([], posts, done);
    });

    it('fail on non existing user', (done) => {
      retrievePosts(user.id, (error, retrievedPosts) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`user with id ${user.id} not found`);

        expect(retrievedPosts).to.be.undefined;

        done();
      });
    });
  });

  after(cleanUp);
});
