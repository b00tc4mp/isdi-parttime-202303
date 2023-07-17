const { addCommentToPost } = require('../logic')
const { extractUserId } = require('./helpers')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { postId } = req.params

    const { text } = req.body

    return addCommentToPost(userId, postId, text)
        .then(() => res.status(201).send())
})