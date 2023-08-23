const { editLevel } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

/**
 * Route handler for editing a level.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully editing a level.
 * @throws {Error} If there is an error while editing a level or handling errors.
 */

module.exports = handleErrors((req, res) => {
    const author = extractUserId(req);
    const { levelId } = req.params;
    const { name, layout, hp } = req.body;
    return editLevel(levelId, author, layout, name, hp).then(() => res.status(201).send());
})