require('dotenv').config();

const { expect } = require('chai');
const retrievePost = require('./retrievePost');
const { cleanUp, populate, generate } = require('./helpers/test');

describe('retrievePost', () => {
  let user, posts;

  beforeEach((done) => {
    cleanUp((error) => {
      if (error) {
        done(error);

        return;
      }

      posts = [];
      user = generate.user();

      for (let j = 0; j < 5; j++) {
        const post = generate.post(user.id);

        posts.push(post);
      }

      populate([user], posts, done);
    });
  });

  it('succeeds on existing user and post', (done) => {
    const post = posts[2];

    retrievePost(user.id, post.id, (error, retrievedPost) => {
      expect(error).to.be.null;

      expect(retrievedPost.id).to.equal(post.id);

      done();
    });
  });

  it('fails when post not exists', (done) => {
    const post = posts[2];

    post.id += 'unmatch';

    retrievePost(user.id, post.id, (error, retrievedPost) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`post with id ${post.id} not exists`);

      expect(retrievedPost).to.be.undefined;

      done();
    });
  });

  it('fails when user inst the author and post exists', (done) => {
    const post = posts[2];

    user.id += 'wrong';

    retrievePost(user.id, post.id, (error, retrievedPost) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${user.id} not exists`);

      expect(retrievedPost).to.be.undefined;

      done();
    });
  });

  it('fails on existing user but not post', (done) => {
    const post = posts[2];

    post.id += 'not in db';

    retrievePost(user.id, post.id, (error, retrievedPost) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`post with id ${post.id} not exists`);

      expect(retrievedPost).to.be.undefined;

      done();
    });
  });

  it('fails on empty user id', () => {
    const post = posts[1];

    expect(() => retrievePost('', post.id, () => {})).to.throw(
      Error,
      'user id is empty'
    );
  });

  it('fails on empty post id', () =>
    expect(() => retrievePost(user.id, '', () => {})).to.throw(
      Error,
      'post id is empty'
    ));

  it('fails on empty callback', () => {
    const post = posts[0];

    expect(() => retrievePost(user.id, post.id)).to.throw(
      Error,
      'callback is not a function'
    );
  });

  after(cleanUp);
});
