const { retrieveToken } = require('../helpers')
const { sellPost } = require('../logic')

module.exports = (req, res) => {
    try {
        const { postId } = req.params

        const { newPrice } = req.body

        const userId = retrieveToken(req)

        sellPost(userId, postId, newPrice)
            .then(() => res.status(201).send())
            .catch(error => res.status(400).json({ error: error.stack }))
    } catch (error) {
        res.status(400).json({ error: error.stack })
    }
}