const { toggleLikePost } = require('../logic')
const { extractUserId } = require('./helpers')
debugger
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        const { postId } = req.params

        toggleLikePost(userId, postId, (error) => {
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