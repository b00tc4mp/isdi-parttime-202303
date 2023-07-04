require('dotenv').config();

const { expect } = require('chai'),
  authenticateUser = require('./authenticateUser.js'),
  { MongoClient } = require('mongodb'),
  { cleanUp, generate, populate } = require('./helpers/tests');

describe('authenticateUser', () => {
  let client;

  before(() => {
    client = new MongoClient(process.env.MONGODB_URL);

    return client.connect().then((connection) => {
      const db = connection.db();

      context.users = db.collection('users');
      context.posts = db.collection('posts');
    });
  });

  let user;

  beforeEach(() => {
    user = generate.user();

    return cleanUp();
  });

  it('succeeds on existing user', () => {
    return populate([user], [])
      .then(() => authenticateUser(user.email, user.password))
      .then(() => context.users.findOne({ email: user.email }))
      .then((foundUser) => {
        expect(foundUser).to.exist;
        expect(foundUser.name).to.equal(user.name);
        expect(foundUser.email).to.equal(user.email);
        expect(foundUser.password).to.equal(user.password);
        expect(foundUser.avatar).to.be.null;
        expect(foundUser.favourites).to.have.lengthOf(0);
      });
  });

  it('fails on non-existing user', () => {
    return authenticateUser(user.email, user.password).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user not found`);
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

  it('fails on existing user but wrong email', () => {
    const wrongEmail = `e-wrong${Math.random()}@mail.com`;

    return populate([user], [])
      .then(() => authenticateUser(wrongEmail, user.password))
      .catch((error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`user not found`);
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
    expect(() => {
      authenticateUser(user.email, '');
    }).to.throw(Error, 'password is empty');
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
    expect(() => {
      authenticateUser(user.email, 'abc');
    }).to.throw(Error, 'password not be at least 8 characters long');

    expect(() => {
      authenticateUser(user.email, 'Ab@cdefg');
    }).to.throw(Error, 'password not contains one digit');

    expect(() => {
      authenticateUser(user.email, 'ABC1@FGH');
    }).to.throw(Error, 'password not contains one lowercase letter');

    expect(() => {
      authenticateUser(user.email, 'a@cdefg1');
    }).to.throw(Error, 'password not contains one uppercase letter');

    expect(() => {
      authenticateUser(user.email, 'P1ssword');
    }).to.throw(Error, 'password not contains one special character');

    expect(() => {
      authenticateUser(user.email, 'P @ssword1');
    }).to.throw(Error, 'password contains any whitespace characters');
  });

  after(() => cleanUp().then(() => client.close()));
});
