require('dotenv').config();

const { expect } = require('chai');
const updatePost = require('./updatePost');
const { cleanUp, populate, generate } = require('./helpers/test');
const sinon = require('sinon');

describe('updatePost', () => {
  let user, post, image, text;

  beforeEach((done) => {
    cleanUp((error) => {
      if (error) {
        done(error);

        return;
      }

      user = generate.user();
      post = generate.post(user.id);

      image = `url${Math.random()}`;
      text = `text${Math.random()}`;

      populate([user], [post], done);
    });
  });

  it('succeeds on existing user and post, and correct data', (done) => {
    const date = new Date(),
      fakeDate = sinon.useFakeTimers(date.getTime());

    updatePost(user.id, post.id, image, text, (error, updatedPost) => {
      expect(error).to.be.null;

      expect(updatedPost.id).to.equal(post.id);
      expect(updatedPost.author).to.equal(user.id);
      expect(updatedPost.text).to.equal(text);
      expect(updatedPost.image).to.equal(image);
      expect(updatedPost.date).to.deep.equal(date);

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

    updatePost(user.id, post.id, image, text, (error, updatedPost) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${user.id} not exists`);

      expect(updatedPost).to.be.undefined;

      done();
    });
  });

  it('fails when post not exists', (done) => {
    post.id += 'unmatch';

    updatePost(user.id, post.id, image, text, (error, updatedPost) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`post with id ${post.id} not exists`);

      expect(updatedPost).to.be.undefined;

      done();
    });
  });

  it('fails on existing user but not post', (done) => {
    post.id += 'not in db';

    updatePost(user.id, post.id, image, text, (error, updatedPost) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`post with id ${post.id} not exists`);

      expect(updatedPost).to.be.undefined;

      done();
    });
  });

  it('fails when user inst author and post exists', (done) => {
    user.id += 'wrong';

    updatePost(user.id, post.id, image, text, (error, post) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${user.id} not exists`);

      expect(post).to.be.undefined;

      done();
    });
  });

  it('fails when image is not string ', () =>
    expect(() => updatePost(user.id, post.id, 11, text, () => {})).to.throw(
      Error,
      'image is not a string'
    ));

  it('fails when text is not string ', () =>
    expect(() => updatePost(user.id, post.id, image, {}, () => {})).to.throw(
      Error,
      'text is not a string'
    ));

  it('fails on empty user id', () =>
    expect(() => updatePost('', post.id, () => {})).to.throw(
      Error,
      'user id is empty'
    ));

  it('fails on empty post id', () =>
    expect(() => updatePost(user.id, '', () => {})).to.throw(
      Error,
      'post id is empty'
    ));

  it('fails on empty image', () =>
    expect(() => updatePost(user.id, post.id, '', text, () => {})).to.throw(
      Error,
      'image is empty'
    ));

  it('fails on empty text', () =>
    expect(() => updatePost(user.id, post.id, image, '', () => {})).to.throw(
      Error,
      'text is empty'
    ));

  it('fails on empty callback', () =>
    expect(() => updatePost(user.id, post.id, image, text)).to.throw(
      Error,
      'callback is not a function'
    ));

  after(cleanUp);
});
