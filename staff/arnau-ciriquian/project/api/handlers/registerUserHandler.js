const { registerUser } = require('../logic')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
        const { name, email, password, DEFAULT_AVATAR_URL } = req.body

        return registerUser(name, email, password, DEFAULT_AVATAR_URL)
            .then(() => res.status(201).send())
})