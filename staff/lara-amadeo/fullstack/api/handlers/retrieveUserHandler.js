const { retrieveUser } = require('../logic')
const { retrieveToken } = require('../helpers')


module.exports = function retrieveUserHandler(req, res) {
    try {
        const userId = retrieveToken(req)

        retrieveUser(userId)
            .then(user => res.status(200).json({ user }))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}