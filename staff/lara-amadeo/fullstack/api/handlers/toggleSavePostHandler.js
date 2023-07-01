const { retrieveToken } = require('../helpers')
const { toggleSavePost } = require('../logic')
const { handleErrors } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const { postId } = req.params

    const userId = retrieveToken(req)

    return toggleSavePost(userId, postId)
        .then(() => res.status(201).send())
})