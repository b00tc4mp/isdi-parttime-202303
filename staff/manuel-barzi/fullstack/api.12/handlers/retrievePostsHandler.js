const { retrievePosts } = require('../logic')
const { extractUserId } = require('./helpers')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        retrievePosts(userId)
            .then(user => res.json(user))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}