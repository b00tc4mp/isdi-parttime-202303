const { retrieveSavePosts } = require('../logic')

const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const promise = retrieveSavePosts(userId)

    return (async () => { 
        const posts = await promise

        res.json(posts)
    })()
})