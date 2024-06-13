const { createNewPost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { image, text } = req.body

    return createNewPost(userId, image, text)
        .then(() => res.status(201).send())
})