const { updateSocialAchievements } = require('../logic');
const { handleErrors, extractUserId, sendAchievementNotification } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    return updateSocialAchievements(userId).then((achievementsToSendNotification) => {
        achievementsToSendNotification.forEach(achievement => {
            sendAchievementNotification(achievement, userId);
        });

        return res.status(201).send();
    });
})