require('dotenv').config();

const { expect } = require('chai');
const toggleFavouritePost = require('./toggleFavouritePost');
const { cleanUp, populate, generate } = require('./helpers/test');
const { readFile } = require('fs');

describe('toggleFavouritePost', () => {
  beforeEach(cleanUp);

  let user, post;

  beforeEach((done) => {
    user = generate.user();
    post = generate.post(user.id);

    favouritedPost = generate.post(user.id);
    favouritedPost.favourite = [user.id];

    populate([user], [post, favouritedPost], done);
  });

  it('succeeds on existing user and no favourite post', (done) => {
    toggleFavouritePost(user.id, post.id, (error) => {
      expect(error).to.be.null;

      readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
        expect(error).to.be.null;

        const postsData = JSON.parse(json),
          { favourites } = postsData[0];

        expect(favourites).to.deep.equal([user.id]);
        expect(favourites.length).to.equal(1);

        done();
      });
    });
  });

  it('succeeds on existing user and favourite post', (done) => {
    toggleFavouritePost(user.id, favouritedPost.id, (error) => {
      expect(error).to.be.null;

      readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
        expect(error).to.be.null;

        const postsData = JSON.parse(json),
          { favourites } = postsData[0];

        expect(postsData[0].favourites).to.deep.equal([]);
        expect(favourites.length).to.equal(0);

        done();
      });
    });
  });

  it('fails when user not match', (done) => {
    user.id += 'unmatch';

    toggleFavouritePost(user.id, post.id, (error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${user.id} not exists`);

      done();
    });
  });

  it('fails when post not exists', (done) => {
    post.id += 'unmatch';

    toggleFavouritePost(user.id, post.id, (error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`post with id ${post.id} not exists`);

      done();
    });
  });

  it('fails on empty user id', () =>
    expect(() => toggleFavouritePost('', post.id, () => {})).to.throw(
      Error,
      'user id is empty'
    ));

  it('fails on empty post id', () =>
    expect(() => toggleFavouritePost(user.id, '', () => {})).to.throw(
      Error,
      'post id is empty'
    ));

  it('fails on empty callback', () =>
    expect(() => toggleFavouritePost(user.id, post.id)).to.throw(
      Error,
      'callback is not a function'
    ));

  after(cleanUp);
});
