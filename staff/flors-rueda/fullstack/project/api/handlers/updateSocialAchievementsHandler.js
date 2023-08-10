const { updateSocialAchievements } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    return updateSocialAchievements(userId).then(() => res.status(201).send());
})