const { retrieveToken } = require('../helpers')
const { retrievePost } = require('../logic')
const { handleErrors } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const { postId } = req.params

    const userId = retrieveToken(req)

    return retrievePost(userId, postId)
        .then(post => res.status(200).json({ post }))
})