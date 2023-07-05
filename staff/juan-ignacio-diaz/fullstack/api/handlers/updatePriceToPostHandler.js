const { updatePriceToPost } = require('../logic')

const { extractUserId, handleErrors } = require('./helpers')

module.exports = (req, res) => {
    const userId = extractUserId(req)
    const { postId } = req.params
    const { price } = req.body

    return updatePriceToPost(userId, postId, price)
        .then(res.status(204).send())
}