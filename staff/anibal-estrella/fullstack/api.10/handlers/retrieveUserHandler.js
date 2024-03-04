const { retrieveUser } = require('../logic')
const { extractToken } = require('../helpers')
const { errors: { ExistenceError, ContentError } } = require('com')

const jwt = require('jsonwebtoken')

module.exports = (req, res) => {

    try {
        // extract token from the request bearer authorization
        const token = extractToken(req)

        const payload = jwt.verify(token, process.env.SECRET)

        const { sub: userId } = payload

        retrieveUser(userId)
            .then(user => res.json(user))
            .catch(error => {
                let status = 500

                if (error instanceof ExistenceError)
                    status = 404

                res.status(status).json({ error: error.message })
            })
    }
    catch (error) {
        let status = 500

        if (error instanceof TypeError || error instanceof ContentError)
            status = 406

        res.status(status).json({ error: error.message })
    }
}