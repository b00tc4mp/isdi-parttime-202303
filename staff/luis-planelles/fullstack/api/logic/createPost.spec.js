require('dotenv').config();

const { expect } = require('chai');
const createPost = require('./createPost');
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

  const anyId = new ObjectId().toString();

  beforeEach(() => {
    user = generate.user();

    image = `image-${Math.random()}`;
    text = `text-${Math.random()}`;

    return cleanUp().then(() => populate([user], []));
  });

  it('should be created if user exists and data is correct', () => {
    const date = new Date();
    const fakeDate = sinon.useFakeTimers(date.getTime());

    return createPost(user._id.toString(), image, text)
      .then(() => context.posts.findOne())
      .then((foundPost) => {
        expect(foundPost).to.exist;
        expect(foundPost.author.toString()).to.equal(user._id.toString());
        expect(foundPost.image).to.equal(image);
        expect(foundPost.text).to.equal(text);
        expect(foundPost.date.toISOString()).to.equal(date.toISOString());
        expect(foundPost.likes).to.deep.equal([]);

        fakeDate.restore();
      });
  });

  it('should throw an error if user does not exist', () => {
    return createPost(anyId, image, text).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${anyId} doesnt exists`);
    });
  });

  it('fails on empty id', () =>
    expect(() =>
      createPost('', image, text).to.throw(Error, 'user id is empty')
    ));

  it('fails on empty image', () => {
    expect(() => createPost(anyId, '', text)).to.throw(Error, 'image is empty');
  });

  it('fails on empty text', () => {
    expect(() => createPost(anyId, image, '')).to.throw(Error, 'text is empty');
  });

  after(() => cleanUp().then(() => client.close()));
});
