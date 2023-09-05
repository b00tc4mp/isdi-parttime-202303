const { getLoggedUser } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
        const userId = extractUserId(req)

        return getLoggedUser(userId)
            .then(user => res.json(user))
})