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

    populate([user], [post], done);
  });

  it('succeeds on existing user and no favourite post', (done) => {
    toggleFavouritePost(user.id, post.id, (error) => {
      expect(error).to.be.null;

      readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
        expect(error).to.be.null;

        const usersData = JSON.parse(json),
          { favourites } = usersData[0];

        expect(favourites).to.deep.equal([post.id]);
        expect(favourites.length).to.equal(1);

        done();
      });
    });
  });

  it('succeeds on existing user and favourite post', (done) => {
    const favouriteUser = generate.user();
    favouriteUser.favourites = [post.id];

    populate([favouriteUser], [post], (error) => {
      expect(error).to.be.null;
    });

    toggleFavouritePost(favouriteUser.id, post.id, (error) => {
      expect(error).to.be.null;

      readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
        expect(error).to.be.null;

        const userData = JSON.parse(json),
          { favourites } = userData[0];

        expect(favourites).to.deep.equal([]);
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
