const { updateUserPassword } = require('../../logic/users')
const { extractUserId } = require('../helpers')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { password, newPassword, repeatPassword } = req.body

    return updateUserPassword(userId, password, newPassword, repeatPassword)
        .then(() => res.status(204).send())
})