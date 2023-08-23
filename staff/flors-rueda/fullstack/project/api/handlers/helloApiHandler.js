const { handleErrors } = require('./helpers');

/**
 * Route handler for a simple API greeting.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {void}
 */
module.exports = handleErrors((req, res) => res.send('Hello, API!'));