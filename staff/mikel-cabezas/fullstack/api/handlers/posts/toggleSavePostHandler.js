const { toggleSavePost } = require('../../logic/posts')
const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { postId } = req.params

    toggleSavePost(userId, postId)
        .then(() => res.status(204).send())

})