const { createSession } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { userId, socketId } = req.params;
    return createSession(userId, socketId).then(() => res.status(201).send());
})