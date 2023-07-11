const { retrieveToken } = require('../helpers')
const { updatePost } = require('../logic')
const { handleErrors } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const { postId } = req.params

    const { image, text } = req.body

    const userId = retrieveToken(req)

    return updatePost(userId, postId, image, text)
        .then(() => res.status(204).send())

})