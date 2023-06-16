require('dotenv').config();

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

        for (let j = 0; j < 5; j++) {
          const post = generate.post(user.id);

          posts.push(post);
        }
      }

      populate(users, posts, done);
    });

    it('succeeds', (done) => {
      const user = users[0];

      retrievePosts(user.id, (error, retrievedPosts) => {
        expect(error).to.be.null;

        expect(retrievedPosts).to.deep.equal(posts.reverse());

        done();
      });
    });

    it('fail on non existing user', (done) => {
      const user = users[0];

      cleanUp(() => {});

      retrievePosts(user.id, (error, retrievedPosts) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`user with id ${user.id} not found`);

        expect(retrievedPosts).to.be.undefined;

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

  after(cleanUp);
});
