const { retrieveSavedPosts } = require('../../logic/posts')
const { extractUserId } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        retrieveSavedPosts(userId)
            .then(posts => res.status(200).send(posts))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
