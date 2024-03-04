const { updateUserEmail } = require('../logic')
const { extractToken } = require('../helpers')

const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    try {
        const userId = extractToken(req)

        const { newEmail, newEmailConfirm } = req.body


        updateUserEmail(userId, newEmail, newEmailConfirm, error => {
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