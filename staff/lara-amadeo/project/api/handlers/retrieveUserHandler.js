const { retrieveUser } = require('../logic')
const { retrieveToken } = require('../helpers')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    debugger
    const userId = retrieveToken(req)

    return retrieveUser(userId)
        .then(user => res.status(200).json(user))
})