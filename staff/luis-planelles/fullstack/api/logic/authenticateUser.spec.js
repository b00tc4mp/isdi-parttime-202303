require('dotenv').config();

const { expect } = require('chai'),
  { writeFile } = require('fs'),
  authenticateUser = require('./authenticateUser.js');

describe('authenticateUser', () => {
  let id, email, password;

  beforeEach((done) => {
    id = `id-${Math.random()}`;
    email = `e-${Math.random()}@mail.com`;
    password = `P@ssword-${Math.random()}`;

    writeFile(`${process.env.DB_PATH}/users.json`, '[]', (error) =>
      done(error)
    );
  });

  it('succeeds on existing user', (done) => {
    const users = [{ id, email, password }],
      json = JSON.stringify(users);

    writeFile(`${process.env.DB_PATH}/users.json`, json, (error) => {
      expect(error).to.be.null;

      authenticateUser(email, password, (error, userId) => {
        expect(error).to.be.null;
        expect(userId).to.equal(id);

        done();
      });
    });
  });

  it('fails on non-existing user', (done) => {
    authenticateUser(email, password, (error, userId) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with email ${email} not found`);
      expect(userId).to.be.undefined;

      done();
    });
  });

  it('fails on existing user but wrong passord', (done) => {
    const users = [{ id, email, password }],
      json = JSON.stringify(users);

    writeFile(`${process.env.DB_PATH}/users.json`, json, (error) => {
      expect(error).to.be.null;

      authenticateUser(email, password + '-wrong', (error, userId) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal('wrong credentials');
        expect(userId).to.be.undefined;

        done();
      });
    });
  });

  it('fails on empty email', () =>
    expect(() => authenticateUser('', password, () => {})).to.throw(
      Error,
      'email is empty'
    ));

  it('fails on empty password', () =>
    expect(() => authenticateUser(email, '', () => {})).to.throw(
      Error,
      'password is empty'
    ));

  it('fails on empty callback', () =>
    expect(() => authenticateUser(email, password)).to.throw(
      Error,
      'callback is not a function'
    ));

  after((done) =>
    writeFile(`${process.env.DB_PATH}/users.json`, '[]', (error) => done(error))
  );
});
