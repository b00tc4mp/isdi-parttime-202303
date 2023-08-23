const { updateCreateAchievements } = require('../logic');
const { handleErrors, extractUserId, sendAchievementNotification } = require('./helpers');

/**
 * Route handler to update a user's create achievements.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully updating the achievements and sends a socket notification if corresponds.
 * @throws {Error} If there is an error.
 */
module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    const { createData } = req.body;
    return updateCreateAchievements(userId, createData).then((achievementsToSendNotification) => {
        achievementsToSendNotification.forEach(achievement => {
            sendAchievementNotification(achievement, userId);
        });

        return res.status(201).send();
    });
})