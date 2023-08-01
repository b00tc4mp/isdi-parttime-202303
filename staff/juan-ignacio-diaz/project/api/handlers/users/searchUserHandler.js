const { searchUser } = require('../../logic')

const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { email } = req.params

    const promise = searchUser(userId, email)

    return (async () => { 
        const user = await promise

        res.json(user)
    })()
})