const { removeCommentFromPost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { postId, commentId } = req.params

    return removeCommentFromPost(userId, postId, commentId)
        // this is a POST so it doesn't need send any content to client just a success 204 status no BODY in the repsonse
        .then(() => res.status(204).send())
})