const { validateToken } = require('./validators')

const extractPayloadFromToken = (token) => {
    return JSON.parse(atob(token.split('.')[1]))
}

const isTokenAlive = (token) => {
    const { iat, exp } = extractPayloadFromToken(token);
    const now = Date.now() / 1000;
    return exp - iat > now - iat;
}

const isTokenValid = (token) => {
    try {
        validateToken(token);
        return true
    } catch (error) {
        return false
    }
}

const extractSubFromToken = (token) => {
    const { sub } = extractPayloadFromToken(token);
    return sub
}

module.exports = {
    isTokenAlive,
    isTokenValid,
    extractSubFromToken
}