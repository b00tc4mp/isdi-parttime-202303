module.exports = req => {
    const { authorization } = req.headers
    // extact token from header authorization from position 7
    const token = authorization.slice(7)

    return token
}