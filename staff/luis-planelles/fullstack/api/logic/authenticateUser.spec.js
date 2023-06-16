require('dotenv').config();

const { expect } = require('chai'),
  { writeFile } = require('fs'),
  authenticateUser = require('./authenticateUser.js'),
  { cleanUp, generate } = require('./helpers/test');

describe('authenticateUser', () => {
  let user;

  beforeEach((done) => {
    user = generate.user();

    cleanUp(done);
  });

  it('succeeds on existing user', (done) => {
    const userJson = JSON.stringify([user]);

    writeFile(`${process.env.DB_PATH}/users.json`, userJson, (error) => {
      expect(error).to.be.null;

      authenticateUser(user.email, user.password, (error, userId) => {
        expect(error).to.be.null;
        expect(userId).to.equal(user.id);

        done();
      });
    });
  });

  it('fails on non-existing user', (done) => {
    authenticateUser(user.email, user.password, (error, userId) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with email ${user.email} not found`);
      expect(userId).to.be.undefined;

      done();
    });
  });

  it('fails on existing user but wrong password', (done) => {
    const userJson = JSON.stringify([user]);

    writeFile(`${process.env.DB_PATH}/users.json`, userJson, (error) => {
      expect(error).to.be.null;

      password = user.password + '-wrong';

      authenticateUser(user.email, password, (error, userId) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal('wrong credentials');
        expect(userId).to.be.undefined;

        done();
      });
    });
  });

  it('fails on existing user but wrong email', (done) => {
    const userJson = JSON.stringify([user]);

    writeFile(`${process.env.DB_PATH}/users.json`, userJson, (error) => {
      expect(error).to.be.null;

      user.email = `wrong${user.email}`;

      authenticateUser(user.email, user.password, (error, userId) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(
          `user with email ${user.email} not found`
        );
        expect(userId).to.be.undefined;

        done();
      });
    });
  });

  it('fails on empty email', () => {
    expect(() => authenticateUser('', user.password, () => {})).to.throw(
      Error,
      'email is empty'
    );
  });

  it('fails on empty password', () => {
    expect(() => authenticateUser(user.email, '', () => {})).to.throw(
      Error,
      'password is empty'
    );
  });

  it('fails on empty callback', () => {
    expect(() => authenticateUser(user.email, user.password)).to.throw(
      Error,
      'callback is not a function'
    );
  });

  after(cleanUp);
});
