const { extractUserId, handleErrors } = require('./helpers')
const { toggleFavPost } = require('../logic')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { postId } = req.params

    const promise = toggleFavPost(userId, postId)

    return (async () => {
        await promise

        res.status(201).send()
    })()
})