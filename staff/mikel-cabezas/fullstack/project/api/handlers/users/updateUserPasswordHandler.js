const { updateUserPassword } = require('../../logic/users')
const { extractUserId } = require('../helpers')
const { handleErrors } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { newPassword, repeatPassword } = req.body

    return updateUserPassword(userId, newPassword, repeatPassword)
        .then(() => res.status(204).send())
})