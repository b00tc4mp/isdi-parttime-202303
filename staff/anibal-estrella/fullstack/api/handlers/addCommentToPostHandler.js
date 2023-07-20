const { addCommentToPost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { postId } = req.params
    const { text } = req.body

    return addCommentToPost(userId, postId, text)
        // this is a POST so it doesn't need send any content to client just a success 201 status
        .then(() => res.status(201).send())
})