const { forgotPassword } = require('../../logic/users')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const { name, email, password } = req.body

    return forgotPassword(email)
        .then(() => res.status(201).send())
})