const { updateUserAvatar } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    
    const { avatar } = req.body

    const promise = updateUserAvatar(userId, avatar)

    return (async () => {
        await promise

        res.status(204).send()
    })()
})