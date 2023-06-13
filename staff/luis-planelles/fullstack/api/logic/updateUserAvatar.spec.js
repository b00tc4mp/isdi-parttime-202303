require('dotenv').config();

const { expect } = require('chai');
const { writeFile, readFile } = require('fs');

const updateUserAvatar = require('./updateUserAvatar.js');

describe('updateUserAvatar', () => {
  let id, name, email, password, avatar;

  beforeEach((done) => {
    id = `id-${Math.round(Math.random() * 100 + 1)}`;
    name = `name-${Math.random()}`;
    email = `e-${Math.random()}@mail.com`;
    password = `password-${Math.random()}`;
    avatar = `avatar-${Math.random()}`;

    writeFile(`${process.env.DB_PATH}/users.json`, '[]', (error) =>
      done(error)
    );
  });

  it('succeeds on existing user and correct new avatar', (done) => {
    const users = [{ id, name, email, password, avatar }],
      json = JSON.stringify(users);

    writeFile(`${process.env.DB_PATH}/users.json`, json, (error) => {
      expect(error).to.be.null;

      const newAvatar = avatar + '-new';

      updateUserAvatar(id, newAvatar, (error) => {
        expect(error).to.be.null;

        readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
          expect(error).to.be.null;

          const [{ avatar }] = JSON.parse(json);

          expect(avatar).to.equal(newAvatar);

          done();
        });
      });
    });
  });

  it('fails on non-existing user', (done) => {
    const newAvatar = avatar + '-new';

    updateUserAvatar(id, newAvatar, (error, user) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${id} not found`);
      expect(user).to.be.undefined;

      done();
    });
  });

  it('fails on existing user and incorrect id', (done) => {
    const users = [{ id, name, email, password, avatar }],
      json = JSON.stringify(users);

    writeFile(`${process.env.DB_PATH}/users.json`, json, (error) => {
      expect(error).to.be.null;

      const wrongId = id + '-wrong',
        newAvatar = avatar + '-new';

      updateUserAvatar(wrongId, newAvatar, (error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`user with id ${wrongId} not found`);

        done();
      });
    });
  });

  it('fails on empty id', () =>
    expect(() => updateUserAvatar('', avatar, () => {})).to.throw(
      Error,
      'userId is empty'
    ));

  it('fails on empty avatar', () =>
    expect(() => updateUserAvatar(id, '', () => {})).to.throw(
      Error,
      'avatar image is empty'
    ));

  it('fails on empty callback', () =>
    expect(() => updateUserAvatar(id, avatar)).to.throw(
      Error,
      'callback is not a function'
    ));

  after((done) =>
    writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf-8', (error) =>
      done(error)
    )
  );
});
