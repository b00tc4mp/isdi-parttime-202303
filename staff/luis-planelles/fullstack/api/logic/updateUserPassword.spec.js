require('dotenv').config();

const { expect } = require('chai');
const updateUserPassword = require('./updateUserPassword.js');
const { cleanUp, populate, generate } = require('./helpers/tests');
const { MongoClient, ObjectId } = require('mongodb');
const context = require('./context');

describe('updateUserPassword', () => {
  let client;

  before(() => {
    client = new MongoClient(process.env.MONGODB_URL);

    return client.connect().then((connection) => {
      const db = connection.db();

      context.users = db.collection('users');
      context.posts = db.collection('posts');
    });
  });

  const anyId = new ObjectId().toString();

  let user;

  beforeEach(() => {
    user = generate.user();

    return cleanUp().then(() => populate([user], []));
  });

  it('should succeed on valid password update', () => {
    const newPassword = 'NewPassword456!',
      newPasswordConfirm = 'NewPassword456!';

    return updateUserPassword(
      user._id.toString(),
      user.password,
      newPassword,
      newPasswordConfirm
    )
      .then(() => context.users.findOne())
      .then((foundUser) => {
        expect(foundUser.password).to.equal(newPassword);
      });
  });

  it('should fail on not existing user', () => {
    const newPassword = 'NewPassword456!',
      newPasswordConfirm = 'NewPassword456!';

    return updateUserPassword(
      anyId,
      user.password,
      newPassword,
      newPasswordConfirm
    ).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${anyId} not exists`);
    });
  });

  it('should fail on incorrect original password', () => {
    const password = '1nc0rrectP@ssword',
      newPassword = 'NewPassword456!',
      newPasswordConfirm = 'NewPassword456!';

    return updateUserPassword(
      user._id.toString(),
      password,
      newPassword,
      newPasswordConfirm
    ).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`wrong password`);
    });
  });

  it('should fail on mismatched new password and confirm password', () => {
    const newPassword = 'NewPassword456!',
      newPasswordConfirm = 'MismatchedPassword789!';

    expect(() =>
      updateUserPassword(anyId, user.password, newPassword, newPasswordConfirm)
    ).to.throw('password confirmation mismatch');
  });

  it('should fail on new password same as old password', () => {
    const newPassword = 'OldPassword123!',
      newPasswordConfirm = user.password;

    expect(() =>
      updateUserPassword(anyId, user.password, newPassword, newPasswordConfirm)
    ).to.throw('password confirmation mismatch');
  });

  it('fails on empty id', () => {
    const newPassword = 'NewPassword456!',
      newPasswordConfirm = 'NewPassword456!';

    expect(() =>
      updateUserPassword('', user.password, newPassword, newPasswordConfirm)
    ).to.throw(Error, 'id is empty');
  });

  it('fails on empty password', () => {
    const newPassword = 'NewPassword456!',
      newPasswordConfirm = 'NewPassword456!';

    expect(() =>
      updateUserPassword(anyId, '', newPassword, newPasswordConfirm)
    ).to.throw(Error, 'password is empty');
  });

  it('fails on empty new password', () => {
    const newPasswordConfirm = 'NewPassword456!';

    expect(() =>
      updateUserPassword(anyId, user.password, '', newPasswordConfirm)
    ).to.throw(Error, 'new password is empty');
  });

  it('fails on empty password confirm', () => {
    const newPassword = 'NewPassword456!';

    expect(() =>
      updateUserPassword(anyId, user.password, newPassword, '')
    ).to.throw(Error, 'new password confirm is empty');
  });

  it('should fail on non-string password', () => {
    const password = 12345678;

    expect(() => updateUserPassword(anyId, password, '', '')).to.throw(
      'password is not a string'
    );
  });

  it('should fail on password without a digit', () => {
    const password = 'Password!';

    expect(() => updateUserPassword(anyId, password, '', '')).to.throw(
      'password not contains one digit'
    );
  });

  it('should fail on password without a lowercase letter', () => {
    const password = 'PASSWORD123!';

    expect(() => updateUserPassword(anyId, password, '', '')).to.throw(
      'password not contains one lowercase letter'
    );
  });

  it('should fail on password without an uppercase letter', () => {
    const password = 'password123!';

    expect(() => updateUserPassword(anyId, password, '', '')).to.throw(
      'password not contains one uppercase letter'
    );
  });

  it('should fail on password without a special character', () => {
    const password = 'Password123';

    expect(() => updateUserPassword(anyId, password, '', '')).to.throw(
      'password not contains one special character'
    );
  });

  it('should fail on password with whitespace characters', () => {
    const password = 'Password 123!';

    expect(() => updateUserPassword(anyId, password, '', '')).to.throw(
      'password contains any whitespace characters'
    );
  });

  it('should fail on password less than 8 characters long', () => {
    const password = '1p@sS6';

    expect(() => updateUserPassword(anyId, password, '', '')).to.throw(
      'password not be at least 8 characters long'
    );
  });

  after(() => cleanUp().then(() => client.close()));
});
