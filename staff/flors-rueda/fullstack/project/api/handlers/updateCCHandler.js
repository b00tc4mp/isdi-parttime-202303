const { updateCC } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

/**
 * Route handler to update a user's amount of customization credits.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully updating the cc.
 * @throws {Error} If there is an error.
 */
module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    const { cc, operator } = req.body;
    return updateCC(userId, cc, operator).then(() => res.status(201).send());
})