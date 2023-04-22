import { areNewOldPasswordsEqual, confirmPassword, isIdRegistered, isMailRegistered, isPasswordCorrect, isPasswordSafe, isUsernameRegistered } from '../helpers.js';

export const validateMail = (mail) => {
  if(typeof mail !== 'string') throw new Error('mail is not an string');
  if(!mail.trim().length) throw new Error('mail is empty');
  const regexRule = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if(!regexRule.test(mail)) throw new Error('mail format is not valid');
  if(isMailRegistered(mail)) throw new Error('mail is already registered');
};

const validatePassword = (password) => {
  if(typeof password !== 'string') throw new Error('password is not a string');
}

export const validateUserPassword = (id, password) => {
  validatePassword(password)
  if(!isPasswordCorrect(id, password)) throw Error('password incorrect');
};

export const validateRepeatPassword = (password, repeatPassword) => {
  if(!confirmPassword(password, repeatPassword)) throw new Error('password and confirmation password are different');
};

export const validateNewPassword = (password, repeatPassword) => {
  validatePassword(password);
  validatePassword(repeatPassword);
  if(!isPasswordSafe(password)) throw new Error('password is not safe');
  if(!confirmPassword(password, repeatPassword)) throw new Error('password and confirmation password are different');
};

export const validatePasswordChange = (id, newPassword) => {
  validatePassword(newPassword);
  if(areNewOldPasswordsEqual(id, newPassword)) throw new Error('new and old password are the same');
};

export const validateName = (name) => {
  if(typeof name !== 'string') throw new Error('name is not a string');
  if(!name.trim().length) throw new Error('name is empty');
};

export const validateUsername = (username) => {
  if(typeof username !== 'string') throw new Error('username is not a string');
  if(!username.trim().length) throw new Error('username is empty');
  if(!isUsernameRegistered(username)) throw new Error('username does not exist');
  const regexRule = /^@[a-z0-9]*$/;
  if(!regexRule.test(username)) throw new Error('username format is not correct');
};

export const validateNewUsername = (username) => {
  if(typeof username !== 'string') throw new Error('username is not a string');
  if(!username.trim().length) throw new Error('username is empty');
  if(isUsernameRegistered(username)) throw new Error('username not available');
  const regexRule = /^@[a-z0-9]*$/;
  if(!regexRule.test(username)) throw new Error('username format is not correct');
}

export const validateAvatarUrl = (url) => {
    if(typeof url !== 'string') throw new Error('url is not a string');
    if(!url.trim().length) throw new Error('url is empty');
    const regexRule = /^\s*(?:(?:[A-Za-z0-9+/]{4})+\s*)*[A-Za-z0-9+/]*={0,2}\s*$/;
    if (regexRule.test(url)) throw new Error('is not an image url');
};

export const validateUserID = (id) => {
  if(typeof id !== 'string') throw new Error('id is not a string');
  if(!id.trim().length) throw new Error('id is empty');
  if(!isIdRegistered(id)) throw new Error('id does not exist');
};