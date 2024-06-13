const { deleteAccount } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    return deleteAccount(userId)
        .then(() => res.status(204).send())
})