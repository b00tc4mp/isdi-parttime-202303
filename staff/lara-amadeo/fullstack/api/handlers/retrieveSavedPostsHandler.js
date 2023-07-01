const { retrieveToken } = require('../helpers')
const { retrieveSavedPosts } = require('../logic')
const { handleErrors } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const userId = retrieveToken(req)

    return retrieveSavedPosts(userId)
        .then(posts => res.status(200).json({ posts }))

})