const { retrieveLevel } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { levelId } = req.params;
    const userId = extractUserId(req);
    return retrieveLevel(userId, levelId).then((level) => res.json(level))
})