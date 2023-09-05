const { updateUserEmail } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { email, newEmail, password } = req.body

    return updateUserEmail(userId, email, newEmail, password)
        .then(() => res.status(204).send())
})