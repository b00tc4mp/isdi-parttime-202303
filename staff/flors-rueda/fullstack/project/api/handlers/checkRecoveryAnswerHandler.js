const { checkRecoveryAnswer } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { username, questionId, answer } = req.params;
    return checkRecoveryAnswer(username, questionId, answer)
        .then(match => res.json(match));
})