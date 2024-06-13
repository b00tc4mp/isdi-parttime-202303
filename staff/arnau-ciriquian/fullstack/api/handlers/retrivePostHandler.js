const { retrivePost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { postId } = req.params

    return retrivePost(userId, postId)
        .then(post => res.json(post))
})