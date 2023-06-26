const { retrieveUser } = require('../logic')

module.exports = (req, res) => {
    try {
        const { userId } = req.params;
        retrieveUser(userId, (error, user) => {
            if (error) {
                res.status(400).json({ error: error.message });
                return;
            }

            res.json(user);
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}