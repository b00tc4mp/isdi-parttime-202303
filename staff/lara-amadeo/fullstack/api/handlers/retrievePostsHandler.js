const { retrieveToken } = require('../helpers')
const { retrievePosts } = require('../logic')
const { handleErrors } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const userId = retrieveToken(req)

    return retrievePosts(userId)
        .then(posts => res.status(200).json({ posts }))

})