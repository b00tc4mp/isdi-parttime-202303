const validateName = (name) => {
  const containsSpaces = /\s/g;

  if (typeof name !== 'string') throw new TypeError('name is not a string');
  if (!name.length) throw new Error('name is empty');
  if (containsSpaces.test(name)) throw new Error('name contains spaces');

  return name.trim();
};

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (typeof email !== 'string') throw new TypeError('email is not a string');
  if (!email.length) throw new Error('email is empty');
  if (!emailRegex.test(email)) throw new Error('invalid email');

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
  if (!password.length) throw new Error(`${type} is empty`);
  if (!isLongEnough)
    throw new Error(`${type} not be at least 8 characters long`);
  if (!hasDigit.test(password))
    throw new Error(`${type} not contains one digit`);
  if (!hasLowercase.test(password))
    throw new Error(`${type} not contains one lowercase letter`);
  if (!hasUppercase.test(password))
    throw new Error(`${type} not contains one uppercase letter`);
  if (!hasSpecialChar.test(password))
    throw new Error(`${type} not contains one special character`);
  if (!noWhitespace.test(password))
    throw new Error(`${type} contains any whitespace characters`);

  return password;
};

const validateUrl = (url, explain = 'url') => {
  if (typeof url !== 'string')
    throw new TypeError(`${explain} is not a string`);
  if (!url.trim().length) throw new Error(`${explain} is empty`);
};

const validateText = (text, explain = 'text') => {
  if (typeof text !== 'string')
    throw new TypeError(`${explain} is not a string`);
  if (!text.trim().length) throw new Error(`${explain} is empty`);
};

const validateNumber = (number, explain = 'number') => {
  if (typeof number !== 'number' || isNaN(number))
    throw new TypeError(`${explain} is not a number`);
};

const validateId = (id, explain = 'id') => {
  if (typeof id !== 'string') throw new TypeError(`${explain} is not a string`);
  if (token.split('.').length !== 3)
    throw new Error(`${explain} is not a valid`);
};

const validateToken = (id, explain = 'token') => {
  if (typeof id !== 'string') throw new TypeError(`${explain} is not a string`);
  if (!id.trim().length) throw new Error(`${explain} is empty`);
};

const validateCallback = (callback, explain = 'callback') => {
  if (typeof callback !== 'function')
    throw new TypeError(`${explain} is not a function`);
};

module.exports = {
  validateId,
  validateToken,
  validateText,
  validateNumber,
  validateUrl,
  validateEmail,
  validateName,
  validatePassword,
  validateCallback,
};
