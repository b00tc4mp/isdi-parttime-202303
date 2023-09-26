const { extractUserId, handleErrors } = require('./helpers')
const { retrievePosts } = require('../logic')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    return retrievePosts(userId)
        .then(posts => res.json(posts))
})