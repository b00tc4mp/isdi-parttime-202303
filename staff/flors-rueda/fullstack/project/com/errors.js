class ContentError extends Error {
    constructor(message) {
        super(message);
    }
    get name() { return ContentError.name };
}


module.exports = {
    ContentError,
}