const { extractUserId, handleErrors } = require('./helpers')
const { toggleFavPost } = require('../logic')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { postId } = req.params

    return toggleFavPost(userId, postId)
        .then(() => res.status(201).send())
})