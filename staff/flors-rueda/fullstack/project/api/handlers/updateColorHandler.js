const { updateColor } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    const { color } = req.body;
    return updateColor(userId, color).then(() => res.status(201).send());
})