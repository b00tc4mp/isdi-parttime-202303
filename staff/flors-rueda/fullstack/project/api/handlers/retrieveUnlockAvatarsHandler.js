const { retrieveUnlockAvatars } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { userId } = req.params;
    return retrieveUnlockAvatars(userId).then((unlockAvatars) => res.json(unlockAvatars))
})