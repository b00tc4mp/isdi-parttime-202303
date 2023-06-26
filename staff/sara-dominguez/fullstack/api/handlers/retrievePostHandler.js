const { retrievePost } = require('../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        const { postId } = req.body

        retrievePost(userId, postId)
            .then(() => res.status(200).send())
            .catch(error => res.status(404).json({ message: error.message }))
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}