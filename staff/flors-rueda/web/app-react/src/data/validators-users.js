import { areNewOldPasswordsEqual, confirmPassword, isIdRegistered, isMailRegistered, isPasswordCorrect, isPasswordSafe, isUsernameRegistered } from './helpers.js';

export const validateMail = (mail) => {
  if (typeof mail !== 'string') throw new Error('mail is not an string', { cause: 'mail' });
  if (!mail.trim().length) throw new Error('mail is empty', { cause: 'mail' });
  const regexRule = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!regexRule.test(mail)) throw new Error('mail format is not valid', { cause: 'mail' });
  if (isMailRegistered(mail)) throw new Error('mail is already registered', { cause: 'mail' });
};

const validatePassword = (password) => {
  if (typeof password !== 'string') throw new Error('password is not a string', { cause: 'password' });
}

export const validateUserPassword = (id, password) => {
  validatePassword(password)
  if (!isPasswordCorrect(id, password)) throw Error('password incorrect', { cause: 'password' });
};

export const validateRepeatPassword = (password, repeatPassword) => {
  if (!confirmPassword(password, repeatPassword)) throw new Error('password and confirmation password are different', { cause: 'password' });
};

export const validateNewPassword = (password, repeatPassword) => {
  validatePassword(password);
  validatePassword(repeatPassword);
  if (!isPasswordSafe(password)) throw new Error('password is not safe', { cause: 'password' });
  if (!confirmPassword(password, repeatPassword)) throw new Error('password and confirmation password are different', { cause: 'password' });
};

export const validatePasswordChange = (id, newPassword) => {
  validatePassword(newPassword);
  if (areNewOldPasswordsEqual(id, newPassword)) throw new Error('new and old password are the same', { cause: 'password' });
};

export const validateName = (name) => {
  if (typeof name !== 'string') throw new Error('name is not a string', { cause: 'name' });
  if (!name.trim().length) throw new Error('name is empty', { cause: 'name' });
};

export const validateUsername = (username) => {
  if (typeof username !== 'string') throw new Error('username is not a string', { cause: 'username' });
  if (!username.trim().length) throw new Error('username is empty', { cause: 'username' });
  if (!isUsernameRegistered(username)) throw new Error('username does not exist', { cause: 'username' });
  const regexRule = /^@[a-z0-9]*$/;
  if (!regexRule.test(username)) throw new Error('username format is not correct', { cause: 'username' });
};

export const validateNewUsername = (username) => {
  if (typeof username !== 'string') throw new Error('username is not a string', { cause: 'username' });
  if (!username.trim().length) throw new Error('username is empty', { cause: 'username' });
  if (isUsernameRegistered(username)) throw new Error('username not available', { cause: 'username' });
  const regexRule = /^@[a-z0-9]*$/;
  if (!regexRule.test(username)) throw new Error('username format is not correct', { cause: 'username' });
}

export const validateAvatarUrl = (url) => {
  if (typeof url !== 'string') throw new Error('url is not a string', { cause: 'avatar' });
  if (!url.trim().length) throw new Error('url is empty', { cause: 'avatar' });
  const regexRule = /^\s*(?:(?:[A-Za-z0-9+/]{4})+\s*)*[A-Za-z0-9+/]*={0,2}\s*$/;
  if (regexRule.test(url)) throw new Error('is not an image url', { cause: 'avatar' });
};

export const validateUserID = (id) => {
  if (typeof id !== 'string') throw new Error('id is not a string', { cause: 'id' });
  if (!id.trim().length) throw new Error('id is empty', { cause: 'id' });
  if (!isIdRegistered(id)) throw new Error('id does not exist', { cause: 'id' });
};