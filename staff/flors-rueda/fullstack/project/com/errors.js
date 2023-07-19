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
    get name() { return UnexpectedError.name }
}



module.exports = {
    ContentError,
    FormatError,
    DuplicityError,
    UnknownError,
}