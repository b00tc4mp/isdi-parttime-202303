const { retrieveLevelsByFollowed } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    return retrieveLevelsByFollowed(userId).then((levels) => res.json(levels));
})