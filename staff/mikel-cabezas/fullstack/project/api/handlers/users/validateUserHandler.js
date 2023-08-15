const { validateUser } = require('../../logic/users')
const { handleErrors } = require('../helpers')

module.exports = handleErrors(async (req, res) => {
    const { uniqueString } = req.params

    validateUser(uniqueString)

    await res.redirect('https://playgroundsnear.app')
})