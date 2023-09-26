const { authenticateUser} = require('../logic')
const jwt = require ('jsonwebtoken')
const { handleErrors } = require('./helpers')

module.exports= handleErrors((req, res) => {
        const { email, password } = req.body

        const promise = (authenticateUser(email, password))

        return (async () => {
            const userId = await promise
            
            const playload = { sub: userId }

            const { JWT_SECRET, JWT_EXPIRATION } = process.env

            const token = jwt.sign(playload, JWT_SECRET, { expiresIn: JWT_EXPIRATION })

            res.json(token)
        })()
})