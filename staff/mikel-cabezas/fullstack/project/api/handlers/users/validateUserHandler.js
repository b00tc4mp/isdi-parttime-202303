const { validateUser } = require('../../logic/users')
const { handleErrors, extractUserId } = require('../helpers')
const jwt = require('jsonwebtoken')

module.exports = handleErrors(async (req, res) => {
    const { token } = req.params

    console.log(req.params)

    const payload = jwt.verify(token, process.env.JWT_SECRET)

    const { sub: uniqueString } = payload


    validateUser(uniqueString)

    await res.redirect(`${process.env.SCHEMA}/UserValitionSuccess`)
})