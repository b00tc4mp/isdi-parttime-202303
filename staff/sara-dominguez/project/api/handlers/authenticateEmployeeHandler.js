const { authenticateEmployee } = require('../logic')
const jwt = require('jsonwebtoken')
//TODO handle errors

module.exports = (req, res) => {
    const { employeeNumber, employeePassword } = req.body

    return authenticateEmployee(employeeNumber, employeePassword)
        .then((employeeId => {
            const payload = { sub: employeeId }

            const { JWT_SECRET, JWT_EXPIRATION } = process.env

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION })

            res.json(token)
        }))
}