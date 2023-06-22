require('dotenv').config();

const { expect } = require('chai');
const toggleLikePost = require('./toggleLikePost');
const { cleanUp, populate, generate } = require('./helpers/test');
const { readFile } = require('fs');
const { likedPost } = require('./helpers/test/generate');

describe('toggleLikePost', () => {
  beforeEach(cleanUp);

  let user, post;

  beforeEach((done) => {
    user = generate.user();
    post = generate.post(user.id);

    populate([user], [post], done);
  });

  it('succeeds on existing user and no liked post', (done) => {
    toggleLikePost(user.id, post.id, (error) => {
      expect(error).to.be.null;

      readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
        expect(error).to.be.null;

        const postsData = JSON.parse(json),
          { likes } = postsData[0];

        expect(likes).to.deep.equal([user.id]);
        expect(likes.length).to.equal(1);

        done();
      });
    });
  });

  it('succeeds on existing user and liked post', (done) => {
    const likedPost = generate.post(user.id);
    likedPost.likes = [user.id];

    populate([user], [likedPost], (error) => {
      expect(error).to.be.null;
    });

    toggleLikePost(user.id, likedPost.id, (error) => {
      expect(error).to.be.null;

      readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
        expect(error).to.be.null;

        const postsData = JSON.parse(json),
          { likes } = postsData[0];

        expect(likes).to.deep.equal([]);
        expect(likes.length).to.equal(0);

        done();
      });
    });
  });

  it('fails when user not match', (done) => {
    user.id += 'unmatch';

    toggleLikePost(user.id, post.id, (error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${user.id} not exists`);

      done();
    });
  });

  it('fails when post not exists', (done) => {
    post.id += 'unmatch';

    toggleLikePost(user.id, post.id, (error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`post with id ${post.id} not exists`);

      done();
    });
  });

  it('fails on empty user id', () =>
    expect(() => toggleLikePost('', post.id, () => {})).to.throw(
      Error,
      'user id is empty'
    ));

  it('fails on empty post id', () =>
    expect(() => toggleLikePost(user.id, '', () => {})).to.throw(
      Error,
      'post id is empty'
    ));

  it('fails on empty callback', () =>
    expect(() => toggleLikePost(user.id, post.id)).to.throw(
      Error,
      'callback is not a function'
    ));

  after(cleanUp);
});
