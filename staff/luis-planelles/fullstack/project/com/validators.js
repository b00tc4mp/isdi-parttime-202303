const { ContentError } = require('./errors');

const validateName = (name) => {
  const containsSpaces = /\s/g;

  if (typeof name !== 'string') throw new TypeError('name is not a string');
  if (!name.length) throw new ContentError('name is empty');
  if (containsSpaces.test(name)) throw new ContentError('name contains spaces');

  return name.trim();
};

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (typeof email !== 'string') throw new TypeError('email is not a string');
  if (!email.length) throw new ContentError('email is empty');
  if (!emailRegex.test(email)) throw new ContentError('invalid email');

  return email;
};

const validatePassword = (password, type = 'password') => {
  const isLongEnough = password.length >= 8;
  const hasDigit = /\d/;
  const hasLowercase = /[a-z]/;
  const hasUppercase = /[A-Z]/;
  const hasSpecialChar = /[!@#$%^&*()_+~`=[\]{}|:;"'<,>.?/]/;
  const noWhitespace = /^\S+$/;

  if (typeof password !== 'string')
    throw new TypeError(`${type} is not a string`);
  if (!password.length) throw new ContentError(`${type} is empty`);
  if (!isLongEnough)
    throw new RangeError(`${type} not be at least 8 characters long`);
  if (!hasDigit.test(password))
    throw new ContentError(`${type} not contains one digit`);
  if (!hasLowercase.test(password))
    throw new ContentError(`${type} not contains one lowercase letter`);
  if (!hasUppercase.test(password))
    throw new ContentError(`${type} not contains one uppercase letter`);
  if (!hasSpecialChar.test(password))
    throw new ContentError(`${type} not contains one special character`);
  if (!noWhitespace.test(password))
    throw new ContentError(`${type} contains any whitespace characters`);

  return password;
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
