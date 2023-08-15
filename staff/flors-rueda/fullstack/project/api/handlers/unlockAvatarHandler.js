const { unlockAvatar } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    const { avatar } = req.body;
    return unlockAvatar(userId, avatar).then(() => res.status(201).send());
})