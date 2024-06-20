const { extractUserId} = require('../helpers')
const { retrieveUser } = require('../logic')

module.exports = (req, res) => {
    try {

        const userId = extractUserId(req)

        retrieveUser(userId, (error, user) => {
            if (error) {
                res.status(400).json({ error: error.message })
                return
            }
            res.json(user)
        })

    } catch {
        res.status(400).json({ error: error.message })
    }
}