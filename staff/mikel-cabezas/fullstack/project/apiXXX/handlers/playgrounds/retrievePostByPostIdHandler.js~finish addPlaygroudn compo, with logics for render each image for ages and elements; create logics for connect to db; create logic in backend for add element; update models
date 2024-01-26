const { retrievePostByPostId } = require('../../logic/playgrounds')
const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { postId } = req.params

    return retrievePostByPostId(userId, postId)
        .then(post => res.status(200).send(post))
})