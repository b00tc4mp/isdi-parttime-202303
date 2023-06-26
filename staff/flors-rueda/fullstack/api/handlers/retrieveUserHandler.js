const { retrieveUser } = require('../logic')

module.exports = (req, res) => {
    try {
        const { userId } = req.params;
        retrieveUser(userId)
            .then((user) => res.json(user))
            .catch((error) => res.status(400).json({ error: error.message }));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}