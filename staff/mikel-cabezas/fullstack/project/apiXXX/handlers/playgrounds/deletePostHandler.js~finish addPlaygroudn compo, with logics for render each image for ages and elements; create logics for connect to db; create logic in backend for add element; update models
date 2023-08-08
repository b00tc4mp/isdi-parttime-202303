const { deletePost } = require('../../logic/playgrounds')
const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { postId } = req.params

    deletePost(userId, postId)
        .then(() => res.status(204).send())
})