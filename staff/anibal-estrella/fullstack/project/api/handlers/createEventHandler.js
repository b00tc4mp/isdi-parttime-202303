const { createPost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

/**
 * 
 */
module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { image, text, lineUp, dates, place, price } = req.body

    return createPost(userId, image, text, lineUp, dates, place, price).then(() => res.status(201).send())
})


