const jwt = require('jsonwebtoken')

function extractUserId(req) {
    const { authorization } = req.headers

    if (authorization !== undefined) {
        const token = authorization.slice(7)

        const payload = jwt.verify(token, process.env.JWT_SECRET)

        const { sub: userId } = payload

        return userId
    }
    else{
        return undefined
    }
}

module.exports = extractUserId