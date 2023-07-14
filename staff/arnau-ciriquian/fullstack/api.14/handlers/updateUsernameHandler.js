const { updateUsername } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { username, newUsername, password } = req.body

    return updateUsername(userId, username, newUsername, password)
        .then(() => res.status(204).send())
})