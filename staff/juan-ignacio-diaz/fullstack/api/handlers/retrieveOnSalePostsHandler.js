const { retrieveOnSalePosts } = require('../logic')

const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const promise = retrieveOnSalePosts(userId)

    return (async () => { 
        const posts = await promise

        res.json(posts)
    })()
})