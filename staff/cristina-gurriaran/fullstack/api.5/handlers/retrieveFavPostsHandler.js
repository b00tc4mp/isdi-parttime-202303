const { extractUserId } = require('../helpers')
const { retrieveFavPosts } = require('../logic')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        retrieveFavPosts(userId, (error, posts) => {
            if (error) {
                res.status(400).json({ error: error.message })
                return
            }
            res.json(posts)
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}