module.exports = function extractToken(req) {
    const { authorization } = req.headers
    const userId = authorization.slice(7)

    return userId
}