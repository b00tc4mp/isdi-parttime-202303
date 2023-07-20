const { registerUser } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { username, password, color, recoveryQuestions } = req.body;

    return (async () => {
        await registerUser(username, password, color, recoveryQuestions);
        res.status(201).send();
    });
});