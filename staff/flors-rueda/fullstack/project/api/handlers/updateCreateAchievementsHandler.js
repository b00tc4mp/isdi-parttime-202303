const { updateCreateAchievements } = require('../logic');
const { handleErrors, extractUserId, sendAchievementNotification } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    const { createData } = req.body;
    return updateCreateAchievements(userId, createData).then((achievementsToSendNotification) => {
        achievementsToSendNotification.forEach(achievement => {
            sendAchievementNotification(achievement);
        });

        return res.status(201).send();
    });
})