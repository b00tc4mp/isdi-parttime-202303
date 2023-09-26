const { extractUserId, handleErrors } = require('./helpers')
const { updatePost } = require('../logic')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { postId } = req.params
    const { image, location, title, text } = req.body

    const promise = updatePost(userId, postId, image, location, title, text)

    return (async () => {
        await promise

        res.status(204).send()
    })()
})