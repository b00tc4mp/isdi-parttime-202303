const { DuplicityError, ContentError, FormatError } = require('com/errors')
const { registerUser } = require('../../logic/users')

module.exports = (req, res) => {
    try {
        const { name, email, password } = req.body

        registerUser(name, email, password)
            .then(() => res.status(201).send())
            .catch(error => {
                let status = 500
                if (error instanceof DuplicityError) status = 409

                res.status(status).json({ error: error.message })

            })
    } catch (error) {
        let status = 500
        if (error instanceof TypeError || error instanceof ContentError || error instanceof FormatError) {
            status = 406
        }
        res.status(status).json({ error: error.message })
    }
}