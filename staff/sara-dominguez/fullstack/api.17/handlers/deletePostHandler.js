const { deletePost } = require('../logic')
const { handleErrors, extractUserId } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { postId } = req.params

    return deletePost(userId, postId).then((post) => res.status(204).json(post))

})