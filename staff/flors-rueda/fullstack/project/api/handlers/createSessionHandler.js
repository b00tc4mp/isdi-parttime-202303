const { createSession } = require('../logic');
const { handleErrors } = require('./helpers');

/**
 * Route handler for creating a new session.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully creating a new session.
 * @throws {Error} If there is an error while creating a new session or handling errors.
 */
module.exports = handleErrors((req, res) => {
    const { userId, socketId } = req.params;
    return createSession(userId, socketId).then(() => res.status(201).send());
})