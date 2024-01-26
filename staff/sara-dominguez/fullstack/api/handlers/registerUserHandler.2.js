const { registerUser } = require('../logic')
const { errors: { DuplicityError, ContentError } } = require('com')


module.exports = (req, res) => {
    handleErrors(req, res, (req, res) => {
        const { name, email, password } = req.body

        return registerUser(name, email, password)
            .then(() => res.status(201).send())
    })


    function handleErrors(req, res, callback) {
        try {
            callback(req, res)
                .catch(error => {
                    let status = 500

                    if (error instanceof DuplicityError) {
                        status = 409
                    }

                    res.status(status).json({ error: error.message })
                })

        } catch (error) {
            let status = 500

            if (error instanceof ContentError || error instanceof TypeError || error instanceof RangeError)
                status = 406

            res.status(status).json({ error: error.message })
        }
    }
}
