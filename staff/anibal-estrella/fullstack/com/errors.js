class DuplicityError extends Error {
    // constructor function
    constructor(message) {
        super(message)

        //this.name = DuplicityError.name
    }
    // "getter" to set an estatic property of the constructor function of the class
    get name() { return DuplicityError.name }
}

class ContentError extends Error {
    constructor(message) {
        super(message)
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

module.exports = {
    DuplicityError,
    ContentError,
    ExistenceError,
    AuthError
}