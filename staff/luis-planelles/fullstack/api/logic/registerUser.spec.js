require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');

const registerUser = require('./registerUser');
const { cleanUp, populate, generate } = require('./helpers/tests');
const { User } = require('../data/models');

describe('registerUser', () => {
  before(() => {
    return mongoose.connect(process.env.MONGODB_URL);
  });

  let user;

  beforeEach(() => {
    user = generate.user();

    return cleanUp();
  });

  it('succeeds on new user', () => {
    return User.findOne()
      .then((users) => {
        expect(users).to.be.null;
      })
      .then(() => registerUser(user.name, user.email, user.password))
      .then(() => User.findOne())
      .then((foundUser) => {
        expect(foundUser).to.exist;
        expect(foundUser.name).to.equal(user.name);
        expect(foundUser.email).to.equal(user.email);
        expect(foundUser.password).to.equal(user.password);
        expect(foundUser.avatar).to.be.null;
        expect(foundUser.favourites).to.have.lengthOf(0);
      })
      .then(() => User.find())
      .then((users) => {
        expect(users).to.have.length(1);
      });
  });

  it('succeeds on other existing user', () => {
    const otherUser = generate.user();

    return populate([otherUser], [])
      .then(() => User.find())
      .then((users) => {
        expect(users).to.have.length(1);
      })
      .then(() => registerUser(user.name, user.email, user.password))
      .then(() => User.findOne({ email: user.email }))
      .then((foundUser) => {
        expect(foundUser).to.exist;
        expect(foundUser.name).to.equal(user.name);
        expect(foundUser.email).to.equal(user.email);
        expect(foundUser.password).to.equal(user.password);
        expect(foundUser.avatar).to.be.null;
        expect(foundUser.favourites).to.have.lengthOf(0);
      })
      .then(() => User.find())
      .then((users) => {
        expect(users).to.have.length(2);
      });
  });

  it('fails on existing user', () => {
    return populate([user], [])
      .then(() => User.find())
      .then((users) => expect(users).to.have.length(1))
      .then(() => registerUser(user.name, user.email, user.password))
      .catch((error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(
          `user with email ${user.email} already exists`
        );
      })
      .then(() => User.find())
      .then((users) => {
        expect(users).to.have.length(1);
      });
  });

  it('fails on empty name', () =>
    expect(() => registerUser('', user.email, user.password)).to.throw(
      Error,
      'name is empty'
    ));

  it('fails on non-string name', () => {
    expect(() => registerUser(undefined, user.email, user.password)).to.throw(
      Error,
      'name is not a string'
    );
    expect(() => registerUser(1, user.email, user.password)).to.throw(
      Error,
      'name is not a string'
    );
    expect(() => registerUser(true, user.email, user.password)).to.throw(
      Error,
      'name is not a string'
    );
    expect(() => registerUser({}, user.email, user.password)).to.throw(
      Error,
      'name is not a string'
    );
    expect(() => registerUser([], user.email, user.password)).to.throw(
      Error,
      'name is not a string'
    );
  });

  it('throws an error for empty email', () => {
    expect(() => registerUser(user.name, '', user.password)).to.throw(
      Error,
      'email is empty'
    );
  });

  it('throws an error for non-string email', () => {
    expect(() => registerUser(user.name, undefined, user.password)).to.throw(
      Error,
      'email is not a string'
    );
    expect(() => registerUser(user.name, 1, user.password)).to.throw(
      Error,
      'email is not a string'
    );
    expect(() => registerUser(user.name, true, user.password)).to.throw(
      Error,
      'email is not a string'
    );
    expect(() => registerUser(user.name, {}, user.password)).to.throw(
      Error,
      'email is not a string'
    );
    expect(() => registerUser(user.name, [], user.password)).to.throw(
      Error,
      'email is not a string'
    );
  });

  it('throws an error for invalid email', () => {
    expect(() =>
      registerUser(user.name, 'user@example', user.password)
    ).to.throw(Error, 'invalid email');
    expect(() =>
      registerUser(user.name, 'user.example.com', user.password)
    ).to.throw(Error, 'invalid email');
    expect(() =>
      registerUser(user.name, 'user@example.', user.password)
    ).to.throw(Error, 'invalid email');
  });

  it('fails on empty password', () =>
    expect(() => registerUser(user.name, user.email, '')).to.throw(
      Error,
      'password is empty'
    ));

  it('throws an error for non-string password', () => {
    expect(() => registerUser(user.name, user.email, 1)).to.throw(
      Error,
      'password is not a string'
    );
    expect(() => registerUser(user.name, user.email, true)).to.throw(
      Error,
      'password is not a string'
    );
    expect(() => registerUser(user.name, user.email, {})).to.throw(
      Error,
      'password is not a string'
    );
    expect(() => registerUser(user.name, user.email, [])).to.throw(
      Error,
      'password is not a string'
    );
  });

  it('throws an error for invalid passwords', () => {
    expect(() => {
      registerUser(user.email, user.email, '');
    }).to.throw(Error, 'password is empty');

    expect(() => {
      registerUser(user.email, user.email, 'abc');
    }).to.throw(Error, 'password not be at least 8 characters long');

    expect(() => {
      registerUser(user.email, user.email, 'Ab@cdefg');
    }).to.throw(Error, 'password not contains one digit');

    expect(() => {
      registerUser(user.email, user.email, 'ABC1@FGH');
    }).to.throw(Error, 'password not contains one lowercase letter');

    expect(() => {
      registerUser(user.email, user.email, 'a@cdefg1');
    }).to.throw(Error, 'password not contains one uppercase letter');

    expect(() => {
      registerUser(user.email, user.email, 'P1ssword');
    }).to.throw(Error, 'password not contains one special character');

    expect(() => {
      registerUser(user.email, user.email, 'P @ssword1');
    }).to.throw(Error, 'password contains any whitespace characters');
  });

  after(() => cleanUp().then(() => mongoose.disconnect()));
});
