const { extractUserId } = require('../helpers')
const { updatePost } = require('../logic')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)
        const { postId, image, location, title, text } = req.body

        updatePost(userId, postId, image, location, title, text, error => {
            if (error) {
                res.status(400).json({ error: error.message })
                return
            }
            res.status(204).send()
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}