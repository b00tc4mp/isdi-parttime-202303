require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');

const { authenticateUser } = require('../../logic');
const { cleanUp, populate, generate } = require('../helpers');
const { User } = require('../../data/models');

describe('authenticateUser', () => {
  before(() => mongoose.connect(process.env.MONGODB_URL));

  let user;

  beforeEach(() => {
    user = generate.user();

    return cleanUp();
  });

  it('succeeds on existing user', () => {
    return populate([user], [])
      .then(() => authenticateUser(user.email, user.password))
      .then(() => User.findOne())
      .then((foundUser) => {
        expect(foundUser).to.exist;
        expect(foundUser.name).to.equal(user.name);
        expect(foundUser.email).to.equal(user.email);
        expect(foundUser.password).to.equal(user.password);
        expect(foundUser.avatar).to.be.null;
      });
  });
  it('fails on non-existing user', () => {
    const anyEmail = 'any@email.com';

    return authenticateUser(anyEmail, user.password).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user not exist`);
    });
  });

  it('fails on existing user but wrong password', () => {
    const wrongPassword = user.password + '-wrong';

    return populate([user], [])
      .then(() => authenticateUser(user.email, wrongPassword))
      .catch((error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`wrong credentials`);
      });
  });

  it('fails on empty email', () => {
    expect(() => authenticateUser('', user.password, () => {})).to.throw(
      Error,
      'email is empty'
    );
  });

  it('fails on non-string email', () => {
    expect(() => authenticateUser(1, user.password)).to.throw(
      Error,
      'email is not a string'
    );
    expect(() => authenticateUser(true, user.password)).to.throw(
      Error,
      'email is not a string'
    );
    expect(() => authenticateUser({}, user.password)).to.throw(
      Error,
      'email is not a string'
    );
    expect(() => authenticateUser([], user.password)).to.throw(
      Error,
      'email is not a string'
    );
  });

  it('throws an error for invalid email', () => {
    expect(() => authenticateUser('user@example', user.password)).to.throw(
      Error,
      'invalid email'
    );
    expect(() => authenticateUser('user.example.com', user.password)).to.throw(
      Error,
      'invalid email'
    );
    expect(() => authenticateUser('user@example.', user.password)).to.throw(
      Error,
      'invalid email'
    );
  });

  it('fails on empty password', () => {
    expect(() => authenticateUser(user.email, '')).to.throw(
      Error,
      'password is empty'
    );
  });

  it('fails on non-string password', () => {
    expect(() => authenticateUser(user.email, 1)).to.throw(
      Error,
      'password is not a string'
    );
    expect(() => authenticateUser(user.email, true)).to.throw(
      Error,
      'password is not a string'
    );
    expect(() => authenticateUser(user.email, {})).to.throw(
      Error,
      'password is not a string'
    );
    expect(() => authenticateUser(user.email, [])).to.throw(
      Error,
      'password is not a string'
    );
  });

  it('throws an error for invalid passwords', () => {
    expect(() => authenticateUser(user.email, 'abc')).to.throw(
      Error,
      'password not be at least 8 characters long'
    );

    expect(() => authenticateUser(user.email, 'Ab@cdefg')).to.throw(
      Error,
      'password not contains one digit'
    );

    expect(() => authenticateUser(user.email, 'ABC1@FGH')).to.throw(
      Error,
      'password not contains one lowercase letter'
    );

    expect(() => authenticateUser(user.email, 'a@cdefg1')).to.throw(
      Error,
      'password not contains one uppercase letter'
    );

    expect(() => authenticateUser(user.email, 'P1ssword')).to.throw(
      Error,
      'password not contains one special character'
    );

    expect(() => authenticateUser(user.email, 'P @ssword1')).to.throw(
      Error,
      'password contains any whitespace characters'
    );
  });

  after(() => cleanUp().then(mongoose.disconnect));
});
