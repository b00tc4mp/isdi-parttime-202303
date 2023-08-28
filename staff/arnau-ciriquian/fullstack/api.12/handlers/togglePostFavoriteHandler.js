const { togglePostFavorite } = require('../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        const { postId } = req.params
    
        togglePostFavorite(userId, postId)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}