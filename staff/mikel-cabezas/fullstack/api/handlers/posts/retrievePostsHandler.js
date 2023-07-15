const { retrievePosts } = require('../../logic/posts')
const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    return retrievePosts(userId)
        .then(posts => res.status(200).send(posts))

})