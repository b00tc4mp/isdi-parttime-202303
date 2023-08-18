const { updateCCAchievements } = require('../logic');
const { handleErrors, extractUserId, sendAchievementNotification } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    const { cc, operator } = req.body;
    return updateCCAchievements(userId, cc, operator).then((achievementsToSendNotification) => {
        achievementsToSendNotification.forEach(achievement => {
            sendAchievementNotification(achievement, userId);
        });

        return res.status(201).send();
    });
})