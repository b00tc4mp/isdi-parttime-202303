const { extractUserId, handleErrors } = require('./helpers')
const { createPost } = require('../logic')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { image, location, title, text } = req.body

    return createPost(userId, image, location, title, text)
        .then(() => res.status(201).send())
})