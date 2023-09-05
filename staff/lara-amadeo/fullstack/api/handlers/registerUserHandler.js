const { registerUser } = require('../logic')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {

    const { username, email, password } = req.body

    return registerUser(username, email, password)
        .then(() => res.status(201).send())
})

