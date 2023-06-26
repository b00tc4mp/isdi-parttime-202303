const { authenticateUser } = require('../logic')

module.exports = (req, res) => {
    try {
        const { username, password } = req.body;

        authenticateUser(username, password)
            .then((userId) => res.json(userId))
            .catch((error) => res.status(400).json({ error: error.message }));

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}