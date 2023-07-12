const { updateUserEmail } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { email, newEmail, newEmailConfirmation, password } = req.body

    return updateUserEmail(userId, email, newEmail, newEmailConfirmation, password)
        .then(() => res.status(204).send())
})