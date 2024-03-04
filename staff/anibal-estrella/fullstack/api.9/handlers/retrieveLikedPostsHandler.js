const { retrieveLikedPosts } = require('../logic')
const { extractToken } = require('../helpers')

const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    try {
        const userId = extractToken(req)

        retrieveLikedPosts(userId, (error, user) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.json(user)
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}