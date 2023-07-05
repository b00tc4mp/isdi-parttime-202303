const { updateUserMode } = require('../logic')

const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { mode } = req.body

    return updateUserMode(userId, mode)
        .then(res.status(204).send())
})