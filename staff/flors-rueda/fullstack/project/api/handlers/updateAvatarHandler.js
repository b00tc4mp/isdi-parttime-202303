const { updateAvatar } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    const { avatar } = req.body;
    return updateAvatar(userId, avatar).then(() => res.status(201).send());
})