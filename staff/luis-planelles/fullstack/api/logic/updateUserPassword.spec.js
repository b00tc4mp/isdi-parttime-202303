require('dotenv').config();

const { expect } = require('chai');
const { writeFile, readFile } = require('fs');

const updateUserPassword = require('./updateUserPassword.js');

describe('updateUserPassword', () => {
  let id, name, email, password, avatar;

  beforeEach((done) => {
    id = `id-${Math.round(Math.random() * 100 + 1)}`;
    name = `name-${Math.random()}`;
    email = `e-${Math.random()}@mail.com`;
    password = `P@ssword-${Math.random()}`;
    avatar = `avatar-${Math.random()}`;

    const users = [{ id, name, email, password, avatar }];
    const json = JSON.stringify(users);

    writeFile(`${process.env.DB_PATH}/users.json`, json, (error) =>
      done(error)
    );
  });

  it('should succeed on valid password update', (done) => {
    const newPassword = 'NewPassword456!';
    const newPasswordConfirm = 'NewPassword456!';

    updateUserPassword(
      id,
      password,
      newPassword,
      newPasswordConfirm,
      (error) => {
        expect(error).to.be.null;

        readFile(`./data/users.json`, (error, json) => {
          expect(error).to.be.null;

          const [{ password }] = JSON.parse(json);

          expect(password).to.equal(newPassword);

          done();
        });
      }
    );
  });

  it('should fail on incorrect original password', (done) => {
    const password = '1nc0rrectP@ssword';
    const newPassword = 'NewPassword456!';
    const newPasswordConfirm = 'NewPassword456!';

    updateUserPassword(
      id,
      password,
      newPassword,
      newPasswordConfirm,
      (error) => {
        expect(error).to.be.an('Error');
        expect(error.message).to.equal('wrong password');
        done();
      }
    );
  });

  it('should fail on mismatched new password and confirm password', () => {
    const newPassword = 'NewPassword456!';
    const newPasswordConfirm = 'MismatchedPassword789!';

    expect(() =>
      updateUserPassword(id, password, newPassword, newPasswordConfirm)
    ).to.throw('password confirmation mismatch');
  });

  it('should fail on new password same as old password', () => {
    const newPassword = 'OldPassword123!';
    const newPasswordConfirm = password;

    expect(() =>
      updateUserPassword(id, password, newPassword, newPasswordConfirm)
    ).to.throw('password confirmation mismatch');
  });

  it('fails on empty id', () => {
    const newPassword = 'NewPassword456!';
    const newPasswordConfirm = 'NewPassword456!';

    expect(() =>
      updateUserPassword(
        '',
        password,
        newPassword,
        newPasswordConfirm,
        () => {}
      )
    ).to.throw(Error, 'id is empty');
  });

  it('fails on empty password', () => {
    const newPassword = 'NewPassword456!';
    const newPasswordConfirm = 'NewPassword456!';

    expect(() =>
      updateUserPassword(id, '', newPassword, newPasswordConfirm, () => {})
    ).to.throw(Error, 'password is empty');
  });

  it('fails on empty new password', () => {
    const newPasswordConfirm = 'NewPassword456!';

    expect(() =>
      updateUserPassword(id, password, '', newPasswordConfirm, () => {})
    ).to.throw(Error, 'new password is empty');
  });

  it('fails on empty password confirm', () => {
    const newPassword = 'NewPassword456!';

    expect(() =>
      updateUserPassword(id, password, newPassword, '', () => {})
    ).to.throw(Error, 'new password confirm is empty');
  });

  it('should fail on non-string password', () => {
    const password = 12345678;
    expect(() => updateUserPassword(id, password, '', '', () => {})).to.throw(
      'password is not a string'
    );
  });

  it('should fail on password without a digit', () => {
    const password = 'Password!';
    expect(() => updateUserPassword(id, password, '', '', () => {})).to.throw(
      'password not contains one digit'
    );
  });

  it('should fail on password without a lowercase letter', () => {
    const password = 'PASSWORD123!';
    expect(() => updateUserPassword(id, password, '', '', () => {})).to.throw(
      'password not contains one lowercase letter'
    );
  });

  it('should fail on password without an uppercase letter', () => {
    const password = 'password123!';
    expect(() => updateUserPassword(id, password, '', '', () => {})).to.throw(
      'password not contains one uppercase letter'
    );
  });

  it('should fail on password without a special character', () => {
    const password = 'Password123';
    expect(() => updateUserPassword(id, password, '', '', () => {})).to.throw(
      'password not contains one special character'
    );
  });

  it('should fail on password with whitespace characters', () => {
    const password = 'Password 123!';
    expect(() => updateUserPassword(id, password, '', '', () => {})).to.throw(
      'password contains any whitespace characters'
    );
  });

  it('should fail on password less than 8 characters long', () => {
    const password = '1p@sS6';
    expect(() => updateUserPassword(id, password, '', '', () => {})).to.throw(
      'password not be at least 8 characters long'
    );
  });

  after((done) =>
    writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf-8', (error) =>
      done(error)
    )
  );
});
