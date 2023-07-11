const { extractUserId } = require('../helpers')
const { retrieveUser } = require('../logic')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        return retrieveUser(userId)
            .then(user => res.json(user))
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}