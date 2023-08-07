const { retrieveRandomRecoveryQuestion } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { username } = req.body;
    return retrieveRandomRecoveryQuestion(username)
        .then(recoveryQuestion => res.json(recoveryQuestion));
})