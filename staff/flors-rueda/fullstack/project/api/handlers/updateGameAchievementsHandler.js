const { updateGameAchievements } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    const { gameData } = req.body;
    return updateGameAchievements(userId, gameData).then(() => res.status(201).send());
});