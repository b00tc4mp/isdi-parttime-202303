const { extractToken } = require('../helpers')
const { retrievePosts } = require('../logic')

module.exports = (req, res) => {
    try {
        const userId = extractToken(req)

        retrievePosts(userId, (error, posts) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(200).json({ posts })
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}