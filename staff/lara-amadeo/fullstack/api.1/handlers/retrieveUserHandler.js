const { retrieveUser } = require('../logic')
const { extractToken } = require('../helpers')

module.exports = function retrieveUserHandler(req, res) {
    try {
        const userId = extractToken(req)

        retrieveUser(userId, (error, user) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(200).json({ user })
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}