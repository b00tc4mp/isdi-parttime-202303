const { retrieveLikedPosts } = require('../../logic/posts')
const { extractToken } = require('../../helpers')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    try {
        const token = extractToken(req)

        const payload = jwt.verify(token, process.env.SECRET)

        const { sub: userId } = payload

        retrieveLikedPosts(userId)
            .then(posts => res.status(200).send(posts))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}