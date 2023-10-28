const { retrievePost } = require('../logic')
const { extractUserId } = require('./helpers')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { postId } = req.params

    return retrievePost(userId, postId)
        .then(post => res.json(post))
})