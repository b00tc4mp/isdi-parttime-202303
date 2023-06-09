require('dotenv').config();

const { expect } = require('chai');
const { readFile, writeFile } = require('fs');

const registerUser = require('./registerUser.js');

describe('registerUser', () => {
  let name, email, password;

  beforeEach((done) => {
    name = `name-${Math.random()}`;
    email = `e-${Math.random()}@mail.com`;
    password = `P@ssword-${Math.random()}`;

    writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf-8', (error) =>
      done(error)
    );
  });

  it('should succed on new user registered', (done) => {
    registerUser(name, email, password, (error) => {
      expect(error).to.be.null;

      readFile(`${process.env.DB_PATH}/users.json`, 'utf-8', (error, json) => {
        expect(error).to.be.null;

        const users = JSON.parse(json),
          user = users.find((user) => user.email === email);

        expect(user).to.exist;
        expect(user.id).to.be.a('string');
        expect(user.name).to.equal(name);
        expect(user.email).to.equal(email);
        expect(user.password).to.equal(password);
        expect(user.avatar).to.be.null;
        expect(user.favourites).to.have.lengthOf(0);

        done();
      });
    });
  });

  it('should fail on existing user', (done) => {
    const users = [{ name, email, password }];
    const json = JSON.stringify(users);

    writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf-8', (error) => {
      expect(error).to.be.null;

      registerUser(name, email, password, (error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(
          `user with email ${email} already exists`
        );

        done();
      });
    });
  });

  it('fails on empty name', () =>
    expect(() => registerUser('', email, password, () => {})).to.throw(
      Error,
      'name is empty'
    ));

  it('fails on empty password', () =>
    expect(() => registerUser(name, email, '', () => {})).to.throw(
      Error,
      'password is empty'
    ));

  it('fails on empty email', () =>
    expect(() => registerUser(name, '', password, () => {})).to.throw(
      Error,
      'email is empty'
    ));

  after((done) =>
    writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf-8', (error) =>
      done(error)
    )
  );
});
