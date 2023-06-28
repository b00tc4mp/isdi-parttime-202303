const { ContentError } = require('com/errors')
const { registerUser } = require('../logic')
const { errors: { DuplicityError } } = require('com')

module.exports = (req, res) => {
    try {
        const { name, email, password } = req.body

        registerUser(name, email, password)
            .then(() => res.status(201).send())
            .catch(error => {
                let status = 500

                if (error instanceof DuplicityError)
                    status = 409

                res.status(status).json({ error: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof TypeError)
            status = 400
        else if (error instanceof ContentError)
            status = 406

        res.status(status).json({ error: error.message })
    }
}