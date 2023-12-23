class DuplicityError extends Error {
    constructor(message) {
        super(message)
    }

    get name() { return DuplicityError.name }
}

class ContentError extends Error {
    constructor(message, parameter) {
        super(message, parameter)
    }

    get name() { return ContentError.name }
}

/**
 * ExistenceError type to error
 */
class ExistenceError extends Error {
    constructor(message) {
        super(message)
    }

    get name() { return ExistenceError.name }
}

class AuthError extends Error {
    constructor(message) {
        super(message)
    }

    get name() { return AuthError.name }
}

class InvalidDataError extends Error {
    constructor(message) {
        super(message)
    }

    get name() { return InvalidDataError.name }
}

class UnknownError extends Error {
    constructor(message) {
        super(message)
    }

    get name() { return UnknownError.name }
}

module.exports = {
    DuplicityError,
    ContentError,
    ExistenceError,
    AuthError,
    InvalidDataError,
    UnknownError
}