const { retrieveToken } = require('../helpers')
const { updatePassword } = require('../logic')
const { handleErrors } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const userId = retrieveToken(req)

    const { password, newPassword } = req.body

    return updatePassword(userId, password, newPassword)
        .then(() => res.status(204).send())
})