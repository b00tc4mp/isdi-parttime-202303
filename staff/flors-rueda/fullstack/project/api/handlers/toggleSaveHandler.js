const { toggleSave } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    const { levelId } = req.params;
    return toggleSave(levelId, userId).then(() => res.status(201).send());
})