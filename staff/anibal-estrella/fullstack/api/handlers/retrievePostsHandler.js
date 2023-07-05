const { retrievePosts } = require('../logic')
const { extractUserId } = require('./helpers')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    try {
        const token = extractUserId(req)
        const payload = jwt.verify(token, process.env.SECRET)
        const { sub: userId } = payload

        retrievePosts(userId)
            .then(user => res.json(user))
            .catch(error => res.status(400).json({ error: error.message }))
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}
