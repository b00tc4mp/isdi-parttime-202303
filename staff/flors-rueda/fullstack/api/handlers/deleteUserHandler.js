const { deleteUser } = require('../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
    try {
        const { password } = req.body;
        const userAuth = extractUserId(req);

        deleteUser(userAuth, password)
            .then(() => res.status(201).send())
            .catch((error) => res.status(400).json({ error: error.message }));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}