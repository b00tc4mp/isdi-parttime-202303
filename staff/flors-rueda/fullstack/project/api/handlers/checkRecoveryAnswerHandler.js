const { checkRecoveryAnswer } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { username, questionId, answer } = req.body;
    return checkRecoveryAnswer(username, questionId, answer)
        .then(match => res.json(match));
})