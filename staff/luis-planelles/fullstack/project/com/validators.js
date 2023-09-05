const { ContentError, ExistenceError } = require('./errors');

const validateName = (name) => {
  const containsSpaces = /\s/g;

  if (typeof name !== 'string') throw new TypeError('name is not a string');
  if (!name.length) throw new ContentError('name is empty');
  if (containsSpaces.test(name)) throw new ContentError('name contains spaces');
};

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (typeof email !== 'string') throw new TypeError('email is not a string');
  if (!email.length) throw new ContentError('email is empty');
  if (!emailRegex.test(email)) throw new ContentError('invalid email');
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
};

const validateId = (id, explain = 'id') => {
  const regexHex = /^[0-9a-fA-F]/;

  if (typeof id !== 'string') throw new TypeError(`${explain} is not a string`);
  if (!id.trim().length) throw new ContentError(`${explain} is empty`);
  if (id.trim().length !== 24)
    throw new ContentError(`${explain} does not have 24 characters`);
  if (!regexHex.test(id))
    throw new ContentError(`${explain} is not hexagecimal`);
};

const validateText = (text, explain = 'text') => {
  if (typeof text !== 'string')
    throw new TypeError(`${explain} is not a string`);
  if (!text.trim().length) throw new ContentError(`${explain} is empty`);
};

const validateArrayOfObjects = (array, explain = 'array of objects') => {
  if (!Array.isArray(array)) {
    throw new TypeError(`${explain} is not an array`);
  }

  if (array.length === 0) {
    throw new ContentError(`${explain} is empty`);
  }

  array.forEach((object, index) => {
    validateObject(object, `${explain} at index ${index}`);
  });
};

const validateObject = (object, explain = 'object') => {
  if (typeof object !== 'object' || object === null || Array.isArray(object))
    throw new TypeError(`${explain} is not an object`);
};

const validateDate = (date, explain = 'date') => {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new TypeError(`${explain} is not a valid Date object`);
  }
};

const validateTraveler = (traveler) => {
  validateText(traveler, 'traveler');

  const travelers = ['monkey', 'robot', 'dog', 'billionaire'];

  if (!travelers.includes(traveler)) {
    throw new ExistenceError(`traveler named ${traveler} doesnt exist`);
  }
};

const validateDestination = (destination) => {
  validateText(destination, 'destination');

  const destinations = ['moon', 'mars', 'unexplored_planet'];

  if (!destinations.includes(destination)) {
    throw new ExistenceError(`destination named ${destination} doesnt exist`);
  }
};

const validateParticipants = (participants) => {
  if (!Array.isArray(participants)) {
    throw new TypeError(`${participants} is not an array`);
  }
  if (participants.length === 0) {
    throw new ContentError(`${participants} is empty`);
  }

  participants.forEach((participant) => {
    validateObject(participant, 'participant');
    validateText(participant.name, 'participant name');
  });
};

const validateToken = (token, explain = 'token') => {
  if (typeof token !== 'string')
    throw new TypeError(`${explain} is not a string`);
  if (token.split('.').length !== 3)
    throw new ContentError(`${explain} is not a valid`);
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateId,
  validateText,
  validateObject,
  validateDate,
  validateTraveler,
  validateDestination,
  validateParticipants,
  validateArrayOfObjects,
  validateToken,
};
