const jwt = require('jsonwebtoken');
const { expect } = require('chai');
const mongoose = require('mongoose');

const { extractUserId } = require('../../handlers/helpers');
const { cleanUp, generate, populate } = require('../helpers');

describe('extractUserId', () => {
  before(() => mongoose.connect(process.env.MONGODB_URL));

  let user;

  beforeEach(() => {
    user = generate.user();

    return cleanUp().then(() => populate([user]));
  });

  it('should extract user ID from valid authorization header', () => {
    const userId = user._id;
    const token = jwt.sign({ sub: userId }, process.env.JWT_SECRET);

    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const extractedUserId = extractUserId(req);

    expect(extractedUserId).to.equal(userId.toString());
  });

  it('should throw an error for invalid authorization header', () => {
    const invalidToken = 'invalid_token';

    const req = {
      headers: {
        authorization: `Bearer ${invalidToken}`,
      },
    };

    expect(() => extractUserId(req)).to.throw(jwt.JsonWebTokenError);
  });

  after(() => cleanUp().then(() => mongoose.disconnect()));
});
