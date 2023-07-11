const { extractToken } = require('../helpers')
const { toggleLikePost } = require('../logic')

module.exports = (req, res) => {
    try {
        const { postId } = req.params
        const userId = extractToken(req)


        toggleLikePost(userId, postId, error => {
            if (error) {
                res.status(400).json({ error: error.message })
            }

            res.status(201).send()
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}