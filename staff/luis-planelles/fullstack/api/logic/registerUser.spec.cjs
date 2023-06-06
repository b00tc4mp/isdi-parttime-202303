const { expect } = require('chai');
const { readFile, writeFile } = require('fs');
const registerUser = require('./registerUser.cjs');

describe('registerUser', () => {
  let name, email, password;

  beforeEach((done) => {
    name = `name-${Math.random()}`;
    email = `e-${Math.random()}@mail.com`;
    password = `P@ssword-${Math.random()}`;

    writeFile('./data/users.json', '[]', 'utf-8', (error) => done(error));
  });

  it('should succed on new user registered', (done) => {
    registerUser(name, email, password, (error) => {
      expect(error).to.be.null;

      readFile('./data/users.json', 'utf-8', (error, json) => {
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

    writeFile('./data/users.json', json, 'utf-8', (error) => {
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

  after((done) =>
    writeFile('./data/users.json', '[]', 'utf-8', (error) => done(error))
  );
});
