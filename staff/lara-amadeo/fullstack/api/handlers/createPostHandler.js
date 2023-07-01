const { retrieveToken } = require('../helpers')
const { createPost } = require('../logic')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const { image, text } = req.body

    const userId = retrieveToken(req)

    return createPost(userId, image, text)
        .then(() => res.status(201).send())
})