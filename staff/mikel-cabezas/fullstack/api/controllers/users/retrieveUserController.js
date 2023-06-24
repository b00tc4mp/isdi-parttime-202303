const { retrieveUser } = require('../../logic/users')
const { extractUserId } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)
        retrieveUser(userId)
            .then(user => res.status(200).json(user))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}