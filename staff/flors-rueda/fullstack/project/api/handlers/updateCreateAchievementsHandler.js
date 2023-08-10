const { updateCreateAchievements } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    const { createData } = req.body;
    return updateCreateAchievements(userId, createData).then(() => res.status(201).send());
})