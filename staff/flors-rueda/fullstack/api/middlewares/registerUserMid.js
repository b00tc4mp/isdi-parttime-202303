const { registerUser } = require('../logic')

module.exports = (req, res) => {
    try {
        const { mail, username, password, repeatPassword } = req.body;
        registerUser(mail, username, password, repeatPassword, error => {
            if (error) {
                res.status(400).json({ error: error.message });
                return;
            }

            res.status(201).send();
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}