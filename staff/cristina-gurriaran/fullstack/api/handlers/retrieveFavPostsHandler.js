const { extractUserId, handleErrors } = require('./helpers')
const { retrieveFavPosts } = require('../logic')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const promise = retrieveFavPosts(userId)

    return (async () => {
        const posts = await promise

        res.json(posts)
    })()
})