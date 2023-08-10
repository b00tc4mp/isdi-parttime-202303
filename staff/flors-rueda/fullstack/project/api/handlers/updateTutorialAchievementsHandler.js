const { updateTutorialAchievements } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    return updateTutorialAchievements(userId).then(() => res.status(201).send());
})