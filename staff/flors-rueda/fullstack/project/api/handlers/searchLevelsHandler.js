const { searchLevels } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { name } = req.params;
    const userId = extractUserId(req);
    return searchLevels(userId, name).then((levels) => res.json(levels));
})