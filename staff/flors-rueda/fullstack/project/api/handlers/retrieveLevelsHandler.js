const { retrieveLevels } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
    return retrieveLevels().then((levels) => res.json(levels));
})