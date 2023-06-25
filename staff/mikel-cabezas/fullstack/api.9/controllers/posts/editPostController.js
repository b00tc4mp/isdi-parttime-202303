const { editPost } = require('../../logic/posts')
const { extractUserId } = require('../../helpers')


module.exports = (req, res) => {

    try {
        const userId = extractUserId(req)
        const { title, text, image, visibility } = req.body
        const { postId } = req.params
        debugger

        editPost(userId, postId, title, text, image, visibility)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}