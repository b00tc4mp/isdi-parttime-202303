class DuplicityError extends Error {
  constructor(message) {
    super(message);
  }

  get name() {
    return DuplicityError.name;
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

module.exports = {
  DuplicityError,
  UnknowError,
};
