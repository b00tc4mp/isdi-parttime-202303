const { updateTutorialAchievements } = require('../logic');
const { handleErrors, extractUserId, sendAchievementNotification } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    return updateTutorialAchievements(userId).then((achievementsToSendNotification) => {
        achievementsToSendNotification.forEach(achievement => {
            sendAchievementNotification(achievement);
        });

        return res.status(201).send();
    });
})