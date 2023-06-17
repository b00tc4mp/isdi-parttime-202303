require('dotenv').config();

const { expect } = require('chai');
const retrievePost = require('./retrievePost');
const { cleanUp, populate, generate } = require('./helpers/test');
const sinon = require('sinon');

describe('retrievePost', () => {
  let user, post;

  beforeEach((done) => {
    cleanUp((error) => {
      if (error) {
        done(error);

        return;
      }

      user = generate.user();
      post = generate.post(user.id);

      populate([user], [post], done);
    });
  });

  it('succeeds on existing user and post', (done) => {
    const date = new Date(),
      fakeDate = sinon.useFakeTimers(date.getTime());

    retrievePost(user.id, post.id, (error, retrievedPost) => {
      expect(error).to.be.null;

      expect(retrievedPost.id).to.equal(post.id);
      expect(retrievedPost.author).to.equal(user.id);
      expect(retrievedPost.text).to.equal(post.text);
      expect(retrievedPost.image).to.equal(post.image);
      expect(retrievedPost.date).to.equal(date.toISOString());

      fakeDate.restore();

      done();
    });
  });

  it('fails when user not exists', (done) => {
    cleanUp((error) => {
      if (error) {
        done(error);

        return;
      }
    });

    retrievePost(user.id, post.id, (error, retrievedPost) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${user.id} not exists`);

      expect(retrievedPost).to.be.undefined;

      done();
    });
  });

  it('fails when post not exists', (done) => {
    post.id += 'unmatch';

    retrievePost(user.id, post.id, (error, retrievedPost) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`post with id ${post.id} not exists`);

      expect(retrievedPost).to.be.undefined;

      done();
    });
  });

  it('fails on existing user but not post', (done) => {
    post.id += 'not in db';

    retrievePost(user.id, post.id, (error, retrievedPost) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`post with id ${post.id} not exists`);

      expect(retrievedPost).to.be.undefined;

      done();
    });
  });

  it('fails when user inst the author and post exists', (done) => {
    user.id += 'wrong';

    retrievePost(user.id, post.id, (error, retrievedPost) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${user.id} not exists`);

      expect(retrievedPost).to.be.undefined;

      done();
    });
  });

  it('fails on empty user id', () =>
    expect(() => retrievePost('', post.id, () => {})).to.throw(
      Error,
      'user id is empty'
    ));

  it('fails on empty post id', () =>
    expect(() => retrievePost(user.id, '', () => {})).to.throw(
      Error,
      'post id is empty'
    ));

  it('fails on empty callback', () =>
    expect(() => retrievePost(user.id, post.id)).to.throw(
      Error,
      'callback is not a function'
    ));

  after(cleanUp);
});
