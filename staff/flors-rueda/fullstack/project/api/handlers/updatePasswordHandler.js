const { updatePassword } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    const { newPassword, oldPassword } = req.body;
    return updatePassword(userId, newPassword, oldPassword).then(() => res.status(201).send());
})