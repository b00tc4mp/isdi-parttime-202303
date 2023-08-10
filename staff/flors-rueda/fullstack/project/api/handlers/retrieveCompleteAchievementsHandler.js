const { retrieveCompleteAchievements } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { userId } = req.params;
    return retrieveCompleteAchievements(userId).then((achievements) => res.json(achievements));
})