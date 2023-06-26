const { extractUserId } = require('../helpers');
const { updatePassword } = require('../logic');

module.exports = (req, res) => {
    try {
        const { oldPassword, newPassword, repeatPassword } = req.body;
        const userAuth = extractUserId(req);

        updatePassword(userAuth, oldPassword, newPassword, repeatPassword)
            .then(() => res.status(201).send())
            .catch((error) => res.status(400).json({ error: error.message }));

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
