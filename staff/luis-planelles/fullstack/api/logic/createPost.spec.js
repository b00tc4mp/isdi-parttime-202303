require('dotenv').config();

const { expect } = require('chai');
const { writeFile, readFile } = require('fs');
const createPost = require('./createPost.js');
const sinon = require('sinon');

describe('createPost', () => {
  let userId, postImage, postText, date;

  beforeEach((done) => {
    userId = `id-${Math.random()}`;
    postImage = `url${Math.random()}`;
    postText = `text${Math.random()}`;

    writeFile(`${process.env.DB_PATH}/posts.json`, '[]', (error) =>
      done(error)
    );
  });

  it('should be created if user exists and data is correct', (done) => {
    const date = new Date();
    const fakeDate = sinon.useFakeTimers(date.getTime());

    const users = [{ id: userId }];
    const usersJson = JSON.stringify(users);

    writeFile(`${process.env.DB_PATH}/users.json`, usersJson, (error) => {
      expect(error).to.be.null;

      createPost(userId, postImage, postText, (error) => {
        expect(error).to.be.null;

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
          expect(error).to.be.null;

          const posts = JSON.parse(json),
            post = posts[posts.length - 1];

          expect(post).to.exist;
          expect(post.id).to.equal('post-1');
          expect(post.author).to.equal(userId);
          expect(post.image).to.equal(postImage);
          expect(post.text).to.equal(postText);
          expect(post.date).to.equal(date.toISOString());
          expect(post.likes).to.deep.equal([]);
          expect(post.favourites).to.deep.equal([]);
          expect(posts.length).to.equal(1);

          fakeDate.restore();

          done();
        });
      });
    });
  });

  it('should succeed if there are existing posts', (done) => {
    const users = [{ id: userId }],
      usersJson = JSON.stringify(users);

    writeFile(`${process.env.DB_PATH}/users.json`, usersJson, (error) => {
      expect(error).to.be.null;

      const dataPosts = [{ id: 'post-1' }, { id: 'post-4' }],
        dataPostsJson = JSON.stringify(dataPosts);

      writeFile(`${process.env.DB_PATH}/posts.json`, dataPostsJson, (error) => {
        expect(error).to.be.null;

        createPost(userId, postImage, postText, (error) => {
          expect(error).to.be.null;

          readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
            expect(error).to.be.null;

            const posts = JSON.parse(json),
              post = posts[posts.length - 1];

            expect(post).to.exist;
            expect(post.id).to.equal('post-5');

            expect(posts.length).to.equal(dataPosts.length + 1);

            done();
          });
        });
      });
    });
  });

  it('should throw an error if user does not exist', (done) => {
    const unmatchId = 'anyid';

    createPost(unmatchId, postImage, postText, (error) => {
      expect(error).to.exist;
      expect(error.message).to.equal(`user with id ${unmatchId} doesnt exists`);

      done();
    });
  });

  it('fails if cannot read users data', (done) => {
    const wrongData = JSON.stringify([{ wrong: 'data' }]);

    writeFile(`${process.env.DB_PATH}/users.json`, wrongData, (error) => {
      expect(error).to.be.null;

      createPost(userId, postImage, postText, (error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`user with id ${userId} doesnt exists`);

        done();
      });
    });
  });

  it('fails on empty id', () =>
    expect(() => createPost('', postImage, postText, () => {})).to.throw(
      Error,
      'user id is empty'
    ));

  it('fails on empty image', () => {
    expect(() => createPost(userId, '', postText, () => {})).to.throw(
      Error,
      'image is empty'
    );
  });

  it('fails on empty text', () => {
    expect(() => createPost(userId, postImage, '', () => {})).to.throw(
      Error,
      'text is empty'
    );
  });

  it('fails on empty callback', () => {
    expect(() => createPost(userId, postImage, postText)).to.throw(
      Error,
      'callback is not a function'
    );
  });

  after((done) => {
    writeFile(`${process.env.DB_PATH}/posts.json`, '[]', 'utf-8', (error) =>
      done(error)
    );
  });
});
