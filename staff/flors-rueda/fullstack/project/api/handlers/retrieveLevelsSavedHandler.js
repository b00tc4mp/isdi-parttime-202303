const { retrieveLevelsSaved } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { userId } = req.params;
    return retrieveLevelsSaved(userId).then((levels) => res.json(levels));
})