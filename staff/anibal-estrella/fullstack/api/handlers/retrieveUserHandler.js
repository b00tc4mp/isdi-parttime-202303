const { retrieveUser } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    debugger
    const userId = extractUserId(req)

    return retrieveUser(userId)
        .then(user => res.json(user))
})