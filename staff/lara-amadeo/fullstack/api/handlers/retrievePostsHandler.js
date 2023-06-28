const { retrieveToken } = require('../helpers')
const { retrievePosts } = require('../logic')

module.exports = (req, res) => {
    try {
        const userId = retrieveToken(req)

        retrievePosts(userId)
            .then(posts => res.status(200).json({ posts }))
            .catch(error => res.status(400).json({ error: error.stack }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}