const { cleanSession } = require('../logic');
const { handleErrors } = require('./helpers');

/**
 * Route handler to clean the logged user old sessions.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A promise that resolves when the verification result is sent in the response.
 */
module.exports = handleErrors((req, res) => {
    const { userId } = req.params;
    return cleanSession(userId).then(() => res.status(201).send());
})