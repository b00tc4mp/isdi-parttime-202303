const { registerUser } = require('../logic');
const { handleErrors } = require('./helpers');
const bcrypt = require('bcryptjs');

module.exports = handleErrors((req, res) => {
    const { username, password, color, recoveryQuestions } = req.body;

    const cryptPassword = bcrypt.hashSync(password, 8);

    return (async () => {
        await registerUser(username, cryptPassword, color, recoveryQuestions);
        res.status(201).send();
    });
});