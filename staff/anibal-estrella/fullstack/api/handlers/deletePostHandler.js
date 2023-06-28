const { deletePost } = require('../logic')
const { extractToken } = require('../helpers')

const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    try {
        const userId = extractToken(req)

        const { postId } = req.params

        deletePost(userId, postId, error => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(200).send()
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}