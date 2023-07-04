require('dotenv').config();

const { expect } = require('chai');
const createPost = require('./createPost.js');
const sinon = require('sinon');
const { cleanUp, populate, generate } = require('./helpers/tests');
const { MongoClient, ObjectId } = require('mongodb');
const context = require('./context');

describe('createPost', () => {
  let client;

  before(() => {
    client = new MongoClient(process.env.MONGODB_URL);

    return client.connect().then((connection) => {
      const db = connection.db();

      context.users = db.collection('users');
      context.posts = db.collection('posts');
    });
  });

  let user, text, image;

  const anyUserId = new ObjectId().toString();

  beforeEach(() => {
    user = generate.user();

    image = `image-${Math.random()}`;
    text = `text-${Math.random()}`;

    return cleanUp();
  });

  it('should be created if user exists and data is correct', () => {
    const date = new Date();
    const fakeDate = sinon.useFakeTimers(date.getTime());

    let userIdString;

    return populate([user], [])
      .then(() => context.users.findOne({ email: user.email }))
      .then((foundUser) => {
        userIdString = foundUser._id.toString();
        return createPost(foundUser._id.toString(), image, text);
      })
      .then(() => context.posts.findOne({ author: new ObjectId(userIdString) }))
      .then((post) => {
        expect(post).to.exist;
        expect(post.author.toString()).to.equal(userIdString);
        expect(post.image).to.equal(image);
        expect(post.text).to.equal(text);
        expect(post.date.toISOString()).to.equal(date.toISOString());
        expect(post.likes).to.deep.equal([]);

        fakeDate.restore();
      });
  });

  it('should throw an error if user does not exist', () => {
    createPost(anyUserId, image, text).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${unmatchId} doesnt exists`);
    });
  });

  it('fails on empty id', () =>
    expect(() =>
      createPost('', image, text).to.throw(Error, 'user id is empty')
    ));

  it('fails on empty image', () => {
    expect(() => createPost(anyUserId, '', text)).to.throw(
      Error,
      'image is empty'
    );
  });

  it('fails on empty text', () => {
    expect(() => createPost(anyUserId, image, '')).to.throw(
      Error,
      'text is empty'
    );
  });

  after(() => cleanUp().then(() => client.close()));
});
