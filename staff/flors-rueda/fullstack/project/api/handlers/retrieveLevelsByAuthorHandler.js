const { retrieveLevelsByAuthor } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { authorId } = req.params;
    return retrieveLevelsByAuthor(authorId).then((levels) => res.json(levels));
})