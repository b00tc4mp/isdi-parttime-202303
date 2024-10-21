const { authenticateUser } = require('../logic')
const jwt = require('jsonwebtoken')
const { errors: { ContentError, AuthError, ExistenceError } } = require('com')


module.exports = (req, res) => {
    debugger
    try {
        const { email, password } = req.body

        authenticateUser(email, password)
            .then(userId => {

                const payload = { sub: userId }

                const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })

                res.json(token)
            })


            .catch(error => {
                let status = 500

                if (error instanceof ExistenceError)
                    status = 404
                else if (error instanceof AuthError)
                    status = 401

                res.status(status).json({ error: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof TypeError || error instanceof ContentError || error instanceof RangeError)
            status = 406

        res.status(400).json({ error: error.message })
    }
}