const { retrieveLevels } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const sort = parseInt(req.query.sort) || 0;
    const page = parseInt(req.query.page) || 1;

    return retrieveLevels(sort, page).then((levels) => res.json(levels));
});