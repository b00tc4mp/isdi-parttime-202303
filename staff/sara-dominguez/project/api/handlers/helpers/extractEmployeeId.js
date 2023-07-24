const jwt = require('jsonwebtoken')

function extractEmployeeId(req) {
    const { authorization } = req.headers
    const token = authorization.slice(7)


    const payload = jwt.verify(token, process.env.JWT_SECRET)

    const { sub: employeeId } = payload

    return employeeId
}

module.exports = extractEmployeeId
