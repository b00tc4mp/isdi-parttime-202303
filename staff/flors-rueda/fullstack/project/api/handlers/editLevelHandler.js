const { editLevel } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const author = extractUserId(req);
    const { levelId } = req.params;
    const { name, layout, hp } = req.body;
    return editLevel(levelId, author, layout, name, hp).then(() => res.status(201).send());
})