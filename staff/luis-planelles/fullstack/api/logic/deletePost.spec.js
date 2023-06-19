require('dotenv').config();

const { expect } = require('chai');
const deletePost = require('./deletePost');
const { cleanUp, populate, generate } = require('./helpers/test');
const { readFile } = require('fs');

describe('deletePost', () => {
  let user, post, image, text;

  beforeEach((done) => {
    cleanUp((error) => {
      if (error) {
        done(error);

        return;
      }

      user = generate.user();
      post = generate.post(user.id);

      diffAuthor = `user2-${Math.random()}`;
      otherPost = generate.post(diffAuthor);

      image = `url${Math.random()}`;
      text = `text${Math.random()}`;

      populate([user], [post, otherPost], done);
    });
  });

  it('succeeds on existing user and post', (done) => {
    deletePost(user.id, post.id, (error) => {
      expect(error).to.be.null;

      readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
        expect(error).to.be.null;

        const dataBase = JSON.parse(json);

        expect(dataBase.length).to.equal(1);

        done();
      });
    });
  });

  it('fails when user not exists', (done) => {
    user.id = 'unmatch';

    deletePost(user.id, post.id, (error) => {
      expect(error).to.be.instanceOf(Error);

      readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
        expect(error).to.be.null;

        const dataBase = JSON.parse(json);

        expect(dataBase.length).to.equal(2);

        done();
      });
    });
  });

  it('fails when post not exists', (done) => {
    post.id += 'unmatch';

    deletePost(user.id, post.id, (error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`post with id ${post.id} not exists`);

      readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
        expect(error).to.be.null;

        const dataBase = JSON.parse(json);

        expect(dataBase.length).to.equal(2);

        done();
      });
    });
  });

  it('fails when user inst author and post exists', (done) => {
    deletePost(user.id, otherPost.id, (error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(
        `post with id ${otherPost.id} not belong to user with id ${user.id}`
      );

      readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
        expect(error).to.be.null;

        const dataBase = JSON.parse(json);

        expect(dataBase.length).to.equal(2);

        done();
      });
    });
  });

  it('fails on empty user id', () =>
    expect(() => deletePost('', post.id, () => {})).to.throw(
      Error,
      'user id is empty'
    ));

  it('fails on empty post id', () =>
    expect(() => deletePost(user.id, '', () => {})).to.throw(
      Error,
      'post id is empty'
    ));

  it('fails on empty callback', () =>
    expect(() => deletePost(user.id, post.id, image, text)).to.throw(
      Error,
      'callback is not a function'
    ));

  after(cleanUp);
});
