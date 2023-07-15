const { updateUserEmail } = require('../../logic/users')
const { extractUserId } = require('../helpers')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { email } = req.body

    return updateUserEmail(userId, email)
        .then(() => res.status(204).send())
})