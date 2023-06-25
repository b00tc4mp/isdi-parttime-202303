const { extractUserId } = require('../helpers')
const { sellPost } = require('../logic')

module.exports = (req, res) => {
    try {
        const { postId } = req.params
        const userId = extractUserId(req)
        const { newPrice }  = req.body

        sellPost(userId, postId, newPrice)
            .then(() => res.status(201).send())
            .catch(error => res.status(400).json({ error: error.stack }))
    } catch (error) {
        res.status(400).json({ error: error.stack })
    }
}