const { retrieveLevelsByAuthor } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { authorId } = req.params;
    const userId = extractUserId(req);
    return retrieveLevelsByAuthor(userId, authorId).then((levels) => res.json(levels));
})