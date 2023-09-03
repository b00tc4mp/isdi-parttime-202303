const { authenticateEmployee } = require('../logic')
const jwt = require('jsonwebtoken')
const { handleErrors } = require('./helpers')


module.exports = handleErrors((req, res) => {
    const { employeeNumber, employeePassword } = req.body

    const promise = authenticateEmployee(employeeNumber, employeePassword)

    return (async () => {
        await promise

            .then((employeeId => {
                const payload = { sub: employeeId }

                const { JWT_SECRET, JWT_EXPIRATION } = process.env

                const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION })

                res.json(token)
            }))
    })()
})