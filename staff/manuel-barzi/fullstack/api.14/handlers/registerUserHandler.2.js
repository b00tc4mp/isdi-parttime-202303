const { ContentError } = require('com/errors')
const { registerUser } = require('../logic')
const { errors: { DuplicityError } } = require('com')

module.exports = handleErrors((req, res) => {
    const { name, email, password } = req.body

    return registerUser(name, email, password)
        .then(() => res.status(201).send())
})

function handleErrors(callback) {
    return function (req, res) {
        try {
            callback(req, res)
                .catch(error => {
                    let status = 500

                    if (error instanceof DuplicityError)
                        status = 409

                    res.status(status).json({ error: error.message })
                })
        } catch (error) {
            let status = 500

            if (error instanceof TypeError || error instanceof ContentError || error instanceof RangeError)
                status = 406

            res.status(status).json({ error: error.message })
        }
    }
}