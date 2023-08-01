const { editPost } = require('../../logic/posts')
const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { title, text, image, visibility } = req.body
    const { postId } = req.params
    return editPost(userId, postId, title, text, image, visibility)
        .then(() => res.status(204).send())
})