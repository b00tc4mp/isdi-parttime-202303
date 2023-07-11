const { retrieveUser } = require('../logic')
const { extractUserId } = require('./helpers')
const {
    errors: { ContentError, ExistenceError }
} = require('com')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        retrieveUser(userId)
            .then(user => res.json(user))
            .catch(error => {
                let status = 500

                if (error instanceof ExistenceError)
                    status = 404

                res.status(status).json({ error: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof TypeError || error instanceof ContentError)
            status = 406

        res.status(status).json({ error: error.message })
    }
}