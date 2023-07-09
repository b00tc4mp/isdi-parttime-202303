const { updateUserAvatar } = require('../logic')
const { extractUserId } = require('./helpers')

const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    try {
        const token = extractUserId(req)
        const payload = jwt.verify(token, process.env.SECRET)
        const { sub: userId } = payload

        const { avatar } = req.body


        updateUserAvatar(userId, avatar, error => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }
        })

        res.status(204).send()

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}