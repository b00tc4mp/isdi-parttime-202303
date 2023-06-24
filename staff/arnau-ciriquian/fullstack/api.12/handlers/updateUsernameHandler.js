const { updateUsername } = require('../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        const { username, newUsername, password } = req.body

        updateUsername(userId, username, newUsername, password)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
            
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}