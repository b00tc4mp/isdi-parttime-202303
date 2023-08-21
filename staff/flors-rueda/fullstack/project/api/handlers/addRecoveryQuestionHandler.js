const { addRecoveryQuestion } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { password, recoveryQuestions } = req.body;
    const userId = extractUserId(req);
    return addRecoveryQuestion(userId, password, recoveryQuestions).then(() => res.status(201).send());
})
