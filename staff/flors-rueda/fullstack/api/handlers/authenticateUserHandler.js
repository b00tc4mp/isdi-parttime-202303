const { authenticateUser } = require('../logic')

//TODO change name to handlers

module.exports = (req, res) => {
    try {
        const { username, password } = req.body;

        authenticateUser(username, password, (error, userId) => {
            if (error) {
                res.status(400).json({ error: error.message });
                return;
            }

            res.json({ userId });
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}