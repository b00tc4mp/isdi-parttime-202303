const { forgotPassword } = require('../../logic/users')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const { email } = req.body

    return forgotPassword(email)
        .then(() => res.status(201).send())
})