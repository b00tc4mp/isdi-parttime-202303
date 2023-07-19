const { retrieveLevel } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { levelId } = req.params;
    return retrieveLevel(levelId).then((level) => res.json(level))
})