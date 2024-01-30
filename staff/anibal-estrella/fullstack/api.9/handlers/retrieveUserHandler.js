const { retrieveUser } = require('../logic')
const { extractToken } = require('../helpers')

const jwt = require('jsonwebtoken')

module.exports = (req, res) => {

    try {
        // extract token from the request bearer authorization
        const token = extractToken(req)

        const payload = jwt.verify(token, process.env.SECRET)

        const { sub: userId } = payload

        retrieveUser(userId)
            .then(user => res.json(user))
            .catch(error => res.status(400).json({ error: error.message }))
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}