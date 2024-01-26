const { retrieveCC } = require('../logic');
const { handleErrors } = require('./helpers');

/**
 * Route handler for retrieving the customization credits of a user.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully retriving the cc.
 * @throws {Error} If there is an error while retriving the user cc or handling errors.
 */
module.exports = handleErrors((req, res) => {
    const { userId } = req.params;
    return retrieveCC(userId).then((cc) => res.json(cc))
})