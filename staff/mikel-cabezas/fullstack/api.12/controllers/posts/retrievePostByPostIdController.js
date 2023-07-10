const { retrievePostByPostId } = require('../../logic/posts')
const { extractToken } = require('../../helpers')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {

    try {
        const token = extractToken(req)

        const payload = jwt.verify(token, process.env.SECRET)

        const { sub: userId } = payload

        const { postId } = req.params

        retrievePostByPostId(userId, postId)
            .then(post => res.status(200).send(post))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}