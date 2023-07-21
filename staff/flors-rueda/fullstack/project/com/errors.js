class ContentError extends Error {
    constructor(message) {
        super(message);
    }
    get name() { return ContentError.name };
}

class FormatError extends Error {
    constructor(message) {
        super(message);
    }
    get name() { return FormatError.name };
}

class DuplicityError extends Error {
    constructor(message) {
        super(message)
    }
    get name() { return DuplicityError.name }
}

class UnknownError extends Error {
    constructor(message) {
        super(message)
    }
    get name() { return UnknownError.name }
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

class RegisterError extends Error {
    constructor(message) {
        super(message)
    }
    get name() { return RegisterError.name }
}



module.exports = {
    ContentError,
    FormatError,
    DuplicityError,
    UnknownError,
    ExistenceError,
    AuthError,
    RegisterError
}