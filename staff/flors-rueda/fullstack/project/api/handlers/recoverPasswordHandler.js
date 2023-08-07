const { recoverPassword } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { username, newPassword } = req.params;
    return recoverPassword(username, newPassword)
        .then(() => res.status(201).send());
})