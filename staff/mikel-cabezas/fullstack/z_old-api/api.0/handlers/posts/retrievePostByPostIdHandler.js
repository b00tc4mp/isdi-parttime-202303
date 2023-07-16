const { retrievePostByPostId } = require('../../logic/posts')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {

    try {
        const userId = extractUserId(req)

        const { postId } = req.params

        retrievePostByPostId(userId, postId)
            .then(post => res.status(200).send(post))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}