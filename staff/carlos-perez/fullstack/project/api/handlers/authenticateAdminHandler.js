const { authenticateAdmin } = require('../logic')
const jwt = require('jsonwebtoken')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const { email, password } = req.body

    return authenticateAdmin(email, password)
        .then(adminId => {
            const payload = { sub: adminId }

            const { JWT_SECRET, JWT_EXPIRATION } = process.env

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION })

            res.json(token)
        })
})