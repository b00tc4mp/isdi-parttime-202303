const { retrieveSavePosts } = require('../logic')

const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    return retrieveSavePosts(userId)
        .then(posts => res.json(posts))
        .catch(error => res.status(400).json({ error: error.message }))
})