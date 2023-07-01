const { retrieveToken } = require('../helpers')
const { updateEmail } = require('../logic')
const { handleErrors } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const userId = retrieveToken(req)

    const { email, newEmail } = req.body

    return updateEmail(userId, email, newEmail)
        .then(() => res.status(204).send())
})