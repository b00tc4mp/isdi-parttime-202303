const jwt = require('jsonwebtoken')

//fusionamos  extractToken(obtener la cabecera) con extractUserIdFromToken en una sola funcion

function extractUserId(req) {
    const { authorization } = req.headers
    const token = authorization.slice(7)


    const payload = jwt.verify(token, process.env.JWT_SECRET)

    const { sub: userId } = payload

    return userId
}

module.exports = extractUserId
