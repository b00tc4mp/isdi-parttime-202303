const { retrieveUser } = require('../../logic/users')
const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    return retrieveUser(userId)
        .then(user => res.status(200).json(user))
})