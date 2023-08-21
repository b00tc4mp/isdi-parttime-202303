const { updateUserName } = require('../../logic/users')
const { extractUserId } = require('../helpers')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {

    const userId = extractUserId(req)
    const { name } = req.body
    return updateUserName(userId, name)
        .then(() => res.status(204).send())
})