const { createEvent } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

/**
 * 
 */
module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { author, poster, name, description, lineUp, dates, place, price, eventReviews } = req.body

    return createEvent(userId, poster, name, description, lineUp, dates, place, price, eventReviews).then(() => res.status(201).send())
})


