const { expect } = require('chai');
const { writeFile } = require('fs');

const retrieveUser = require('./retrieveUser.js');

describe('retrieveUser', () => {
  let id, name, email, password, avatar;

  beforeEach((done) => {
    id = `id-${Math.round(Math.random() * 100 + 1)}`;
    name = `name-${Math.random()}`;
    email = `e-${Math.random()}@mail.com`;
    password = `password-${Math.random()}`;
    avatar = `avatar-${Math.random()}`;

    writeFile('./data/users.json', '[]', (error) => done(error));
  });

  it('succeeds on existing user and correct id', (done) => {
    const users = [{ id, name, email, password, avatar }];
    const json = JSON.stringify(users);

    writeFile('./data/users.json', json, (error) => {
      expect(error).to.be.null;

      retrieveUser(id, (error, user) => {
        expect(error).to.be.null;

        expect(user.name).to.equal(name);
        expect(user.email).to.equal(email);
        expect(user.avatar).to.equal(avatar);

        done();
      });
    });
  });

  it('succeeds on existing user with no avatar and correct id', (done) => {
    const users = [{ id, name, email, password, avatar: null }];
    const json = JSON.stringify(users);

    writeFile('./data/users.json', json, (error) => {
      expect(error).to.be.null;

      retrieveUser(id, (error, user) => {
        expect(error).to.be.null;

        expect(user.name).to.equal(name);
        expect(user.email).to.equal(email);
        expect(user.avatar).to.be.null;

        done();
      });
    });
  });

  it('fails on existing user and incorrect id', (done) => {
    const users = [{ id, name, email, password, avatar }];
    const json = JSON.stringify(users);

    writeFile('./data/users.json', json, (error) => {
      expect(error).to.be.null;

      const wrongId = id + '-wrong';

      retrieveUser(wrongId, (error, user) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`user with id ${wrongId} not found`);

        expect(user).to.be.undefined;

        done();
      });
    });
  });

  it('fails on empty id', () =>
    expect(() => retrieveUser('', () => {})).to.throw(
      Error,
      'userId is empty'
    ));

  after((done) => writeFile('./data/users.json', '[]', (error) => done(error)));
});
