require('dotenv').config();

const sinon = require('sinon');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const { expect } = require('chai');

const createPost = require('./createPost');
const { cleanUp, populate, generate } = require('./helpers/tests');
const { Post } = require('../data/models');

describe('createPost', () => {
  let fakeDate, date;

  before(() => {
    date = new Date();
    fakeDate = sinon.useFakeTimers(date.getTime());

    return mongoose.connect(process.env.MONGODB_URL);
  });

  const anyId = new ObjectId().toString();

  let user, text, image;

  beforeEach(() => {
    user = generate.user();

    image = `image-${Math.random()}`;
    text = `text-${Math.random()}`;

    return cleanUp().then(() => populate([user], []));
  });

  it('should be created if user exists and data is correct', () => {
    return createPost(user._id.toString(), image, text)
      .then(() => Post.findOne())
      .then((foundPost) => {
        expect(foundPost).to.exist;
        expect(foundPost.author.toString()).to.equal(user._id.toString());
        expect(foundPost.image).to.equal(image);
        expect(foundPost.text).to.equal(text);
        expect(foundPost.date.toISOString()).to.equal(date.toISOString());
        expect(foundPost.likes).to.deep.equal([]);
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

  it('fails on not hex id', () => {
    const noHexId = '64b10022eec390c63626893z';
    expect(() =>
      createPost(noHexId, image, text).to.throw(
        Error,
        'user id is not hexagecimal'
      )
    );
  });

  it('fails on not 24 characters id', () => {
    const no24Id = '64b10022eec';
    expect(() =>
      createPost(no24Id, image, text).to.throw(
        Error,
        'user id does not have 24 characters'
      )
    );
  });

  it('fails on empty image', () =>
    expect(() => createPost(anyId, '', text)).to.throw(
      Error,
      'image is empty'
    ));

  it('fails on empty text', () =>
    expect(() => createPost(anyId, image, '')).to.throw(
      Error,
      'text is empty'
    ));

  after(() => {
    fakeDate.restore();
    return cleanUp().then(() => mongoose.disconnect());
  });
});
