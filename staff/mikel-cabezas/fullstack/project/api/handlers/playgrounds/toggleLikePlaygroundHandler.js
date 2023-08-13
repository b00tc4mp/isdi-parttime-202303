const { toggleLikePlayground } = require('../../logic/playgrounds')
const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { postId } = req.params

    return toggleLikePlayground(userId, postId)
        .then(playground => {
            res.status(204).send(playground)
        })
})