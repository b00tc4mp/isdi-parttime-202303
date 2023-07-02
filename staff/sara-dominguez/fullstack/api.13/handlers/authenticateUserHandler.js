const { authenticateUser } = require('../logic')
const jwt = require('jsonwebtoken')
const { errors: { ExistenceError, AuthError, ContentError } } = require('com')

module.exports = (req, res) => {
    try {
        const { email, password } = req.body
        authenticateUser(email, password)
            .then(userId => {
                const payload = { sub: userId }

                // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION })


                const { JWT_SECRET, JWT_EXPIRATION } = process.env
                const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION })

                res.json(token)
            })
            .catch(error => {
                let status = 500

                if (error instanceof ExistenceError) {
                    status = 404
                }
                if (error instanceof AuthError) {
                    status = 401
                }
                res.status(status).json({ error: error.message })
            })
    } catch (error) {
        let status = 500
        if (error instanceof ContentError || error instanceof TypeError || error instanceof RangeError) {
            status = 406
        }

        res.status(status).json({ error: error.message })
    }

    // VERSION ANTES DE TOKEN
    // try {
    //     const { email, password } = req.body
    //     authenticateUser(email, password)
    //         .then(userId => res.json(userId))
    //         .catch(error => res.status(400).json({ error: error.message }))
    // } catch (error) {
    //     res.status(400).json({ error: error.message })
    // }
}