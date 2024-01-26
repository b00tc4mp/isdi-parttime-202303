const { retrieveUser } = require('../logic')
const { extractUserId } = require('./helpers')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    return retrieveUser(userId)
        .then(user => res.json(user))
})