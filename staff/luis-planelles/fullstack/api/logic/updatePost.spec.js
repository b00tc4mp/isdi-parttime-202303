require('dotenv').config();

const { expect } = require('chai');
const updatePost = require('./updatePost');
const { cleanUp, populate, generate } = require('./helpers/tests');
const { MongoClient, ObjectId } = require('mongodb');
const context = require('./context');
const sinon = require('sinon');

describe('updatePost', () => {
  let client;

  before(() => {
    client = new MongoClient(process.env.MONGODB_URL);

    return client.connect().then((connection) => {
      const db = connection.db();

      context.users = db.collection('users');
      context.posts = db.collection('posts');
    });
  });

  const anyId = new ObjectId().toString();

  let user, post, image, text;

  beforeEach(() => {
    user = generate.user();
    post = generate.post();

    image = `url${Math.random()}`;
    text = `text${Math.random()}`;

    return cleanUp()
      .then(() => populate([user], [post]))
      .then(() =>
        context.posts.updateOne(
          { _id: post._id },
          { $set: { author: user._id } }
        )
      );
  });

  it('succeeds on existing user and post, and correct data', () => {
    const date = new Date();
    const fakeDate = sinon.useFakeTimers(date.getTime());

    return updatePost(user._id.toString(), post._id.toString(), image, text)
      .then(() => context.posts.findOne({ _id: post._id }))
      .then((updatedPost) => {
        expect(updatedPost._id.toString()).to.equal(post._id.toString());
        expect(updatedPost.author.toString()).to.equal(user._id.toString());
        expect(updatedPost.text).to.equal(text);
        expect(updatedPost.image).to.equal(image);
        expect(updatedPost.date).to.deep.equal(date);

        fakeDate.restore();
      });
  });

  it('fails when user not exists', () => {
    return updatePost(anyId, post._id.toString(), image, text).catch(
      (error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`user with id ${anyId} not exists`);
      }
    );
  });

  it('fails when post not exists', () => {
    return updatePost(user._id.toString(), anyId, image, text).catch(
      (error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`post with id ${anyId} not exists`);
      }
    );
  });

  it('fails when post not belong to user', () => {
    return context.posts
      .updateOne({ _id: post._id }, { $set: { author: anyId } })
      .then(() =>
        updatePost(user._id.toString(), post._id.toString(), image, text)
      )
      .catch((error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(
          `post ${post._id.toString()} not belongs to user with id ${user._id.toString()}`
        );
      });
  });

  it('fails when image is not string ', () =>
    expect(() => updatePost(anyId, anyId, 11, text)).to.throw(
      Error,
      'image is not a string'
    ));

  it('fails when text is not string ', () =>
    expect(() => updatePost(anyId, anyId, image, {})).to.throw(
      Error,
      'text is not a string'
    ));

  it('fails on empty user id', () =>
    expect(() => updatePost('', anyId)).to.throw(Error, 'user id is empty'));

  it('fails on empty post id', () =>
    expect(() => updatePost(anyId, '')).to.throw(Error, 'post id is empty'));

  it('fails on empty image', () =>
    expect(() => updatePost(anyId, anyId, '', text)).to.throw(
      Error,
      'image is empty'
    ));

  it('fails on empty text', () =>
    expect(() => updatePost(anyId, anyId, image, '')).to.throw(
      Error,
      'text is empty'
    ));

  after(() => cleanUp().then(() => client.close()));
});
