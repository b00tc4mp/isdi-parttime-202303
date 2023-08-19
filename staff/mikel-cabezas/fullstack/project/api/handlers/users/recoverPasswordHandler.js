const { setNewPassword } = require('../../logic/users')
const { handleErrors } = require('../helpers')

module.exports = handleErrors(async (req, res) => {
    const { token } = req.params

    // setNewPassword(token)
    await res.redirect(`${process.env.SCHEMA}/SetNewPassword/token=${token}`)
})


// const { extractUserId, handleErrors } = require('../helpers')

//     const userId = extractUserId(req)
