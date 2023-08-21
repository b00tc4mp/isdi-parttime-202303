const { deleteLevel } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    const { levelId } = req.params;
    return deleteLevel(userId, levelId).then(() => res.status(200).send());
})