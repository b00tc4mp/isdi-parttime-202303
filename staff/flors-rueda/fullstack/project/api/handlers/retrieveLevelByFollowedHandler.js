const { retrieveLevelsByFollowed } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { userId } = req.params;
    return retrieveLevelsByFollowed(userId).then((levels) => res.json(levels));
})