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

module.exports = {
    DuplicityError,
    ContentError,
    ExistenceError,
    AuthError,
    InvalidDataError
}