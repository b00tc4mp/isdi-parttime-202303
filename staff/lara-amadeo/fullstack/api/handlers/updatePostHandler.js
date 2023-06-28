const { retrieveToken } = require('../helpers')
const { updatePost } = require('../logic')

module.exports = (req, res) => {
    try {
        const { postId } = req.params

        const { image, text } = req.body

        const userId = retrieveToken(req)

        updatePost(userId, postId, image, text)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}