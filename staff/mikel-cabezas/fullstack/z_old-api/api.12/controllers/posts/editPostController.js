const { editPost } = require('../../logic/posts')
const { extractToken } = require('../../helpers')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {

    try {
        const token = extractToken(req)

        const payload = jwt.verify(token, process.env.SECRET)

        const { sub: userId } = payload

        const { title, text, image, visibility } = req.body
        const { postId } = req.params

        editPost(userId, postId, title, text, image, visibility)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}