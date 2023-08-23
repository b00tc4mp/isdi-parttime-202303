const { createLevel } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

/**
 * Route handler for creating a new level.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully creating a new level.
 * @throws {Error} If there is an error while creating a new level or handling errors.
 */
module.exports = handleErrors((req, res) => {
    const author = extractUserId(req);
    const { name, layout, hp } = req.body;
    return createLevel(name, layout, hp, author).then(() => res.status(201).send());
})