const { createLevel } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const author = extractUserId(req);
    const { name, layout, hp } = req.body;
    return createLevel(name, layout, hp, author).then(() => res.status(201).send());
})