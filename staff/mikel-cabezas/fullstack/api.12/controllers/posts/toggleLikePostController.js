const { toggleLikePost } = require('../../logic/posts')
const { extractToken } = require('../../helpers')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    try {
        debugger
        const token = extractToken(req)

        const payload = jwt.verify(token, process.env.SECRET)

        const { sub: userId } = payload

        const { postId } = req.params

        debugger

        // toggleLikePost(userId, postId)
        toggleLikePost(userId, postId)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}