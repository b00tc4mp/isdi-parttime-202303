const { updateUserEmail } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { Email, newEmail, newEmailConfirm } = req.body

    return updateUserEmail(userId, newEmail, newEmailConfirm).then(() => res.status(201).send())
})