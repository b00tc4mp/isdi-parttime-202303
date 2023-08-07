const { retrieveRandomRecoveryQuestion } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { username } = req.params;
    return retrieveRandomRecoveryQuestion(username)
        .then(recoveryQuestion => res.json(recoveryQuestion));
})