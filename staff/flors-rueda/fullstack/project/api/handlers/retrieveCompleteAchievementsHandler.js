const { retrieveCompleteAchievements } = require('../logic');
const { handleErrors } = require('./helpers');

/**
 * Route handler to retrieve all complete achievements of a user.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully retrieve all the complete achievements.
 * @throws {Error} If there is an error.
 */
module.exports = handleErrors((req, res) => {
    const { userId } = req.params;
    return retrieveCompleteAchievements(userId).then((achievements) => res.json(achievements));
})