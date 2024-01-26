const { updateUserEmail } = require('../../logic/users')
const { extractUserId } = require('../helpers')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const { token, email } = req.params
    debugger
    return updateUserEmail(token, email)
        // .then(() => res.status(204).send())
        .then(() => res.redirect(`${process.env.SCHEMA}/UserNewEmailSuccess/email-updated`)
        )
})