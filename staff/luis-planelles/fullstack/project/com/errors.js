class DuplicityError extends Error {
  constructor(message) {
    super(message);
  }

  get name() {
    return DuplicityError.name;
  }
}

class ContentError extends Error {
  constructor(message) {
    super(message);
  }

  get name() {
    return ContentError.name;
  }
}

class ExistenceError extends Error {
  constructor(message) {
    super(message);
  }

  get name() {
    return ExistenceError.name;
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
  }

  get name() {
    return AuthError.name;
  }
}

class UnknowError extends Error {
  constructor(message) {
    super(message);
  }

  get name() {
    return UnknowError.name;
  }
}

class ConnectionError extends Error {
  constructor(message) {
    super(message);
  }

  get name() {
    return ConnectionError.name;
  }
}

module.exports = {
  DuplicityError,
  ContentError,
  ExistenceError,
  AuthError,
  UnknowError,
  ConnectionError,
};
