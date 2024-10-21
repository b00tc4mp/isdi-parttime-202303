const { retrieveFavPosts } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = (req, res) => {

    const userId = extractUserId(req)

    const { postId } = req.params

    return retrieveFavPosts(userId, postId).then(() => res.status(204).send())
}