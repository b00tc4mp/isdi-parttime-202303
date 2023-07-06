const { extractUserId } = require('../helpers')
const { retrievePosts } = require('../logic')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        retrievePosts(userId)
            .then(posts => res.json(posts))
            .catch(error => res.status(400).json({ error: error.message }))

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}