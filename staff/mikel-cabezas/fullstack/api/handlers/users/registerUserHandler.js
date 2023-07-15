const { registerUser } = require('../../logic/users')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const { name, email, password } = req.body

    return registerUser(name, email, password)
        .then(() => res.status(201).send())
})