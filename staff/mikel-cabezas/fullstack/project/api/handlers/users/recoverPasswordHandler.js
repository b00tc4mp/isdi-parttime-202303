const { setNewPassword } = require('../../logic/users')
const { handleErrors } = require('../helpers')

module.exports = handleErrors(async (req, res) => {
    const { token } = req.params

    // setNewPassword(token)
    await res.redirect(`exp://127.0.0.1:19000/--/SetNewPassword/token=${token}`)
})


// const { extractUserId, handleErrors } = require('../helpers')

//     const userId = extractUserId(req)
