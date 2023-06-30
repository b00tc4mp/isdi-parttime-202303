const { retrieveToken } = require('../helpers')
const { toggleLikePost } = require('../logic')

module.exports = (req, res) => {
    try {
        const { postId } = req.params

        const userId = retrieveToken(req)

        toggleLikePost(userId, postId)
            .then(() => res.status(201).send())
            .catch(error => res.status(400).json({ error: error.message }))

    } catch (error) {
        res.status(400).json({ error: error.stack })
    }
}