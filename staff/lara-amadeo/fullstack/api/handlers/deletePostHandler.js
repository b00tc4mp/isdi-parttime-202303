const { retrieveToken } = require('../helpers')
const { deletePost } = require('../logic')

module.exports = (req, res) => {
    try {
        const { postId } = req.params

        const userId = retrieveToken(req)

        deletePost(userId, postId)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) { res.status(400).json({ error: error.message }) }
}